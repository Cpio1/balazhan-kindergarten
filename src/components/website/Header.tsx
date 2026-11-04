"use client";

import { Phone } from "lucide-react";
import { sectionIds, siteConfig, telUrl, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { LanguageSwitch } from "../shared/language-switch";
import { Logo } from "../shared/logo";
import type { ImageFile } from "../shared/media-types";
import { useActiveSection } from "../shared/use-active-section";

export function Header({ locale, logo }: { locale: Locale; logo: ImageFile | null }) {
  const t = getDictionary(locale);
  const active = useActiveSection();

  return (
    <header className="sticky top-3 z-40 hidden lg:block">
      <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1240px] rounded-full bg-milk/95 shadow-soft ring-1 ring-pine/5">
        <div className="flex h-[68px] items-center justify-between gap-4 pr-3 pl-6">
          <a href="#home" aria-label={t.common.homeLabel} className="shrink-0">
            <Logo logo={logo} />
          </a>
          <nav aria-label={t.common.navLabel}>
            <ul className="flex items-center gap-0.5">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={`block rounded-full px-3 py-2 text-[0.95rem] leading-tight font-bold whitespace-nowrap transition-colors xl:px-3.5 ${
                      active === id ? "bg-sun-soft text-pine" : "text-pine-muted hover:bg-mint-soft hover:text-pine"
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-2.5">
            <LanguageSwitch locale={locale} label={t.common.langLabel} />
            <a
              href={telUrl}
              aria-label={`${t.common.call}: ${siteConfig.phone.display}`}
              className="btn-motion hidden min-h-12 items-center gap-2 rounded-full bg-pine px-4 text-[0.95rem] font-bold whitespace-nowrap text-milk min-[1240px]:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {siteConfig.phone.display}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
