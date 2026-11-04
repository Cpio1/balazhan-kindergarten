import type { ReactNode } from "react";

type Tone = "primary" | "secondary" | "sun" | "whatsapp" | "ghost-light";

const tones: Record<Tone, string> = {
  primary: "bg-pine text-milk shadow-soft hover:bg-pine-deep",
  secondary: "bg-milk text-pine ring-2 ring-pine/80 ring-inset hover:bg-sun-soft",
  sun: "bg-sun text-pine shadow-soft",
  whatsapp: "bg-mint text-pine shadow-soft",
  "ghost-light": "bg-transparent text-milk ring-2 ring-milk/70 ring-inset hover:bg-milk/10",
};

export function ButtonLink({
  href,
  children,
  tone = "primary",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn-motion inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-center font-bold ${tones[tone]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Eyebrow({ children, tone = "bg-sun" }: { children: ReactNode; tone?: string }) {
  return (
    <p className={`mb-4 inline-block rounded-full px-4 py-1 text-sm font-extrabold text-pine ${tone}`}>{children}</p>
  );
}

/** Рендерит дизайн компьютера и телефона как разные композиции; переключение на CSS, без мерцания. */
export function DualSection({
  id,
  desktop,
  mobile,
  className = "",
}: {
  id: string;
  desktop: ReactNode;
  mobile: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="hidden lg:block">{desktop}</div>
      <div className="lg:hidden">{mobile}</div>
    </section>
  );
}
