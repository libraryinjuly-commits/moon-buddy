import { getLocale, normalizeLanguage } from "@/lib/i18n";
import type { CyclePhase } from "@/types";

export function getRhythmBriefMessage(
  phase: CyclePhase | null,
  language: string,
  companionName: string,
): string {
  const lang = normalizeLanguage(language);
  const locale = getLocale(lang);
  const template = phase
    ? locale.rhythmPhaseBrief[phase]
    : locale.rhythmPhaseBrief.default;

  return template.replace("{companionName}", companionName);
}
