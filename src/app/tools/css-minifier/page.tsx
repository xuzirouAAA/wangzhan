"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function CssMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [saved, setSaved] = useState(0);

  const handleMinify = () => {
    let result = input
      .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comments
      .replace(/\s+/g, ' ')               // Collapse whitespace
      .replace(/\s*{\s*/g, '{')           // Remove space before {
      .replace(/\s*}\s*/g, '}')           // Remove space after }
      .replace(/\s*:\s*/g, ':')           // Remove space around :
      .replace(/\s*;\s*/g, ';')           // Remove space around ;
      .replace(/\s*,\s*/g, ',')           // Remove space around ,
      .trim();
    setOutput(result);
    setSaved(Math.round(((input.length - result.length) / input.length) * 100) || 0);
  };

  return (
    <ToolTemplate
      title="CSS Minifier Online"
      description="Minify CSS code by removing whitespace, comments, and unnecessary characters. Reduces file size significantly."
      keywords={["css minifier", "minify css", "css compressor", "optimize css"]}
      toolName="CSS Minifier"
      faqs={[
        { q: "Will minifying CSS break my styles?", a: "No, minification only removes whitespace and comments. The visual output remains identical." },
        { q: "How much smaller can CSS get?", a: "Typically 15-30% reduction, depending on how much whitespace and comments are in the original." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">CSS Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=".class { color: red; }"
            className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <button onClick={handleMinify} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
          Minify CSS
        </button>
        {output && (
          <>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <span>Size reduced by {saved}%</span>
              <span className="text-slate-500">({input.length} → {output.length} bytes)</span>
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-blue-400 font-mono resize-none pr-16"
              />
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="absolute right-3 top-3 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 rounded"
              >
                Copy
              </button>
            </div>
          </>
        )}
      </div>
    </ToolTemplate>
  );
}
