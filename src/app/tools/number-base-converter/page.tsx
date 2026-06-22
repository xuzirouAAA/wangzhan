"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function NumberBaseConverterPage() {
  const [input, setInput] = useState("42");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);

  const handleConvert = () => {
    try {
      const decimal = parseInt(input, fromBase);
      if (isNaN(decimal)) return "";
      return decimal.toString(toBase).toUpperCase();
    } catch { return "Error"; }
  };

  const result = handleConvert();

  return (
    <ToolTemplate title="Number Base Converter Online" description="Convert numbers between binary, octal, decimal, and hexadecimal. Free, instant conversion." keywords={["number base converter", "binary converter", "hex converter", "decimal to binary"]} toolName="Number Base Converter" faqs={[{ q: "What number bases are supported?", a: "We support bases 2 (binary), 8 (octal), 10 (decimal), and 16 (hexadecimal)." }]}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Input</label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:ring-2 focus:ring-purple-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">From Base</label>
            <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none">
              {[2, 8, 10, 16].map(b => <option key={b} value={b}>Base {b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">To Base</label>
            <select value={toBase} onChange={(e) => setToBase(Number(e.target.value))} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none">
              {[2, 8, 10, 16].map(b => <option key={b} value={b}>Base {b}</option>)}
            </select>
          </div>
        </div>
        {result && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Result (Base {toBase})</label>
            <div className="relative">
              <input readOnly value={result} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-green-400 font-mono pr-16" />
              <button onClick={() => navigator.clipboard.writeText(result)} className="absolute right-3 top-1.5 px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
