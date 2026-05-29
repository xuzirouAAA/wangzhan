"use client";

import { Music, Clock } from "lucide-react";
import AudioTrimmer from "./AudioTrimmer";

interface ResultCardProps {
  title: string;
  coverImg: string;
  originalMp3Url: string;
  duration: number;
}

/** SVG data‑URL fallback for the cover image */
const fallbackCover = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient></defs>
    <rect fill="url(#g)" width="200" height="200"/>
    <text fill="rgba(255,255,255,0.8)" font-size="64" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" x="100" y="100">♫</text>
  </svg>`,
)}`;

export default function ResultCard({
  title,
  coverImg,
  originalMp3Url,
  duration,
}: ResultCardProps) {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 sm:p-6 space-y-5">
      {/* Cover + metadata */}
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-700">
          <img
            src={coverImg}
            alt={`Cover for ${title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackCover;
            }}
          />
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h2 className="text-base sm:text-lg font-semibold text-white truncate">
            {title}
          </h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Music className="w-4 h-4 text-indigo-400" />
              Audio
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-400" />
              {mins}:{secs.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Trimmer */}
      <AudioTrimmer
        audioUrl={originalMp3Url}
        duration={duration}
        title={title}
      />
    </div>
  );
}
