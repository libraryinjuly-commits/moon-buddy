import { getLocale, normalizeLanguage } from "@/lib/i18n";
import type { BuddyIdentity } from "@/types";

const MAX_EPITHET_LEVEL = 5;

export function getEpithetLevel(level: number): number {
  return Math.min(Math.max(level, 1), MAX_EPITHET_LEVEL);
}

export function getEpithet(level: number, language: string): string {
  const locale = getLocale(normalizeLanguage(language));
  return locale.epithets[getEpithetLevel(level)];
}

export function resolveBuddyCustomName(
  customName: string,
  fallbackName: string,
): string {
  const trimmed = customName.trim();
  return trimmed.length > 0 ? trimmed : fallbackName;
}

export function getBuddyIdentity(
  level: number,
  customName: string,
  fallbackName: string,
  language: string,
): BuddyIdentity {
  const locale = getLocale(normalizeLanguage(language));
  const epithetLevel = getEpithetLevel(level);
  const epithet = locale.epithets[epithetLevel];
  const name = resolveBuddyCustomName(customName, fallbackName);
  const displayTitle = `${epithet} ${name}`;

  const hasNextEpithet = epithetLevel < MAX_EPITHET_LEVEL;
  const nextEpithetLevel = hasNextEpithet ? epithetLevel + 1 : null;
  const nextEpithet = nextEpithetLevel
    ? locale.epithets[nextEpithetLevel]
    : null;

  return {
    epithet,
    customName: name,
    displayTitle,
    level: epithetLevel,
    nextEpithet,
    nextEpithetLevel,
  };
}
