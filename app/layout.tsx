import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://magicprompt.agency"), // <-- поставь свой домен
  title: {
    default: "MAGIC PROMPT — Продающий контент за 60 минут",
    template: "%s · MAGIC PROMPT",
  },
  description:
    "Результат за 60 минут за 19.99$ — управляемые AI-агенты и промпт-инженер MAGIC PROMPT создают продающие тексты, визуалы и секции лендинга прямо при вас.",
  keywords: [
    "AI-агенты",
    "продающий контент",
    "баннеры",
    "A/B-тесты",
    "лендинг",
    "создание креативов",
    "маркетинг",
    "быстрый результат",
    "19.99$",
    "60 минут",
  ],
  alternates: {
    canonical: "/",
    languages: {
      ru: "/",
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    type: "website",
    url: "https://magicprompt.agency/",
    siteName: "MAGIC PROMPT",
    title: "19.99$ · 60 минут · результат сегодня",
    description:
      "Передовые технологии и революционные AI-агенты. Получите готовые тексты, визуалы и блоки лендинга за 60 минут.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MAGIC PROMPT — 19.99$ за 60 минут",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_handle", // опционально
    title: "19.99$ · 60 минут · результат сегодня",
    description:
      "AI-агенты + промпт-инженер MAGIC PROMPT: тексты, визуалы и секции лендинга при вас за 60 минут.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "marketing",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "MAGIC PROMPT",
  creator: "MAGIC PROMPT",
  publisher: "MAGIC PROMPT",
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://magicprompt.agency/#org",
        name: "MAGIC PROMPT",
        url: "https://magicprompt.agency/",
        logo: "https://magicprompt.agency/logo.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://magicprompt.agency/#website",
        url: "https://magicprompt.agency/",
        name: "MAGIC PROMPT",
        publisher: { "@id": "https://magicprompt.agency/#org" },
      },
      {
        "@type": "WebPage",
        "@id": "https://magicprompt.agency/#webpage",
        url: "https://magicprompt.agency/",
        name: "19.99$ · 60 минут · результат сегодня",
        isPartOf: { "@id": "https://magicprompt.agency/#website" },
        about: { "@id": "https://magicprompt.agency/#service" },
        inLanguage: "ru",
      },
      {
        "@type": "Service",
        "@id": "https://magicprompt.agency/#service",
        name: "LIVE-сессия MAGIC PROMPT: продающий контент за 60 минут",
        provider: { "@id": "https://magicprompt.agency/#org" },
        serviceType: "Маркетинг/Креативы с AI-агентами",
        areaServed: "Worldwide",
        brand: { "@id": "https://magicprompt.agency/#org" },
        offers: {
          "@type": "Offer",
          price: "19.99",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://magicprompt.agency/#book",
          eligibleRegion: "Worldwide",
        },
      },
    ],
  };

  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
