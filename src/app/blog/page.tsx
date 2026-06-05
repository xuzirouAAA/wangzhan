"use client";

import Link from "next/link";

export default function BlogHome() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 p-4 font-sans">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-black mb-8 bg-gradient-to-r from-indigo-400 to-slate-100 bg-clip-text text-transparent">
          FastTikMP3 Official Blog
        </h1>
        
        <div className="space-y-6">
          {/* 文章 1 */}
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all">
            <h2 className="text-xl font-bold mb-2 text-indigo-400">
              <Link href="/blog/how-to-download-tiktok-audio-mp3">
                How to Download TikTok Audio as MP3 for Free: The Ultimate Guide
              </Link>
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Learn how to extract and download high-quality MP3 tracks from any viral TikTok video instantly.
            </p>
            <Link href="/blog/how-to-download-tiktok-audio-mp3" className="text-xs text-indigo-400 hover:underline font-bold">
              Read Article →
            </Link>
          </div>

          {/* 文章 2 (留空占位) */}
          <div className="p-6 bg-slate-900/30 border border-slate-800/60 rounded-2xl">
            <h2 className="text-xl font-bold mb-2 text-slate-500">
              Trending TikTok Songs June 2026
            </h2>
            <p className="text-slate-500 text-sm">Coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  );
}