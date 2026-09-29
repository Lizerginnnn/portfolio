/**
 * Страницы кейсов (/projects/<id>). Шаблон один — src/views/case-page.
 * Новый кейс: файл рядом (например, new-project.ts) + строка в CASES с ключом, равным `id` проекта.
 */
import type { CaseStudy } from "@/types";
import { SELLSAVER_CASE } from "./sellsaver";
import { SMART_CASE } from "./smart";
import { MAPINS_CASE } from "./mapins";
import { NEWDEX_CASE } from "./newdex";
import { HAIRGRAD_CASE } from "./hairgrad";

export const CASES: Record<string, CaseStudy> = {
  sellsaver: SELLSAVER_CASE,
  smart: SMART_CASE,
  hairgrad: HAIRGRAD_CASE,
  newdex: NEWDEX_CASE,
  mapins: MAPINS_CASE,
};
