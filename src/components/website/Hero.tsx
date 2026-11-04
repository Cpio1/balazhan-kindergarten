import { ArrowDown, MessageCircleHeart } from "lucide-react";
import { siteConfig, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { Cloud, Flower, HeroScene, Kite, PaperPlane, Squiggle, Star, Sun, Wave } from "../shared/illustrations";
import { MediaSlot } from "../shared/media-slot";
import type { ImageFile } from "../shared/media-types";
import { ButtonLink } from "../shared/ui";

const statStyles = [
  "bg-sun leaf-a -left-4 top-[8%]",
  "bg-peach blob-b -right-3 top-[34%] ",
  "bg-mint pebble left-[6%] -bottom-1",
];

export function Hero({ locale, photo }: { locale: Locale; photo: ImageFile | null }) {
  const t = getDictionary(locale).hero;
  return (
    <div className="relative overflow-clip">
      <div aria-hidden className="blob-c absolute -top-40 -right-32 h-[620px] w-[620px] bg-mint-soft" />
      <div aria-hidden className="blob-b absolute -bottom-24 -left-28 h-[320px] w-[320px] bg-sun-soft" />

      <div className="shell relative grid min-h-[min(calc(100svh-80px),760px)] grid-cols-[1.02fr_1fr] items-center gap-10 pt-6 pb-16">
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
            <ButtonLink href="#about" tone="secondary">
              {t.about}
              <ArrowDown className="h-4.5 w-4.5" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <div className="bloom relative mx-auto aspect-square w-full max-w-[min(100%,68svh,540px)]">
          <div aria-hidden className="blob-b absolute -inset-5 rotate-6 bg-sun/70" />
          <div className="blob-a relative h-full w-full overflow-hidden shadow-lift">
            <MediaSlot
              media={photo}
              alt={t.photoAlt}
              sizes="(min-width: 1024px) 540px, 100vw"
              priority
              focus={siteConfig.heroPhotoFocus}
              fallback={<HeroScene role="img" aria-label={t.photoAlt} className="absolute inset-0 h-full w-full" />}
            />
          </div>

          <Sun className="float-a absolute -top-9 right-[12%] h-24 w-24" />
          <Cloud className="float-b absolute top-[3%] left-[10%] h-12 w-20" />
          <Kite className="sway absolute -right-11 -bottom-3 h-32 w-24" />
          <PaperPlane className="float-b absolute -bottom-7 left-[44%] h-12 w-14" />
          <Flower className="float-a absolute bottom-[23%] -left-9 h-14 w-14" />

          <ul className="contents">
            {t.stats.map((stat, i) => (
              <li
                key={stat.label}
                style={{ "--d": `${0.35 + i * 0.12}s` } as React.CSSProperties}
                className={`rise absolute z-10 flex items-center gap-2 px-4 py-2.5 shadow-soft ${statStyles[i]}`}
              >
                <span className="font-display text-[1.75rem] leading-none font-semibold">{stat.value}</span>
                <span className="max-w-[6.5rem] text-sm leading-tight font-bold">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Wave fill="var(--color-sun-soft)" variant={0} className="relative" />
    </div>
  );
}
