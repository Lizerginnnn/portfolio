/** Текстовые стили из Figma (styles/abstracts/_typography.scss → $text-styles). */
export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h-accent"
  | "t1"
  | "t1b"
  | "t2"
  | "t2b"
  | "t3"
  | "t3b"
  | "t4"
  | "tag";

/** Цветовые токены из Figma (styles/abstracts/_colors.scss → $color-tokens). */
export type ColorToken =
  | "grey-0"
  | "grey-05"
  | "grey-2"
  | "grey-4"
  | "grey-5"
  | "grey-6"
  | "grey-7"
  | "grey-8"
  | "blue-50"
  | "blue-100"
  | "blue-150"
  | "blue-200"
  | "blue-300"
  | "blue-400"
  | "blue-500"
  | "blue-600"
  | "blue-700"
  | "blue-900"
  | "blue-mist";

/** Брейкпоинты (styles/abstracts/_breakpoints.scss): sm 600, md 768, lg 1280, xl 1440, xxl 1920. */
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl";

/** Значение, которое может меняться по брейкпоинтам (mobile-first): "h2" или { base: "h2", lg: "h1" }. */
export type Responsive<T> = T | ({ base: T } & Partial<Record<Breakpoint, T>>);
