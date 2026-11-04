import Image from "next/image";
import type { ReactNode } from "react";
import type { MediaFile } from "./media-types";

/** Показывает файл из public/images (фото или видео), а пока его нет — иллюстрацию. */
export function MediaSlot({
  media,
  alt,
  sizes,
  priority,
  focus,
  fallback,
}: {
  media: MediaFile | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  focus?: string;
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
      priority={priority}
      className="object-cover"
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}
