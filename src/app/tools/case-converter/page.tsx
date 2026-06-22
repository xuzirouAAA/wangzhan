"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function CaseConverterPage() {
  const [input, setInput] = useState("");

  const convert = (fn: (s: string) => string) => fn(input);

  return (
    <ToolTemplate title="Case Converter Online" description="Convert text between camelCase, snake_case, PascalCase, kebab-case, UPPER CASE, and more." keywords={["case converter", "camel case", "snake case", "kebab case", "text case"]} toolName="Case Converter" faqs={[{ q: "What is camelCase?", a: "camelCase starts with lowercase and capitalizes each word boundary: helloWorld, thisIsAExample." }]}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Input Text</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Hello World Example" className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: "camelCase", fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
            { label: "PascalCase", fn: (s: string) => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).replace(/[^a-zA-Z0-9]+/g, '') },
            { label: "snake_case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
            { label: "kebab-case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
            { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
            { label: "lowercase", fn: (s: string) => s.toLowerCase() },
          ].map(({ label, fn }) => (
            <button key={label} onClick={() => setInput(convert(fn))} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 rounded-lg transition-all">
              {label}
            </button>
          ))}
        </div>
        {input && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Result</label>
            <div className="relative">
              <input readOnly value={input} className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-green-400 font-mono pr-16" />
              <button onClick={() => navigator.clipboard.writeText(input)} className="absolute right-3 top-1.5 px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded hover:bg-slate-600">Copy</button>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
