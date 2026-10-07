import { Fragment } from "react";
import Image from "next/image";
import type { CaseDecision, CaseDiagram, CaseDiagramStep, CaseFigure } from "@/types";
import { cn, padNumber, withBasePath } from "@/utils";
import { SectionHeading, Tag, Typography } from "@/components/ui";
import "./case-decisions.scss";

const FIGURE_LABEL: Record<NonNullable<CaseFigure["label"]>, string> = {
  before: "Было",
  after: "Стало",
  option: "Вариант",
  chosen: "Выбран",
};

/** «Было» и отклонённый вариант — нейтральные; «Стало» и выбранный — голубые. */
const isMuted = (label: CaseFigure["label"]) => label === "before" || label === "option";

/** Узкие экраны показываем в 0.7 от ширины исходника — так экраны одного масштаба выгрузки совпадают по размеру. */
const MOBILE_SCALE = 0.7;

const percent = (value: number) => `${(value * 100).toFixed(4)}%`;

/**
 * Часть экрана шире телефона (например, таблица): экран стоит, а в окне области та же картинка
 * сама уезжает вбок до правого края и обратно, снизу — полоса прокрутки.
 * Масштаб тот же, что у мобильных кадров, — экран совпадает по ширине со «Стало».
 */
function ScrollAreaFigure({ figure, area }: { figure: CaseFigure; area: NonNullable<CaseFigure["scrollArea"]> }) {
  const { viewport, x, y, width, height } = area;
  // сколько области спрятано за правым краем экрана
  const hidden = figure.width - x - width;
  const image = {
    src: withBasePath(figure.src),
    width: figure.width,
    height: figure.height,
    sizes: `${Math.round(figure.width * MOBILE_SCALE)}px`,
  };

  return (
    <div
      className="case-decision__scroll"
      style={
        {
          "--mobile-width": `${Math.round(viewport * MOBILE_SCALE)}px`,
          aspectRatio: `${viewport} / ${figure.height}`,
        } as React.CSSProperties
      }
    >
      <Image {...image} alt={figure.alt} className="case-decision__scroll-screen" style={{ width: percent(figure.width / viewport) }} />
      <div
        className="case-decision__scroll-area"
        style={{
          left: percent(x / viewport),
          top: percent(y / figure.height),
          width: percent(width / viewport),
          height: percent(height / figure.height),
        }}
      >
        <Image
          {...image}
          alt=""
          aria-hidden
          className="case-decision__scroll-content"
          style={
            {
              left: percent(-x / width),
              top: percent(-y / height),
              width: percent(figure.width / width),
              "--scroll-end": percent(-hidden / figure.width),
            } as React.CSSProperties
          }
        />
        <span className="case-decision__scroll-bar" aria-hidden>
          <span
            className="case-decision__scroll-thumb"
            style={
              {
                width: percent(width / (width + hidden)),
                "--scroll-end": percent(hidden / width),
              } as React.CSSProperties
            }
          />
        </span>
      </div>
    </div>
  );
}

type DecisionFigureProps = {
  figure: CaseFigure;
  columns: number;
  /** Подпись шага в раскладке steps — вместо плашки «Было» / «Стало». */
  step?: number;
};

function DecisionFigure({ figure, columns, step }: DecisionFigureProps) {
  const mobile = figure.device === "mobile";
  const label = step === undefined ? figure.label : undefined;
  return (
    <figure className={cn("case-decision__figure", figure.wide && "case-decision__figure--wide")}>
      {step !== undefined && (
        <Typography as="span" variant="tag" color="blue-500" className="case-decision__step">
          Шаг {step}
        </Typography>
      )}
      <div
        className={cn(
          "case-decision__frame",
          mobile && "case-decision__frame--mobile",
          label && (isMuted(label) ? "case-decision__frame--before" : "case-decision__frame--after"),
          step !== undefined && "case-decision__frame--step",
        )}
      >
        {label && (
          <Tag variant={isMuted(label) ? "dark" : "light"} className="case-decision__label">
            {figure.labelText ?? FIGURE_LABEL[label]}
          </Tag>
        )}
        {mobile && figure.scrollArea ? (
          <ScrollAreaFigure figure={figure} area={figure.scrollArea} />
        ) : (
          <Image
            src={withBasePath(figure.src)}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            sizes={mobile ? `${Math.round(figure.width * MOBILE_SCALE)}px` : `(min-width: 1280px) ${Math.round(100 / columns)}vw, 100vw`}
            className="case-decision__image"
            style={mobile ? ({ "--mobile-width": `${Math.round(figure.width * MOBILE_SCALE)}px` } as React.CSSProperties) : undefined}
          />
        )}
      </div>
      {figure.caption && (
        <Typography as="figcaption" variant="t3" color="grey-5" className="case-decision__caption">
          {figure.caption}
        </Typography>
      )}
    </figure>
  );
}

function DiagramNode({ step }: { step: CaseDiagramStep }) {
  return (
    <div className={cn("case-diagram__node", `case-diagram__node--${step.tone ?? "default"}`)}>
      <Typography as="span" variant="t3b" color="grey-8">
        {step.label}
      </Typography>
      {step.note && (
        <Typography as="span" variant="t4" color="grey-5">
          {step.note}
        </Typography>
      )}
    </div>
  );
}

/** Схема процесса: цепочка шагов → развилка исходов; стрелки — текстом, на мобильных вниз. */
function DecisionDiagram({ diagram }: { diagram: CaseDiagram }) {
  return (
    <figure className="case-diagram">
      <div className="case-diagram__chain">
        {diagram.steps.map((step, i) => (
          <Fragment key={step.label}>
            {i > 0 && (
              <span className="case-diagram__arrow" aria-hidden>
                →
              </span>
            )}
            <DiagramNode step={step} />
          </Fragment>
        ))}
        {diagram.outcomes && diagram.outcomes.length > 0 && (
          <>
            <span className="case-diagram__arrow" aria-hidden>
              →
            </span>
            <div className="case-diagram__outcomes">
              {diagram.outcomes.map((step) => (
                <DiagramNode key={step.label} step={step} />
              ))}
            </div>
          </>
        )}
      </div>
      {diagram.footnote && (
        <Typography as="figcaption" variant="t3" color="grey-5" className="case-diagram__footnote">
          {diagram.footnote}
        </Typography>
      )}
    </figure>
  );
}

function DecisionMedia({ decision, media }: { decision: CaseDecision; media: CaseFigure[] }) {
  const steps = decision.layout === "steps";
  // 4 кадра — сетка 2×2: пары «было / стало» по строкам; широкие кадры идут отдельным рядом и в счёт не входят
  const regular = media.filter((figure) => !figure.wide).length;
  const columns = regular === 4 ? 2 : Math.max(1, Math.min(regular, 3));

  return (
    <div
      className={cn("case-decision__media", steps && "case-decision__media--steps")}
      style={{ "--media-cols": columns } as React.CSSProperties}
    >
      {media.map((figure, i) => (
        <Fragment key={figure.src}>
          {steps && i > 0 && (
            <span className="case-decision__arrow" aria-hidden>
              →
            </span>
          )}
          <DecisionFigure figure={figure} columns={columns} step={steps ? (figure.step ?? i + 1) : undefined} />
        </Fragment>
      ))}
    </div>
  );
}

/** «Ключевые решения»: проблема → решение → результат → макеты «было / стало» или шаги сценария. */
export function CaseDecisions({ decisions, title }: { decisions: CaseDecision[]; title?: string }) {
  return (
    <section className="case-decisions" aria-labelledby="case-decisions-title">
      <SectionHeading id="case-decisions-title" label="Задачи и решения" title={title ?? "Ключевые решения"} />
      <ol className="case-decisions__list">
        {decisions.map((decision, i) => (
          <li key={decision.title} id={`decision-${i + 1}`} className="case-decision">
            <div className="case-decision__header">
              <div className="case-decision__meta">
                <Typography as="span" variant="tag" className="case-decision__number" aria-hidden>
                  {padNumber(i + 1)}
                </Typography>
                {decision.source && <Tag variant="light">{decision.source}</Tag>}
              </div>
              <Typography as="h3" variant={{ base: "t1b", lg: "h3" }} color="grey-8">
                {decision.title}
              </Typography>
            </div>

            <div className="case-decision__body">
              <div className="case-decision__point">
                <Typography as="h4" variant="tag" color="grey-5">
                  Проблема
                </Typography>
                <Typography variant={{ base: "t3", md: "t2" }} color="grey-6">
                  {decision.problem}
                </Typography>
              </div>
              <div className="case-decision__point">
                <Typography as="h4" variant="tag" color="blue-500">
                  Решение
                </Typography>
                <Typography variant={{ base: "t3", md: "t2" }} color="grey-8">
                  {decision.solution}
                </Typography>
                {decision.outcomes && (
                  <ul className="case-decision__outcomes">
                    {decision.outcomes.map((outcome) => (
                      <Typography
                        as="li"
                        key={outcome}
                        variant={{ base: "t3", md: "t2" }}
                        color="grey-6"
                        className="case-decision__outcome"
                      >
                        {outcome}
                      </Typography>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {decision.result && (
              <div className="case-decision__result">
                <Typography as="h4" variant="tag" color="blue-700">
                  Результат
                </Typography>
                <Typography variant={{ base: "t3", md: "t2" }} color="grey-8">
                  {decision.result}
                </Typography>
              </div>
            )}

            {decision.diagram && <DecisionDiagram diagram={decision.diagram} />}
            {decision.media && decision.media.length > 0 && <DecisionMedia decision={decision} media={decision.media} />}
          </li>
        ))}
      </ol>
    </section>
  );
}
