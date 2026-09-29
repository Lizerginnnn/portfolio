import { EDUCATION, EXPERIENCE, QUALITIES } from "@/constants";
import { GraduationPhoto, SectionHeading, Typography } from "@/components/ui";
import "./career.scss";

// На 1920 заголовки колонок крупнее (h2), на остальных — h3
const HEADING_SIZE = { base: "m", xxl: "l" } as const;

/** Опыт работы, образование и личные качества (фрейм «Background» в Figma). */
export function Career() {
  return (
    <section id="experience" className="career" aria-label="Опыт и образование">
      <div className="career__column career__column--experience">
        <SectionHeading label="опыт работы" title="3+ года в дизайне" size={HEADING_SIZE} />
        <ol className="career__timeline">
          {EXPERIENCE.map((job) => (
            <li key={job.period} className="career__job">
              <span className="career__marker" aria-hidden>
                <span className="career__dot" />
                <span className="career__line" />
              </span>
              <div className="career__job-text">
                {/* t4; до xxl в макете — Inter 11/16.5 (career.scss) */}
                <Typography variant="t4" className="career__period">
                  {job.period}
                </Typography>
                <Typography variant="t1b" className="career__role">
                  {job.role}
                </Typography>
                <Typography variant="t3" color="grey-5" className="career__place">
                  {job.place}
                </Typography>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="career__column career__column--education">
        <SectionHeading label="Образование" title={EDUCATION.university} size={HEADING_SIZE} />
        <div className="career__education">
          <div className="career__education-text">
            <Typography variant="t1" className="career__program">
              {EDUCATION.program}
            </Typography>
            <Typography variant="t1" color="grey-4">
              {EDUCATION.details}
            </Typography>
          </div>
          <GraduationPhoto />
        </div>
      </div>

      <div className="career__column career__column--qualities">
        <SectionHeading label="личные качества" title="Как я работаю" size={HEADING_SIZE} />
        <ul className="career__qualities">
          {QUALITIES.map((quality) => (
            <Typography as="li" key={quality} variant="t2b" color="grey-6" className="career__quality">
              <span className="career__arrow" aria-hidden>
                →
              </span>
              <span>{quality}</span>
            </Typography>
          ))}
        </ul>
      </div>
    </section>
  );
}
