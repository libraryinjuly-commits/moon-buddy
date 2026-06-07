import type { Language, TemperamentGroup } from "@/types";
import { getCompanionSpecies } from "@/lib/companionSpecies";
import { getDisplayName, getUserNameBase } from "@/lib/nameParticle";

export interface PersonaDefinition {
  personaLabel: string;
  personaRole: string;
  defaultBuddyName: string;
  speciesName: string;
  speciesEmoji: string;
  speciesTagline: string;
}

export function getPersonaDefinition(
  temperament: TemperamentGroup,
  language: Language,
): PersonaDefinition {
  const species = getCompanionSpecies(temperament);

  return {
    personaLabel: species.personaLabel[language],
    personaRole: species.name[language],
    defaultBuddyName: species.defaultBuddyName[language],
    speciesName: species.name[language],
    speciesEmoji: species.emoji,
    speciesTagline: species.tagline[language],
  };
}

export function resolveCharacterName(
  customName: string,
  defaultBuddyName: string,
): string {
  const trimmed = customName.trim();
  return trimmed.length > 0 ? trimmed : defaultBuddyName;
}

export interface SpeechTemplateContext {
  userName: string;
  characterName: string;
  language: Language;
}

export function applySpeechTemplate(
  template: string,
  context: SpeechTemplateContext,
): string {
  const { userName, characterName, language } = context;
  return template
    .replaceAll("{userName}", getUserNameBase(userName, language))
    .replaceAll("{characterName}", characterName)
    .replaceAll("{name}", getDisplayName(userName, language));
}

export function formatPersonaTitle(
  personaRole: string,
  characterName: string,
): string {
  return `${personaRole} ${characterName}`;
}
