import type { MetadataRoute } from "next";
import { siteUrl } from "@/components/shared/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { kk: `${siteUrl}/`, ru: `${siteUrl}/ru` };
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteUrl}/ru`, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
  ];
}
