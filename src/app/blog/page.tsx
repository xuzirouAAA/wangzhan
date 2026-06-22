import Link from "next/link";

const posts = [
  {
    slug: "how-to-use-json-formatter",
    title: "How to Use a JSON Formatter: A Complete Guide",
    excerpt: "Learn how to format, validate, and minify JSON data with our free online tool. Covers best practices for developers.",
    date: "2026-06-22",
    category: "Tutorial",
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained: What It Is and When to Use It",
    excerpt: "Understanding Base64 encoding, its use cases in web development, email, and data transmission.",
    date: "2026-06-22",
    category: "Education",
  },
  {
    slug: "secure-password-best-practices",
    title: "Password Security Best Practices for 2026",
    excerpt: "How to create strong passwords, why length matters, and the role of password generators in cybersecurity.",
    date: "2026-06-22",
    category: "Security",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">DevTools Blog</h1>
      <p className="text-slate-400 mb-8">Tutorials, guides, and tips for developers.</p>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block p-6 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/40 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full">{post.category}</span>
              <span className="text-xs text-slate-500">{post.date}</span>
            </div>
            <h2 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">{post.title}</h2>
            <p className="text-sm text-slate-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
