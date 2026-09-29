import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { cn } from "@/utils";
import { CroppedImage } from "../cropped-image";
import { Typography } from "../typography";
import "./project-card.scss";

const IMAGE_SIZES = "(min-width: 1920px) 680px, (min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

/** ui-kit → project card (0:4777). Hover = Variant2: голубой фон, рамка и чипсы на картинке. */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const { image, tags } = project;
  const alt = `${project.title} — ${project.kicker.toLowerCase()}`;

  return (
    <article className={cn("project-card", className)}>
      {image && (
        <div className="project-card__media">
          {image.crop ? (
            <CroppedImage
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              sizes={IMAGE_SIZES}
              crop={image.crop}
            />
          ) : (
            <Image src={image.src} alt={alt} fill sizes={IMAGE_SIZES} style={{ objectFit: "cover" }} />
          )}
          {tags && tags.length > 0 && (
            <ul className="project-card__tags" aria-label="Платформы">
              {tags.map((tag) => (
                <Typography as="li" key={tag} variant="t3" color="blue-700" nowrap className="project-card__chip">
                  {tag}
                </Typography>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="project-card__info">
        <div className="project-card__titles">
          <p className="project-card__kicker">{project.kicker}</p>
          <Typography as="h3" variant="h3" color="grey-8">
            {project.title}
          </Typography>
        </div>
        {project.badge && (
          <Typography variant="t3b" color="blue-700" nowrap className="project-card__badge">
            {project.badge}
          </Typography>
        )}
      </div>

      <p className="project-card__description">{project.description}</p>

      <div className="project-card__footer">
        <Typography as={Link} href={project.href} variant="t3b" className="project-card__more">
          Смотреть →<span className="visually-hidden"> проект {project.title}</span>
        </Typography>
      </div>
    </article>
  );
}
