import type { Responsive, TextVariant } from "@/types";
import { cn } from "@/utils";
import { Typography } from "../typography";
import "./section-heading.scss";

type HeadingSize = "l" | "m";

const TITLE_VARIANT: Record<HeadingSize, TextVariant> = { l: "h2", m: "h3" };

/** { base: "m", xxl: "l" } → { base: "h3", xxl: "h2" } */
function toTitleVariant(size: Responsive<HeadingSize>): Responsive<TextVariant> {
  if (typeof size === "string") return TITLE_VARIANT[size];
  return Object.fromEntries(
    Object.entries(size).map(([key, value]) => [key, TITLE_VARIANT[value as HeadingSize]]),
  ) as Responsive<TextVariant>;
}

type SectionHeadingProps = {
  label: string;
  title: string;
  /** l — h2 (34px) для крупных секций, m — h3 (24px); можно по брейкпоинтам: { base: "m", xxl: "l" }. */
  size?: Responsive<HeadingSize>;
  className?: string;
  id?: string;
};

export function SectionHeading({ label, title, size = "l", className, id }: SectionHeadingProps) {
  return (
    <div className={cn("section-heading", className)}>
      <Typography variant="tag" color="blue-400">
        {label}
      </Typography>
      <Typography as="h2" id={id} variant={toTitleVariant(size)} color="grey-8" className="section-heading__title">
        {title}
      </Typography>
    </div>
  );
}
