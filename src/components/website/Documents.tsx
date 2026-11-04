import { FolderOpen } from "lucide-react";
import type { Locale } from "../shared/config";
import { DocumentsAction } from "../shared/documents-action";
import { getDictionary } from "../shared/i18n";
import { Flower, Star } from "../shared/illustrations";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

export function Documents({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).documents;
  return (
    <div className="shell pt-16 pb-24">
      <Reveal className="relative mx-auto max-w-[680px]">
        <div aria-hidden className="blob-c absolute -inset-x-8 -inset-y-5 -rotate-2 bg-mint-soft" />
        <Flower className="float-a absolute -top-6 -right-6 h-16 w-16" color="#FFD978" />
        <Star className="float-b absolute -bottom-3 -left-4 h-11 w-11" color="#FFBDA7" />
        <div className="pebble relative flex flex-col items-center bg-milk px-10 py-10 text-center shadow-lift">
          <Eyebrow tone="bg-mint">{t.eyebrow}</Eyebrow>
          <span className="blob-a grid h-24 w-24 place-items-center bg-sun">
            <FolderOpen className="h-11 w-11" strokeWidth={1.7} aria-hidden />
          </span>
          <h2 className="mt-5 text-[clamp(1.8rem,2.6vw,2.3rem)]">{t.title}</h2>
          <p className="mt-3 mb-6 max-w-md text-pine-muted">{t.text}</p>
          <DocumentsAction t={t} />
        </div>
      </Reveal>
    </div>
  );
}
