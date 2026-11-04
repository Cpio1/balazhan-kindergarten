import { About } from "@/components/website/About";
import { Contacts } from "@/components/website/Contacts";
import { Documents } from "@/components/website/Documents";
import { Gallery } from "@/components/website/Gallery";
import { Groups } from "@/components/website/Groups";
import { Header } from "@/components/website/Header";
import { Hero } from "@/components/website/Hero";
import { Lessons } from "@/components/website/Lessons";
import { MobileAbout } from "@/components/mobile-website/MobileAbout";
import { MobileContacts } from "@/components/mobile-website/MobileContacts";
import { MobileDocuments } from "@/components/mobile-website/MobileDocuments";
import { MobileGallery } from "@/components/mobile-website/MobileGallery";
import { MobileGroups } from "@/components/mobile-website/MobileGroups";
import { MobileHeader } from "@/components/mobile-website/MobileHeader";
import { MobileHero } from "@/components/mobile-website/MobileHero";
import { MobileLessons } from "@/components/mobile-website/MobileLessons";
import { locales, localePath, siteConfig, siteUrl, type Locale } from "@/components/shared/config";
import { Footer } from "@/components/shared/footer";
import { getDictionary } from "@/components/shared/i18n";
import { getSiteMedia } from "@/components/shared/media";
import { DualSection } from "@/components/shared/ui";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(locales as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const media = getSiteMedia();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: siteConfig.name,
    legalName: siteConfig.legalName.ru,
    description: t.meta.description,
    url: `${siteUrl}${localePath(locale)}`,
    telephone: siteConfig.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressParts.street,
      addressLocality: siteConfig.addressParts.locality,
      addressRegion: siteConfig.addressParts.region,
      addressCountry: siteConfig.addressParts.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lon },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: siteConfig.hours.opens,
      closes: siteConfig.hours.closes,
    },
    sameAs: [siteConfig.twoGis.card],
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-pine px-5 py-3 font-bold text-milk focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.common.skip}
      </a>
      <Header locale={locale} logo={media.logo} />
      <MobileHeader locale={locale} logo={media.logo} />

      <main id="main">
        <DualSection
          id="home"
          desktop={<Hero locale={locale} photo={media.hero} />}
          mobile={<MobileHero locale={locale} photo={media.hero} />}
        />
        <DualSection
          id="about"
          desktop={<About locale={locale} media={media.aboutMedia} secondary={media.gallery[0] ?? null} />}
          mobile={<MobileAbout locale={locale} media={media.aboutMedia} />}
        />
        <DualSection id="groups" desktop={<Groups locale={locale} />} mobile={<MobileGroups locale={locale} />} />
        <DualSection id="lessons" desktop={<Lessons locale={locale} />} mobile={<MobileLessons locale={locale} />} />
        <DualSection
          id="gallery"
          desktop={<Gallery locale={locale} images={media.gallery} />}
          mobile={<MobileGallery locale={locale} images={media.gallery} />}
        />
        <DualSection id="documents" desktop={<Documents locale={locale} />} mobile={<MobileDocuments locale={locale} />} />
        <DualSection id="contacts" desktop={<Contacts locale={locale} />} mobile={<MobileContacts locale={locale} />} />
      </main>

      <Footer locale={locale} />
      <WhatsAppFloat locale={locale} label={t.common.whatsappFloat} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
