"use client";

import { useState, useEffect } from "react";

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

  // 在客户端挂载时，强行动态引入 Google 统计的核心全局脚本
  useEffect(() => {
    // 1. 强行插入 gtag.js
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-6NKN570X46";
    script.async = true;
    document.head.appendChild(script);

    // 2. 初始化配置数据
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    function gtag(...args: any[]) {
      win.dataLayer.push(args);
    }
    win.gtag = gtag;

    gtag("js", new Date());
    gtag("config", "G-6NKN570X46");
  }, []);

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
      loading && setLoading(false);
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376A8.965 8.965 0 0 0 12 12.75c-.975 0-1.904.155-2.77.44a1.125 1.125 0 0 1-1.23-.339L6.562 11.23a1.125 1.125 0 0 1-.161-1.1
