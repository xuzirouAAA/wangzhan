/* ──────────────────────────────────────────────
   POST /api/extract
   Extracts TikTok video & audio data by fetching the video page
   and parsing embedded metadata (SIGI_STATE).
   Runs on Cloudflare Workers via Edge runtime.
   ────────────────────────────────────────────── */

export const runtime = "edge";

interface VideoData {
  title: string;
  coverImg: string;
  originalMp3Url: string | null;
  duration: number;
  videoUrl: string | null;
  videoUrlNoWm: string | null;
  videoHdUrl: string | null;
  videoSize: number | null;
  videoSizeNoWm: number | null;
  videoHdSize: number | null;
}

/**
 * Extract video ID from various TikTok URL formats:
 * - https://www.tiktok.com/@user/video/123456789
 * - https://vm.tiktok.com/XXXXXX/
 * - https://www.tiktok.com/t/XXXXXX/
 */
function extractVideoId(url: string): string | null {
  // Match /video/123456789...
  const videoMatch = url.match(/\/video\/(\d+)/);
  if (videoMatch) return videoMatch[1];

  // Match short URLs (vm.tiktok.com, tiktok.com/t/)
  const shortMatch = url.match(/tiktok\.com\/(?:t|embed)\/([a-zA-Z0-9_]+)/);
  if (shortMatch) return shortMatch[1];

  return null;
}

/**
 * Resolve a shortened TikTok URL to the full URL.
 */
async function resolveShortUrl(url: string): Promise<string | null> {
  try {
    const resp = await fetch(url, {
      method: "HEAD",
      redirect: "manual", // we want the Location header, not follow
      signal: AbortSignal.timeout(5_000),
    });
    const location = resp.headers.get("location");
    return location;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { url: tiktokUrl } = (await request.json()) as { url: string };

    if (!tiktokUrl?.trim()) {
      return Response.json({ error: "Missing TikTok URL" }, { status: 400 });
    }

    let targetUrl = tiktokUrl.trim();

    // ── Resolve short URLs ──────────────────────────────────────
    if (
      targetUrl.includes("vm.tiktok.com") ||
      targetUrl.includes("/t/")
    ) {
      const resolved = await resolveShortUrl(targetUrl);
      if (resolved && resolved.includes("/video/")) {
        targetUrl = resolved;
      }
    }

    const videoId = extractVideoId(targetUrl);
    if (!videoId) {
      return Response.json(
        { error: "Could not extract video ID from the URL" },
        { status: 400 },
      );
    }

    // ── Fetch TikTok video page ──────────────────────────────────
    const headers: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://www.tiktok.com/",
      "Cache-Control": "no-cache",
    };

    const pageResp = await fetch(targetUrl, {
      headers,
      signal: AbortSignal.timeout(10_000),
    });

    if (!pageResp.ok) {
      return Response.json(
        { error: `TikTok returned HTTP ${pageResp.status}` },
        { status: 502 },
      );
    }

    const html = await pageResp.text();

    // ── Extract SIGI_STATE from page ──────────────────────────────
    // TikTok embeds video data in: window.SIGI_STATE = {...};
    // Also try: <script id="__NEXT_DATA__" type="application/json">... or __INITIAL_STATE__
    let sigiMatch: RegExpExecArray | null = null;
    let sigiJson: any = null;

    // Try SIGI_STATE first — use [\s\S] instead of /s flag for broader compat
    const sigiRegex = /window\.SIGI_STATE\s*=\s*(\{[\s\S]+?\});\s*<\/script>/;
    sigiMatch = sigiRegex.exec(html);
    if (sigiMatch) {
      try {
        sigiJson = JSON.parse(sigiMatch[1]);
      } catch {
        sigiJson = null;
      }
    }

    // Fallback: try __INITIAL_STATE__
    if (!sigiJson) {
      const initRegex = /window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]+?\});\s*<\/script>/;
      const initMatch = initRegex.exec(html);
      if (initMatch) {
        try {
          sigiJson = JSON.parse(initMatch[1]);
        } catch {
          sigiJson = null;
        }
      }
    }

    // Fallback: try __NEXT_DATA__
    if (!sigiJson) {
      const nextRegex = /<script id="__NEXT_DATA__"[^>]*>(\{[\s\S]+?\})<\/script>/;
      const nextMatch = nextRegex.exec(html);
      if (nextMatch) {
        try {
          sigiJson = JSON.parse(nextMatch[1]);
        } catch {
          sigiJson = null;
        }
      }
    }

    if (!sigiJson) {
      return Response.json(
        { error: "Could not extract video data from TikTok page. The platform may have changed." },
        { status: 502 },
      );
    }

    // ── Parse video data from SIGI_STATE ──────────────────────────
    // Structure: sigiJson.ItemModule?.[videoId] or sigiJson.SEO?.meta?.videoInfo
    let videoInfo: any = null;

    if (sigiJson.ItemModule && sigiJson.ItemModule[videoId]) {
      videoInfo = sigiJson.ItemModule[videoId];
    } else if (sigiJson.Video && sigiJson.Video[videoId]) {
      videoInfo = sigiJson.Video[videoId];
    } else if (sigiJson.video && sigiJson.video[videoId]) {
      videoInfo = sigiJson.video[videoId];
    } else if (sigiJson.aweme_detail) {
      videoInfo = sigiJson.aweme_detail;
    } else if (sigiJson.itemInfo?.itemStruct) {
      videoInfo = sigiJson.itemInfo.itemStruct;
    } else if (sigiJson.SEO?.meta?.videoInfo) {
      videoInfo = sigiJson.SEO.meta.videoInfo;
    } else {
      // Try to find anything that looks like video data
      const keys = [
        ...Object.keys(sigiJson.ItemModule || {}),
        ...Object.keys(sigiJson.Video || {}),
        ...Object.keys(sigiJson.video || {}),
      ];
      if (keys.length > 0) {
        const firstKey = keys[0];
        videoInfo =
          sigiJson.ItemModule?.[firstKey] ||
          sigiJson.Video?.[firstKey] ||
          sigiJson.video?.[firstKey];
      }
    }

    if (!videoInfo) {
      return Response.json(
        { error: "Video data not found in TikTok page response" },
        { status: 502 },
      );
    }

    // ── Extract fields ────────────────────────────────────────────
    const title =
      videoInfo.desc ||
      videoInfo.title ||
      videoInfo.shareInfo?.title ||
      videoInfo.meta?.title ||
      "Unknown";

    const coverImg =
      videoInfo.cover?.urlList?.[0] ||
      videoInfo.cover?.urlList?.[0]?.urlList?.[0] ||
      videoInfo.video?.cover?.urlList?.[0] ||
      videoInfo.video?.dynamicCover?.urlList?.[0] ||
      videoInfo.originCover?.urlList?.[0] ||
      "";

    // Video URLs from video.playAddr or video.downloadAddr
    const videoPlayAddr =
      videoInfo.video?.playAddr?.urlList?.[0] ||
      videoInfo.video?.playAddr ||
      videoInfo.video?.downloadAddr?.urlList?.[0] ||
      videoInfo.video?.downloadAddr ||
      "";

    const videoDownloadAddr =
      videoInfo.video?.downloadAddr?.urlList?.[0] ||
      videoInfo.video?.downloadAddr ||
      videoPlayAddr;

    // Watermark-free video
    const videoNoWm =
      videoInfo.video?.playAddr?.urlList?.find?.(
        (u: string) => !u.includes("watermark") && !u.includes("wm="),
      ) ||
      videoInfo.video?.playAddr?.urlList?.[1] ||
      "";

    // Audio / music URL
    const musicUrl =
      videoInfo.music?.playUrl?.urlList?.[0] ||
      videoInfo.music?.playUrl ||
      videoInfo.video?.music?.playUrl?.urlList?.[0] ||
      videoInfo.music?.play_addr?.urlList?.[0] ||
      "";

    // Duration
    const duration =
      videoInfo.video?.duration ||
      videoInfo.music?.duration ||
      videoInfo.duration ||
      30;

    const videoUrl = videoDownloadAddr || videoPlayAddr || null;
    const videoUrlNoWm = videoNoWm || null;

    if (!videoUrl && !musicUrl) {
      return Response.json(
        { error: "No media URLs found in TikTok video data" },
        { status: 502 },
      );
    }

    const result: VideoData = {
      title,
      coverImg,
      originalMp3Url: musicUrl || null,
      duration: typeof duration === "number" ? duration : 30,
      videoUrl,
      videoUrlNoWm,
      videoHdUrl: null,
      videoSize: null,
      videoSizeNoWm: null,
      videoHdSize: null,
    };

    return Response.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (err instanceof DOMException && err.name === "TimeoutError") {
      return Response.json(
        { error: "Request to TikTok timed out" },
        { status: 504 },
      );
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
