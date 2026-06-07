import { getTemperamentFromMbti, TEMPERAMENT_GROUPS } from "@/lib/mbti";
import type { Language, TemperamentGroup } from "@/types";
import type { UserSettings } from "@/types/moonBuddy";

export type CompanionSpeciesKey =
  | "moon_rabbit"
  | "star_fox"
  | "cloud_bear"
  | "dream_squirrel";

export interface CompanionSpecies {
  temperament: TemperamentGroup;
  key: CompanionSpeciesKey;
  emoji: string;
  idleAnimationClass: string;
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  personaLabel: Record<Language, string>;
  defaultBuddyName: Record<Language, string>;
}

export const COMPANION_SPECIES: Record<TemperamentGroup, CompanionSpecies> = {
  NF: {
    temperament: "NF",
    key: "moon_rabbit",
    emoji: "🐰",
    idleAnimationClass: "animate-mascot-idle-rabbit",
    name: {
      KO: "달토끼",
      EN: "Moon Rabbit",
      JA: "月うさぎ",
    },
    tagline: {
      KO: "따뜻한 말과 부드러운 위로로 곁을 지켜요",
      EN: "Keeps you company with warmth and gentle comfort",
      JA: "あたたかな言葉とやさしい寄り添いでそばにいます",
    },
    personaLabel: {
      KO: "다정한 달토끼",
      EN: "Tender Moon Rabbit",
      JA: "やさしい月うさぎ",
    },
    defaultBuddyName: {
      KO: "달토끼",
      EN: "Moon Rabbit",
      JA: "月うさぎ",
    },
  },
  NT: {
    temperament: "NT",
    key: "star_fox",
    emoji: "🦊",
    idleAnimationClass: "animate-mascot-idle-fox",
    name: {
      KO: "별여우",
      EN: "Star Fox",
      JA: "星きつね",
    },
    tagline: {
      KO: "차분한 관찰과 명확한 말로 마음을 정리해 줘요",
      EN: "Helps you sort your feelings with calm clarity",
      JA: "落ち着いた観察と明確な言葉で気持ちを整えます",
    },
    personaLabel: {
      KO: "빛나는 별여우",
      EN: "Bright Star Fox",
      JA: "ひかる星きつね",
    },
    defaultBuddyName: {
      KO: "별여우",
      EN: "Star Fox",
      JA: "星きつね",
    },
  },
  SJ: {
    temperament: "SJ",
    key: "cloud_bear",
    emoji: "🐻",
    idleAnimationClass: "animate-mascot-idle-bear",
    name: {
      KO: "구름곰",
      EN: "Cloud Bear",
      JA: "雲くま",
    },
    tagline: {
      KO: "꾸준한 루틴과 든든한 말로 안정감을 지켜 줘요",
      EN: "Guards your peace with steady routines and reassurance",
      JA: "穏やかなルーティンと頼もしい言葉で安心を守ります",
    },
    personaLabel: {
      KO: "포근한 구름곰",
      EN: "Cozy Cloud Bear",
      JA: "ふわふわの雲くま",
    },
    defaultBuddyName: {
      KO: "구름곰",
      EN: "Cloud Bear",
      JA: "雲くま",
    },
  },
  SP: {
    temperament: "SP",
    key: "dream_squirrel",
    emoji: "🐿️",
    idleAnimationClass: "animate-mascot-idle-squirrel",
    name: {
      KO: "꿈다람쥐",
      EN: "Dream Squirrel",
      JA: "ゆめりす",
    },
    tagline: {
      KO: "호기심 가득한 말로 오늘의 감정을 함께 탐험해요",
      EN: "Explores today's feelings with playful curiosity",
      JA: "好奇心いっぱいの言葉で今日の気持ちを一緒に探検します",
    },
    personaLabel: {
      KO: "호기심 꿈다람쥐",
      EN: "Curious Dream Squirrel",
      JA: "好奇心ゆめりす",
    },
    defaultBuddyName: {
      KO: "꿈다람쥐",
      EN: "Dream Squirrel",
      JA: "ゆめりす",
    },
  },
};

export function getCompanionSpecies(
  temperament: TemperamentGroup,
): CompanionSpecies {
  return COMPANION_SPECIES[temperament];
}

export function isTemperamentGroup(value: string): value is TemperamentGroup {
  return TEMPERAMENT_GROUPS.includes(value as TemperamentGroup);
}

/** Profile stores temperament; falls back to MBTI mapping. */
export function resolveTemperament(
  settings: Pick<UserSettings, "mbti" | "temperament">,
): TemperamentGroup {
  if (settings.temperament && isTemperamentGroup(settings.temperament)) {
    return settings.temperament;
  }
  return getTemperamentFromMbti(settings.mbti);
}

export function temperamentFromMbti(mbti: string): TemperamentGroup {
  return getTemperamentFromMbti(mbti);
}

export function getSpeciesIdleClass(temperament: TemperamentGroup): string {
  return getCompanionSpecies(temperament).idleAnimationClass;
}
