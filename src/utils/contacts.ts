import type { Link } from "@/types";

/** Контакты: телефон, почта, мессенджеры, портфолио. */
export const CONTACTS = {
  phone: { label: "+7 966 923 1389", href: "tel:+79669231389" },
  email: { label: "kondratieva.li@mail.ru", href: "mailto:kondratieva.li@mail.ru" },
  telegram: { label: "@lizaedix", href: "https://t.me/lizaedix" },
  // В макете ссылка на Behance не указана — подставьте адрес профиля.
  behance: { label: "Behance", href: "https://www.behance.net/" },
} satisfies Record<string, Link>;
