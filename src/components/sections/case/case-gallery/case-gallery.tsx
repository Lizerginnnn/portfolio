import Image from "next/image";
import type { CaseGalleryItem } from "@/utils";
import { cn, withBasePath } from "@/utils";
import { SectionHeading, Typography } from "@/components/ui";
import "./case-gallery.scss";

/** Узкие экраны телефона — в 0.7 от ширины исходника, как в блоках решений. */
const MOBILE_SCALE = 0.7;

/**
 * Вкладка «Макеты»: все картинки проекта в собственных пропорциях (без кадрирования) колонками,
 * под каждой — подпись. Клик открывает картинку целиком в новой вкладке.
 */
export function CaseGallery({ items }: { items: CaseGalleryItem[] }) {
  return (
    <section className="case-gallery" aria-labelledby="case-gallery-title">
      <SectionHeading id="case-gallery-title" label="Макеты проекта" title="Экраны и прототипы" />
      <div className="case-gallery__columns">
        {items.map((item) => (
          <figure key={item.src} className="case-gallery__item">
            <a
              href={withBasePath(item.src)}
              target="_blank"
              rel="noopener"
              className={cn("case-gallery__frame", item.mobile && "case-gallery__frame--mobile")}
              aria-label={`${item.caption} — открыть целиком`}
            >
              <Image
                src={withBasePath(item.src)}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes={item.mobile ? `${Math.round(item.width * MOBILE_SCALE)}px` : "(min-width: 768px) 50vw, 100vw"}
                className="case-gallery__image"
                style={item.mobile ? ({ "--mobile-width": `${Math.round(item.width * MOBILE_SCALE)}px` } as React.CSSProperties) : undefined}
              />
            </a>
            <Typography as="figcaption" variant="t3" color="grey-5">
              {item.caption}
            </Typography>
          </figure>
        ))}
      </div>
    </section>
  );
}
