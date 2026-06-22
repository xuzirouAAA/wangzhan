"use client";
import Link from "next/link";

interface ToolPageProps {
  title: string;
  description: string;
  keywords: string[];
  toolName: string;
  faqs?: { q: string; a: string }[];
  children: React.ReactNode;
}

export default function ToolPage({ title, description, keywords, toolName, faqs, children }: ToolPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools" className="hover:text-slate-300">Tools</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{toolName}</span>
      </div>

      {/* Tool Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>

      {/* Tool Interface */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-6 mb-8">
        {children}
      </div>

      {/* SEO Content */}
      <div className="prose prose-invert max-w-none mb-8">
        <h2 className="text-xl font-semibold text-slate-200">What is {toolName}?</h2>
        <p className="text-slate-400">{description}</p>
        <p className="text-slate-400">
          This {toolName.toLowerCase()} runs entirely in your browser. No data is sent to any server,
          ensuring your privacy and security. Simply paste or type your input and get instant results.
        </p>
      </div>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                <summary className="font-medium text-slate-200 cursor-pointer">{faq.q}</summary>
                <p className="text-slate-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Related Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <Link href="/tools/base64-encode" className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 text-center hover:bg-slate-700/50 transition">
            <p className="text-sm font-medium text-white">Base64 Encode</p>
          </Link>
          <Link href="/tools/url-encode" className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 text-center hover:bg-slate-700/50 transition">
            <p className="text-sm font-medium text-white">URL Encode</p>
          </Link>
          <Link href="/tools/html-encode" className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 text-center hover:bg-slate-700/50 transition">
            <p className="text-sm font-medium text-white">HTML Encode</p>
          </Link>
        </div>
      </div>

      {/* Ad Placeholder */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-2xl h-24 bg-slate-800/30 border border-dashed border-slate-700/50 rounded-lg flex items-center justify-center">
          <span className="text-xs text-slate-600">Advertisement</span>
        </div>
      </div>
    </div>
  );
}
