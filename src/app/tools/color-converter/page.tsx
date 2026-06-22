"use client";
import ToolTemplate from "@/components/ToolTemplate";
import { useState } from "react";

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#7c3aed");
  const [rgb, setRgb] = useState({ r: 124, g: 58, b: 237 });
  const [hsl, setHsl] = useState({ h: 262, s: 83, l: 58 });
  const [error, setError] = useState("");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    const rgbVal = hexToRgb(val);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
      setError("");
    } else {
      setError("Invalid HEX color");
    }
  };

  return (
    <ToolTemplate
      title="Color Converter Online"
      description="Convert colors between HEX, RGB, and HSL formats with a live color preview. Free, instant conversion."
      keywords={["color converter", "hex to rgb", "rgb to hex", "color picker", "hsl converter"]}
      toolName="Color Converter"
      faqs={[
        { q: "What is HEX color?", a: "HEX colors use a 6-digit hexadecimal code (#RRGGBB) to represent colors. Each pair represents Red, Green, and Blue values from 00 to FF." },
        { q: "What's the difference between RGB and HSL?", a: "RGB uses Red, Green, Blue values (0-255). HSL uses Hue (0-360°), Saturation (0-100%), and Lightness (0-100%) — more intuitive for humans." },
      ]}
    >
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-xl border-2 border-slate-600 shadow-lg" style={{ backgroundColor: hex }}></div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-1">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">RGB</label>
            <p className="text-sm text-green-400 font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">HSL</label>
            <p className="text-sm text-blue-400 font-mono">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
          </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </ToolTemplate>
  );
}
