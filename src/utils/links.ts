/** Внешняя ссылка (http/https) — открывается в новой вкладке. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** Внутренняя страница сайта — переход через next/link. */
export function isInternalRoute(href: string): boolean {
  return href.startsWith("/");
}

/** Файл из public/ с учётом basePath — next/image и <img> сами его не добавляют. */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export const EXTERNAL_LINK_PROPS = { target: "_blank", rel: "noopener noreferrer" } as const;
