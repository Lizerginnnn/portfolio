import Image from "next/image";
import type { CaseScreen } from "@/types";
import { cn, withBasePath } from "@/utils";
import { SectionHeading } from "@/components/ui";
import "./case-screens.scss";

/** «Экраны и прототипы»: секция на всю ширину с голубым фоном, сетка 2×2 с 768. */
export function CaseScreens({ screens, ratio, title }: { screens: CaseScreen[]; ratio?: string; title?: string }) {
  return (
    <section
      className="case-screens"
      aria-labelledby="case-screens-title"
      style={ratio ? ({ "--screen-ratio": ratio } as React.CSSProperties) : undefined}
    >
      <SectionHeading
        id="case-screens-title"
        label="Макеты проекта"
        title={title ?? "Экраны и прототипы"}
        className="case-screens__heading"
      />
      <div className="case-screens__gallery">
        {screens.map((screen) => (
          <figure key={screen.src} className={cn("case-screens__item", screen.wide && "case-screens__item--wide")}>
            {/* широкий кадр — в собственных пропорциях, без кадрирования */}
            <div
              className="case-screens__frame"
              style={screen.wide ? { aspectRatio: `${screen.width} / ${screen.height}` } : undefined}
            >
              <div className={cn("case-screens__image", screen.inset && "case-screens__image--inset")}>
                <Image
                  src={withBasePath(screen.src)}
                  alt={screen.alt}
                  fill
                  sizes={screen.wide ? "100vw" : "(min-width: 1920px) 870px, (min-width: 768px) 50vw, 100vw"}
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>
            {/* Geist 14/20 — отдельного текстового стиля в Figma нет */}
            <figcaption className="case-screens__caption">{screen.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
