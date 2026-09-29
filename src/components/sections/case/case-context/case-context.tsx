import type { CaseStudy, RichText } from "@/types";
import { padNumber } from "@/utils";
import { SectionHeading, Typography } from "@/components/ui";
import "./case-context.scss";

/** Абзац t1: строка — серым целиком; части RichText — accent тёмным, bold полужирным (t1b). */
function RichParagraph({ text }: { text: string | RichText }) {
  const parts: RichText = typeof text === "string" ? [{ text }] : text;
  return (
    <Typography variant="t1" color="grey-5">
      {parts.map((part, i) =>
        part.accent || part.bold ? (
          <Typography as="span" key={i} variant={part.bold ? "t1b" : "t1"} color={part.accent ? "grey-8" : "grey-5"}>
            {part.text}
          </Typography>
        ) : (
          part.text
        ),
      )}
    </Typography>
  );
}

/** «Цель проекта» + «Подход к решению»: колонки с 1280, стопкой ниже. */
export function CaseContext({ study }: { study: CaseStudy }) {
  return (
    <div className="case-context">
      <section className="case-context__goal" aria-labelledby="case-goal">
        <SectionHeading id="case-goal" label="Цель проекта" title="Зачем и для кого" />
        <div className="case-context__goal-copy">
          <RichParagraph text={study.goal.overview} />
          <RichParagraph text={study.goal.context} />
        </div>
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
              {/* в макете — #d2d2d2, отдельного токена в файле нет (case-context.scss) */}
              <Typography as="span" variant="tag" className="case-context__step-number" aria-hidden>
                {padNumber(i + 1)}
              </Typography>
              <div className="case-context__step-copy">
                <Typography as="h3" variant="t1b" color="grey-8">
                  {step.title}
                </Typography>
                <Typography variant="t2" color="grey-5">
                  {step.description}
                </Typography>
              </div>
            </li>
          ))}
        </ol>

        {study.scope && (
          <div className="case-context__scope">
            <Typography as="h3" variant="tag" color="blue-400">
              {study.scope.title}
            </Typography>
            <ul className="case-context__scope-list">
              {study.scope.items.map((item) => (
                <Typography as="li" key={item} variant="t2" color="grey-5" className="case-context__scope-item">
                  {item}
                </Typography>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
