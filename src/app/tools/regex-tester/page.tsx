"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("gi");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleTest = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex) || [];
      setMatches(found);
      setError("");
    } catch (e: any) {
      setError(`Invalid regex: ${e.message}`);
      setMatches([]);
    }
  };

  return (
    <ToolTemplate
      title="Regex Tester Online"
      description="Test regular expressions live with instant match results. Supports all standard regex flags."
      keywords={["regex tester", "regular expression tester", "regex online", "regex checker"]}
      toolName="Regex Tester"
      faqs={[
        { q: "What is a regular expression?", a: "A regular expression (regex) is a sequence of characters that specifies a search pattern. Used for string matching, validation, and text manipulation." },
        { q: "What do the flags mean?", a: "g = global (find all matches), i = case insensitive, m = multiline, s = dotall (dot matches newlines)." },
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="\d+"
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gi"
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <button onClick={handleTest} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
          Test Regex
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {matches.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Matches ({matches.length})</label>
            <div className="flex flex-wrap gap-2">
              {matches.map((m, i) => (
                <span key={i} className="px-3 py-1 bg-green-900/50 border border-green-700/50 rounded text-sm text-green-400 font-mono">{m}</span>
              ))}
            </div>
          </div>
        )}
        {testString && matches.length === 0 && !error && <p className="text-sm text-slate-500">No matches found</p>}
      </div>
    </ToolTemplate>
  );
}
