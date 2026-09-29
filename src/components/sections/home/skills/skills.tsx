import { SKILLS } from "@/constants";
import { SectionHeading, SkillGroup, SkillList, Typography } from "@/components/ui";
import "./skills.scss";

export function Skills() {
  return (
    <section id="skills" className="skills" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" label="Навыки" title="Что умею" className="skills__heading" />

      {/* < lg: аккордеон */}
      <div className="skills__accordion">
        {SKILLS.map((group) => (
          <SkillGroup key={group.title} title={group.title} items={group.items} />
        ))}
      </div>

      {/* ≥ lg: три колонки */}
      <div className="skills__columns">
        {SKILLS.map((group) => (
          <div key={group.title} className="skills__column">
            <Typography as="h3" variant="t2b" color="grey-8">
              {group.title}
            </Typography>
            <SkillList items={group.items} className="skills__list" />
          </div>
        ))}
      </div>
    </section>
  );
}
