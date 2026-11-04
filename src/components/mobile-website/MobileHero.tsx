import { MessageCircle } from "lucide-react";
import { whatsappUrl, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { HeroScene, Squiggle, Sun, Wave } from "../shared/illustrations";
import { mediaAspect, MediaSlot } from "../shared/media-slot";
import type { ImageFile } from "../shared/media-types";
import { ButtonLink } from "../shared/ui";

const chipTones = ["bg-sun", "bg-peach", "bg-mint"];

export function MobileHero({ locale, photo }: { locale: Locale; photo: ImageFile | null }) {
  const { hero: t, common } = getDictionary(locale);
  return (
    <div className="relative overflow-clip bg-linear-to-b from-sky to-sky-soft">
      <div className="shell-m relative pt-6 pb-9">
        {/* Фото во всю ширину экрана и в своих пропорциях, иначе, чем на компьютере */}
        <div className="bloom relative mt-2">
          <div aria-hidden className="absolute -inset-1.5 rotate-1 rounded-[2rem] bg-sun" />
          <div
            className="relative overflow-hidden rounded-[1.75rem] bg-milk shadow-lift ring-4 ring-milk"
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
          <Sun className="float-a absolute -top-7 -right-3 h-14 w-14" />
        </div>

        <h1 className="rise mt-7 text-[clamp(2rem,8.6vw,3rem)] [--d:.05s]">
          <span className="relative inline-block whitespace-nowrap">
            {t.titleLead}
            <Squiggle className="absolute -bottom-1.5 left-0 h-2.5 w-full text-peach" />
          </span>{" "}
          {t.titleRest}
        </h1>
        <p className="rise mt-4 text-[1.08rem] leading-relaxed text-pine-muted [--d:.12s]">{t.subtitle}</p>

        <ul className="rise mt-5 grid grid-cols-3 gap-2 [--d:.18s]">
          {t.stats.map((stat, i) => (
            <li key={stat.label} className={`rounded-[1.4rem_1rem_1.4rem_1rem] px-2.5 py-2.5 ${chipTones[i]}`}>
              <span className="block font-display text-[1.5rem] leading-none font-bold">{stat.value}</span>
              <span className="mt-1 block text-[0.82rem] leading-tight font-bold">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="rise mt-6 grid gap-2.5 [--d:.24s]">
          <ButtonLink href="#contacts" className="w-full">{t.contact}</ButtonLink>
          <ButtonLink href={whatsappUrl(locale)} external tone="whatsapp" className="w-full">
            <MessageCircle className="h-5 w-5" aria-hidden />
            {common.whatsapp}
          </ButtonLink>
        </div>
      </div>
      <Wave fill="var(--color-sun-soft)" variant={0} />
    </div>
  );
}
