import { FolderOpen } from "lucide-react";
import type { Locale } from "../shared/config";
import { DocumentsAction } from "../shared/documents-action";
import { getDictionary } from "../shared/i18n";
import { Reveal } from "../shared/motion";
import { Eyebrow } from "../shared/ui";

export function MobileDocuments({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).documents;
  return (
    <div className="shell-m pt-8 pb-12">
      <Reveal>
        <div className="leaf-a flex flex-col items-center bg-mint-soft px-6 py-8 text-center">
          <Eyebrow tone="bg-mint">{t.eyebrow}</Eyebrow>
          <span className="blob-a grid h-20 w-20 place-items-center bg-sun">
            <FolderOpen className="h-9 w-9" strokeWidth={1.7} aria-hidden />
          </span>
          <h2 className="mt-4 text-[1.6rem]">{t.title}</h2>
          <p className="mt-2.5 mb-5 text-pine-muted">{t.text}</p>
          <DocumentsAction t={t} wide />
        </div>
      </Reveal>
    </div>
  );
}
