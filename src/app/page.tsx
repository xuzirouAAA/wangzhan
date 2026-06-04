"use client";

import { useState } from "react";

// 严格定义从你的新 Cloudflare Worker 返回的数据结构
interface AudioData {
  title: string;
  coverImg: string;
  originalMp3Url: string;
  duration: number;
}

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AudioData | null>(null);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // ── 核心修改点：直接强行请求你在 Cloudflare 部署成功的独立微服务 ──
      const response = await fetch("https://super-dew-9993.2207139559.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server status responded with ${response.status}`);
      }

      const data = await response.json() as AudioData;

      if (data && data.originalMp3Url) {
        setResult(data);
      } else {
        throw new Error("Invalid response format from backup cluster.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please verify the link or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
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
              Download TikTok <span className="text-slate-100">Audio as MP3</span>
            </h1>
            <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base font-medium leading-relaxed">
              Paste any TikTok video URL to extract, preview, trim, and download the original audio track. Free — no registration needed.
            </p>
          </div>

          <form onSubmit={handleExtract} className="w-full max-w-2xl bg-slate-900/80 p-2 rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row gap-2 items-center backdrop-blur-md focus-within:border-indigo-500/50 transition-all duration-300">
            <div className="w-full flex items-center gap-2 px-3 py-2 sm:py-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376A8.965 8.965 0 0 0 12 12.75c-.975 0-1.904.155-2.77.44a1.125 1.125 0 0 1-1.23-.339L6.562 11.23a1.125 1.125 0 0 1-.161-1.157 9.062 9.062 0 0 1 1.514-2.506l1.243-1.493a1.125 1.125 0 0 1 1.543-.146l3.52 2.816a1.125 1.125 0 0 1 .146 1.543l-1.314 1.576a8.964 8.964 0 0 0 2.771.44c1.196 0 2.333-.233 3.375-.657m-1.5 6.24h.008v.008H17.25v-.008Zm3-3h.008v.008H20.25v-.008Z" />
                </svg>
                Paste
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <>
                    <span>Extract</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* 异常警示条 */}
          {error && (
            <div className="w-full max-w-2xl mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-red-400 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* 解析成功渲染面板 */}
          {result && (
            <div className="w-full max-w-2xl mt-8 bg-slate-900/90 border border-slate-700/60 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col sm:flex-row gap-6 items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
              <img
                src={result.coverImg}
                alt="Video Cover"
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border border-slate-700/50 shadow-md flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300";
                }}
              />
              <div className="flex-1 w-full flex flex-col gap-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-200 line-clamp-2 leading-snug">
                  {result.title}
                </h3>
                <audio controls src={result.originalMp3Url} className="w-full h-10 mt-1" />
                <a
                  href={result.originalMp3Url}
                  download={`${result.title.slice(0, 20)}.mp3`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-max mt-2 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Audio MP3
                </a>
              </div>
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
        <h2 className="text-xl font-extrabold text-slate-300 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-slate-200 mb-1">How to download TikTok audio as MP3?</h4>
            <p className="text-xs sm:text-sm text-slate-400">Simply copy the link of the TikTok video, paste it into the input box above, and click 'Extract'. Your MP3 download button will appear instantly.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-slate-200 mb-1">Is this TikTok sound downloader free to use?</h4>
            <p className="text-xs sm:text-sm text-slate-400">Yes, our tool is 100% free and unlimited. No accounts or software installations are required.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}