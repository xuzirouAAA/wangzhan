"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function IpLookupPage() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    setLoading(true);
    setError("");
    setIp("");
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setIp(data.ip);
    } catch {
      setError("Unable to fetch IP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolTemplate title="IP Lookup Online" description="Find your public IP address instantly. Know what the outside world sees when you visit websites." keywords={["ip lookup", "my ip address", "what is my ip", "public ip"]} toolName="IP Lookup" faqs={[{ q: "What is my IP address?", a: "Your public IP address is how websites and services identify you on the internet. It's assigned by your ISP." }]}>
      <div className="space-y-4">
        <button onClick={handleLookup} disabled={loading} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50">
          {loading ? "Looking up..." : "Find My IP Address"}
        </button>
        {ip && (
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-1">Your Public IP Address</p>
            <p className="text-2xl font-mono text-green-400">{ip}</p>
          </div>
        )}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </ToolTemplate>
  );
}
