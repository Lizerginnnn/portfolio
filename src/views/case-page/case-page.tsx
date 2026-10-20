import Link from "next/link";
import { collectCaseGallery, ROUTES } from "@/utils";
import type { CaseStudy, Project } from "@/types";
import { Footer, Header } from "@/components/layout";
import { CaseIntroduction, Typography } from "@/components/ui";
import {
  CaseArchitecture,
  CaseContext,
  CaseDecisions,
  CaseGallery,
  CaseMetrics,
  CaseNav,
  CaseTabs,
  CaseTasks,
  type CaseTab,
} from "@/components/sections/case";
import "./case-page.scss";

type CasePageProps = {
  study: CaseStudy;
  next?: Project;
};

/**
 * Шаблон страницы кейса — одинаковый для всех проектов, контент из constants/cases.
 * Под вводным блоком — табы: «Ключевые решения» первыми, «Описание» (цель, подход, структура) и «Макеты» (все картинки проекта).
 */
export function CasePage({ study, next }: CasePageProps) {
  const gallery = collectCaseGallery(study);

  const tabs: CaseTab[] = [
    {
      id: "decisions",
      label: "Ключевые решения",
      content: study.decisions ? <CaseDecisions decisions={study.decisions} title={study.headings?.tasks} /> : <CaseTasks study={study} />,
    },
    {
      id: "description",
      label: "Описание",
      content: (
        <>
          <CaseContext study={study} />
          {study.architecture && <CaseArchitecture architecture={study.architecture} />}
        </>
      ),
    },
  ];
  // у проектов под NDA картинок может не быть — тогда вкладки «Макеты» нет
  if (gallery.length > 0) tabs.push({ id: "mockups", label: "Макеты", content: <CaseGallery items={gallery} /> });

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
          {study.metrics && <CaseMetrics metrics={study.metrics} />}
          <CaseTabs tabs={tabs} />
        </div>
        <CaseNav next={next} />
      </main>
      <Footer />
    </div>
  );
}
