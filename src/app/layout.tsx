import Script from 'next/script';
import GA4 from "./components/GA4";
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
  title: "TikTok MP3 Downloader — Download TikTok Audio as MP3 Online Free",
  description:
    "Download TikTok audio as MP3 files online for free. Paste any TikTok video URL to extract, preview, trim, and download the original sound. No registration required.",
  keywords: [
    "tiktok mp3 downloader",
    "download tiktok audio",
    "tiktok sound downloader",
    "tiktok music downloader",
    "tiktok to mp3",
    "tiktok audio extractor",
    "free tiktok downloader",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "TikTok MP3 Downloader — Download TikTok Audio as MP3 Online Free",
    description:
      "Paste any TikTok video URL to extract, preview, trim, and download the original audio track as MP3. Free & no registration.",
    type: "website",
    locale: "en_US",
    siteName: "TikTok MP3 Downloader",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok MP3 Downloader",
    description:
      "Download TikTok audio as MP3 — paste, preview, trim & download. Free online tool.",
  },
  verification: {
    // Replace with your actual Google AdSense / Search Console ID
    // google: "YOUR_VERIFICATION_CODE",
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
        {/* ====== Google AdSense Script ====== */}
        {/* Uncomment and add your AdSense client ID after approval */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID"
          crossOrigin="anonymous"
        /> */}

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
                  name: "How to download TikTok audio as MP3?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Simply paste the TikTok video URL into the input field above and click 'Extract'. Our tool will fetch the audio track from the video. You can then preview the audio, trim it to your desired length, and download it as an MP3 file. No registration or software installation is required — everything works directly in your browser.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is this TikTok sound downloader free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, this TikTok audio downloader is completely free to use. There are no hidden charges, no registration requirements, and no daily limits on the number of downloads. We support the service through advertisements.",
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
      <GA4 />
      <body className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-[family-name:var(--font-geist-sans)]">
        {/* ====== Google Analytics (gtag.js) ====== */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6NKN570X46"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6NKN570X46');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
