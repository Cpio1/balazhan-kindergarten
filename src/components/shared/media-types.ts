export type ImageFile = { kind: "image"; src: string; width: number; height: number };
export type VideoFile = { kind: "video"; src: string };
export type MediaFile = ImageFile | VideoFile;

export type SiteMedia = {
  hero: ImageFile | null;
  aboutMedia: MediaFile | null;
  logo: ImageFile | null;
  gallery: ImageFile[];
};
