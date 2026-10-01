"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_DESKTOP, NAV_MOBILE, PERSON } from "@/constants";
import { CONTACTS, ROUTES, cn } from "@/utils";
import { Button, Icon, Typography } from "@/components/ui";
import "./header.scss";

/** Ширина, с которой бургер скрывается (брейкпоинт lg в styles/abstracts). */
const DESKTOP_MIN_WIDTH = 1280;

/** ui-kit → NavBar (10:1427): desktop / Tablet / mobile × close / Open. */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setIsMenuOpen(false);
    const onResize = () => window.innerWidth >= DESKTOP_MIN_WIDTH && setIsMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={cn("site-header", isMenuOpen && "site-header--menu-open")}>
      <div className="site-header__bar">
        <Link href={ROUTES.home} className="site-header__logo">
          {PERSON.shortName}
        </Link>

        <nav className="site-header__nav" aria-label="Основная навигация">
          {NAV_DESKTOP.map((link) => (
            <Typography as={Link} key={link.href} href={link.href} variant="t3b" nowrap className="site-header__link">
              {link.label}
            </Typography>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button href={CONTACTS.telegram.href} icon={<Icon name="telegram" tone="muted" />} className="site-header__contact" external>
            Связаться
          </Button>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? (
              <Icon name="close" tone="accent" />
            ) : (
              <span className="site-header__burger" aria-hidden>
                <span className="site-header__burger-line" />
                <span className="site-header__burger-line site-header__burger-line--short" />
                <span className="site-header__burger-line" />
              </span>
            )}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="site-header__menu" hidden={!isMenuOpen}>
        <nav aria-label="Меню">
          <ul className="site-header__menu-list">
            {NAV_MOBILE.map((link) => (
              <li key={link.href}>
                <Typography
                  as={Link}
                  href={link.href}
                  variant="t3b"
                  className="site-header__menu-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </Typography>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          href={CONTACTS.telegram.href}
          icon={<Icon name="telegram" tone="dark" />}
          className="site-header__menu-contact"
          external
          onClick={closeMenu}
        >
          Связаться
        </Button>
      </div>
    </header>
  );
}
