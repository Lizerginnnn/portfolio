import { ROUTES } from "@/constants";
import type { Project } from "@/types";
import { Button } from "@/components/ui";
import "./case-nav.scss";

/** Низ кейса: «← Все проекты» и переход к следующему проекту. */
export function CaseNav({ next }: { next?: Project }) {
  return (
    <nav className="case-nav" aria-label="Навигация по проектам">
      <Button href={ROUTES.projects} mode="2-light">
        ← Все проекты
      </Button>
      {next && (
        <Button href={next.href} mode="1">
          <span className="case-nav__title case-nav__title--full">{next.title} →</span>
          <span className="case-nav__title case-nav__title--short" aria-hidden>
            {next.shortTitle ?? next.title} →
          </span>
        </Button>
      )}
    </nav>
  );
}
