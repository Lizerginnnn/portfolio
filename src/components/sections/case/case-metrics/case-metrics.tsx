import { Typography } from "@/components/ui";
import "./case-metrics.scss";

/** Полоса ключевых цифр под вводным блоком: 2 колонки на мобильном → 4 с 1280. */
export function CaseMetrics({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <dl className="case-metrics" aria-label="Ключевые цифры проекта">
      {metrics.map((metric) => (
        <div key={metric.label} className="case-metrics__item">
          <Typography as="dt" variant={{ base: "t3", md: "t2" }} color="grey-5">
            {metric.label}
          </Typography>
          <Typography as="dd" variant={{ base: "h3", lg: "h2" }} color="blue-700">
            {metric.value}
          </Typography>
        </div>
      ))}
    </dl>
  );
}
