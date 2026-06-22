"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function JsonMinifyPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [saved, setSaved] = useState(0);

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setSaved(Math.round(((input.length - minified.length) / input.length) * 100) || 0);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  };

  return (
    <ToolTemplate title="JSON Minifier Online" description="Remove all whitespace from JSON to minimize file size. Free, instant compression." keywords={["json minify", "json compressor", "compact json", "minimize json"]} toolName="JSON Minifier" faqs={[{ q: "What does minify do?", a: "Minification removes all unnecessary whitespace, newlines, and spaces from JSON, reducing file size significantly." }]}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">JSON Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value"}' className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none" />
        </div>
        <button onClick={handleMinify} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">Minify JSON</button>
        {output && !output.startsWith("Error") && (
          <div>
            <p className="text-sm text-green-400 mb-2">Reduced by {saved}%</p>
            <div className="relative">
              <textarea readOnly value={output} className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-blue-400 font-mono resize-none pr-16" />
              <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-3 top-3 px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
            </div>
          </div>
        )}
        {output.startsWith("Error") && <p className="text-sm text-red-400">{output}</p>}
      </div>
    </ToolTemplate>
  );
}
