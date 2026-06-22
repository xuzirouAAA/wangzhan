import Link from "next/link";

const tools = [
  {
    category: "Encode / Decode",
    items: [
      { slug: "base64-encode", name: "Base64 Encode", desc: "Encode text to Base64", icon: "🔐" },
      { slug: "base64-decode", name: "Base64 Decode", desc: "Decode Base64 to text", icon: "🔓" },
      { slug: "url-encode", name: "URL Encode", desc: "Encode string for URL", icon: "🔗" },
      { slug: "url-decode", name: "URL Decode", desc: "Decode URL-encoded string", icon: "🔗" },
      { slug: "html-encode", name: "HTML Encode", desc: "Escape HTML entities", icon: "📝" },
      { slug: "jwt-decode", name: "JWT Decode", desc: "Decode JWT tokens", icon: "🎫" },
    ],
  },
  {
    category: "Formatters",
    items: [
      { slug: "json-formatter", name: "JSON Formatter", desc: "Format and validate JSON", icon: "📋" },
      { slug: "json-minify", name: "JSON Minify", desc: "Minify JSON data", icon: "📦" },
      { slug: "css-minifier", name: "CSS Minifier", desc: "Minify CSS code", icon: "🎨" },
      { slug: "sql-formatter", name: "SQL Formatter", desc: "Format SQL queries", icon: "🗄️" },
    ],
  },
  {
    category: "Generators",
    items: [
      { slug: "uuid-generator", name: "UUID Generator", desc: "Generate random UUIDs", icon: "🆔" },
      { slug: "password-generator", name: "Password Generator", desc: "Generate strong passwords", icon: "🔑" },
      { slug: "hash-generator", name: "Hash Generator", desc: "Generate MD5/SHA hashes", icon: "#️⃣" },
      { slug: "qr-code-generator", name: "QR Code Generator", desc: "Generate QR codes", icon: "📱" },
    ],
  },
  {
    category: "Converters",
    items: [
      { slug: "timestamp-converter", name: "Timestamp Converter", desc: "Convert unix timestamps", icon: "⏱️" },
      { slug: "number-base-converter", name: "Number Base Converter", desc: "Convert between bases", icon: "🔢" },
      { slug: "color-converter", name: "Color Converter", desc: "Convert HEX/RGB/HSL", icon: "🎨" },
      { slug: "case-converter", name: "Case Converter", desc: "Convert text case", icon: "🔤" },
    ],
  },
  {
    category: "Text & Network",
    items: [
      { slug: "word-counter", name: "Word Counter", desc: "Count words, chars, lines", icon: "📊" },
      { slug: "ip-lookup", name: "IP Lookup", desc: "Look up your IP address", icon: "🌐" },
      { slug: "regex-tester", name: "Regex Tester", desc: "Test regular expressions", icon: "🔍" },
      { slug: "diff-checker", name: "Diff Checker", desc: "Compare text differences", icon: "📄" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Free Online Developer Tools
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          20+ tools for encoding, formatting, generating, and converting.
          All run in your browser — nothing is sent to any server.
          Privacy-first, no signup required.
        </p>
      </div>

      {/* Tools Grid by Category */}
      <div className="space-y-10">
        {tools.map((section) => (
          <div key={section.category}>
            <h2 className="text-xl font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
              {section.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group p-4 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-700/50 hover:border-purple-500/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-400 mt-0.5">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "🔒 Privacy First", desc: "All tools run 100% in your browser. Your data never leaves your device." },
          { title: "⚡ Lightning Fast", desc: "No server calls, no loading screens. Instant results every time." },
          { title: "🌍 Multi-Language", desc: "Available in English, 中文, 日本語, and 한국어." },
        ].map((feat) => (
          <div key={feat.title} className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/30">
            <h3 className="font-semibold text-white mb-2">{feat.title}</h3>
            <p className="text-sm text-slate-400">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-12 prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-slate-200">Why Use DevTools?</h2>
        <p className="text-slate-400 leading-relaxed">
          DevTools is a collection of free online developer utilities that run entirely in your browser.
          Whether you need to format JSON, encode Base64, generate UUIDs, or test regular expressions,
          all tools are available instantly with no signup, no downloads, and no data sent to servers.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Unlike many online tools that require uploading your data to a server, DevTools processes everything
          locally on your device. This means your sensitive data — API keys, tokens, personal information —
          never leaves your browser. Perfect for developers, DevOps engineers, and anyone who values privacy.
        </p>
      </div>
    </div>
  );
}
