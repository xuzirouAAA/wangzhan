"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function Base64DecodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))));
      setError("");
    } catch {
      setError("Invalid Base64 string");
      setOutput("");
    }
  };

  return (
    <ToolTemplate
      title="Base64 Decode Online"
      description="Decode Base64 encoded strings back to plain text instantly. Free, runs in your browser."
      keywords={["base64 decode", "base64 decoder", "decode base64", "base64 to text"]}
      toolName="Base64 Decoder"
      faqs={[
        { q: "How do I decode Base64?", a: "Paste the Base64 string into the input field and click 'Decode'. The result will appear instantly." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Base64 Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Base64 string..."
            className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <button onClick={handleDecode} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
          Decode Base64
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {output && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Decoded Text</label>
            <div className="relative">
              <textarea readOnly value={output} className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-green-400 font-mono resize-none pr-16" />
              <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-3 top-3 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 rounded">Copy</button>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
