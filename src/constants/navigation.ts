import type { Link } from "@/types";
import { ROUTES } from "@/utils";

export const NAV_DESKTOP: Link[] = [
  { label: "Дайджест", href: ROUTES.about },
  { label: "Навыки", href: ROUTES.skills },
  { label: "Проекты", href: ROUTES.projects },
  { label: "Опыт&Образование", href: ROUTES.experience },
  { label: "Контакты", href: ROUTES.contacts },
];

export const NAV_MOBILE: Link[] = [
  { label: "Обо мне", href: ROUTES.about },
  { label: "Навыки", href: ROUTES.skills },
  { label: "Проекты", href: ROUTES.projects },
  { label: "Опыт работы", href: ROUTES.experience },
  { label: "Контакты", href: ROUTES.contacts },
];
