export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-8">Last updated: June 22, 2026</p>
      <div className="prose prose-invert">
        <h2 className="text-xl font-semibold text-white mb-3">Data Collection</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          <strong>DevTools does not collect, store, or transmit any personal data.</strong>
          All tools run entirely in your browser. When you use our tools, your input data
          never leaves your device. We do not use cookies for tracking, nor do we employ
          analytics that collect personal information.
        </p>

        <h2 className="text-xl font-semibold text-white mb-3">Google Analytics</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          We use Google Analytics (GA4) to understand aggregate usage patterns. This service
          may collect anonymous usage data such as page views and session duration. Google
          Analytics does not collect personally identifiable information. You can opt out of
          Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-purple-400">Google Analytics Opt-out Browser Add-on</a>.
        </p>

        <h2 className="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          Some tools may use third-party APIs (e.g., QR code generation uses a public QR API).
          These services have their own privacy policies. We recommend reviewing them before use.
        </p>

        <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          We do not use cookies for tracking or advertising purposes. Session storage may be
          used locally in your browser for tool functionality, but this data never leaves your device.
        </p>

        <h2 className="text-xl font-semibold text-white mb-3">Changes</h2>
        <p className="text-slate-300 leading-relaxed">
          We may update this policy from time to time. Changes will be reflected on this page.
        </p>
      </div>
    </div>
  );
}
