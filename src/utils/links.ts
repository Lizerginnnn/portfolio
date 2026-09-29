/** Внешняя ссылка (http/https) — открывается в новой вкладке. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** Внутренняя страница сайта — переход через next/link. */
export function isInternalRoute(href: string): boolean {
  return href.startsWith("/");
}

export const EXTERNAL_LINK_PROPS = { target: "_blank", rel: "noopener noreferrer" } as const;
