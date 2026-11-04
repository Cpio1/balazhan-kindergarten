"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { siteConfig, type Locale } from "./config";
import { getDictionary } from "./i18n";
import type { ImageFile } from "./media-types";

/** Логика галереи, общая для компьютерной и мобильной версии */
export function useGallery(images: ImageFile[]) {
  const { initialCount, step } = siteConfig.gallery;
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rootId = useId();

  const showMore = useCallback(() => {
    const firstNew = visibleCount;
    setVisibleCount((c) => Math.min(c + step, images.length));
    // Кнопка может исчезнуть — переводим фокус на первое новое фото, чтобы он не потерялся.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document
          .getElementById(rootId)
          ?.querySelector<HTMLElement>(`[data-photo="${firstNew}"]`)
          ?.focus({ preventScroll: true });
      }),
    );
  }, [visibleCount, step, images.length, rootId]);

  return {
    rootId,
    visible: images.slice(0, visibleCount),
    hasMore: visibleCount < images.length,
    showMore,
    activeIndex,
    open: setActiveIndex,
    close: useCallback(() => setActiveIndex(null), []),
  };
}

/** Раскладка по колонкам с учётом настоящих пропорций: фото не обрезаются. */
export function distribute<T extends { width: number; height: number }>(items: T[], columns: number) {
  const heights = Array<number>(columns).fill(0);
  const result: { item: T; index: number }[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    const shortest = heights.indexOf(Math.min(...heights));
    result[shortest].push({ item, index });
    heights[shortest] += item.height / item.width;
  });
  return result;
}

// Скругления небольшие: углы рамки не должны срезать лица на групповых фото.
const thumbShapes = ["rounded-[1.5rem]", "rounded-[1.25rem_1.75rem_1.25rem_1.75rem]", "rounded-[1.75rem_1.25rem_1.75rem_1.25rem]"];

export function PhotoThumb({
  image,
  index,
  alt,
  openLabel,
  sizes,
  onOpen,
}: {
  image: ImageFile;
  index: number;
  alt: string;
  openLabel: string;
  sizes: string;
  onOpen: (i: number) => void;
}) {
  return (
    <button
      type="button"
      data-photo={index}
      onClick={() => onOpen(index)}
      aria-label={openLabel}
      className={`card-motion group block w-full cursor-zoom-in overflow-hidden bg-mint-soft shadow-soft ${thumbShapes[index % thumbShapes.length]}`}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </button>
  );
}

export function Lightbox({
  images,
  index,
  locale,
  onIndex,
  onClose,
}: {
  images: ImageFile[];
  index: number;
  locale: Locale;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const labels = getDictionary(locale).gallery;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;
  const go = useCallback((delta: number) => onIndex((index + delta + count) % count), [index, count, onIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Рядом с текущим держим соседние фото, чтобы переключение было мгновенным.
  const neighbours = new Set([index, (index + 1) % count, (index - 1 + count) % count]);
  const buttonClass =
    "grid h-12 w-12 place-items-center rounded-full bg-milk/15 text-milk transition-colors hover:bg-milk/30 lg:h-14 lg:w-14 on-dark";

  return (
    <dialog
      ref={dialogRef}
      className="lightbox on-dark"
      aria-label={labels.viewer}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative h-full w-full"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="absolute inset-x-2 top-16 bottom-20 lg:inset-x-24 lg:top-6 lg:bottom-6" onClick={onClose}>
          {images.map((image, i) =>
            neighbours.has(i) ? (
              <Image
                key={image.src}
                src={image.src}
                alt={i === index ? labels.alt(i + 1) : ""}
                fill
                sizes="100vw"
                loading="eager"
                aria-hidden={i !== index}
                onClick={(e) => e.stopPropagation()}
                className={`fade-swap object-contain ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
              />
            ) : null,
          )}
        </div>

        <p className="absolute top-5 left-5 rounded-full bg-milk/15 px-4 py-1.5 font-bold" aria-live="polite">
          {labels.counter(index + 1, count)}
        </p>
        <button type="button" autoFocus onClick={onClose} aria-label={labels.close} className={`${buttonClass} absolute top-3 right-3 lg:top-5 lg:right-5`}>
          <X aria-hidden />
        </button>
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={`${buttonClass} absolute bottom-4 left-[calc(50%-4rem)] lg:top-1/2 lg:bottom-auto lg:left-5 lg:-translate-y-1/2`}>
              <ChevronLeft aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className={`${buttonClass} absolute right-[calc(50%-4rem)] bottom-4 lg:top-1/2 lg:right-5 lg:bottom-auto lg:-translate-y-1/2`}>
              <ChevronRight aria-hidden />
            </button>
          </>
        )}
      </div>
    </dialog>
  );
}
