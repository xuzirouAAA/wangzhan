import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevTools - Free Online Developer Tools",
  description: "20+ free online developer tools for encoding, formatting, generating, and converting. All run in your browser — nothing is sent to any server. Privacy-first, no signup required.",
  keywords: [
    "developer tools", "online tools", "json formatter", "base64 encoder",
    "uuid generator", "jwt decoder", "url encoder", "hash generator",
    "password generator", "color converter", "regex tester", "diff checker",
    "free tools", "browser tools", "privacy tools"
  ],
  authors: [{ name: "DevTools" }],
  openGraph: {
    title: "DevTools - Free Online Developer Tools",
    description: "20+ free online developer tools. All run in your browser.",
    type: "website",
    locale: "en_US",
    siteName: "DevTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools - Free Online Developer Tools",
    description: "20+ free online developer tools. All run in your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "6NKN570X46",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="256x256" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevTools",
              url: "https://fasttikmp3.com",
              description: "Free Online Developer Tools",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://fasttikmp3.com/tools/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <nav className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                DevTools
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">Free Online Developer Tools</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/tools" className="text-sm text-slate-400 hover:text-white transition">
                All Tools
              </Link>
              <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-slate-400 hover:text-white transition">
                About
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-700/50 bg-slate-900/80 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
            <p>DevTools — Free online developer tools. All tools run in your browser. No data is sent to servers.</p>
            <div className="flex justify-center gap-4 mt-3">
              <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
              <Link href="/about" className="hover:text-slate-300">About</Link>
              <Link href="/contact" className="hover:text-slate-300">Contact</Link>
              <Link href="/blog" className="hover:text-slate-300">Blog</Link>
            </div>
            <p className="mt-3">&copy; {new Date().getFullYear()} DevTools. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
