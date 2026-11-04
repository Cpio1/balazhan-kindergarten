import { AtSign, Clock, MapPin, MessageCircle, Navigation, Phone, SquareArrowOutUpRight } from "lucide-react";
import { siteConfig, telUrl, whatsappUrl, type Locale } from "../shared/config";
import { getDictionary } from "../shared/i18n";
import { Flower, Star, Wave } from "../shared/illustrations";
import { MapFrame } from "../shared/map-frame";
import { Reveal } from "../shared/motion";
import { ButtonLink } from "../shared/ui";

export function Contacts({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.contacts;
  const rows = [
    { Icon: MapPin, label: t.addressLabel, body: <address className="not-italic">{siteConfig.address[locale]}</address> },
    {
      Icon: Phone,
      label: t.phoneLabel,
      body: (
        <a href={telUrl} className="text-[1.25rem] font-extrabold underline-offset-4 hover:underline">
          {siteConfig.phone.display}
        </a>
      ),
    },
    { Icon: AtSign, label: t.instagramLabel, body: <p>{siteConfig.instagram}</p> },
    { Icon: Clock, label: t.hoursLabel, body: <p>{siteConfig.hours.label[locale]}</p> },
  ];

  return (
    <div>
      <Wave fill="var(--color-pine)" variant={2} />
      <div className="on-dark relative overflow-clip bg-pine text-milk">
        <Star className="float-a absolute top-12 right-[6%] h-10 w-10" />
        <Flower className="float-b absolute bottom-10 left-[3%] h-12 w-12" />
        <div className="shell relative grid grid-cols-[1fr_1.15fr] items-stretch gap-12 pt-14 pb-20">
          <Reveal>
            <p className="font-display text-[1.25rem] font-bold text-sun">{siteConfig.name}</p>
            <h2 className="mt-1 text-[clamp(2rem,3vw,2.7rem)]">{t.title}</h2>
            <dl className="mt-7 space-y-5">
              {rows.map(({ Icon, label, body }) => (
                <div key={label} className="flex gap-4">
                  <span className="blob-a grid h-12 w-12 shrink-0 place-items-center bg-milk/10">
                    <Icon className="h-5 w-5 text-sun" aria-hidden />
                  </span>
                  <div>
                    <dt className="text-sm font-bold text-mint">{label}</dt>
                    <dd className="mt-0.5">{body}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={whatsappUrl(locale)} external tone="whatsapp">
                <MessageCircle className="h-5 w-5" aria-hidden />
                {d.common.whatsapp}
              </ButtonLink>
              <ButtonLink href={siteConfig.twoGis.route} external tone="sun">
                <Navigation className="h-5 w-5" aria-hidden />
                {t.route}
              </ButtonLink>
              <ButtonLink href={siteConfig.twoGis.card} external tone="ghost-light">
                <SquareArrowOutUpRight className="h-5 w-5" aria-hidden />
                {t.openCard}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col">
            <MapFrame title={t.mapTitle} className="min-h-[420px] flex-1 rounded-[5rem_2rem_2rem_2rem]" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
