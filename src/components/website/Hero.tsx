import { MessageCircle, MessageCircleHeart } from "lucide-react";
import { whatsappUrl, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { HeroScene, Kite, PaperPlane, Squiggle, Star, Sun, Wave } from "../shared/illustrations";
import { mediaAspect, MediaSlot } from "../shared/media-slot";
import type { ImageFile } from "../shared/media-types";
import { ButtonLink } from "../shared/ui";

const statStyles = ["bg-sun leaf-a", "bg-peach leaf-b", "bg-mint leaf-a"];

export function Hero({ locale, photo }: { locale: Locale; photo: ImageFile | null }) {
  const { hero: t, common } = getDictionary(locale);
  return (
    <div className="relative -mt-[80px] overflow-clip bg-linear-to-b from-sky to-sky-soft pt-[80px]">
      <div aria-hidden className="blob-c absolute -top-40 -right-32 h-[620px] w-[620px] bg-milk/40" />
      <div aria-hidden className="blob-b absolute -bottom-24 -left-28 h-[320px] w-[320px] bg-milk/50" />
      <Kite className="sway absolute top-[18%] left-[2%] hidden h-32 w-24 xl:block" />
      <PaperPlane className="float-b absolute top-[22%] left-[40%] h-12 w-14" />

      <div className="shell relative grid min-h-[min(calc(100svh-80px),760px)] grid-cols-[1fr_1.1fr] items-center gap-14 pt-12 pb-16">
        <div className="relative z-10">
          <Star className="float-a absolute -top-9 left-[52%] h-9 w-9" />
          <h1 className="rise text-[clamp(2.6rem,4.3vw,3.9rem)]">
            <span className="relative inline-block whitespace-nowrap">
              {t.titleLead}
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-peach" />
            </span>{" "}
            {t.titleRest}
          </h1>
          <p className="rise mt-6 max-w-[33rem] text-[1.2rem] leading-relaxed text-pine-muted [--d:.1s]">{t.subtitle}</p>
          <div className="rise mt-8 flex flex-wrap gap-3.5 [--d:.2s]">
            <ButtonLink href="#contacts">
              <MessageCircleHeart className="h-5 w-5" aria-hidden />
              {t.contact}
            </ButtonLink>
            <ButtonLink href={whatsappUrl(locale)} external tone="whatsapp">
              <MessageCircle className="h-5 w-5" aria-hidden />
              {common.whatsapp}
            </ButtonLink>
          </div>
        </div>

        <div className="bloom relative mx-auto w-full max-w-[min(100%,84svh,600px)]">
          <Sun className="float-a absolute -top-14 -right-8 z-10 h-24 w-24" />

          <div className="relative">
            <div aria-hidden className="absolute -inset-3 rotate-2 rounded-[2.75rem] bg-sun" />
            {/* Рамка повторяет пропорции фото, поэтому лица детей не обрезаются */}
            <div
              className="relative overflow-hidden rounded-[2.25rem] bg-milk shadow-lift ring-8 ring-milk"
              style={{ aspectRatio: mediaAspect(photo) }}
            >
              <MediaSlot
                media={photo}
                alt={t.photoAlt}
                sizes="(min-width: 1024px) 600px, 100vw"
                preload
                fallback={<HeroScene role="img" aria-label={t.photoAlt} className="absolute inset-0 h-full w-full" />}
              />
            </div>
          </div>

          <ul className="relative mt-8 grid grid-cols-3 gap-3">
            {t.stats.map((stat, i) => (
              <li
                key={stat.label}
                style={{ "--d": `${0.35 + i * 0.12}s` } as React.CSSProperties}
                className={`rise flex items-center justify-center gap-2 px-3 py-2.5 shadow-soft ${statStyles[i]}`}
              >
                <span className="font-display text-[1.75rem] leading-none font-bold">{stat.value}</span>
                <span className="text-sm leading-tight font-bold">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Wave fill="var(--color-sun-soft)" variant={0} className="relative" />
    </div>
  );
}
