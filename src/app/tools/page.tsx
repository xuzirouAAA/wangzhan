import Link from "next/link";

const tools = [
  { slug: "json-formatter", name: "JSON Formatter", desc: "Format, validate, and minify JSON", cat: "Formatter" },
  { slug: "base64-encode", name: "Base64 Encode", desc: "Encode text to Base64", cat: "Encode" },
  { slug: "base64-decode", name: "Base64 Decode", desc: "Decode Base64 to text", cat: "Decode" },
  { slug: "url-encode", name: "URL Encode", desc: "Encode strings for URLs", cat: "Encode" },
  { slug: "url-decode", name: "URL Decode", desc: "Decode URL-encoded strings", cat: "Decode" },
  { slug: "jwt-decode", name: "JWT Decode", desc: "Decode JWT tokens", cat: "Security" },
  { slug: "uuid-generator", name: "UUID Generator", desc: "Generate UUID v4 values", cat: "Generator" },
  { slug: "password-generator", name: "Password Generator", desc: "Generate secure passwords", cat: "Security" },
  { slug: "hash-generator", name: "Hash Generator", desc: "MD5, SHA-1, SHA-256, SHA-512", cat: "Security" },
  { slug: "qr-code-generator", name: "QR Code Generator", desc: "Generate QR codes", cat: "Generator" },
  { slug: "color-converter", name: "Color Converter", desc: "HEX, RGB, HSL converter", cat: "Converter" },
  { slug: "timestamp-converter", name: "Timestamp Converter", desc: "Unix timestamp converter", cat: "Converter" },
  { slug: "regex-tester", name: "Regex Tester", desc: "Test regular expressions", cat: "Text" },
  { slug: "word-counter", name: "Word Counter", desc: "Count words, chars, lines", cat: "Text" },
  { slug: "diff-checker", name: "Diff Checker", desc: "Compare text differences", cat: "Text" },
  { slug: "css-minifier", name: "CSS Minifier", desc: "Minify CSS code", cat: "Formatter" },
];

const categories = [...new Set(tools.map(t => t.cat))];

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">All Developer Tools</h1>
      <p className="text-slate-400 mb-8">{tools.length} free tools, running 100% in your browser.</p>

      <div className="space-y-8">
        {categories.map(cat => (
          <div key={cat}>
            <h2 className="text-lg font-semibold text-slate-300 mb-3 border-b border-slate-700/50 pb-2">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tools.filter(t => t.cat === cat).map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 hover:border-purple-500/30 transition-all group"
                >
                  <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
