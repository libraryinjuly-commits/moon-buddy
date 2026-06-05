import { enLocale } from "@/lib/i18n/locales/en";
import { jaLocale } from "@/lib/i18n/locales/ja";
import { koLocale } from "@/lib/i18n/locales/ko";
import type { Language, LocaleContent } from "@/lib/i18n/types";

const LOCALES: Record<Language, LocaleContent> = {
  KO: koLocale,
  EN: enLocale,
  JA: jaLocale,
};

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "KO", label: "한국어" },
  { code: "EN", label: "English" },
  { code: "JA", label: "日本語" },
];

export function getLocale(language: string): LocaleContent {
  const code = (language.toUpperCase() as Language) || "KO";
  return LOCALES[code] ?? koLocale;
}

export function normalizeLanguage(language: string): Language {
  const code = language.toUpperCase();
  if (code === "EN" || code === "JA") return code;
  return "KO";
}

export type { Language, LocaleContent, LocaleUI } from "@/lib/i18n/types";
