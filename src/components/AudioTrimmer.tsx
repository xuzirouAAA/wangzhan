"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Download } from "lucide-react";

interface AudioTrimmerProps {
  audioUrl: string;
  duration: number;
  title: string;
}

export default function AudioTrimmer({ audioUrl, duration, title }: AudioTrimmerProps) {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioKey, setAudioKey] = useState(0);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Reset when audio URL changes
  useEffect(() => {
    setStartTime(0);
    setEndTime(duration);
    setCurrentTime(0);
    setIsPlaying(false);
    setAudioKey((k) => k + 1);
  }, [audioUrl, duration]);

  // Stop playback when reaching end time
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    const ct = audioRef.current.currentTime;
    setCurrentTime(ct);
    if (ct >= endTime) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [endTime]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = startTime;
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setStartTime(Math.min(val, endTime - 1));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setEndTime(Math.max(val, startTime + 1));
  };

  const handleEnded = () => setIsPlaying(false);

  /** Client‑side download — zero server bandwidth */
  const downloadMp3 = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(audioUrl, { mode: "cors" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${title.replace(/[^a-zA-Z0-9\-_]/g, "_")}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Revoke after a tick so the browser can start the download
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // CORS or network failure — fallback: open in new tab
      window.open(audioUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const selected = endTime - startTime;

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 space-y-4" role="group" aria-label="Audio trimmer">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        key={audioKey}
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="auto"
      />

      {/* Time labels */}
      <div className="flex items-center justify-between text-sm tabular-nums">
        <span className="text-slate-400">{formatTime(startTime)}</span>
        <span className="text-indigo-400 font-semibold">
          {formatTime(selected)} selected
        </span>
        <span className="text-slate-400">{formatTime(endTime)}</span>
      </div>

      {/* Dual range sliders */}
      <div className="space-y-3">
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block" htmlFor="trim-start">
            Start
          </label>
          <input
            id="trim-start"
            type="range"
            min={0}
            max={duration}
            step={0.5}
            value={startTime}
            onChange={handleStartChange}
            className="w-full"
            aria-label="Trim start time"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block" htmlFor="trim-end">
            End
          </label>
          <input
            id="trim-end"
            type="range"
            min={0}
            max={duration}
            step={0.5}
            value={endTime}
            onChange={handleEndChange}
            className="w-full"
            aria-label="Trim end time"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={togglePlay}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? "Pause" : "Preview"}
        </button>

        <button
          onClick={downloadMp3}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Downloading…" : "Download MP3"}
        </button>
      </div>
    </div>
  );
}
