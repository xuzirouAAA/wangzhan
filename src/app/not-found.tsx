import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-purple-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-slate-400 mb-8">The tool you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-purple-500 hover:to-indigo-500 transition-all inline-block">
        ← Back to Home
      </Link>
      <div className="mt-12">
        <p className="text-sm text-slate-500 mb-3">Popular tools:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["JSON Formatter", "Base64 Encode", "UUID Generator", "Password Generator"].map(t => (
            <Link key={t} href={`/tools/${t.toLowerCase().replace(/\s+/g, '-')}`} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-slate-400 hover:text-white hover:border-purple-500/50 transition-all">
              {t}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
