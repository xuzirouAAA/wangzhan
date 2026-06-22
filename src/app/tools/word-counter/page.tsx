"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text.trim() ? text.trim().split(/\n\s*\n/).filter(Boolean).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  };

  return (
    <ToolTemplate
      title="Word Counter Online"
      description="Count words, characters, lines, paragraphs, and estimate reading time for your text. Free, instant analysis."
      keywords={["word counter", "character counter", "text counter", "count words online"]}
      toolName="Word Counter"
      faqs={[
        { q: "How are words counted?", a: "Words are counted by splitting text on whitespace. Hyphenated words count as one word." },
        { q: "What is reading time?", a: "Reading time is estimated at 200 words per minute, the average adult reading speed." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Enter Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-48 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Words", value: stats.words, color: "text-purple-400" },
            { label: "Characters", value: stats.chars, color: "text-blue-400" },
            { label: "No Spaces", value: stats.charsNoSpaces, color: "text-green-400" },
            { label: "Lines", value: stats.lines, color: "text-yellow-400" },
            { label: "Paragraphs", value: stats.paragraphs, color: "text-orange-400" },
            { label: "Read Time", value: `${stats.readingTime}m`, color: "text-pink-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-center">
              <p className={`text-lg font-bold ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolTemplate>
  );
}
