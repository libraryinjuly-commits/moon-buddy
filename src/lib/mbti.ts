import type { CyclePhase, MascotPhase, TemperamentGroup, TemperamentTheme } from "@/types";
import {
  getPastelMascotColors,
  TEMPERAMENT_THEMES as PASTEL_TEMPERAMENT_THEMES,
} from "@/lib/pastelTheme";

export { APP_THEME, PAGE_BG, SPECIES_PASTEL } from "@/lib/pastelTheme";

export const MBTI_TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export type MbtiType = (typeof MBTI_TYPES)[number];

/** Lowercase MBTI key for character assets, e.g. `enfp`, `intj` */
export type MbtiTypeKey = Lowercase<MbtiType>;

export const DEFAULT_MBTI_TYPE: MbtiTypeKey = "entp";

const MBTI_TO_TEMPERAMENT: Record<MbtiType, TemperamentGroup> = {
  INTJ: "NT",
  INTP: "NT",
  ENTJ: "NT",
  ENTP: "NT",
  INFJ: "NF",
  INFP: "NF",
  ENFJ: "NF",
  ENFP: "NF",
  ISTJ: "SJ",
  ISFJ: "SJ",
  ESTJ: "SJ",
  ESFJ: "SJ",
  ISTP: "SP",
  ISFP: "SP",
  ESTP: "SP",
  ESFP: "SP",
};

export const TEMPERAMENT_GROUPS: TemperamentGroup[] = ["NT", "NF", "SJ", "SP"];

export const TEMPERAMENT_THEMES: Record<TemperamentGroup, TemperamentTheme> =
  PASTEL_TEMPERAMENT_THEMES;

export function getTemperamentFromMbti(mbti: string): TemperamentGroup {
  const upper = mbti.toUpperCase() as MbtiType;
  return MBTI_TO_TEMPERAMENT[upper] ?? "NF";
}

export function getTemperamentTheme(temperament: TemperamentGroup): TemperamentTheme {
  return TEMPERAMENT_THEMES[temperament];
}

export function getMascotColors(
  temperament: TemperamentGroup,
  phase: MascotPhase,
): { bgColor: string; ringColor: string } {
  return getPastelMascotColors(temperament, phase);
}

export function isValidMbti(value: string): value is MbtiType {
  return MBTI_TYPES.includes(value.toUpperCase() as MbtiType);
}

export function normalizeMbti(value: string): MbtiType | "" {
  const upper = value.trim().toUpperCase();
  return isValidMbti(upper) ? upper : "";
}

export function isValidMbtiTypeKey(value: string): value is MbtiTypeKey {
  return isValidMbti(value.trim().toUpperCase());
}

export function normalizeMbtiType(value: string | undefined): MbtiTypeKey {
  const trimmed = value?.trim().toLowerCase() ?? "";
  if (isValidMbtiTypeKey(trimmed)) {
    return trimmed as MbtiTypeKey;
  }

  const fromMbti = normalizeMbti(value ?? "");
  if (fromMbti) {
    return fromMbti.toLowerCase() as MbtiTypeKey;
  }

  return DEFAULT_MBTI_TYPE;
}

export function mbtiTypeToMbti(key: MbtiTypeKey): MbtiType {
  return key.toUpperCase() as MbtiType;
}

export function mbtiToMbtiType(mbti: string): MbtiTypeKey {
  return normalizeMbtiType(mbti);
}

export function syncMbtiFields(
  mbti?: string,
  mbtiType?: string,
): { mbti: MbtiType | ""; mbtiType: MbtiTypeKey } {
  if (mbtiType && isValidMbtiTypeKey(mbtiType)) {
    const key = mbtiType.trim().toLowerCase() as MbtiTypeKey;
    return { mbti: mbtiTypeToMbti(key), mbtiType: key };
  }

  const normalizedMbti = normalizeMbti(mbti ?? "");
  if (normalizedMbti) {
    return {
      mbti: normalizedMbti,
      mbtiType: normalizedMbti.toLowerCase() as MbtiTypeKey,
    };
  }

  return { mbti: "", mbtiType: DEFAULT_MBTI_TYPE };
}

export function getMbtiTypeTitle(
  mbti: string,
  titles: Record<MbtiType, string>,
): string {
  const normalized = normalizeMbti(mbti);
  return normalized ? titles[normalized] : "";
}

export const MBTI_BY_GROUP: Record<TemperamentGroup, MbtiType[]> = {
  NT: ["INTJ", "INTP", "ENTJ", "ENTP"],
  NF: ["INFJ", "INFP", "ENFJ", "ENFP"],
  SJ: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  SP: ["ISTP", "ISFP", "ESTP", "ESFP"],
};
