import { cn, withBasePath } from "@/utils";

/**
 * Иконки из ui-kit (frame «icon», 0:4763) и служебные иконки интерфейса.
 * Для каждого цвета в Figma — отдельный SVG, поэтому тон выбирается из доступных для иконки.
 */
const ICONS = {
  telegram: {
    muted: "/icons/tg.svg", // #5D5D5D — кнопки «Связаться» / «Написать»
    dark: "/icons/tg-dark.svg", // #333 — кнопка в мобильном меню
    light: "/icons/tg-light.svg", // #E9F5FC — на тёмной карточке
  },
  behance: {
    light: "/icons/beh-light.svg",
    "light-hover": "/icons/beh-light-hover.svg",
  },
  phone: { light: "/icons/ph-light.svg" },
  mail: { light: "/icons/mail-light.svg" },
  plus: { accent: "/icons/plus.svg" }, // аккордеон закрыт
  cross: { accent: "/icons/cross.svg" }, // аккордеон открыт
  close: { accent: "/icons/close.svg" }, // закрыть мобильное меню
} as const;

type IconMap = typeof ICONS;
export type IconName = keyof IconMap;
export type IconTone<N extends IconName> = keyof IconMap[N];

/** Размеры SVG из Figma — атрибуты width/height не переопределяем. */
const SIZES: Record<IconName, { width: number; height: number }> = {
  telegram: { width: 15, height: 15 },
  behance: { width: 15, height: 15 },
  phone: { width: 15, height: 15 },
  mail: { width: 15, height: 15 },
  plus: { width: 10.1562, height: 10.3027 },
  cross: { width: 14.4667, height: 14.4667 },
  close: { width: 20, height: 20 },
};

type IconProps<N extends IconName> = {
  name: N;
  tone: IconTone<N>;
  className?: string;
};

/** Декоративная иконка: `<Icon name="telegram" tone="light" />`. Для скринридеров скрыта. */
export function Icon<N extends IconName>({ name, tone, className }: IconProps<N>) {
  const src = ICONS[name][tone] as string;
  const { width, height } = SIZES[name];
  return <img src={withBasePath(src)} alt="" aria-hidden width={width} height={height} className={cn("icon", className)} />;
}
