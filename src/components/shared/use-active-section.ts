"use client";

import { useEffect, useState } from "react";
import { sectionIds, type SectionId } from "./config";

/** Подсвечивает в меню раздел, который сейчас на экране. */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}
