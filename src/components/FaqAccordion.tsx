"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "How to download TikTok audio as MP3?",
    answer:
      'Simply paste the TikTok video URL into the input field above and click "Extract". Our tool will fetch the audio track from the video. You can then preview the audio, trim it to your desired length, and download it as an MP3 file. No registration or software installation is required — everything works directly in your browser.',
  },
  {
    question: "Is this TikTok sound downloader free to use?",
    answer:
      "Yes, this TikTok audio downloader is completely free to use. There are no hidden charges, no registration requirements, and no daily limits on the number of downloads. We support the service through advertisements, which helps us keep it accessible for everyone.",
  },
  {
    question: "Can I cut or trim the TikTok BGM online?",
    answer:
      "Absolutely. After extracting the audio, you can use our built-in audio trimmer to select a specific portion of the track. Simply drag the start and end sliders to choose your desired segment, preview it, and download only the trimmed portion. This is perfect for creating ringtones, notification sounds, or short clips.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2" role="list">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <div
              key={i}
              className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden transition-colors"
              role="listitem"
            >
              <button
                id={buttonId}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-200 hover:text-white transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
