import type { CaseStudy, RichText } from "@/types";
import { cn, padNumber } from "@/utils";
import { SectionHeading, Typography } from "@/components/ui";
import "./case-context.scss";

/** Текст абзаца без выделений: по макету (Purpose and process, 27:4082) абзацы цели — одним стилем целиком. */
const plain = (text: string | RichText) => (typeof text === "string" ? text : text.map((part) => part.text).join(""));

/** «Объём реализации» — под шагами подхода или в колонке цели (scope.placement). */
function Scope({ scope, goal }: { scope: NonNullable<CaseStudy["scope"]>; goal?: boolean }) {
  return (
    <div className={cn("case-context__scope", goal && "case-context__scope--goal")}>
      <Typography as="h3" variant="tag" color="blue-400">
        {scope.title}
      </Typography>
      <ul className="case-context__scope-list">
        {scope.items.map((item) => (
          <Typography as="li" key={item} variant="t2" color="grey-5" className="case-context__scope-item">
            {item}
          </Typography>
        ))}
      </ul>
    </div>
  );
}

/** «Цель проекта» + «Подход к решению»: колонки с 1280, стопкой ниже. */
export function CaseContext({ study }: { study: CaseStudy }) {
  return (
    <div className="case-context">
      <section className="case-context__goal" aria-labelledby="case-goal">
        <SectionHeading id="case-goal" label="Цель проекта" title="Зачем и для кого" />
        <div className="case-context__goal-copy">
          {/* подзаголовок — text 2b тёмным, текст под ним — text 2 серым: одинаково во всех кейсах */}
          <Typography variant="t2b" color="grey-8">
            {plain(study.goal.overview)}
          </Typography>
          <Typography variant="t2" color="grey-5">
            {plain(study.goal.context)}
          </Typography>
        </div>
        {study.scope?.placement === "goal" && <Scope scope={study.scope} goal />}
      </section>

      <section className="case-context__approach" aria-labelledby="case-approach">
        <SectionHeading
          id="case-approach"
          label="Подход к решению"
          title={study.headings?.approach ?? "Как работала над проектом"}
        />
        <ol className="case-context__steps">
          {study.steps.map((step, i) => (
            <li key={step.title} className="case-context__step">
              <Typography as="span" variant="tag" color="grey-4" className="case-context__step-number" aria-hidden>
                {padNumber(i + 1)}
              </Typography>
              <div className="case-context__step-copy">
                <Typography as="h3" variant="t2b" color="grey-8">
                  {step.title}
                </Typography>
                <Typography variant="t2" color="grey-5">
                  {step.description}
                </Typography>
              </div>
            </li>
          ))}
        </ol>

        {study.scope && study.scope.placement !== "goal" && <Scope scope={study.scope} />}
      </section>
    </div>
  );
}
