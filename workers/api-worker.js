/**
 * TikTok Downloader API Worker
 *
 * Standalone Cloudflare Worker that extracts TikTok video/audio data
 * by fetching the video page directly (no third-party API dependency).
 *
 * Deploy:
 *   cd workers && wrangler deploy
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function extractVideoId(url) {
  const videoMatch = url.match(/\/video\/(\d+)/);
  if (videoMatch) return videoMatch[1];
  const shortMatch = url.match(/tiktok\.com\/(?:t|embed)\/([a-zA-Z0-9_]+)/);
  if (shortMatch) return shortMatch[1];
  return null;
}

async function resolveShortUrl(url) {
  try {
    const resp = await fetch(url, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(5000) });
    return resp.headers.get("location");
  } catch {
    return null;
  }
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    try {
      const { url: tiktokUrl } = await request.json();
      if (!tiktokUrl?.trim()) {
        return new Response(JSON.stringify({ error: "Missing TikTok URL" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      let targetUrl = tiktokUrl.trim();
      if (targetUrl.includes("vm.tiktok.com") || targetUrl.includes("/t/")) {
        const resolved = await resolveShortUrl(targetUrl);
        if (resolved && resolved.includes("/video/")) targetUrl = resolved;
      }

      const videoId = extractVideoId(targetUrl);
      if (!videoId) {
        return new Response(JSON.stringify({ error: "Could not extract video ID from URL" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const pageResp = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.tiktok.com/",
          "Cache-Control": "no-cache",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!pageResp.ok) {
        return new Response(JSON.stringify({ error: `TikTok returned HTTP ${pageResp.status}` }), {
          status: 502, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const html = await pageResp.text();

      // Extract SIGI_STATE
      let sigiJson = null;
      const sigiMatch = html.match(/window\.SIGI_STATE\s*=\s*(\{[\s\S]+?\});\s*<\/script>/);
      if (sigiMatch) { try { sigiJson = JSON.parse(sigiMatch[1]); } catch {} }

      if (!sigiJson) {
        const initMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]+?\});\s*<\/script>/);
        if (initMatch) { try { sigiJson = JSON.parse(initMatch[1]); } catch {} }
      }

      if (!sigiJson) {
        return new Response(JSON.stringify({ error: "Could not extract video data from TikTok page" }), {
          status: 502, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Parse video info
      let videoInfo = sigiJson.ItemModule?.[videoId] || sigiJson.Video?.[videoId] || sigiJson.video?.[videoId];
      if (!videoInfo) {
        const keys = [...Object.keys(sigiJson.ItemModule || {}), ...Object.keys(sigiJson.Video || {})];
        if (keys.length > 0) videoInfo = sigiJson.ItemModule?.[keys[0]] || sigiJson.Video?.[keys[0]];
      }

      if (!videoInfo) {
        return new Response(JSON.stringify({ error: "Video data not found in TikTok page" }), {
          status: 502, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const title = videoInfo.desc || videoInfo.title || "Unknown";
      const coverImg = videoInfo.cover?.urlList?.[0] || videoInfo.video?.cover?.urlList?.[0] || "";
      const musicUrl = videoInfo.music?.playUrl?.urlList?.[0] || videoInfo.music?.playUrl || "";
      const duration = videoInfo.video?.duration || videoInfo.music?.duration || 30;
      const videoUrl = videoInfo.video?.downloadAddr?.urlList?.[0] || videoInfo.video?.downloadAddr || videoInfo.video?.playAddr?.urlList?.[0] || "";
      const videoNoWm = videoInfo.video?.playAddr?.urlList?.find?.(u => !u.includes("watermark") && !u.includes("wm=")) || videoInfo.video?.playAddr?.urlList?.[1] || "";

      return new Response(JSON.stringify({
        title, coverImg,
        originalMp3Url: musicUrl || null,
        duration: typeof duration === "number" ? duration : 30,
        videoUrl: videoUrl || null,
        videoUrlNoWm: videoNoWm || null,
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return new Response(JSON.stringify({ error: message }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
