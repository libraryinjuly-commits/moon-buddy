import { getLocale, normalizeLanguage } from "@/lib/i18n";
import { pickVariant } from "@/lib/pickVariant";
import { getTemperamentFromMbti } from "@/lib/mbti";
import { applyNameForLanguage } from "@/lib/nameParticle";
import { getPersonaDefinition, resolveCharacterName } from "@/lib/persona";
import type { CycleInsight, CyclePhase } from "@/types";

export function getCycleInsight(
  phase: CyclePhase | null,
  userName: string,
  mbti: string,
  language: string,
  buddyCustomName = "",
): CycleInsight {
  const lang = normalizeLanguage(language);
  const locale = getLocale(lang);
  const temperament = getTemperamentFromMbti(mbti);
  const persona = getPersonaDefinition(temperament, lang);
  const characterName = resolveCharacterName(
    buddyCustomName,
    persona.defaultBuddyName,
  );

  if (!phase) {
    return {
      ...locale.defaultInsight,
      adviceClosing: `${locale.ui.slogan} — ${characterName}`,
    };
  }

  const insight = locale.cycleInsights[phase];
  const closing = applyNameForLanguage(
    pickVariant(locale.cycleClosing[phase]),
    userName,
    lang,
  );

  return {
    status: insight.status,
    adviceItems: insight.adviceItems,
    adviceClosing: closing,
  };
}
