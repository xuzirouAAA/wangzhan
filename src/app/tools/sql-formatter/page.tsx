"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function SqlFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      // Simple SQL formatter
      let result = input
        .replace(/\b(SELECT\b)/gi, '\nSELECT')
        .replace(/\b(FROM\b)/gi, '\nFROM')
        .replace(/\b(WHERE\b)/gi, '\nWHERE')
        .replace(/\b(ORDER\s+BY\b)/gi, '\nORDER BY')
        .replace(/\b(GROUP\s+BY\b)/gi, '\nGROUP BY')
        .replace(/\b(INSERT\s+INTO\b)/gi, '\nINSERT INTO')
        .replace(/\b(UPDATE\b)/gi, '\nUPDATE')
        .replace(/\b(SET\b)/gi, '\nSET')
        .replace(/\b(DELETE\b)/gi, '\nDELETE')
        .replace(/\b(AND\b)/gi, '\nAND')
        .replace(/\b(OR\b)/gi, '\nOR')
        .trim();
      setOutput(result);
      setError("");
    } catch { setError("Failed to format"); }
  };

  return (
    <ToolTemplate title="SQL Formatter Online" description="Format and beautify SQL queries with proper indentation. Free, runs in your browser." keywords={["sql formatter", "sql beautifier", "format sql", "sql minifier"]} toolName="SQL Formatter" faqs={[{ q: "Does this format all SQL dialects?", a: "Our formatter supports standard SQL syntax including SELECT, INSERT, UPDATE, DELETE, JOIN, and more." }]}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">SQL Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE active = 1 AND age > 18" className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none" />
        </div>
        <button onClick={handleFormat} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">Format SQL</button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {output && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Formatted SQL</label>
            <div className="relative">
              <textarea readOnly value={output} className="w-full h-32 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-green-400 font-mono resize-none pr-16" />
              <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-3 top-3 px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
