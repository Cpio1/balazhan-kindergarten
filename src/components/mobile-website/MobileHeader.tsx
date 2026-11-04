"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sectionIds, siteConfig, telUrl, whatsappUrl, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { Flower, Star } from "../shared/illustrations";
import { LanguageSwitch } from "../shared/language-switch";
import { Logo } from "../shared/logo";
import type { ImageFile } from "../shared/media-types";
import { useActiveSection } from "../shared/use-active-section";

export function MobileHeader({ locale, logo }: { locale: Locale; logo: ImageFile | null }) {
  const t = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("a,button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-milk/97 shadow-[0_6px_20px_-14px_rgb(36_74_64/0.4)] lg:hidden">
        <div className="flex h-16 items-center justify-between gap-2 pr-3 pl-4">
          <a href="#home" aria-label={t.common.homeLabel} className="min-w-0">
            <Logo logo={logo} />
          </a>
          <div className="flex shrink-0 items-center gap-1.5">
            <LanguageSwitch locale={locale} label={t.common.langLabel} />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.common.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-12 w-12 place-items-center rounded-full bg-sun"
            >
              <Menu aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.common.menuTitle}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-mint-soft lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <div aria-hidden className="blob-c pointer-events-none absolute -right-24 -bottom-20 h-72 w-72 bg-sun/60" />
            <Flower className="float-a pointer-events-none absolute right-6 bottom-44 h-14 w-14" />
            <Star className="float-b pointer-events-none absolute top-24 right-8 h-9 w-9" />

            <div className="relative flex h-16 shrink-0 items-center justify-between pr-3 pl-4">
              <a href="#home" onClick={close} aria-label={t.common.homeLabel}>
                <Logo logo={logo} />
              </a>
              <button
                type="button"
                onClick={close}
                aria-label={t.common.menuClose}
                className="grid h-12 w-12 place-items-center rounded-full bg-pine text-milk"
              >
                <X aria-hidden />
              </button>
            </div>

            <nav aria-label={t.common.navLabel} className="relative flex-1 px-5 pt-2">
              <ul>
                {sectionIds.map((id, i) => (
                  <m.li
                    key={id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={close}
                      aria-current={active === id ? "true" : undefined}
                      className={`flex min-h-13 w-fit items-center rounded-full px-4 font-display text-[1.6rem] font-bold ${
                        active === id ? "bg-sun" : ""
                      }`}
                    >
                      {t.nav[id]}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>

            <div className="relative space-y-3 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <LanguageSwitch locale={locale} label={t.common.langLabel} onSwitch={close} large />
              <div className="grid grid-cols-2 gap-2.5">
                <a href={telUrl} className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-pine px-2 text-center text-[0.98rem] font-bold whitespace-nowrap text-milk">
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  {t.common.call}
                </a>
                <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer" className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-milk px-3 font-bold shadow-soft">
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                  WhatsApp
                </a>
              </div>
              <p className="sr-only">{siteConfig.phone.display}</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
