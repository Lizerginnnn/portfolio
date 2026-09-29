import { Typography } from "../typography";
import "./task-card.scss";

type TaskCardProps = {
  number: number;
  title: string;
  description: string;
};

/** ui-kit → TaskCard (6:700): Mobile / Tablet / Desktop переключаются брейкпоинтами. */
export function TaskCard({ number, title, description }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card__header">
        <span className="task-card__number" aria-hidden>
          {number}
        </span>
        {/* до lg — 16/17 SemiBold (как в TaskCard / Mobile, Tablet), с lg — t1b */}
        <Typography as="h3" variant={{ base: "t2b", lg: "t1b" }} color="grey-8" className="task-card__title">
          <span className="visually-hidden">Задача {number}. </span>
          {title}
        </Typography>
      </div>
      {/* абзацы в description разделяются пустой строкой; в макете идут вплотную */}
      <div>
        {description.split(/\n\s*\n/).map((paragraph) => (
          <Typography key={paragraph} variant={{ base: "t3", md: "t2" }} color="grey-5">
            {paragraph}
          </Typography>
        ))}
      </div>
    </article>
  );
}
