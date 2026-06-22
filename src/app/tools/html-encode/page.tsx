"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function HtmlEncodePage() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    const div = document.createElement('div');
    div.textContent = input;
    setEncoded(div.innerHTML);
    setError("");
  };

  const handleDecode = () => {
    try {
      const div = document.createElement('div');
      div.innerHTML = input;
      setDecoded(div.textContent || "");
      setError("");
    } catch { setError("Invalid HTML entity string"); }
  };

  return (
    <ToolTemplate title="HTML Entity Encoder/Decoder" description="Escape or unescape HTML entities. Convert special characters to/from their HTML entity equivalents." keywords={["html encode", "html entities", "html decoder", "escape html"]} toolName="HTML Encoder" faqs={[{ q: "Why encode HTML?", a: "HTML encoding prevents XSS attacks and ensures special characters display correctly in web pages." }]}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text or HTML entities..." className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={handleEncode} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">Encode</button>
          <button onClick={handleDecode} className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-all">Decode</button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {encoded && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">HTML Encoded</label>
            <input readOnly value={encoded} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-2.5 text-sm text-orange-400 font-mono pr-16" />
            <button onClick={() => navigator.clipboard.writeText(encoded)} className="mt-2 px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
          </div>
        )}
        {decoded && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Decoded Text</label>
            <input readOnly value={decoded} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-2.5 text-sm text-blue-400 font-mono pr-16" />
            <button onClick={() => navigator.clipboard.writeText(decoded)} className="mt-2 px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
