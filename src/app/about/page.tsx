import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">About DevTools</h1>
      <div className="prose prose-invert">
        <p className="text-slate-300 leading-relaxed">
          DevTools is a collection of free online developer utilities designed with privacy and speed as first priorities.
          Every tool runs 100% in your browser — no data is ever sent to our servers.
        </p>
        <p className="text-slate-300 leading-relaxed">
          We believe developers deserve tools that respect their privacy while delivering instant results.
          Whether you&apos;re formatting JSON, encoding Base64, or generating passwords,
          your data stays on your device.
        </p>
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Our Tools</h2>
        <ul className="text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li>JSON Formatter</li>
          <li>Base64 Encode/Decode</li>
          <li>UUID Generator</li>
          <li>Password Generator</li>
          <li>JWT Decoder</li>
          <li>URL Encoder/Decoder</li>
          <li>Hash Generator</li>
          <li>QR Code Generator</li>
          <li>Color Converter</li>
          <li>Timestamp Converter</li>
          <li>Regex Tester</li>
          <li>Word Counter</li>
          <li>Difference Checker</li>
          <li>CSS Minifier</li>
        </ul>
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Contact</h2>
        <p className="text-slate-400">
          Have questions or suggestions? <Link href="/contact" className="text-purple-400 hover:text-purple-300">Reach out to us</Link>.
        </p>
      </div>
    </div>
  );
}
