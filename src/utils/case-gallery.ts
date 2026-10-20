import type { CaseFigure, CaseStudy } from "@/types";

/** Картинка во вкладке «Макеты»: исходник, подпись и узкий ли это экран телефона. */
export type CaseGalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  mobile?: boolean;
};

const LABELS: Record<NonNullable<CaseFigure["label"]>, string> = {
  before: "Было",
  after: "Стало",
  option: "Вариант",
  chosen: "Выбран",
};

/** Подпись кадра из решения: своя подпись или alt, с плашкой «Было» / «Стало», если она есть. */
function figureCaption(figure: CaseFigure): string {
  const text = figure.caption ?? figure.alt;
  const label = figure.labelText ?? (figure.label ? LABELS[figure.label] : undefined);
  return label ? `${label} — ${text}` : text;
}

/**
 * Все картинки проекта для вкладки «Макеты» в порядке страницы: кадры решений и листы гайдов,
 * эскиз структуры, затем остальные экраны. Обложка не входит — это фото на мониторе, а не макет.
 */
export function collectCaseGallery(study: CaseStudy): CaseGalleryItem[] {
  const items: CaseGalleryItem[] = [];
  const seen = new Set<string>();
  const add = (item: CaseGalleryItem) => {
    if (seen.has(item.src)) return;
    seen.add(item.src);
    items.push(item);
  };

  for (const decision of study.decisions ?? []) {
    for (const figure of decision.media ?? []) {
      add({ ...figure, caption: figureCaption(figure), mobile: figure.device === "mobile" });
    }
    for (const sheet of decision.handoff?.sheets ?? []) {
      add({ ...sheet, caption: `${decision.handoff!.label}: ${sheet.caption}` });
    }
  }

  const sketch = study.architecture?.sketch;
  if (sketch) add({ ...sketch, caption: sketch.caption ?? sketch.alt });

  for (const screen of study.screens ?? []) add(screen);

  return items;
}
