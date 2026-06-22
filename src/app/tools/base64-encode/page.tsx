"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function Base64EncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
      setError("");
    } catch {
      setError("Invalid input");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolTemplate
      title="Base64 Encode Online"
      description="Encode text to Base64 format instantly. Free, privacy-first, runs entirely in your browser."
      keywords={["base64 encode", "base64 encoder", "encode text to base64"]}
      toolName="Base64 Encoder"
      faqs={[
        { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used for encoding data in emails, URLs, and web APIs." },
        { q: "Is Base64 encoding secure?", a: "Base64 is an encoding scheme, not encryption. Anyone can decode Base64-encoded data. Use it for encoding, not for securing sensitive information." },
        { q: "Why does my Base64 output look different?", a: "Different Base64 implementations may use different character sets or padding. Our tool uses standard Base64 encoding compatible with all major browsers and libraries." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode..."
            className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleEncode}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all"
          >
            Encode to Base64
          </button>
          {output && (
            <button
              onClick={() => { setInput(output); setOutput(""); }}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-all"
            >
              Clear
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {output && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Base64 Output</label>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-green-400 font-mono resize-none pr-12"
              />
              <button
                onClick={handleCopy}
                className="absolute right-3 top-3 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 rounded transition-all"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
