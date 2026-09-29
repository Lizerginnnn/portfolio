import Image from "next/image";
import type { CaseStudy } from "@/types";
import { Tag } from "../tag";
import { Typography } from "../typography";
import "./case-introduction.scss";

/** ui-kit → Case introduction (26:1488): Mobile (до 1280) / Desktop (от 1280). */
export function CaseIntroduction({ study }: { study: CaseStudy }) {
  return (
    <section className="case-intro" aria-labelledby="case-title">
      <div className="case-intro__copy">
        <div className="case-intro__summary">
          <Tag variant="light">{study.category}</Tag>
          <Typography as="h1" id="case-title" variant={{ base: "h2", lg: "h1" }} color="grey-8">
            {study.title}
          </Typography>
          <Typography variant={{ base: "t2", lg: "t1" }} color="grey-5" className="case-intro__lead">
            {study.lead}
          </Typography>
        </div>

        <dl className="case-intro__details">
          {study.details.map((item) => (
            <div key={item.label} className="case-intro__detail">
              <Typography as="dt" variant="tag" color="blue-400">
                {item.label}
              </Typography>
              <Typography as="dd" variant={{ base: "t3b", lg: "t2b" }} color="grey-8">
                {item.value}
              </Typography>
            </div>
          ))}
        </dl>
      </div>

      <div className="case-intro__hero">
        <Image
          src={study.hero.src}
          alt={study.hero.alt}
          fill
          priority
          sizes="(min-width: 1280px) 480px, (min-width: 768px) 660px, 100vw"
          style={{ objectFit: "cover", objectPosition: study.hero.position }}
        />
      </div>
    </section>
  );
}
