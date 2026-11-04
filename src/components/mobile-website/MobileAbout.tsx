import { Check } from "lucide-react";
import type { Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { lessonIcons } from "../shared/lesson-icons";
import { AboutScene, Star, Wave } from "../shared/illustrations";
import { mediaAspect, MediaSlot } from "../shared/media-slot";
import type { MediaFile } from "../shared/media-types";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

export function MobileAbout({ locale, media }: { locale: Locale; media: MediaFile | null }) {
  const t = getDictionary(locale).about;
  return (
    <div className="bg-sun-soft">
      <div className="shell-m py-10">
        <Reveal>
          <Eyebrow tone="bg-peach">{t.eyebrow}</Eyebrow>
          <h2 className="text-[1.75rem]">{t.title}</h2>
        </Reveal>
        <Reveal className="relative mt-6">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-soft" style={{ aspectRatio: mediaAspect(media) }}>
            <MediaSlot
              media={media}
              alt={t.mediaAlt}
              sizes="(min-width: 640px) 600px, 100vw"
              fallback={<AboutScene role="img" aria-label={t.mediaAlt} className="absolute inset-0 h-full w-full" />}
            />
          </div>
          <Star className="float-a absolute -top-4 right-3 h-9 w-9" color="#F2643D" />
        </Reveal>
        <Reveal>
          <p className="mt-5 text-pine-muted">{t.body}</p>
        </Reveal>
        <ul className="mt-5 space-y-2">
          {t.facts.map((fact) => (
            <li key={fact} className="flex items-start gap-3 font-bold">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              </span>
              {fact}
            </li>
          ))}
        </ul>
        <Reveal y={14} className="mt-6">
          <h3 className="text-[1.2rem]">{t.extraTitle}</h3>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {t.extras.map((extra, i) => {
              const Icon = lessonIcons[extra.key as keyof typeof lessonIcons];
              return (
                <li
                  key={extra.key}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-1.5 font-bold ${i === 0 ? "bg-mint" : "bg-peach"}`}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  {extra.title}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
      <Wave fill="var(--color-mint-soft)" variant={1} />
    </div>
  );
}
