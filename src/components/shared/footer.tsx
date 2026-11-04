import { siteConfig, type Locale } from "./config";
import { getDictionary } from "./i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).footer;
  return (
    <footer className="bg-pine-deep pr-20 pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-5 pt-5 text-[0.9rem] text-mint lg:px-8">
      <p className="mx-auto max-w-[1084px]">
        © {new Date().getFullYear()} {siteConfig.legalName[locale]}. {t.rights}
      </p>
    </footer>
  );
}
