"use client";

import { useState } from "react";
import Script from "next/script";
import { Download, Music, Video, Film } from "lucide-react";

// ── Response data from the API (audio + video) ─────────────────
interface MediaData {
  title: string;
  coverImg: string;
  originalMp3Url: string | null;
  duration: number;
  videoUrl: string | null;       // with watermark
  videoUrlNoWm: string | null;   // without watermark
  videoHdUrl: string | null;     // HD if available
  videoSize: number | null;
  videoSizeNoWm: number | null;
  videoHdSize: number | null;
}

type Tab = "audio" | "video";

function formatSize(bytes: number | null): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MediaData | null>(null);
  const [tab, setTab] = useState<Tab>("audio");

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setTab("audio");

    // Try endpoints in order: external Worker → internal API
    const endpoints = [
      {
        url: "https://super-dew-9993.2207139559.workers.dev/",
        headers: { "Content-Type": "application/json" },
      },
      {
        url: "/api/extract",
        headers: { "Content-Type": "application/json" },
      },
    ];

    let lastError: string | null = null;

    for (const ep of endpoints) {
      try {
        const response = await fetch(ep.url, {
          method: "POST",
          headers: ep.headers,
          body: JSON.stringify({ url: inputUrl.trim() }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => null);
          lastError = errBody?.error || `Server responded with ${response.status}`;
          continue; // try next endpoint
        }

        const data = (await response.json()) as MediaData;

        if (data && (data.originalMp3Url || data.videoUrl || data.videoUrlNoWm)) {
          setResult(data);
          setLoading(false);
          return; // success — exit
        } else {
          lastError = "No media data found for this video.";
          continue;
        }
      } catch (err) {
        console.error(`Endpoint ${ep.url} failed:`, err);
        lastError = "Something went wrong. Please verify the link or try again.";
        continue;
      }
    }

    // All endpoints failed
    setError(lastError);
    setLoading(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  // ── Determine best available video URL ────────────────────────
  const videoSources = (r: MediaData) => {
    const sources: { label: string; url: string; size: string }[] = [];
    if (r.videoHdUrl) {
      sources.push({ label: "HD", url: r.videoHdUrl, size: formatSize(r.videoHdSize) });
    }
    if (r.videoUrlNoWm) {
      sources.push({ label: "No Watermark", url: r.videoUrlNoWm, size: formatSize(r.videoSizeNoWm) });
    }
    if (r.videoUrl) {
      sources.push({ label: "Standard", url: r.videoUrl, size: formatSize(r.videoSize) });
    }
    return sources;
  };

  return (
    <>
      {/* ── Google Analytics ── */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6NKN570X46"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6NKN570X46');
        `}
      </Script>

      <main className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col items-center justify-between p-4 font-sans selection:bg-indigo-500 selection:text-white">
        {/* 顶部通栏广告位 */}
        <div className="w-full max-w-4xl h-24 bg-slate-800/40 border border-slate-700/50 rounded-xl flex items-center justify-center text-xs text-slate-500 tracking-wider my-4 backdrop-blur-sm">
          ADVERTISEMENT
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-6 my-auto items-start">
          {/* 左侧侧边栏广告位 */}
          <div className="hidden lg:flex col-span-1 h-[600px] bg-slate-800/40 border border-slate-700/50 rounded-xl items-center justify-center text-xs text-slate-500 tracking-wider writing-mode-vertical backdrop-blur-sm">
            ADVERTISEMENT
          </div>

          {/* 中间核心交互区域 */}
          <div className="col-span-1 lg:col-span-3 flex flex-col items-center py-8 px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
                Download TikTok{" "}
                <span className="text-slate-100">Video & Audio</span>
              </h1>
              <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base font-medium leading-relaxed">
                Paste any TikTok video URL to extract, preview, and download the original
                video or audio track. Free — no registration needed.
              </p>
            </div>

            <form
              onSubmit={handleExtract}
              className="w-full max-w-2xl bg-slate-900/80 p-2 rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row gap-2 items-center backdrop-blur-md focus-within:border-indigo-500/50 transition-all duration-300"
            >
              <div className="w-full flex items-center gap-2 px-3 py-2 sm:py-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-slate-500 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
                <input
                  type="url"
                  placeholder="https://www.tiktok.com/@username/video/..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 text-sm sm:text-base font-medium"
                />
              </div>
              <div className="w-full sm:w-auto flex gap-2 justify-end p-1 sm:p-0">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1 px-4 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376A8.965 8.965 0 0 0 12 12.75c-.975 0-1.904.155-2.77.44a1.125 1.125 0 0 1-1.23-.339L6.562 11.23a1.125 1.125 0 0 1-.161-1.157 9.062 9.062 0 0 1 1.514-2.506l1.243-1.493a1.125 1.125 0 0 1 1.543-.146l3.52 2.816a1.125 1.125 0 0 1 .146 1.543l-1.314 1.576a8.964 8.964 0 0 0 2.771.44c1.196 0 2.333-.233 3.375-.657m-1.5 6.24h.008v.008H17.25v-.008Zm3-3h.008v.008H20.25v-.008Z"
                    />
                  </svg>
                  Paste
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition-all duration-200 whitespace-nowrap"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <>
                      <span>Extract</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* 异常警示条 */}
            {error && (
              <div className="w-full max-w-2xl mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-red-400 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* ── 解析成功渲染面板 ──────────────────────────────────── */}
            {result && (
              <div className="w-full max-w-2xl mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Tab switcher */}
                <div className="flex border-b border-slate-700/60 mb-6">
                  <button
                    onClick={() => setTab("audio")}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                      tab === "audio"
                        ? "border-indigo-500 text-indigo-400"
                        : "border-transparent text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Music className="w-4 h-4" />
                    Audio
                  </button>
                  <button
                    onClick={() => setTab("video")}
                    disabled={!result.videoUrl && !result.videoUrlNoWm && !result.videoHdUrl}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                      !result.videoUrl && !result.videoUrlNoWm && !result.videoHdUrl
                        ? "border-transparent text-slate-600 cursor-not-allowed"
                        : tab === "video"
                          ? "border-indigo-500 text-indigo-400"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Video
                  </button>
                </div>

                {/* ── Audio Tab ────────────────────────────────────── */}
                {tab === "audio" && (
                  <div className="bg-slate-900/90 border border-slate-700/60 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col sm:flex-row gap-6 items-center">
                    <img
                      src={result.coverImg}
                      alt="Video Cover"
                      className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border border-slate-700/50 shadow-md flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300";
                      }}
                    />
                    <div className="flex-1 w-full flex flex-col gap-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-200 line-clamp-2 leading-snug">
                        {result.title}
                      </h3>
                      {result.originalMp3Url ? (
                        <>
                          <audio
                            controls
                            src={result.originalMp3Url}
                            className="w-full h-10 mt-1"
                          />
                          <a
                            href={result.originalMp3Url}
                            download={`${result.title.slice(0, 20)}.mp3`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-max mt-2 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all duration-200"
                          >
                            <Download className="w-4 h-4" />
                            Download Audio MP3
                          </a>
                        </>
                      ) : (
                        <p className="text-sm text-slate-500 italic">
                          Audio not available for this video.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Video Tab ────────────────────────────────────── */}
                {tab === "video" && (
                  <div className="bg-slate-900/90 border border-slate-700/60 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-200 line-clamp-2 leading-snug">
                      {result.title}
                    </h3>

                    {/* Video player */}
                    {(() => {
                      const sources = videoSources(result);
                      const preferredUrl =
                        sources.find((s) => s.label === "No Watermark")?.url ||
                        sources.find((s) => s.label === "HD")?.url ||
                        sources[0]?.url;
                      return preferredUrl ? (
                        <video
                          controls
                          src={preferredUrl}
                          className="w-full rounded-xl border border-slate-700/50 bg-black"
                          poster={result.coverImg}
                          style={{ maxHeight: "480px" }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <p className="text-sm text-slate-500 italic">
                          No video URL available.
                        </p>
                      );
                    })()}

                    {/* Download buttons */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Download Video
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {videoSources(result).map((s) => (
                          <a
                            key={s.label}
                            href={s.url}
                            download={`${result.title.slice(0, 20)}_${s.label.toLowerCase().replace(/\s+/g, "_")}.mp4`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all duration-200"
                          >
                            <Film className="w-4 h-4" />
                            {s.label}
                            {s.size ? ` (${s.size})` : ""}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 中间内嵌广告位 */}
            <div className="w-full max-w-2xl h-48 bg-slate-800/40 border border-slate-700/50 rounded-2xl flex items-center justify-center text-xs text-slate-500 tracking-wider mt-12 backdrop-blur-sm">
              ADVERTISEMENT
            </div>
          </div>

          {/* 右侧侧边栏广告位 */}
          <div className="hidden lg:flex col-span-1 h-[600px] bg-slate-800/40 border border-slate-700/50 rounded-xl items-center justify-center text-xs text-slate-500 tracking-wider writing-mode-vertical backdrop-blur-sm">
            ADVERTISEMENT
          </div>
        </div>

        {/* 底部 FAQ 区域 */}
        <footer className="w-full max-w-4xl border-t border-slate-800/60 pt-8 pb-4 mt-12">
          <h2 className="text-xl font-extrabold text-slate-300 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-slate-200 mb-1">
                How to download TikTok video or audio?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Simply copy the link of the TikTok video, paste it into the input box above,
                and click &apos;Extract&apos;. Once processed, switch between the Audio and
                Video tabs to preview and download. No registration required.
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-slate-200 mb-1">
                Can I download TikTok videos without a watermark?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Yes! When available, the Video tab shows a &quot;No Watermark&quot; option
                alongside the standard version. Simply choose your preferred quality and
                download.
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-slate-200 mb-1">
                Is this TikTok downloader free to use?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Yes, our tool is 100% free and unlimited. No accounts or software
                installations are required. We support the service through advertisements.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
