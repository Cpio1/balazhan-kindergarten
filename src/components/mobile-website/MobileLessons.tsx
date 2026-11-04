import type { Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { MealArt, PaperPlane, Wave } from "../shared/illustrations";
import { lessonIcons } from "../shared/lesson-icons";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

const iconTones = ["bg-peach", "bg-mint", "bg-sun", "bg-mint", "bg-peach"];

const specialStyles = [
  { bg: "bg-mint", icon: "float-a", shape: "rounded-[3rem_1.25rem_2rem_1.25rem]", side: "" },
  { bg: "bg-peach", icon: "sway", shape: "rounded-[1.25rem_3rem_1.25rem_2rem]", side: "flex-row-reverse" },
];

export function MobileLessons({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).lessons;
  return (
    <div className="relative overflow-clip">
      <PaperPlane className="float-b absolute top-10 right-5 h-11 w-13" />
      <div className="shell-m py-10">
        <Reveal>
          <Eyebrow tone="bg-mint">{t.eyebrow}</Eyebrow>
          <h2 className="pr-12 text-[1.75rem]">{t.title}</h2>
          <p className="mt-3 text-pine-muted">{t.intro}</p>
        </Reveal>
        <ul className="mt-5 divide-y divide-pine/10">
          {t.items.map((item, i) => {
            const Icon = lessonIcons[item.key as keyof typeof lessonIcons];
            return (
              <li key={item.key}>
                <Reveal y={12} className="flex items-start gap-3.5 py-3.5">
                  <span className={`blob-a grid h-12 w-12 shrink-0 place-items-center ${iconTones[i]}`}>
                    <Icon className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[1.15rem]">{item.title}</h3>
                    <p className="mt-0.5 text-[0.98rem] leading-snug text-pine-muted">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <ul className="mt-4 space-y-3">
          {t.special.map((item, i) => {
            const Icon = lessonIcons[item.key as keyof typeof lessonIcons];
            const s = specialStyles[i];
            return (
              <li key={item.key}>
                <Reveal y={16}>
                  <article className={`p-5 shadow-soft ${s.bg} ${s.shape}`}>
                    <div className={`flex items-center justify-between gap-3 ${s.side}`}>
                      <h3 className="text-[1.4rem]">{item.title}</h3>
                      <span className={`blob-b grid h-14 w-14 shrink-0 place-items-center bg-milk ${s.icon}`}>
                        <Icon className="h-7 w-7" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-2 text-[1rem] leading-relaxed">{item.text}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <Reveal>
          <aside className="relative mt-6 overflow-hidden rounded-[3.5rem_1.75rem_1.75rem_1.75rem] bg-sun p-6 pr-5">
            <div className="flex items-center gap-3">
              <h3 className="flex-1 text-[1.45rem]">{t.mealTitle}</h3>
              <MealArt className="h-22 w-22 shrink-0" />
            </div>
            <p className="mt-2 text-[1rem] leading-relaxed">{t.mealText}</p>
          </aside>
        </Reveal>
      </div>
      <Wave fill="var(--color-peach-soft)" variant={0} />
    </div>
  );
}
