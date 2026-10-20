"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/utils";
import { Typography } from "@/components/ui/typography";
import "./case-tabs.scss";

export type CaseTab = { id: string; label: string; content: ReactNode };

/** Якоря, которые живут во вкладке решений (#decision-N), — по ним вкладка открывается сама. */
const DECISION_ANCHOR = /^#decision-\d+$/;

/**
 * Табы кейса по компоненту Tabs из ui-kit (Figma portfolio, 199:2466): «Ключевые решения» → «Описание» → «Макеты».
 * Все панели рендерятся сразу (неактивные — hidden), поэтому текст есть в HTML статической сборки.
 * Ссылки на решения из «Описания» (карта структуры) переключают на «Ключевые решения» и прокручивают к карточке.
 */
export function CaseTabs({ tabs }: { tabs: CaseTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const tabIds = tabs.map((tab) => tab.id);

  const hasDecisions = tabIds.includes("decisions");
  /** Карточка решения, к которой прокрутить, когда вкладка решений станет видимой. */
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!scrollTarget) return;
    document.querySelector(scrollTarget)?.scrollIntoView({ block: "start" });
    setScrollTarget(null);
  }, [scrollTarget, active]);

  const openDecision = useCallback(
    (hash: string) => {
      if (!hasDecisions || !DECISION_ANCHOR.test(hash)) return false;
      setActive("decisions");
      setScrollTarget(hash);
      return true;
    },
    [hasDecisions],
  );

  useEffect(() => {
    // прямая ссылка вида /projects/newdex#decision-2
    openDecision(window.location.hash);

    // клик по ссылке на решение из другой вкладки — в том числе повторный, когда hashchange не срабатывает
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#decision-"]');
      if (!link || !openDecision(link.hash)) return;
      event.preventDefault();
      history.replaceState(null, "", link.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openDecision]);

  const select = (id: string, focus = false) => {
    setActive(id);
    if (focus) listRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${id}"]`)?.focus();
  };

  // стрелки, Home и End — как у стандартного tablist
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabIds.indexOf(active!);
    const next: Record<string, number> = {
      ArrowRight: (index + 1) % tabIds.length,
      ArrowLeft: (index - 1 + tabIds.length) % tabIds.length,
      Home: 0,
      End: tabIds.length - 1,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(tabIds[next[event.key]], true);
  };

  return (
    <div className="case-tabs">
      <div ref={listRef} className="case-tabs__list" role="tablist" aria-label="Разделы кейса" onKeyDown={onKeyDown}>
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              data-tab={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              aria-controls={`${baseId}-panel-${tab.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={cn("case-tabs__tab", selected && "case-tabs__tab--active")}
              onClick={() => select(tab.id)}
            >
              <Typography as="span" variant={selected ? "t3b" : "t3"} color={selected ? "blue-800" : "blue-600"}>
                {tab.label}
              </Typography>
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="case-tabs__panel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
