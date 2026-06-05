import { getLocale, normalizeLanguage } from "@/lib/i18n";
import { pickVariant } from "@/lib/pickVariant";
import { getTemperamentFromMbti, getTemperamentTheme } from "@/lib/mbti";
import { applyNameForLanguage } from "@/lib/nameParticle";
import type { CycleInsight, CyclePhase } from "@/types";

export function getCycleInsight(
  phase: CyclePhase | null,
  userName: string,
  mbti: string,
  language: string,
): CycleInsight {
  const lang = normalizeLanguage(language);
  const locale = getLocale(lang);

  if (!phase) {
    const buddyName = getTemperamentTheme(getTemperamentFromMbti(mbti)).buddyName;
    return {
      ...locale.defaultInsight,
      adviceClosing: `${locale.ui.slogan} — ${buddyName}`,
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
