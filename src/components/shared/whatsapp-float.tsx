import { MessageCircle } from "lucide-react";
import { whatsappUrl, type Locale } from "./config";

export function WhatsAppFloat({ locale, label }: { locale: Locale; label: string }) {
  return (
    <a
      href={whatsappUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="btn-motion fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-pine-deep shadow-lift lg:right-7 lg:bottom-7 lg:h-16 lg:w-16"
    >
      <MessageCircle className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={2.2} aria-hidden />
    </a>
  );
}
