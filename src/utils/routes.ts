/** id разделов главной — общие для атрибутов `id` у секций и для якорных ссылок. */
export const SECTION_IDS = {
  top: "top",
  about: "about",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  contacts: "contacts",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** Якоря ведут на главную, чтобы меню работало и со страниц кейсов. */
const anchor = (id: SectionId) => `/#${id}`;

/** Внутренние страницы и разделы сайта. */
export const ROUTES = {
  home: "/",
  project: (slug: string) => `/projects/${slug}`,
  about: anchor(SECTION_IDS.about),
  skills: anchor(SECTION_IDS.skills),
  projects: anchor(SECTION_IDS.projects),
  experience: anchor(SECTION_IDS.experience),
  contacts: anchor(SECTION_IDS.contacts),
} as const;

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
