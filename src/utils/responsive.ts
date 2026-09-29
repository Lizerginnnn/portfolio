import type { Responsive } from "@/types";

/**
 * Превращает responsive-значение в БЭМ-модификаторы:
 * responsiveModifiers("typography", { base: "h2", lg: "h1" }) → ["typography--h2", "typography--lg-h1"].
 */
export function responsiveModifiers<T extends string>(block: string, value: Responsive<T>): string[] {
  if (typeof value === "string") return [`${block}--${value}`];

  const { base, ...rest } = value;
  return [
    `${block}--${base}`,
    ...Object.entries(rest).map(([breakpoint, variant]) => `${block}--${breakpoint}-${variant}`),
  ];
}
