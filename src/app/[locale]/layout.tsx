import type { Metadata, Viewport } from "next";
import { Lora, Nunito } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { locales, localePath, siteConfig, siteUrl, type Locale } from "@/components/shared/config";
import { getDictionary } from "@/components/shared/i18n";
import { MotionProvider } from "@/components/shared/motion";
import "../globals.css";

// Подмножество cyrillic-ext содержит казахские буквы ә ғ қ ң ө ұ ү һ.
const lora = Lora({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-lora", display: "swap" });
const nunito = Nunito({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-nunito", display: "swap" });

type Params = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const viewport: Viewport = { themeColor: "#FFFDF7" };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(siteUrl),
    title: t.title,
    description: t.description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: localePath(locale),
      languages: { kk: "/", ru: "/ru", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t.title,
      description: t.description,
      url: localePath(locale),
      locale: locale === "kk" ? "kk_KZ" : "ru_RU",
      alternateLocale: locale === "kk" ? "ru_RU" : "kk_KZ",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: ["/og.png"] },
  };
}

export default async function LocaleLayout({ children, params }: Params & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${lora.variable} ${nunito.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
