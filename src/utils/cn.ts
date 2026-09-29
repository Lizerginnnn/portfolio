/** Склеивает классы, пропуская пустые: cn("button", isActive && "button--active", className). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
