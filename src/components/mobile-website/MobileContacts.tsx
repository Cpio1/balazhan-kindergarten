import { AtSign, Clock, MapPin, MessageCircle, Navigation, Phone, SquareArrowOutUpRight } from "lucide-react";
import { siteConfig, telUrl, whatsappUrl, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { Wave } from "../shared/illustrations";
import { MapFrame } from "../shared/map-frame";
import { Reveal } from "../shared/motion";
import { ButtonLink } from "../shared/ui";

export function MobileContacts({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.contacts;
  return (
    <div>
      <Wave fill="var(--color-pine)" variant={2} />
      <div className="on-dark bg-pine text-milk">
        <div className="shell-m pt-8 pb-10">
          <Reveal>
            <p className="font-display text-[1.15rem] font-bold text-sun">{siteConfig.name}</p>
            <h2 className="mt-0.5 text-[1.85rem]">{t.title}</h2>
          </Reveal>

          <Reveal className="mt-6 grid gap-2.5">
            <ButtonLink href={telUrl} tone="sun" className="w-full text-[1.1rem]">
              <Phone className="h-5 w-5" aria-hidden />
              {siteConfig.phone.display}
            </ButtonLink>
            <ButtonLink href={whatsappUrl(locale)} external tone="whatsapp" className="w-full">
              <MessageCircle className="h-5 w-5" aria-hidden />
              {d.common.whatsapp}
            </ButtonLink>
          </Reveal>

          <Reveal className="mt-6 space-y-4">
            <div className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-sun" aria-hidden />
              <div>
                <p className="text-sm font-bold text-mint">{t.addressLabel}</p>
                <address className="not-italic">{siteConfig.address[locale]}</address>
              </div>
            </div>
            <div className="flex gap-3">
              <AtSign className="mt-1 h-5 w-5 shrink-0 text-sun" aria-hidden />
              <div>
                <p className="text-sm font-bold text-mint">{t.instagramLabel}</p>
                <p>{siteConfig.instagram}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-sun" aria-hidden />
              <div>
                <p className="text-sm font-bold text-mint">{t.hoursLabel}</p>
                <p>{siteConfig.hours.label[locale]}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-6">
            <MapFrame title={t.mapTitle} className="-mx-5 h-[26rem] sm:mx-0 sm:rounded-[3rem_1.5rem_1.5rem_1.5rem]" />
            <div className="mt-4 grid gap-2.5">
              <ButtonLink href={siteConfig.twoGis.route} external tone="ghost-light" className="w-full">
                <Navigation className="h-5 w-5" aria-hidden />
                {t.route}
              </ButtonLink>
              <ButtonLink href={siteConfig.twoGis.card} external tone="sun" className="w-full">
                <SquareArrowOutUpRight className="h-5 w-5" aria-hidden />
                {t.openCard}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
