import Link from "next/link";
import { ROUTES } from "@/constants";
import type { CaseStudy, Project } from "@/types";
import { Footer, Header } from "@/components/layout";
import { CaseIntroduction, Typography } from "@/components/ui";
import { CaseContext, CaseNav, CaseScreens, CaseTasks } from "@/components/sections/case";
import "./case-page.scss";

type CasePageProps = {
  study: CaseStudy;
  next?: Project;
};

/** Шаблон страницы кейса — одинаковый для всех проектов, контент из constants/cases. */
export function CasePage({ study, next }: CasePageProps) {
  return (
    <div className="case-page">
      <Header />
      <main className="case-page__main">
        <div className="case-page__content">
          <div>
            <Typography as={Link} href={ROUTES.projects} variant="t3b" className="case-page__back">
              ← Все проекты
            </Typography>
            <CaseIntroduction study={study} />
          </div>
          <CaseContext study={study} />
          <CaseTasks study={study} />
        </div>
        {study.screens && study.screens.length > 0 && <CaseScreens screens={study.screens} ratio={study.screensRatio} />}
        <CaseNav next={next} />
      </main>
      <Footer />
    </div>
  );
}
