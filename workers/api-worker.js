/**
 * TikTok Downloader API Worker
 *
 * Standalone Cloudflare Worker that proxies TikTok URLs to TikWM
 * and returns both audio (MP3) and video (MP4) download data.
 *
 * Deploy:
 *   wrangler deploy
 *
 * If you don't have wrangler set up, you can also paste this code
 * directly into the Cloudflare Dashboard → Workers & Pages → Create Worker.
 */

// ── CORS headers for browser access ──────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    try {
      const { url: tiktokUrl } = await request.json();

      if (!tiktokUrl?.trim()) {
        return new Response(JSON.stringify({ error: "Missing TikTok URL" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ── Forward to TikWM ──────────────────────────────────────
      const formData = new FormData();
      formData.append("url", tiktokUrl);

      const apiRes = await fetch("https://www.tikwm.com/api/", {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(15_000),
      });

      if (!apiRes.ok) {
        return new Response(
          JSON.stringify({ error: `TikWM returned HTTP ${apiRes.status}` }),
          { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
        );
      }

      const json = await apiRes.json();

      if (json.code !== 0 || !json.data) {
        return new Response(
          JSON.stringify({ error: json.msg || "TikWM returned an error" }),
          { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
        );
      }

      const d = json.data;

      // ── Build response ─────────────────────────────────────────
      const payload = {
        title: d.title ?? "Unknown",
        coverImg: d.cover ?? "",
        originalMp3Url: d.music_info?.play ?? d.music ?? null,
        duration: d.music_info?.duration ?? 30,
        videoUrl: d.play ?? null,           // with watermark
        videoUrlNoWm: d.wmplay ?? null,      // without watermark
        videoHdUrl: d.hdplay ?? null,        // HD if available
        videoSize: d.size ?? null,
        videoSizeNoWm: d.wm_size ?? null,
        videoHdSize: d.hd_size ?? null,
      };

      return new Response(JSON.stringify(payload), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";

      if (err instanceof DOMException && err.name === "TimeoutError") {
        return new Response(JSON.stringify({ error: "TikWM request timed out" }), {
          status: 504,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
