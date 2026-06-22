"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolTemplate
      title="JSON Formatter & Validator Online"
      description="Format, prettify, and validate JSON data instantly. Choose indentation levels from 2 to 4 spaces. Free, runs in your browser."
      keywords={["json formatter", "json beautifier", "json validator", "format json online"]}
      toolName="JSON Formatter"
      faqs={[
        { q: "What is JSON formatting?", a: "JSON formatting (also called beautification) adds proper indentation and line breaks to make JSON data human-readable." },
        { q: "How do I validate JSON?", a: "Our tool validates JSON as you format it. If the JSON is invalid, an error message will tell you exactly what's wrong and where." },
        { q: "Can I minify JSON?", a: "Yes! Click the 'Minify' button to remove all whitespace and make JSON as compact as possible." },
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <label className="text-sm text-slate-400">Indent:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... {"key": "value"}'
            className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleFormat}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all"
          >
            Format JSON
          </button>
          <button
            onClick={handleMinify}
            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-all"
          >
            Minify
          </button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {output && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Formatted Output</label>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-green-400 font-mono resize-none pr-12"
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
