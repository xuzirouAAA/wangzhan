/* ──────────────────────────────────────────────
   POST /api/extract
   Proxies a TikTok URL to TikWM and returns parsed audio data.
   Runs on Cloudflare Workers via Edge runtime.
   ────────────────────────────────────────────── */

export const runtime = "edge";

interface TikWmData {
  title?: string;
  cover?: string;
  music?: string;
  music_info?: {
    play?: string;
    duration?: number;
  };
}

interface TikWmResponse {
  code: number;
  msg: string;
  data?: TikWmData;
}

export async function POST(request: Request) {
  try {
    const { url: tiktokUrl } = (await request.json()) as { url: string };

    if (!tiktokUrl?.trim()) {
      return Response.json({ error: "Missing TikTok URL" }, { status: 400 });
    }

    // ── Forward to TikWM ────────────────────────────────────────
    const formData = new FormData();
    formData.append("url", tiktokUrl);

    const apiRes = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      body: formData,
      // 15 s timeout via AbortController
      signal: AbortSignal.timeout(15_000),
    });

    if (!apiRes.ok) {
      return Response.json(
        { error: `TikWM returned HTTP ${apiRes.status}` },
        { status: 502 },
      );
    }

    const json: TikWmResponse = await apiRes.json();

    if (json.code !== 0 || !json.data) {
      return Response.json(
        { error: json.msg || "TikWM returned an error" },
        { status: 502 },
      );
    }

    const { data } = json;

    // ── Extract fields with fallbacks ────────────────────────────
    const title = data.title ?? "Unknown Sound";
    const coverImg = data.cover ?? "";
    const originalMp3Url = data.music_info?.play ?? data.music ?? "";
    const duration = data.music_info?.duration ?? 30;

    if (!originalMp3Url) {
      return Response.json(
        { error: "No audio URL found in the TikWM response" },
        { status: 502 },
      );
    }

    return Response.json({ title, coverImg, originalMp3Url, duration });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";

    // AbortSignal timeout produces a "TimeoutError" name
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return Response.json({ error: "TikWM request timed out" }, { status: 504 });
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
