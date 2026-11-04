import Image from "next/image";
import type { ReactNode } from "react";
import type { MediaFile } from "./media-types";

/** Пропорции рамки по самому файлу: так object-cover ничего не обрезает, в том числе лица. */
export function mediaAspect(media: MediaFile | null, fallback = "4 / 3") {
  if (media?.kind === "image") return `${media.width} / ${media.height}`;
  return media?.kind === "video" ? "16 / 9" : fallback;
}

/** Показывает файл из public/images (фото или видео), а пока его нет — иллюстрацию. */
export function MediaSlot({
  media,
  alt,
  sizes,
  preload,
  fallback,
}: {
  media: MediaFile | null;
  alt: string;
  sizes: string;
  preload?: boolean;
  fallback: ReactNode;
}) {
  if (!media) return <>{fallback}</>;
  if (media.kind === "video") {
    return (
      <video
        className="absolute inset-0 h-full w-full bg-pine object-cover"
        controls
        playsInline
        preload="metadata"
        aria-label={alt}
      >
        <source src={media.src} type={media.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
    );
  }
  return (
    <Image
      src={media.src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className="object-cover"
    />
  );
}
