"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function UrlDecodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
    } catch { setError("Invalid URL-encoded string"); }
  };

  return (
    <ToolTemplate title="URL Decode Online" description="Decode URL-encoded strings instantly. Free, runs in your browser." keywords={["url decode", "url decoder", "decode url", "percent decode"]} toolName="URL Decoder" faqs={[{ q: "What is URL decoding?", a: "URL decoding reverses percent-encoding, converting %20 back to spaces, %26 back to &, etc." }]}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">URL-encoded Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste URL-encoded string..." className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none" />
        </div>
        <button onClick={handleDecode} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">Decode URL</button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {output && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Decoded Text</label>
            <div className="relative">
              <textarea readOnly value={output} className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-green-400 font-mono resize-none pr-16" />
              <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-3 top-3 px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
