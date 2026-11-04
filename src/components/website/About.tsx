import { CalendarClock, Languages, Smile, Soup, Users } from "lucide-react";
import type { Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { lessonIcons } from "../shared/lesson-icons";
import { AboutScene, Flower, Star, Wave } from "../shared/illustrations";
import { mediaAspect, MediaSlot } from "../shared/media-slot";
import type { MediaFile } from "../shared/media-types";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

const factIcons = [Languages, Smile, Users, Soup, CalendarClock];
const factTones = ["bg-mint", "bg-peach", "bg-sun", "bg-mint", "bg-peach"];

export function About({ locale, media }: { locale: Locale; media: MediaFile | null }) {
  const t = getDictionary(locale).about;
  return (
    <div className="bg-sun-soft">
      <div className="shell grid grid-cols-[1.08fr_1fr] items-start gap-16 py-20">
        <Reveal className="sticky top-28">
          <div aria-hidden className="absolute -inset-3 -rotate-2 rounded-[2.75rem] bg-peach" />
          <div
            className="relative overflow-hidden rounded-[2.25rem] bg-milk shadow-lift ring-8 ring-milk"
            style={{ aspectRatio: mediaAspect(media) }}
          >
            <MediaSlot
              media={media}
              alt={t.mediaAlt}
              sizes="(min-width: 1180px) 560px, 48vw"
              fallback={<AboutScene role="img" aria-label={t.mediaAlt} className="absolute inset-0 h-full w-full" />}
            />
          </div>
          <Flower className="float-a absolute -top-9 -left-7 h-16 w-16" />
          <Star className="float-b absolute -right-6 -bottom-6 h-12 w-12" color="#F2643D" />
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow tone="bg-peach">{t.eyebrow}</Eyebrow>
            <h2 className="text-[clamp(2rem,3vw,2.7rem)]">{t.title}</h2>
            <p className="mt-5 text-pine-muted">{t.body}</p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {t.facts.map((fact, i) => {
              const Icon = factIcons[i];
              return (
                <li key={fact} className={i === 0 ? "col-span-2" : ""}>
                  <Reveal delay={i * 0.06} y={14} className="flex h-full items-center gap-3 rounded-[1.5rem_2rem_1.5rem_2rem] bg-milk p-3 shadow-soft">
                    <span className={`blob-b grid h-11 w-11 shrink-0 place-items-center ${factTones[i]}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="leading-snug font-bold">{fact}</span>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <Reveal delay={0.3} y={14} className="mt-6">
            <h3 className="text-[1.2rem]">{t.extraTitle}</h3>
            <ul className="mt-3 grid grid-cols-2 gap-3">
              {t.extras.map((extra, i) => {
                const Icon = lessonIcons[extra.key as keyof typeof lessonIcons];
                return (
                  <li
                    key={extra.key}
                    className={`card-motion flex items-center gap-3 p-3 font-bold ${
                      i === 0 ? "rounded-[2rem_1.25rem_2rem_1.25rem] bg-mint" : "rounded-[1.25rem_2rem_1.25rem_2rem] bg-peach"
                    }`}
                  >
                    <span className="blob-a grid h-11 w-11 shrink-0 place-items-center bg-milk">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    {extra.title}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
      <Wave fill="var(--color-mint-soft)" variant={1} />
    </div>
  );
}
