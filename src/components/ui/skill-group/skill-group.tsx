"use client";

import { useId, useState } from "react";
import { cn } from "@/utils";
import { Icon } from "../icon";
import { SkillList } from "../skill-list";
import { Typography } from "../typography";
import "./skill-group.scss";

type SkillGroupProps = {
  title: string;
  items: string[];
  defaultOpen?: boolean;
};

/** ui-kit → SkillGroup (0:5700): аккордеон для мобильных и планшетов. */
export function SkillGroup({ title, items, defaultOpen = false }: SkillGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={cn("skill-group", isOpen && "skill-group--open")}>
      <button
        type="button"
        className="skill-group__trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((value) => !value)}
      >
        <Typography as="span" variant="t2b" color="grey-8">
          {title}
        </Typography>
        <span className="skill-group__icon">
          {isOpen ? <Icon name="cross" tone="accent" /> : <Icon name="plus" tone="accent" />}
        </span>
      </button>
      <div id={panelId} className="skill-group__panel" hidden={!isOpen}>
        <SkillList items={items} />
      </div>
    </div>
  );
}
