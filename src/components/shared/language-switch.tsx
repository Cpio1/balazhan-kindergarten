"use client";

import Link from "next/link";
import { localePath, locales, type Locale } from "./config";

const labels: Record<Locale, { short: string; full: string }> = {
  kk: { short: "ҚАЗ", full: "Қазақша" },
  ru: { short: "РУС", full: "Русский" },
};

export function LanguageSwitch({
  locale,
  label,
  onSwitch,
  large,
}: {
  locale: Locale;
  label: string;
  onSwitch?: () => void;
  large?: boolean;
}) {
  return (
    <div role="group" aria-label={label} className={`inline-flex rounded-full p-1 ${large ? "bg-milk shadow-soft" : "bg-mint-soft"}`}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={localePath(l)}
            scroll={false}
            replace
            hrefLang={l}
            lang={l}
            aria-label={labels[l].full}
            aria-current={active ? "true" : undefined}
            onClick={onSwitch}
            className={`inline-flex items-center justify-center rounded-full font-extrabold transition-colors ${
              large ? "min-h-12 min-w-20 px-4 text-base" : "min-h-10 min-w-12 px-3 text-sm"
            } ${active ? "bg-pine text-milk" : "text-pine hover:bg-mint"}`}
          >
            {labels[l].short}
          </Link>
        );
      })}
    </div>
  );
}
