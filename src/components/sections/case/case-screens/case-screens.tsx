import Image from "next/image";
import type { CaseScreen } from "@/types";
import { cn, withBasePath } from "@/utils";
import { SectionHeading } from "@/components/ui";
import "./case-screens.scss";

/** «Экраны и прототипы»: секция на всю ширину с голубым фоном, сетка 2×2 с 768. */
export function CaseScreens({ screens, ratio }: { screens: CaseScreen[]; ratio?: string }) {
  return (
    <section
      className="case-screens"
      aria-labelledby="case-screens-title"
      style={ratio ? ({ "--screen-ratio": ratio } as React.CSSProperties) : undefined}
    >
      <SectionHeading
        id="case-screens-title"
        label="Макеты проекта"
        title="Экраны и прототипы"
        className="case-screens__heading"
      />
      <div className="case-screens__gallery">
        {screens.map((screen) => (
          <figure key={screen.src} className="case-screens__item">
            <div className="case-screens__frame">
              <div className={cn("case-screens__image", screen.inset && "case-screens__image--inset")}>
                <Image
                  src={withBasePath(screen.src)}
                  alt={screen.alt}
                  fill
                  sizes="(min-width: 1920px) 870px, (min-width: 768px) 50vw, 100vw"
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
