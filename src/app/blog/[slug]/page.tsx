"use client";
import Link from "next/link";

const articles: Record<string, { title: string; content: string }> = {
  "how-to-use-json-formatter": {
    title: "How to Use a JSON Formatter: A Complete Guide",
    content: `
# How to Use a JSON Formatter: A Complete Guide

JSON (JavaScript Object Notation) is the most popular data format for web APIs and configuration files. But raw JSON can be hard to read. That's where a **JSON formatter** comes in.

## What Does a JSON Formatter Do?

A JSON formatter takes compact, minified JSON and adds proper indentation, line breaks, and syntax highlighting to make it readable. It can also:

- **Validate** JSON syntax
- **Minify** formatted JSON back to compact form
- **Sort** keys alphabetically
- **Highlight** errors with line numbers

## When Do You Need a JSON Formatter?

1. **Debugging API responses** — Raw JSON from servers is often minified
2. **Reading configuration files** — JSON configs can be huge
3. **Preparing data for sharing** — Formatted JSON is easier to review
4. **Learning JSON structure** — Formatting reveals nested relationships

## Our JSON Formatter Features

- Real-time formatting with syntax highlighting
- Configurable indentation (2 or 4 spaces)
- JSON validation with detailed error messages
- Minification to reduce file size
- Copy and download formatted output
- **100% browser-based** — your data never leaves your device

---

*Need to format JSON? [Try our JSON Formatter](/tools/json-formatter)*
    `,
  },
  "base64-encoding-explained": {
    title: "Base64 Encoding Explained: What It Is and When to Use It",
    content: `
# Base64 Encoding Explained: What It Is and When to Use It

Base64 is one of the most common encoding schemes on the internet. But what exactly is it, and why do developers use it?

## What Is Base64?

Base64 is a binary-to-text encoding scheme that represents binary data as ASCII text using 64 characters (A-Z, a-z, 0-9, +, /). It was designed to safely transmit binary data over text-only protocols.

## Common Use Cases

1. **Embedding images in HTML/CSS** — Convert images to Base64 data URIs
2. **Email attachments** — MIME encoding uses Base64
3. **JWT tokens** — The payload is Base64-encoded JSON
4. **URL-safe data transfer** — Avoiding special characters in URLs

## Base64 vs URL Encoding

| Feature | Base64 | URL Encoding |
|---------|--------|-------------|
| Output size | ~33% larger | Variable |
| Safe for URLs | No (needs variant) | Yes |
| Binary support | Yes | Limited |
| Common use | Data URIs, JWT | Query params |

## Privacy-First Base64

Our [Base64 Encoder](/tools/base64-encode) runs entirely in your browser. Your data is never sent to any server, making it safe for sensitive information.

---

*Ready to encode? [Try our Base64 Encoder](/tools/base64-encode)*
    `,
  },
  "secure-password-best-practices": {
    title: "Password Security Best Practices for 2026",
    content: `
# Password Security Best Practices for 2026

Passwords remain the most common authentication method. Here's how to keep yours secure.

## Key Recommendations

1. **Use 16+ characters** — Longer is always better
2. **Mix character types** — Upper, lower, numbers, symbols
3. **Never reuse passwords** — Each account deserves a unique password
4. **Use a password manager** — Generate and store complex passwords
5. **Enable 2FA** — Add an extra layer of security

## How Strong Is Your Password?

A good password generator creates truly random passwords using cryptographic methods. Our [Password Generator](/tools/password-generator) uses the Web Crypto API for maximum security.

## Password Security Checklist

- [ ] At least 12 characters (16+ recommended)
- [ ] Contains uppercase and lowercase letters
- [ ] Includes numbers and symbols
- [ ] Not based on dictionary words
- [ ] Unique for each account
- [ ] Changed regularly (every 6-12 months)

---

*Generate a strong password: [Password Generator](/tools/password-generator)*
    `,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-purple-400 hover:text-purple-300">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 mb-6 inline-block">← Back to Blog</Link>
      <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content.replace(/#{1,6}\s?(.*)/g, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>').replace(/\n\n/g, '<p class="text-slate-300 leading-relaxed mb-4">').replace(/---/g, '<hr class="border-slate-700 my-6"/>') }} />
    </div>
  );
}
