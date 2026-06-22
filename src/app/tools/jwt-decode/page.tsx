"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function JwtDecodePage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{ header: any; payload: any } | null>(null);
  const [error, setError] = useState("");

  const handleDecode = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        setError("Invalid JWT format. Expected 3 parts separated by dots.");
        return;
      }
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setDecoded({ header, payload });
      setError("");
    } catch (e: any) {
      setError(`Failed to decode: ${e.message}`);
      setDecoded(null);
    }
  };

  return (
    <ToolTemplate
      title="JWT Decoder Online"
      description="Decode and inspect JWT (JSON Web Token) headers and payloads without sending tokens anywhere. Free, privacy-first."
      keywords={["jwt decoder", "jwt decode", "jwt inspector", "decode jwt token"]}
      toolName="JWT Decoder"
      faqs={[
        { q: "What is a JWT?", a: "A JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three parts: header, payload, and signature." },
        { q: "Is it safe to decode JWTs in the browser?", a: "Yes! Decoding a JWT doesn't verify its signature — it just reads the header and payload. Never share your JWT with others as it may contain sensitive information." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <button
          onClick={handleDecode}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all"
        >
          Decode JWT
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {decoded && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-1">Header</h4>
              <pre className="bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-xs text-blue-400 font-mono overflow-auto whitespace-pre-wrap">{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-1">Payload</h4>
              <pre className="bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-xs text-green-400 font-mono overflow-auto whitespace-pre-wrap">{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
