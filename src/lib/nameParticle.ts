import type { Language } from "@/lib/i18n/types";

const DEFAULT_NAMES: Record<Language, string> = {
  KO: "친구야",
  EN: "friend",
  JA: "ともだち",
};

/** 받침 유무에 따라 자연스러운 호격 조사(아/야)를 붙여요. KO 전용 */
export function getVocativeName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return DEFAULT_NAMES.KO;

  const lastChar = trimmed[trimmed.length - 1];
  const code = lastChar.charCodeAt(0);

  if (code < 0xac00 || code > 0xd7a3) {
    return `${trimmed}야`;
  }

  const jong = (code - 0xac00) % 28;
  const particle = jong === 0 ? "야" : "아";
  return `${trimmed}${particle}`;
}

export function getDisplayName(name: string, language: Language): string {
  const trimmed = name.trim();
  if (!trimmed) return DEFAULT_NAMES[language];
  if (language === "KO") return getVocativeName(trimmed);
  return trimmed;
}

export function applyNameForLanguage(
  template: string,
  name: string,
  language: Language,
): string {
  return template.replaceAll("{name}", getDisplayName(name, language));
}

/** @deprecated Use applyNameForLanguage with language parameter */
export function applyVocativeName(template: string, name: string): string {
  return applyNameForLanguage(template, name, "KO");
}
