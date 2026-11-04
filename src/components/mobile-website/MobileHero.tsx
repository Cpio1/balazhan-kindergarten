import { siteConfig, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { Flower, HeroScene, Kite, Squiggle, Star, Sun, Wave } from "../shared/illustrations";
import { MediaSlot } from "../shared/media-slot";
import type { ImageFile } from "../shared/media-types";
import { ButtonLink } from "../shared/ui";

const chipTones = ["bg-sun", "bg-peach", "bg-mint"];

export function MobileHero({ locale, photo }: { locale: Locale; photo: ImageFile | null }) {
  const t = getDictionary(locale).hero;
  return (
    <div className="relative overflow-clip">
      <div className="shell-m relative pt-4 pb-9">
        {/* Фото заходит за правый край экрана — иначе, чем на компьютере */}
        <div className="bloom relative -mr-14 ml-8 aspect-[1/0.68]">
          <div aria-hidden className="blob-b absolute -inset-3 rotate-3 bg-sun/70" />
          <div className="blob-c relative h-full w-full overflow-hidden shadow-lift">
            <MediaSlot
              media={photo}
              alt={t.photoAlt}
              sizes="(min-width: 1024px) 540px, 100vw"
              priority
              focus={siteConfig.heroPhotoFocus}
              fallback={<HeroScene role="img" aria-label={t.photoAlt} className="absolute inset-0 h-full w-full" />}
            />
          </div>
          <Sun className="float-a absolute -top-2 -left-3 h-14 w-14" />
          <Kite className="sway absolute -bottom-3 left-[-2.25rem] h-16 w-12" />
          <Flower className="float-b absolute right-[22%] -bottom-4 h-9 w-9" />
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
              <span className="block font-display text-[1.5rem] leading-none font-semibold">{stat.value}</span>
              <span className="mt-1 block text-[0.82rem] leading-tight font-bold">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="rise mt-6 grid gap-2.5 [--d:.24s]">
          <ButtonLink href="#contacts" className="w-full">{t.contact}</ButtonLink>
          <ButtonLink href="#about" tone="secondary" className="w-full">{t.about}</ButtonLink>
        </div>
        <Star className="float-a absolute top-[58%] right-4 h-7 w-7" />
      </div>
      <Wave fill="var(--color-sun-soft)" variant={0} />
    </div>
  );
}
