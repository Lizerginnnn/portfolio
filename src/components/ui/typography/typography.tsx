import type { ColorToken, Responsive, TextVariant } from "@/types";
import { cn, responsiveModifiers } from "@/utils";
import "./typography.scss";

/** Тег по умолчанию для каждого стиля — можно переопределить через `as`. */
const DEFAULT_TAG: Record<TextVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  "h-accent": "p",
  t1: "p",
  t1b: "p",
  t2: "p",
  t2b: "p",
  t3: "p",
  t3b: "p",
  t4: "p",
  tag: "p",
};

type TypographyProps<T extends React.ElementType> = {
  /** Текстовый стиль из Figma; можно менять по брейкпоинтам: { base: "h2", lg: "h1" }. */
  variant: Responsive<TextVariant>;
  /** Цветовой токен из Figma. Без него цвет наследуется от родителя. */
  color?: ColorToken;
  /** HTML-тег или компонент (например, next/link). По умолчанию — по варианту: h1 → <h1>, t2 → <p>. */
  as?: T;
  align?: "left" | "center" | "right";
  /** Запретить перенос строк. */
  nowrap?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "color" | "children" | "className">;

/**
 * Текст по дизайн-системе: `<Typography variant="t2b" color="grey-8">…</Typography>`.
 * Стили — БЭМ-модификаторы блока `.typography` (typography.scss генерирует их из $text-styles).
 */
export function Typography<T extends React.ElementType = "p">({
  variant,
  color,
  as,
  align,
  nowrap,
  className,
  children,
  ...rest
}: TypographyProps<T>) {
  const baseVariant = typeof variant === "string" ? variant : variant.base;
  const Tag = as ?? DEFAULT_TAG[baseVariant];

  return (
    <Tag
      className={cn(
        "typography",
        ...responsiveModifiers("typography", variant),
        color && `typography--color-${color}`,
        align && `typography--align-${align}`,
        nowrap && "typography--nowrap",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
