import {
  getFortuneMessages,
  pickFortuneMessageIndex,
} from "@/lib/fortuneCookieMessages";
import { applySpeechTemplate } from "@/lib/persona";
import { getTodayDateString } from "@/lib/storage";
import type { TemperamentGroup } from "@/types";
import type {
  DailyFortuneCookie,
  Language,
  MoonBuddyData,
} from "@/types/moonBuddy";

export function isFortuneOpenedToday(
  fortuneCookie: DailyFortuneCookie | null | undefined,
): boolean {
  return fortuneCookie?.date === getTodayDateString();
}

export function resolveFortuneMessage(
  language: Language,
  temperament: TemperamentGroup,
  messageIndex: number,
  characterName: string,
  userName: string,
): string {
  const pool = getFortuneMessages(language, temperament);
  const template = pool[messageIndex % pool.length] ?? pool[0] ?? "";
  return applySpeechTemplate(template, {
    userName,
    characterName,
    language,
  });
}

export function getTodayFortuneMessage(
  data: MoonBuddyData,
  temperament: TemperamentGroup,
  characterName: string,
): string | null {
  if (!isFortuneOpenedToday(data.fortuneCookie)) return null;

  return resolveFortuneMessage(
    data.settings.language,
    temperament,
    data.fortuneCookie!.messageIndex,
    characterName,
    data.settings.userName,
  );
}

export function createFortuneCookieEntry(
  language: Language,
  temperament: TemperamentGroup,
): DailyFortuneCookie {
  const pool = getFortuneMessages(language, temperament);
  return {
    date: getTodayDateString(),
    messageIndex: pickFortuneMessageIndex(pool.length),
  };
}
