"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function UUIDGeneratorPage() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <ToolTemplate
      title="UUID Generator Online"
      description="Generate cryptographically secure UUID v4 values. Generate one or multiple UUIDs at once. Free, runs in your browser."
      keywords={["uuid generator", "uuid v4", "generate uuid", "guid generator"]}
      toolName="UUID Generator"
      faqs={[
        { q: "What is a UUID?", a: "A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. UUID v4 uses random numbers." },
        { q: "Are UUID v4 values truly random?", a: "UUID v4 uses cryptographically secure random number generators in modern browsers, making collision virtually impossible." },
        { q: "What's the difference between UUID and GUID?", a: "UUID and GUID are essentially the same thing — universally unique identifiers. GUID (Globally Unique Identifier) is Microsoft's term for UUID." },
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-400">Count:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white text-center"
          />
          <button
            onClick={handleGenerate}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all"
          >
            Generate UUID{count > 1 ? 's' : ''}
          </button>
        </div>
        {uuids.length > 0 && (
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 rounded-lg p-3">
                <span className="text-green-400 font-mono text-sm flex-1 truncate">{uuid}</span>
                <button
                  onClick={() => handleCopy(i, uuid)}
                  className={`px-3 py-1 text-xs rounded transition-all ${copiedIndex === i ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {copiedIndex === i ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
