"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { siteConfig, type Locale } from "../shared/config";
import { distribute, Lightbox, PhotoThumb, useGallery } from "../shared/gallery-core";
import { getDictionary } from "../shared/i18n";
import { galleryPlaceholders, Star, Wave } from "../shared/illustrations";
import type { ImageFile } from "../shared/media-types";
import { Reveal } from "../shared/motion";
import { ButtonLink, Eyebrow } from "../shared/ui";

export function Gallery({ locale, images }: { locale: Locale; images: ImageFile[] }) {
  const t = getDictionary(locale).gallery;
  const g = useGallery(images);
  const columns = distribute(g.visible, 3);

  return (
    <div className="relative overflow-clip bg-peach-soft">
      <Star className="float-a absolute top-20 left-[7%] h-11 w-11" />
      <div className="shell py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,3vw,2.7rem)]">{t.title}</h2>
          {images.length > 0 && <p className="mt-4 text-pine-muted">{t.intro}</p>}
        </Reveal>

        {images.length > 0 ? (
          <div id={g.rootId}>
            <div className="mt-11 grid grid-cols-3 items-start gap-5">
              {columns.map((column, c) => (
                <div key={c} className="flex flex-col gap-5">
                  {column.map(({ item, index }) => (
                    <Reveal key={item.src} y={20} delay={(index % 6) * 0.05}>
                      <PhotoThumb
                        image={item}
                        index={index}
                        alt={t.alt(index + 1)}
                        openLabel={t.open(index + 1)}
                        sizes="(min-width: 1180px) 360px, 31vw"
                        onOpen={g.open}
                      />
                    </Reveal>
                  ))}
                </div>
              ))}
            </div>
            {g.hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={g.showMore}
                  className="btn-motion inline-flex min-h-13 items-center gap-2 rounded-full bg-coral px-8 font-bold text-white shadow-soft"
                >
                  <Plus className="h-5 w-5" aria-hidden />
                  {t.more}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative mt-11">
            <ul aria-hidden className="grid grid-cols-3 items-center gap-5">
              {galleryPlaceholders.map(({ Art, tone, ratio, shape }, i) => (
                <li key={i}>
                  <div className={`grid place-items-center ${tone} ${ratio} ${shape} max-h-56 w-full`}>
                    <Art className="h-24 w-24 opacity-90" />
                  </div>
                </li>
              ))}
            </ul>
            <Reveal className="absolute inset-0 grid place-items-center p-4">
              <div className="pebble max-w-md bg-milk px-9 py-7 text-center shadow-lift">
                <h3 className="text-[1.5rem]">{t.emptyTitle}</h3>
                <p className="mt-2 text-pine-muted">{t.emptyText}</p>
                <ButtonLink href={siteConfig.twoGis.gallery} external className="mt-5">
                  {t.emptyLink}
                  <ArrowUpRight className="h-5 w-5" aria-hidden />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        )}
      </div>
      <Wave fill="var(--color-milk)" variant={1} />

      {g.activeIndex !== null && (
        <Lightbox images={images} index={g.activeIndex} locale={locale} onIndex={g.open} onClose={g.close} />
      )}
    </div>
  );
}
