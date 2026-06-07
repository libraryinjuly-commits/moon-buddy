import { applySpeechTemplate } from "@/lib/persona";
import { getPersonaSpeechLines } from "@/lib/personaSpeechLines";
import type {
  CyclePhase,
  Language,
  MenstruationStatus,
  TemperamentGroup,
} from "@/types";

export interface BuddySpeechContext {
  userName: string;
  characterName: string;
}

export function buildBuddySpeechPool(
  phase: CyclePhase | null,
  language: Language,
  temperament: TemperamentGroup,
  context: BuddySpeechContext,
  menstruationStatus: MenstruationStatus,
): string[] {
  const lines = getPersonaSpeechLines(language, temperament);
  const pool: string[] = [];

  if (menstruationStatus === "ON_PERIOD") {
    pool.push(...lines.onPeriod.map((line) => personalize(line, context, language)));
  }

  if (phase) {
    pool.push(...lines[phase].map((line) => personalize(line, context, language)));
  } else {
    pool.push(...lines.default.map((line) => personalize(line, context, language)));
  }

  pool.push(...lines.comfort.map((line) => personalize(line, context, language)));

  return dedupe(pool);
}

function personalize(
  line: string,
  context: BuddySpeechContext,
  language: Language,
): string {
  if (!line.includes("{name}") && !line.includes("{characterName}")) {
    return line;
  }
  return applySpeechTemplate(line, {
    userName: context.userName,
    characterName: context.characterName,
    language,
  });
}

function dedupe(pool: string[]): string[] {
  return [...new Set(pool)];
}

export function getSpeechAtIndex(pool: string[], index: number): string {
  if (pool.length === 0) return "";
  return pool[index % pool.length];
}
