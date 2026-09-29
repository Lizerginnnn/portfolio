import { cn } from "@/utils";
import { Typography } from "../typography";
import "./skill-list.scss";

export function SkillList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("skill-list", className)}>
      {items.map((item) => (
        <Typography as="li" key={item} variant="t2" color="grey-5" className="skill-list__item">
          {item}
        </Typography>
      ))}
    </ul>
  );
}
