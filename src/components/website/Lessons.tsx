import type { Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { Flower, MealArt, PaperPlane, Star, Wave } from "../shared/illustrations";
import { lessonIcons } from "../shared/lesson-icons";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

const tiles = [
  { bg: "bg-peach-soft", icon: "bg-peach", shape: "rounded-[3rem_1.5rem_2rem_1.5rem]", span: "col-span-2" },
  { bg: "bg-mint-soft", icon: "bg-mint", shape: "rounded-[1.5rem_3rem_1.5rem_2rem]", span: "col-span-2" },
  { bg: "bg-sun-soft", icon: "bg-sun", shape: "rounded-[2rem_1.5rem_3rem_1.5rem]", span: "col-span-2" },
  { bg: "bg-mint-soft", icon: "bg-mint", shape: "rounded-[1.5rem_2rem_1.5rem_3rem]", span: "col-span-3" },
  { bg: "bg-peach-soft", icon: "bg-peach", shape: "rounded-[2rem_3rem_2rem_1.5rem]", span: "col-span-3" },
];

const specialStyles = [
  { bg: "bg-mint", icon: "float-a", shape: "rounded-[3.5rem_1.5rem_2.5rem_1.5rem]", Deco: Star, decoColor: "#FFD978" },
  { bg: "bg-peach", icon: "sway", shape: "rounded-[1.5rem_3.5rem_1.5rem_2.5rem]", Deco: Flower, decoColor: "#FFFDF7" },
];

export function Lessons({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).lessons;
  return (
    <div className="relative overflow-clip">
      <PaperPlane className="float-b absolute top-20 right-[9%] h-14 w-16" />
      <Flower className="float-a absolute top-40 left-[3%] hidden h-12 w-12 min-[1280px]:block" />
      <div className="shell py-20">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="bg-mint">{t.eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,3vw,2.7rem)]">{t.title}</h2>
          <p className="mt-4 text-pine-muted">{t.intro}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-[1fr_2.1fr] gap-6">
          <Reveal className="h-full">
            <aside className="relative flex h-full flex-col justify-end overflow-hidden rounded-[6rem_2.5rem_2.5rem_2.5rem] bg-sun p-7 shadow-soft">
              <MealArt className="sway mx-auto my-auto h-56 w-56" />
              <h3 className="text-[1.6rem]">{t.mealTitle}</h3>
              <p className="mt-2.5 text-[1rem] leading-relaxed">{t.mealText}</p>
              <Star className="float-a absolute top-6 right-6 h-8 w-8" color="#FFFDF7" />
            </aside>
          </Reveal>

          <ul className="grid grid-cols-6 gap-4">
            {t.items.map((item, i) => {
              const Icon = lessonIcons[item.key as keyof typeof lessonIcons];
              const s = tiles[i];
              return (
                <li key={item.key} className={s.span}>
                  <Reveal delay={i * 0.07} className="h-full">
                    <article className={`card-motion h-full p-5 ${s.bg} ${s.shape}`}>
                      <span className={`blob-a grid h-13 w-13 place-items-center ${s.icon}`}>
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <h3 className="mt-3.5 text-[1.2rem]">{item.title}</h3>
                      <p className="mt-1.5 text-[0.98rem] leading-snug text-pine-muted">{item.text}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
            {t.special.map((item, i) => {
              const Icon = lessonIcons[item.key as keyof typeof lessonIcons];
              const s = specialStyles[i];
              return (
                <li key={item.key} className="col-span-3">
                  <Reveal delay={0.35 + i * 0.08} className="h-full">
                    <article className={`card-motion relative h-full overflow-hidden p-5 shadow-soft ${s.bg} ${s.shape}`}>
                      <s.Deco color={s.decoColor} className="float-b absolute top-4 right-5 h-8 w-8" />
                      <span className={`blob-b grid h-14 w-14 place-items-center bg-milk ${s.icon}`}>
                        <Icon className="h-7 w-7" aria-hidden />
                      </span>
                      <h3 className="mt-3.5 text-[1.3rem]">{item.title}</h3>
                      <p className="mt-1.5 text-[0.98rem] leading-snug">{item.text}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Wave fill="var(--color-peach-soft)" variant={0} />
    </div>
  );
}
