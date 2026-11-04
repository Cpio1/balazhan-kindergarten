"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { siteConfig, type Locale } from "../shared/config";
import { distribute, Lightbox, PhotoThumb, useGallery } from "../shared/gallery-core";
import { getDictionary } from "../shared/i18n";
import { galleryPlaceholders, Wave } from "../shared/illustrations";
import type { ImageFile } from "../shared/media-types";
import { Reveal } from "../shared/motion";
import { ButtonLink, Eyebrow } from "../shared/ui";

export function MobileGallery({ locale, images }: { locale: Locale; images: ImageFile[] }) {
  const t = getDictionary(locale).gallery;
  const g = useGallery(images);
  const [first, ...rest] = g.visible;
  // Первое фото во всю ширину, остальные — компактно в две колонки.
  const columns = distribute(rest, 2);

  const thumb = (item: ImageFile, index: number, sizes: string) => (
    <PhotoThumb
      image={item}
      index={index}
      alt={t.alt(index + 1)}
      openLabel={t.open(index + 1)}
      sizes={sizes}
      onOpen={g.open}
    />
  );

  return (
    <div className="bg-peach-soft">
      <div className="shell-m py-10">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="text-[1.75rem]">{t.title}</h2>
          {images.length > 0 && <p className="mt-3 text-pine-muted">{t.intro}</p>}
        </Reveal>

        {first ? (
          <div id={g.rootId} className="mt-6">
            {thumb(first, 0, "(min-width: 640px) 600px, 100vw")}
            <div className="mt-3 grid grid-cols-2 items-start gap-3">
              {columns.map((column, c) => (
                <div key={c} className="flex flex-col gap-3">
                  {column.map(({ item, index }) => (
                    <Reveal key={item.src} y={14}>
                      {thumb(item, index + 1, "(min-width: 640px) 300px, 50vw")}
                    </Reveal>
                  ))}
                </div>
              ))}
            </div>
            {g.hasMore && (
              <button
                type="button"
                onClick={g.showMore}
                className="btn-motion mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-coral font-bold text-white"
              >
                <Plus className="h-5 w-5" aria-hidden />
                {t.more}
              </button>
            )}
          </div>
        ) : (
          <Reveal className="mt-6">
            <ul aria-hidden className="grid grid-cols-3 gap-2.5">
              {galleryPlaceholders.slice(0, 3).map(({ Art, tone, shape }, i) => (
                <li key={i} className={`grid aspect-square place-items-center ${tone} ${shape}`}>
                  <Art className="h-14 w-14" />
                </li>
              ))}
            </ul>
            <div className="pebble mt-3 bg-milk px-6 py-6 text-center shadow-soft">
              <h3 className="text-[1.35rem]">{t.emptyTitle}</h3>
              <p className="mt-2 text-pine-muted">{t.emptyText}</p>
              <ButtonLink href={siteConfig.twoGis.gallery} external className="mt-4 w-full">
                {t.emptyLink}
                <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
        )}
      </div>
      <Wave fill="var(--color-milk)" variant={1} />

      {g.activeIndex !== null && (
        <Lightbox images={images} index={g.activeIndex} locale={locale} onIndex={g.open} onClose={g.close} />
      )}
    </div>
  );
}
