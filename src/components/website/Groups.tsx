import { Info } from "lucide-react";
import { siteConfig, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { Cloud, groupArt, Star, Wave } from "../shared/illustrations";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

// Карточки поднимаются ступенями — как рост от ростка до дерева.
const cardStyles = [
  { bg: "bg-sun", shape: "rounded-[5rem_2rem_3rem_2rem]", offset: "mt-20", art: "h-32 w-32" },
  { bg: "bg-peach", shape: "rounded-[2rem_5rem_2rem_3.5rem]", offset: "mt-10", art: "h-40 w-40" },
  { bg: "bg-mint", shape: "rounded-[3.5rem_2rem_5rem_2rem]", offset: "mt-0", art: "h-48 w-48" },
];

export function Groups({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).groups;
  return (
    <div className="relative overflow-clip bg-mint-soft">
      <Cloud className="float-b absolute top-14 left-[6%] h-14 w-24" />
      <Star className="float-a absolute top-24 right-[8%] h-10 w-10" />
      <div className="shell relative py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,3vw,2.7rem)]">{t.title}</h2>
          <p className="mt-4 text-pine-muted">{t.intro}</p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-3 items-end gap-6">
          {siteConfig.groups.map((group, i) => {
            const Art = groupArt[group.art];
            const s = cardStyles[i];
            return (
              <li key={group.id} className={s.offset}>
                <Reveal delay={i * 0.1}>
                  <article className={`card-motion relative flex flex-col px-7 pt-6 pb-8 shadow-soft ${s.bg} ${s.shape}`}>
                    <Art className={`sway mx-auto ${s.art}`} />
                    <p className="mt-3 w-fit rounded-full bg-milk px-3.5 py-1 text-sm font-extrabold">{group.age[locale]}</p>
                    <h3 className="mt-3 text-[1.6rem]">{group.name[locale]}</h3>
                    <p className="mt-2 text-[1rem] leading-relaxed">{group.description[locale]}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-9 flex justify-center">
          <p className="inline-flex max-w-3xl items-start gap-2.5 text-[0.95rem] text-pine-muted">
            <Info className="mt-1 h-4.5 w-4.5 shrink-0" aria-hidden />
            {t.note}
          </p>
        </Reveal>
      </div>
      <Wave fill="var(--color-milk)" variant={2} />
    </div>
  );
}
