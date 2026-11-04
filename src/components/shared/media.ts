import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import type { ImageFile, MediaFile, SiteMedia } from "./media-types";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm)$/i;

function readImage(fileName: string): ImageFile | null {
  try {
    const size = imageSize(fs.readFileSync(path.join(IMAGES_DIR, fileName)));
    if (!size.width || !size.height) return null;
    // Фото с телефона хранит поворот в EXIF: при значениях 5–8 ширина и высота меняются местами.
    const rotated = (size.orientation ?? 1) >= 5;
    return {
      kind: "image",
      src: `/images/${encodeURIComponent(fileName)}`,
      width: rotated ? size.height : size.width,
      height: rotated ? size.width : size.height,
    };
  } catch {
    console.warn(`[media] Не удалось прочитать файл public/images/${fileName}`);
    return null;
  }
}

/**
 * Сканирует public/images при сборке: чтобы добавить или заменить фотографию,
 * достаточно положить файл с нужным именем — менять код не нужно.
 */
export function getSiteMedia(): SiteMedia {
  const files = fs.existsSync(IMAGES_DIR) ? fs.readdirSync(IMAGES_DIR) : [];
  const findImage = (base: string) => {
    const file = files.find((f) => IMAGE_EXT.test(f) && f.slice(0, f.lastIndexOf(".")).toLowerCase() === base);
    return file ? readImage(file) : null;
  };

  const aboutVideo = files.find((f) => VIDEO_EXT.test(f) && f.toLowerCase().startsWith("main-page2."));
  const aboutMedia: MediaFile | null = aboutVideo
    ? { kind: "video", src: `/images/${encodeURIComponent(aboutVideo)}` }
    : findImage("main-page2");

  const gallery = files
    .map((f) => ({ f, match: /^image(\d+)\.(png|jpe?g|webp|avif)$/i.exec(f) }))
    .filter((x) => x.match)
    .sort((a, b) => Number(a.match![1]) - Number(b.match![1]))
    .map((x) => readImage(x.f))
    .filter((x): x is ImageFile => x !== null);

  return { hero: findImage("main-page"), aboutMedia, logo: findImage("logo"), gallery };
}
