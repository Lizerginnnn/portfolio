import type { Project } from "@/types";

/** Следующий проект по списку на главной (после последнего — снова первый). */
export function getNextProject(projects: Project[], id: string): Project | undefined {
  const index = projects.findIndex((project) => project.id === id);
  if (index < 0 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}
