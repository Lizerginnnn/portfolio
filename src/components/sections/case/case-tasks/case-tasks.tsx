import type { CaseStudy } from "@/types";
import { SectionHeading, TaskCard } from "@/components/ui";
import "./case-tasks.scss";

export function CaseTasks({ study }: { study: CaseStudy }) {
  return (
    <section className="case-tasks" aria-labelledby="case-tasks-title">
      <SectionHeading id="case-tasks-title" label="Задачи и решения" title={study.headings?.tasks ?? "Конкретные задачи"} />
      <div className="case-tasks__list">
        {study.tasks.map((task, i) => (
          <TaskCard key={task.title} number={i + 1} title={task.title} description={task.description} />
        ))}
      </div>
    </section>
  );
}
