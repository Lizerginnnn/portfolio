export type CaseImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Какую часть картинки показывать при кадрировании (object-position), по умолчанию — центр. */
  position?: string;
};

export type CaseScreen = CaseImage & {
  caption: string;
  /** Картинка уже самого кадра — лежит по центру на тёмной подложке (как в макете). */
  inset?: boolean;
};

/** Абзац из частей: accent — тёмным (grey-8), остальное — серым (grey-5); bold — полужирным. */
export type RichText = { text: string; accent?: boolean; bold?: boolean }[];

export type CaseStudy = {
  /** Тег над названием (Tag / light). */
  category: string;
  title: string;
  lead: string;
  details: { label: string; value: string }[];
  hero: CaseImage;
  /** Заголовки секций, если отличаются от стандартных («Как работала над проектом», «Конкретные задачи»). */
  headings?: { approach?: string; tasks?: string };
  goal: {
    /** Первый абзац: строка — серым, RichText — с выделениями. */
    overview: string | RichText;
    context: RichText;
  };
  steps: { title: string; description: string }[];
  /** Блок «Объём реализации» под шагами подхода. */
  scope?: { title: string; items: string[] };
  tasks: { title: string; description: string }[];
  /** Галерея «Экраны и прототипы»; у проектов под NDA её нет. */
  screens?: CaseScreen[];
  /** Пропорция кадров галереи, если отличается от стандартной 651 / 451.875 (например, "652 / 360"). */
  screensRatio?: string;
};
