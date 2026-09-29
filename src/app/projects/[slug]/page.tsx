import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASES, PERSON, PROJECTS } from "@/constants";
import { getNextProject } from "@/utils";
import { CasePage } from "@/views/case-page";

type Params = { params: Promise<{ slug: string }> };

// Генерируются только проекты, для которых заполнен кейс в src/constants/cases
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = CASES[slug];
  if (!study) return {};
  return {
    title: `${study.title} — кейс | ${PERSON.fullName}`,
    description: study.lead,
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const study = CASES[slug];
  if (!study) notFound();

  return <CasePage study={study} next={getNextProject(PROJECTS, slug)} />;
}
