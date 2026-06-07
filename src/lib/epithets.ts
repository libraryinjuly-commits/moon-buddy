import { getLocale, normalizeLanguage } from "@/lib/i18n";
import {
  formatPersonaTitle,
  getPersonaDefinition,
  resolveCharacterName,
} from "@/lib/persona";
import type { BuddyIdentity, TemperamentGroup } from "@/types";
import type { Language } from "@/types/moonBuddy";

const MAX_EPITHET_LEVEL = 5;

export function getEpithetLevel(level: number): number {
  return Math.min(Math.max(level, 1), MAX_EPITHET_LEVEL);
}

export function getEpithet(level: number, language: string): string {
  const locale = getLocale(normalizeLanguage(language));
  return locale.epithets[getEpithetLevel(level)];
}

/** @deprecated Use resolveCharacterName from persona.ts */
export function resolveBuddyCustomName(
  customName: string,
  fallbackName: string,
): string {
  return resolveCharacterName(customName, fallbackName);
}

export function getBuddyIdentity(
  level: number,
  customName: string,
  temperament: TemperamentGroup,
  language: Language,
): BuddyIdentity {
  const locale = getLocale(language);
  const persona = getPersonaDefinition(temperament, language);
  const epithetLevel = getEpithetLevel(level);
  const epithet = locale.epithets[epithetLevel];
  const name = resolveCharacterName(customName, persona.defaultBuddyName);
  const displayTitle = formatPersonaTitle(persona.personaRole, name);

  const hasNextEpithet = epithetLevel < MAX_EPITHET_LEVEL;
  const nextEpithetLevel = hasNextEpithet ? epithetLevel + 1 : null;
  const nextEpithet = nextEpithetLevel
    ? locale.epithets[nextEpithetLevel]
    : null;

  return {
    epithet,
    personaRole: persona.personaRole,
    personaLabel: persona.personaLabel,
    customName: name,
    displayTitle,
    level: epithetLevel,
    nextEpithet,
    nextEpithetLevel,
  };
}
