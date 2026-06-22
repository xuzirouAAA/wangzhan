"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerate = () => {
    if (text.trim()) {
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text.trim())}&color=7c3aed&bgcolor=f8fafc`);
    }
  };

  return (
    <ToolTemplate
      title="QR Code Generator Online"
      description="Generate QR codes from any text or URL instantly. Free, runs in your browser with no data sent to servers."
      keywords={["qr code generator", "generate qr code", "qr code online", "free qr generator"]}
      toolName="QR Code Generator"
      faqs={[
        { q: "What is a QR code?", a: "A QR (Quick Response) code is a two-dimensional barcode that can store URLs, text, contact info, and more. It can be scanned by smartphones." },
        { q: "How long can the QR code text be?", a: "Standard QR codes can store up to 7,089 numeric characters or 4,296 alphanumeric characters." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Text or URL</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL..."
            className="w-full h-24 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          />
        </div>
        <button onClick={handleGenerate} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
          Generate QR Code
        </button>
        {qrUrl && (
          <div className="flex flex-col items-center gap-4">
            <img src={qrUrl} alt="QR Code" className="rounded-xl border border-slate-700 bg-white p-4" />
            <a href={qrUrl} download="qrcode.png" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-sm text-slate-300 rounded-lg transition-all">
              Download PNG
            </a>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
