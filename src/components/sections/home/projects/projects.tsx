import { PROJECTS } from "@/constants";
import { SECTION_IDS, cn } from "@/utils";
import { ProjectCard, SectionHeading } from "@/components/ui";
import "./projects.scss";

export function Projects() {
  return (
    <section id={SECTION_IDS.projects} className="projects" aria-labelledby="projects-title">
      <SectionHeading id="projects-title" label="опыт работы" title="Проекты" className="projects__heading" />

      <div className="projects__grid">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={cn("projects__item", !project.image && "projects__item--text-only")}
          />
        ))}
      </div>
    </section>
  );
}
