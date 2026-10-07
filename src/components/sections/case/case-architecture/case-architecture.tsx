import { Fragment } from "react";
import Image from "next/image";
import type { CaseArchitecture as Architecture, CaseArchitectureSection } from "@/types";
import { padNumber, withBasePath } from "@/utils";
import { SectionHeading, Typography } from "@/components/ui";
import "./case-architecture.scss";

function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="case-architecture__items">
      {items.map((item) => (
        <Typography as="li" key={item} variant="t3" color="grey-5" className="case-architecture__item">
          {item}
        </Typography>
      ))}
    </ul>
  );
}

/** Уровень рабочего цикла: название, вопрос пользователя, экраны и ссылки на решения. */
function FlowStep({ section, index }: { section: CaseArchitectureSection; index: number }) {
  return (
    <li className="case-architecture__step">
      <div className="case-architecture__step-head">
        <Typography as="span" variant="tag" color="blue-400" aria-hidden>
          {padNumber(index + 1)}
        </Typography>
        <Typography as="h3" variant={{ base: "t1b", lg: "h3" }} color="grey-8">
          {section.title}
        </Typography>
        {section.question && (
          <Typography variant={{ base: "t2", lg: "t1" }} color="blue-700">
            «{section.question}»
          </Typography>
        )}
      </div>

      <div className="case-architecture__step-body">
        <ItemList items={section.items} />
        {section.groups?.map((group) => (
          <div key={group.title} className="case-architecture__group">
            <Typography as="h4" variant="t3b" color="blue-700">
              {group.title}
            </Typography>
            <ItemList items={group.items} />
          </div>
        ))}
      </div>

      {section.decisions && section.decisions.length > 0 && (
        <div className="case-architecture__links">
          <Typography as="span" variant="tag" color="grey-5">
            Решения
          </Typography>
          {section.decisions.map((n) => (
            <Typography
              as="a"
              key={n}
              href={`#decision-${n}`}
              variant="tag"
              color="blue-700"
              className="case-architecture__link"
            >
              {padNumber(n)}
            </Typography>
          ))}
        </div>
      )}
    </li>
  );
}

/** Информационная архитектура в два уровня: рабочий цикл (или роли) со стрелками и строка сервисных разделов. */
export function CaseArchitecture({ architecture }: { architecture: Architecture }) {
  const roles = architecture.layout === "roles";
  const flowTitle = architecture.flowTitle ?? (roles ? "Роли и их пути" : "Рабочий цикл");

  return (
    <section className="case-architecture" aria-labelledby="case-architecture-title">
      <div className="case-architecture__intro">
        <SectionHeading id="case-architecture-title" label="Информационная архитектура" title="Структура сервиса" />
        <Typography variant={{ base: "t2", lg: "t1" }} color="grey-5" className="case-architecture__lead">
          {architecture.lead}
        </Typography>
      </div>

      <div className="case-architecture__map">
        <div className="case-architecture__level">
          <Typography as="h3" variant="tag" color="blue-500">
            {flowTitle}
          </Typography>
          <ol className="case-architecture__flow">
            {architecture.flow.map((section, i) => (
              <Fragment key={section.title}>
                {i > 0 && (
                  <li className="case-architecture__arrow" aria-hidden>
                    {roles ? "⇄" : "→"}
                  </li>
                )}
                <FlowStep section={section} index={i} />
              </Fragment>
            ))}
          </ol>
        </div>

        {architecture.support && architecture.support.length > 0 && (
          <div className="case-architecture__level">
            <Typography as="h3" variant="tag" color="grey-5">
              Сервисные разделы
            </Typography>
            <ul className="case-architecture__support">
              {architecture.support.map((item) => (
                <li key={item.title} className="case-architecture__support-item">
                  <Typography as="span" variant="t3b" color="grey-8">
                    {item.title}
                  </Typography>
                  {item.note && (
                    <Typography as="span" variant="t3" color="grey-5">
                      {item.note}
                    </Typography>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {architecture.sketch && (
        <figure className="case-architecture__sketch">
          <Image
            src={withBasePath(architecture.sketch.src)}
            alt={architecture.sketch.alt}
            width={architecture.sketch.width}
            height={architecture.sketch.height}
            sizes="(min-width: 1280px) 900px, 100vw"
            className="case-architecture__sketch-image"
          />
          {architecture.sketch.caption && (
            <Typography as="figcaption" variant="t3" color="grey-5" align="center">
              {architecture.sketch.caption}
            </Typography>
          )}
        </figure>
      )}
    </section>
  );
}
