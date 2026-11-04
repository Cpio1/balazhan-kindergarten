import { ExternalLink, Clock3 } from "lucide-react";
import { siteConfig } from "./config";
import type { Dictionary } from "./i18n";
import { ButtonLink } from "./ui";

/** Пока в config.ts нет ссылки Google Drive, кнопка неактивна и видна надпись «Скоро будет доступно». */
export function DocumentsAction({ t, wide }: { t: Dictionary["documents"]; wide?: boolean }) {
  if (siteConfig.documentsUrl) {
    return (
      <ButtonLink href={siteConfig.documentsUrl} external className={wide ? "w-full" : ""}>
        {t.button}
        <ExternalLink className="h-4.5 w-4.5" aria-hidden />
      </ButtonLink>
    );
  }
  return (
    <div className={`flex flex-col items-center gap-3 ${wide ? "w-full" : ""}`}>
      <span
        role="link"
        aria-disabled="true"
        className={`inline-flex min-h-13 cursor-not-allowed items-center justify-center rounded-full bg-pine/15 px-7 py-3 text-center font-bold text-pine/75 ${wide ? "w-full" : ""}`}
      >
        {t.button}
      </span>
      <p className="inline-flex items-center gap-2 text-[0.95rem] font-bold text-pine">
        <Clock3 className="h-4.5 w-4.5 shrink-0" aria-hidden />
        {t.soon}
      </p>
    </div>
  );
}
