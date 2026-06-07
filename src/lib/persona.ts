import type { Language, TemperamentGroup } from "@/types";
import { getDisplayName, getUserNameBase } from "@/lib/nameParticle";

export interface PersonaDefinition {
  personaLabel: string;
  personaRole: string;
  defaultBuddyName: string;
}

export const PERSONA_KO: Record<TemperamentGroup, PersonaDefinition> = {
  NF: {
    personaLabel: "사랑스러운 솜사탕",
    personaRole: "솜사탕",
    defaultBuddyName: "달 친구",
  },
  NT: {
    personaLabel: "이성적인 연구원",
    personaRole: "연구원",
    defaultBuddyName: "달 친구",
  },
  SJ: {
    personaLabel: "철저한 보안관",
    personaRole: "보안관",
    defaultBuddyName: "달 친구",
  },
  SP: {
    personaLabel: "호기심 많은 자유 영혼",
    personaRole: "탐험가",
    defaultBuddyName: "달 친구",
  },
};

export const PERSONA_EN: Record<TemperamentGroup, PersonaDefinition> = {
  NF: {
    personaLabel: "Lovable Cotton Candy",
    personaRole: "Cotton Candy",
    defaultBuddyName: "Moon Pal",
  },
  NT: {
    personaLabel: "Rational Researcher",
    personaRole: "Researcher",
    defaultBuddyName: "Moon Pal",
  },
  SJ: {
    personaLabel: "Thorough Guard",
    personaRole: "Guard",
    defaultBuddyName: "Moon Pal",
  },
  SP: {
    personaLabel: "Curious Free Spirit",
    personaRole: "Explorer",
    defaultBuddyName: "Moon Pal",
  },
};

export const PERSONA_JA: Record<TemperamentGroup, PersonaDefinition> = {
  NF: {
    personaLabel: "愛らしい綿あめ",
    personaRole: "綿あめ",
    defaultBuddyName: "月の友だち",
  },
  NT: {
    personaLabel: "理性的な研究員",
    personaRole: "研究員",
    defaultBuddyName: "月の友だち",
  },
  SJ: {
    personaLabel: "徹底した保安官",
    personaRole: "保安官",
    defaultBuddyName: "月の友だち",
  },
  SP: {
    personaLabel: "好奇心旺盛な自由な魂",
    personaRole: "探検家",
    defaultBuddyName: "月の友だち",
  },
};

const PERSONA_BY_LANG: Record<Language, Record<TemperamentGroup, PersonaDefinition>> =
  {
    KO: PERSONA_KO,
    EN: PERSONA_EN,
    JA: PERSONA_JA,
  };

export function getPersonaDefinition(
  temperament: TemperamentGroup,
  language: Language,
): PersonaDefinition {
  return PERSONA_BY_LANG[language][temperament];
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
