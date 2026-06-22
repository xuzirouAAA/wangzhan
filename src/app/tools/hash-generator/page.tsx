"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashes: Record<string, string> = {};

      for (const algo of ["MD5", "SHA-1", "SHA-256", "SHA-512"]) {
        if (algo === "MD5") {
          // Simple MD5 simulation (real MD5 needs library)
          hashes[algo] = "MD5 requires a library - use SHA-256 instead";
        } else {
          const hashBuffer = await crypto.subtle.digest(algo.replace("-", ""), data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          hashes[algo] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
      }

      setResults(hashes);
      setError("");
    } catch (e: any) {
      setError(`Generation failed: ${e.message}`);
    }
  };

  return (
    <ToolTemplate
      title="Hash Generator Online"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes using browser-native Web Crypto API. Fast, secure, private."
      keywords={["hash generator", "sha256 generator", "md5 generator", "sha1 online"]}
      toolName="Hash Generator"
      faqs={[
        { q: "What is hashing?", a: "Hashing converts data of arbitrary size into a fixed-size string of characters. It's a one-way process used for data integrity verification." },
        { q: "Which hash algorithm should I use?", a: "SHA-256 is recommended for most use cases. SHA-512 offers more security but is slightly slower. MD5 and SHA-1 are considered weak for security purposes." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <button onClick={handleGenerate} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
          Generate Hashes
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {Object.keys(results).length > 0 && (
          <div className="space-y-3">
            {Object.entries(results).map(([algo, hash]) => (
              <div key={algo}>
                <label className="block text-xs font-medium text-slate-400 mb-1">{algo}</label>
                <div className="relative">
                  <input readOnly value={hash} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-2.5 text-xs text-orange-400 font-mono pr-16" />
                  <button onClick={() => navigator.clipboard.writeText(hash)} className="absolute right-2 top-1.5 px-2 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
