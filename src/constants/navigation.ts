import type { Link } from "@/types";

/** Якоря ведут на главную, чтобы меню работало и со страниц кейсов. */
export const NAV_DESKTOP: Link[] = [
  { label: "Дайджест", href: "/#about" },
  { label: "Навыки", href: "/#skills" },
  { label: "Проекты", href: "/#projects" },
  { label: "Опыт&Образование", href: "/#experience" },
  { label: "Контакты", href: "/#contacts" },
];

export const NAV_MOBILE: Link[] = [
  { label: "Обо мне", href: "/#about" },
  { label: "Навыки", href: "/#skills" },
  { label: "Проекты", href: "/#projects" },
  { label: "Опыт работы", href: "/#experience" },
  { label: "Контакты", href: "/#contacts" },
];

export const ROUTES = {
  home: "/",
  projects: "/#projects",
  project: (id: string) => `/projects/${id}`,
};
