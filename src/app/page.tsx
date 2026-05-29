"use client";

import { useState } from "react";
import {
  Music,
  Sparkles,
  Link,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import ResultCard from "@/components/ResultCard";
import FaqAccordion from "@/components/FaqAccordion";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface TikTokData {
  title: string;
  coverImg: string;
  originalMp3Url: string;
  duration: number;
}

/* ──────────────────────────────────────────────
   Calls our own API route (Edge Worker on CF)
   ────────────────────────────────────────────── */
async function fetchExtract(tiktokUrl: string): Promise<TikTokData> {
  const res = await fetch("/api/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: tiktokUrl }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json();
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */
export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TikTokData | null>(null);

  const handleExtract = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please paste a TikTok video URL first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await fetchExtract(trimmed);
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (error) setError("");
    } catch {
      setError("Unable to read clipboard. Please paste manually.");
    }
  };

  const handleClear = () => {
    setUrl("");
    setError("");
    setResult(null);
  };

  return (
    <>
      {/* ====== HEADER ====== */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              TikTok MP3 Downloader
            </h1>
            <p className="text-xs text-slate-500">
              Download &amp; trim TikTok audio online
            </p>
          </div>
        </div>
      </header>

      {/* ====== MAIN ====== */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* ====== TOP BANNER AD (728 × 90) ====== */}
        <div className="flex justify-center mb-8">
          <AdPlaceholder type="banner" />
        </div>

        <div className="flex gap-6">
          {/* ====== LEFT SKYSCRAPER (160 × 600) — hidden on mobile ====== */}
          <aside className="hidden lg:block shrink-0">
            <div className="sticky top-8">
              <AdPlaceholder type="skyscraper" />
            </div>
          </aside>

          {/* ====== CENTER COLUMN ====== */}
          <div className="flex-1 max-w-3xl mx-auto w-full space-y-8">
            {/* Hero */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Download TikTok{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Audio as MP3
                </span>
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
                Paste any TikTok video URL to extract, preview, trim, and
                download the original audio track. Free &mdash; no registration
                needed.
              </p>
            </div>

            {/* Input box */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    placeholder="Paste TikTok video URL here…"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleExtract()}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePaste}
                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Paste
                  </button>
                  <button
                    onClick={handleExtract}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    {loading ? "Extracting…" : "Extract"}
                  </button>
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-400 flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  {error}
                </p>
              )}
            </div>

            {/* Result card */}
            {result && (
              <ResultCard
                title={result.title}
                coverImg={result.coverImg}
                originalMp3Url={result.originalMp3Url}
                duration={result.duration}
              />
            )}

            {/* ====== RECTANGLE AD (300 × 250) ====== */}
            <div className="flex justify-center">
              <AdPlaceholder type="rectangle" />
            </div>

            {/* FAQ Accordion */}
            <FaqAccordion />
          </div>

          {/* ====== RIGHT SKYSCRAPER (160 × 600) — hidden on mobile ====== */}
          <aside className="hidden lg:block shrink-0">
            <div className="sticky top-8">
              <AdPlaceholder type="skyscraper" />
            </div>
          </aside>
        </div>

        {/* ====== BOTTOM BANNER AD (728 × 90) ====== */}
        <div className="flex justify-center mt-8">
          <AdPlaceholder type="banner" />
        </div>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} TikTok MP3 Downloader. All rights reserved.</p>
          <p className="mt-1">
            Not affiliated with TikTok or ByteDance. For personal use only.
          </p>
        </div>
      </footer>
    </>
  );
}
