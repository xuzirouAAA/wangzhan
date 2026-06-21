import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TikTok Video & MP3 Downloader — Download TikTok Videos & Audio Free",
  description:
    "Download TikTok videos and audio as MP3/MP4 online for free. Paste any TikTok video URL to extract, preview, and download the original video or audio track. No registration required.",
  keywords: [
    "tiktok video downloader",
    "tiktok mp3 downloader",
    "download tiktok video",
    "download tiktok audio",
    "tiktok video without watermark",
    "tiktok sound downloader",
    "tiktok music downloader",
    "tiktok to mp3",
    "tiktok to mp4",
    "tiktok audio extractor",
    "free tiktok downloader",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "TikTok Video & MP3 Downloader — Download TikTok Videos & Audio Free",
    description:
      "Paste any TikTok video URL to extract, preview, and download the original video or audio track. Free & no registration.",
    type: "website",
    locale: "en_US",
    siteName: "TikTok Downloader",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Downloader",
    description:
      "Download TikTok videos and audio — paste, preview & download. Free online tool.",
  },
  verification: {
    // Replace with your actual Google AdSense / Search Console ID
    // google: "YOUR_VERIFICATION_CODE",
  },
  icons: {
    icon: "/favicon.ico?favicon.0x3dzn~oxb6tn.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* ====== FAQPage Structured Data for SEO ====== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How to download TikTok video or audio?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Simply paste the TikTok video URL into the input field above and click 'Extract'. Once processed, switch between the Audio and Video tabs to preview and download. Both MP3 audio and MP4 video downloads are available. No registration or software installation is required.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I download TikTok videos without a watermark?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! When available, the Video tab shows a 'No Watermark' option alongside the standard version. Simply choose your preferred quality and download the MP4 file directly to your device.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is this TikTok downloader free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, this TikTok downloader is completely free to use. There are no hidden charges, no registration requirements, and no daily limits on the number of downloads. We support the service through advertisements.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I cut or trim the TikTok BGM online?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. After extracting the audio, you can use our built-in audio trimmer to select a specific portion of the track. Simply drag the start and end sliders to choose your desired segment, preview it, and download only the trimmed portion as an MP3 file.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-[family-name:var(--font-geist-sans)]">
        {children}
      </body>
    </html>
  );
}
