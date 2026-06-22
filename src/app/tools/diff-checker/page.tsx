"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function DiffCheckerPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [differences, setDifferences] = useState<string[]>([]);

  const handleDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const diffs: string[] = [];
    const maxLen = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] ?? '(missing)';
      const l2 = lines2[i] ?? '(missing)';
      if (l1 !== l2) {
        diffs.push(`Line ${i + 1}: "${l1}" → "${l2}"`);
      }
    }
    setDifferences(diffs);
  };

  return (
    <ToolTemplate
      title="Diff Checker Online"
      description="Compare two texts and highlight the differences line by line. Free, instant comparison."
      keywords={["diff checker", "text compare", "compare text", "difference checker"]}
      toolName="Diff Checker"
      faqs={[
        { q: "How does diff checking work?", a: "The tool compares texts line by line and highlights any differences, showing what changed from the original to the new version." },
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Original Text</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste original text..."
              className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Modified Text</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste modified text..."
              className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none font-mono"
            />
          </div>
        </div>
        <button onClick={handleDiff} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
          Compare
        </button>
        {differences.length > 0 && (
          <div>
            <p className="text-sm text-slate-400 mb-2">{differences.length} difference(s) found:</p>
            <div className="space-y-1">
              {differences.map((d, i) => (
                <p key={i} className="text-sm text-yellow-400 font-mono bg-slate-900/50 p-2 rounded">{d}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
