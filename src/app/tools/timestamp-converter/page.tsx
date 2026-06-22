"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState, useEffect } from "react";

export default function TimestampConverterPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConvert = () => {
    try {
      const ms = parseInt(input);
      if (isNaN(ms)) {
        setResult("Please enter a valid number");
        return;
      }
      const date = new Date(ms > 9999999999 ? ms : ms * 1000);
      setResult(date.toUTCString());
    } catch {
      setResult("Invalid timestamp");
    }
  };

  return (
    <ToolTemplate
      title="Unix Timestamp Converter Online"
      description="Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds."
      keywords={["timestamp converter", "unix timestamp", "epoch converter", "date to timestamp"]}
      toolName="Timestamp Converter"
      faqs={[
        { q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970 UTC (the Unix epoch)." },
        { q: "Seconds or milliseconds?", a: "Seconds timestamps are typically 10 digits (e.g., 1700000000), while milliseconds are 13 digits (e.g., 1700000000000)." },
      ]}
    >
      <div className="space-y-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
          <p className="text-xs text-slate-500 mb-1">Current Unix Timestamp</p>
          <p className="text-lg font-mono text-purple-400">{Math.floor(now / 1000)}</p>
          <p className="text-xs text-slate-500 mt-1">{new Date(now).toUTCString()}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Enter Timestamp</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 1700000000 or 1700000000000"
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
        <button onClick={handleConvert} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
          Convert
        </button>
        {result && <p className="text-sm text-green-400 font-mono">{result}</p>}
      </div>
    </ToolTemplate>
  );
}
