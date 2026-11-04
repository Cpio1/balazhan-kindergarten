import Image from "next/image";
import type { ImageFile } from "./media-types";
import { siteConfig } from "./config";
import { Flower } from "./illustrations";

/** Текстовый логотип. Положите public/images/logo.png — и он заменится сам. */
export function Logo({ logo, light = false }: { logo: ImageFile | null; light?: boolean }) {
  if (logo) {
    return (
      <Image
        src={logo.src}
        alt={siteConfig.name}
        width={logo.width}
        height={logo.height}
        className="h-11 w-auto"
      />
    );
  }
  return (
    <span className={`inline-flex items-center gap-2 font-display text-[1.35rem] font-bold ${light ? "text-milk" : "text-pine"}`}>
      <Flower className="h-8 w-8 shrink-0" />
      <span>{siteConfig.name}</span>
    </span>
  );
}
