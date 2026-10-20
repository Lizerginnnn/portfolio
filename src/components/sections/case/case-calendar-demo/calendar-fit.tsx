"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Ширина холста макета, в пикселях. */
const CANVAS_WIDTH = 1920;

/**
 * Вписывает холст календаря в ширину блока: считает масштаб по реальной ширине и кладёт его в --cal-scale.
 * В CSS есть запасной вариант через atan2 и cqw, но он считается не во всех браузерах (например, в Safari),
 * и тогда холст остаётся 1920 px — видно только его угол, а курсор и панель уходят за край.
 */
export function CalendarFit({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => el.style.setProperty("--cal-scale", String(el.clientWidth / CANVAS_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} role="img" aria-label={label}>
      {children}
    </div>
  );
}
