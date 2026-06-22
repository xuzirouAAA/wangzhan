"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const generate = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[arr[i] % chars.length];
    }
    setPassword(result);

    // Calculate strength
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUpper && includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) setStrength("Weak");
    else if (score <= 4) setStrength("Moderate");
    else setStrength("Strong");
  };

  return (
    <ToolTemplate
      title="Password Generator Online"
      description="Generate cryptographically secure passwords with configurable length and character sets. Free, privacy-first, runs in your browser."
      keywords={["password generator", "strong password", "secure password", "random password"]}
      toolName="Password Generator"
      faqs={[
        { q: "How long should a password be?", a: "We recommend at least 12 characters for most accounts, and 16+ characters for sensitive accounts like banking or email." },
        { q: "Should I use symbols in my password?", a: "Yes! Including symbols, numbers, uppercase and lowercase letters makes passwords exponentially harder to crack." },
        { q: "Is this password generator secure?", a: "Yes! It uses the Web Crypto API (crypto.getRandomValues) which is cryptographically secure and runs entirely in your browser." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Length: <span className="text-purple-400">{length}</span></label>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Uppercase (A-Z)", checked: includeUpper, fn: setIncludeUpper },
            { label: "Lowercase (a-z)", checked: includeLower, fn: setIncludeLower },
            { label: "Numbers (0-9)", checked: includeNumbers, fn: setIncludeNumbers },
            { label: "Symbols (!@#$)", checked: includeSymbols, fn: setIncludeSymbols },
          ].map(({ label, checked, fn }) => (
            <label key={label} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => fn(!checked)}
                className="accent-purple-500 w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>
        <button
          onClick={generate}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all"
        >
          Generate Password
        </button>
        {password && (
          <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-lg text-green-400 break-all">{password}</p>
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="ml-3 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 rounded transition-all"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Strength:</span>
              <span className={`text-xs font-medium ${strength === "Strong" ? "text-green-400" : strength === "Moderate" ? "text-yellow-400" : "text-red-400"}`}>
                {strength}
              </span>
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
