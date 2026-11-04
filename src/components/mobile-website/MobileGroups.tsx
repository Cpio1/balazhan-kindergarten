import { Info } from "lucide-react";
import { siteConfig, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { groupArt, Wave } from "../shared/illustrations";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

const styles = [
  { bg: "bg-sun", shape: "rounded-[3.5rem_1.5rem_2rem_1.5rem]", side: "" },
  { bg: "bg-peach", shape: "rounded-[1.5rem_3.5rem_1.5rem_2rem]", side: "flex-row-reverse" },
  { bg: "bg-mint", shape: "rounded-[2rem_1.5rem_3.5rem_1.5rem]", side: "" },
];

export function MobileGroups({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).groups;
  return (
    <div className="bg-mint-soft">
      <div className="shell-m py-10">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="text-[1.75rem]">{t.title}</h2>
          <p className="mt-3 text-pine-muted">{t.intro}</p>
        </Reveal>
        <ul className="mt-6 space-y-3.5">
          {siteConfig.groups.map((group, i) => {
            const Art = groupArt[group.art];
            const s = styles[i];
            return (
              <li key={group.id}>
                <Reveal y={18}>
                  <article className={`p-5 shadow-soft ${s.bg} ${s.shape}`}>
                    <div className={`flex items-center justify-between gap-3 ${s.side}`}>
                      <div>
                        <p className="w-fit rounded-full bg-milk px-3 py-0.5 text-sm font-extrabold">{group.age[locale]}</p>
                        <h3 className="mt-2 text-[1.45rem]">{group.name[locale]}</h3>
                      </div>
                      <Art className="h-20 w-20 shrink-0" />
                    </div>
                    <p className="mt-2.5 text-[1rem] leading-relaxed">{group.description[locale]}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 flex items-start gap-2 text-[0.92rem] text-pine-muted">
          <Info className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden />
          {t.note}
        </p>
      </div>
      <Wave fill="var(--color-milk)" variant={2} />
    </div>
  );
}
