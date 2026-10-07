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
  /** Кадр на всю ширину галереи в своих пропорциях — для широких схем и флоу. */
  wide?: boolean;
  /** Картинка уже самого кадра — лежит по центру на тёмной подложке (как в макете). */
  inset?: boolean;
};

/**
 * Кадр в блоке решения: label — плашка «Было» / «Стало» или вариант A/B-теста
 * (option — отклонённый, серый; chosen — выбранный, голубой), device — как вписывать картинку.
 */
export type CaseFigure = CaseImage & {
  caption?: string;
  label?: "before" | "after" | "option" | "chosen";
  /** Свой текст плашки, например «Вариант А»; по умолчанию — «Было», «Стало», «Вариант», «Выбран». */
  labelText?: string;
  /**
   * mobile — узкий экран: ширина пропорциональна ширине исходника, поэтому экраны,
   * выгруженные в одном масштабе, стоят рядом в одном размере; desktop (по умолчанию) — на всю ширину кадра.
   */
  device?: "desktop" | "mobile";
  /**
   * Картинка шире экрана телефона, потому что часть экрана (например, таблица) вылезает вбок.
   * Кадр показывает экран шириной viewport, а прямоугольник x / y / width / height (видимая часть области)
   * сам прокручивается вбок до правого края картинки и обратно; остальной экран стоит. Все значения — px исходника.
   * Только для device: "mobile".
   */
  scrollArea?: { viewport: number; x: number; y: number; width: number; height: number };
  /** Номер шага в раскладке steps, если шаги показаны не все (например, 1 и 3). По умолчанию — порядковый. */
  step?: number;
  /** Кадр на всю ширину ряда под остальными — для широких схем и флоу. */
  wide?: boolean;
};

/** Шаг схемы: tone красит плашку — accent (ключевой шаг), success / error (исходы). */
export type CaseDiagramStep = {
  label: string;
  note?: string;
  tone?: "default" | "accent" | "success" | "error";
};

/**
 * Схема процесса вместо скриншотов (например, для проектов под NDA):
 * steps — цепочка слева направо, outcomes — развилка исходов в конце, footnote — строка под схемой.
 */
export type CaseDiagram = {
  steps: CaseDiagramStep[];
  outcomes?: CaseDiagramStep[];
  footnote?: string;
};

/** Продуктовое решение: что выяснили → что сделала → как это выглядит. */
export type CaseDecision = {
  title: string;
  /** Тег над заголовком (например, откуда взялась проблема); без него показывается только номер. */
  source?: string;
  problem: string;
  solution: string;
  /** Короткие итоги решения — список под текстом. */
  outcomes?: string[];
  /** Что изменилось после решения — отдельная строка под проблемой и решением. */
  result?: string;
  /**
   * compare (по умолчанию) — кадры рядом, плашки «Было» / «Стало»;
   * steps — шаги одного сценария: общая панель, стрелки между кадрами и подписи «Шаг N» вместо плашек.
   */
  layout?: "compare" | "steps";
  /** Схема процесса — показывается над макетами или вместо них. */
  diagram?: CaseDiagram;
  /** Макеты; у проектов под NDA их может не быть — тогда решение держится на тексте и схеме. */
  media?: CaseFigure[];
};

/** Раздел информационной архитектуры: группы — вложенные экраны с их содержимым. */
export type CaseArchitectureSection = {
  title: string;
  /** Вопрос пользователя, на который отвечает раздел, — главная подпись в рабочем цикле. */
  question?: string;
  items: string[];
  groups?: { title: string; items: string[] }[];
  /** Номера решений из decisions (с 1), которые меняли этот раздел, — ссылки вниз по странице. */
  decisions?: number[];
};

/**
 * Архитектура в два уровня: flow — крупные карточки, support — сервисные разделы компактной строкой.
 * layout: cycle (по умолчанию) — уровни одного пути со стрелками →;
 * roles — параллельные роли, связанные двусторонними стрелками ⇄ (связующую роль ставьте в середину).
 */
export type CaseArchitecture = {
  lead: string;
  layout?: "cycle" | "roles";
  /** Подпись над карточками; по умолчанию «Рабочий цикл» или «Роли и их пути». */
  flowTitle?: string;
  flow: CaseArchitectureSection[];
  support?: { title: string; note?: string }[];
  /** Исходный эскиз структуры — картинка под картой. */
  sketch?: CaseFigure;
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
  headings?: { approach?: string; tasks?: string; screens?: string };
  goal: {
    /** Первый абзац: строка — серым, RichText — с выделениями. */
    overview: string | RichText;
    context: RichText;
  };
  steps: { title: string; description: string }[];
  /** Блок «Объём реализации» под шагами подхода. */
  scope?: { title: string; items: string[] };
  /** Ключевые цифры проекта — полоса под вводным блоком. */
  metrics?: { value: string; label: string }[];
  /** Карта разделов продукта. */
  architecture?: CaseArchitecture;
  /** Решения с аргументацией и макетами «было / стало»; если заданы — показываются вместо tasks. */
  decisions?: CaseDecision[];
  tasks?: { title: string; description: string }[];
  /** Галерея «Экраны и прототипы»; у проектов под NDA её нет. */
  screens?: CaseScreen[];
  /** Пропорция кадров галереи, если отличается от стандартной 651 / 451.875 (например, "652 / 360"). */
  screensRatio?: string;
};
