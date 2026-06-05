import { PHASE_LABELS } from "@/lib/constants";
import {
  getMascotColors,
  getTemperamentFromMbti,
  getTemperamentTheme,
} from "@/lib/mbti";
import type { CyclePhase, MascotConfig, TemperamentGroup } from "@/types";

export function getMascotConfig(
  phase: CyclePhase,
  mbti: string,
): MascotConfig {
  const temperament = getTemperamentFromMbti(mbti);
  const theme = getTemperamentTheme(temperament);
  const colors = getMascotColors(temperament, phase);

  return {
    phase,
    label: PHASE_LABELS[phase],
    buddyName: theme.buddyName,
    bgColor: colors.bgColor,
    ringColor: colors.ringColor,
    temperament,
  };
}

export function getDefaultMascotConfig(mbti: string): MascotConfig {
  const temperament = getTemperamentFromMbti(mbti);
  const theme = getTemperamentTheme(temperament);
  const colors = getMascotColors(temperament, "default");

  return {
    phase: "default",
    label: theme.buddyName,
    buddyName: theme.buddyName,
    bgColor: colors.bgColor,
    ringColor: colors.ringColor,
    temperament,
  };
}

export function getTemperament(mbti: string): TemperamentGroup {
  return getTemperamentFromMbti(mbti);
}
