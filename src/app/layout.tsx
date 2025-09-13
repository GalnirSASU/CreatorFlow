import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creascope.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CréaScope — Planifiez vos vidéos, centralisez vos stats",
    template: "%s · CréaScope",
  },
  description:
    "La boîte à outils des micro‑créateurs (1k–50k). Centralisez vos statistiques TikTok/Instagram/YouTube et planifiez vos vidéos simplement, à petit prix.",
  keywords: [
    "CréaScope",
    "micro‑créateurs",
    "TikTok",
    "Instagram",
    "YouTube",
    "planification vidéos",
    "planning contenu",
    "analytics créateur",
    "stats créateurs",
    "calendrier éditorial",
  ],
  authors: [{ name: "CréaScope" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "CréaScope — Planifiez vos vidéos, centralisez vos stats",
    description:
      "Centralisez vos stats TikTok/Instagram/YouTube et planifiez vos vidéos simplement. Pensé pour les micro‑créateurs.",
    siteName: "CréaScope",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CréaScope — Planifiez vos vidéos, centralisez vos stats",
    description:
      "La boîte à outils des micro‑créateurs. Centralisez les stats et planifiez facilement.",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="canonical" href={siteUrl} />
        {/* JSON‑LD: SoftwareApplication + Organization */}
        <Script id="ld-json-app" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CréaScope",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
              description: "Bêta — tarif de lancement à venir",
            },
            description:
              "Centralisez vos stats TikTok/Instagram/YouTube et planifiez vos vidéos simplement, à petit prix.",
            url: siteUrl,
          })}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
