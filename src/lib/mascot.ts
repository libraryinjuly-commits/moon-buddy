import { PHASE_LABELS } from "@/lib/constants";
import {
  getPersonaDefinition,
  resolveCharacterName,
} from "@/lib/persona";
import {
  getMascotColors,
  getTemperamentFromMbti,
} from "@/lib/mbti";
import type { CyclePhase, Language, MascotConfig, TemperamentGroup } from "@/types";

interface MascotNameContext {
  buddyCustomName: string;
  language: Language;
}

function resolveMascotBuddyName(
  temperament: TemperamentGroup,
  context: MascotNameContext,
): string {
  const persona = getPersonaDefinition(temperament, context.language);
  return resolveCharacterName(context.buddyCustomName, persona.defaultBuddyName);
}

export function getMascotConfig(
  phase: CyclePhase,
  mbti: string,
  context: MascotNameContext,
): MascotConfig {
  const temperament = getTemperamentFromMbti(mbti);
  const colors = getMascotColors(temperament, phase);
  const buddyName = resolveMascotBuddyName(temperament, context);

  return {
    phase,
    label: PHASE_LABELS[phase],
    buddyName,
    bgColor: colors.bgColor,
    ringColor: colors.ringColor,
    temperament,
  };
}

export function getDefaultMascotConfig(
  mbti: string,
  context: MascotNameContext,
): MascotConfig {
  const temperament = getTemperamentFromMbti(mbti);
  const colors = getMascotColors(temperament, "default");
  const buddyName = resolveMascotBuddyName(temperament, context);

  return {
    phase: "default",
    label: buddyName,
    buddyName,
    bgColor: colors.bgColor,
    ringColor: colors.ringColor,
    temperament,
  };
}

export function getTemperament(mbti: string): TemperamentGroup {
  return getTemperamentFromMbti(mbti);
}
