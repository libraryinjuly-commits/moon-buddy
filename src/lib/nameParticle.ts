import type { Language } from "@/lib/i18n/types";

const DEFAULT_NAMES: Record<Language, string> = {
  KO: "친구님",
  EN: "friend",
  JA: "ともだち",
};

const DEFAULT_NAME_BASE: Record<Language, string> = {
  KO: "친구",
  EN: "friend",
  JA: "ともだち",
};

/** `{userName}님` 템플릿용 — 이름만 반환 (님은 템플릿에 포함) */
export function getUserNameBase(name: string, language: Language): string {
  const trimmed = name.trim();
  return trimmed || DEFAULT_NAME_BASE[language];
}

export function getDisplayName(name: string, language: Language): string {
  const trimmed = name.trim();
  if (!trimmed) return DEFAULT_NAMES[language];
  if (language === "KO") return `${trimmed}님`;
  if (language === "JA") return `${trimmed}さん`;
  return trimmed;
}

export function applyNameForLanguage(
  template: string,
  name: string,
  language: Language,
): string {
  return template
    .replaceAll("{userName}", getUserNameBase(name, language))
    .replaceAll("{name}", getDisplayName(name, language));
}

/** @deprecated Use applyNameForLanguage with language parameter */
export function applyVocativeName(template: string, name: string): string {
  return applyNameForLanguage(template, name, "KO");
}
