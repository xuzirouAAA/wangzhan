interface AdPlaceholderProps {
  type: "banner" | "skyscraper" | "rectangle";
  className?: string;
}

const adConfig = {
  banner: { w: 728, h: 90, label: "Banner" },
  skyscraper: { w: 160, h: 600, label: "Skyscraper" },
  rectangle: { w: 300, h: 250, label: "Rectangle" },
} as const;

export default function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
  const { w, h, label } = adConfig[type];

  return (
    /* ====== ADSENSE AD SLOT (${type}) ====== */
    <div
      className={`bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center ${className}`}
      style={{ width: w, height: h, maxWidth: "100%" }}
      data-ad-slot={`ad-${type}`}
    >
      <div className="text-center select-none">
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
          Advertisement
        </div>
        <div className="text-[9px] text-slate-600 mt-0.5 font-mono">
          {w} &times; {h}
        </div>
      </div>
    </div>
    /* ====== END ADSENSE SLOT ====== */
  );
}
