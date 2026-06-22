"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
      {submitted ? (
        <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-6 text-center">
          <p className="text-green-400 text-lg">Thank you! Your message has been received.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
            <input type="text" required className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input type="email" required className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
            <textarea required rows={5} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 resize-none" />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
            Send Message
          </button>
        </form>
      )}
      <div className="mt-8 text-slate-400 text-sm">
        <p>Email: contact@fasttikmp3.com</p>
      </div>
    </div>
  );
}
