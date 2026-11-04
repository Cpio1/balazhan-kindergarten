import { siteConfig } from "./config";

/** Официальный виджет 2ГИС с карточкой организации. */
export function MapFrame({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-mint-soft ${className}`}>
      <iframe
        src={siteConfig.twoGis.mapWidget}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
