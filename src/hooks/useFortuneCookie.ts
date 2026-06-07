"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import {
  createFortuneCookieEntry,
  getTodayFortuneMessage,
  isFortuneOpenedToday,
  resolveFortuneMessage,
} from "@/lib/fortuneCookie";
import type { TemperamentGroup } from "@/types";
import type { MoonBuddyData } from "@/types/moonBuddy";

interface UseFortuneCookieOptions {
  characterName: string;
  temperament: TemperamentGroup;
}

export function useFortuneCookie(
  data: MoonBuddyData,
  setData: SetMoonBuddyData,
  { characterName, temperament }: UseFortuneCookieOptions,
) {
  const isOpenedToday = useMemo(
    () => isFortuneOpenedToday(data.fortuneCookie),
    [data.fortuneCookie],
  );

  const todayMessage = useMemo(
    () => getTodayFortuneMessage(data, temperament, characterName),
    [data, temperament, characterName],
  );

  const openFortuneCookie = useCallback((): string => {
    if (isOpenedToday && data.fortuneCookie) {
      return resolveFortuneMessage(
        data.settings.language,
        temperament,
        data.fortuneCookie.messageIndex,
        characterName,
        data.settings.userName,
      );
    }

    const entry = createFortuneCookieEntry(
      data.settings.language,
      temperament,
    );

    setData((prev) => ({
      ...prev,
      fortuneCookie: entry,
    }));

    return resolveFortuneMessage(
      data.settings.language,
      temperament,
      entry.messageIndex,
      characterName,
      data.settings.userName,
    );
  }, [
    isOpenedToday,
    data.fortuneCookie,
    data.settings.language,
    data.settings.userName,
    temperament,
    characterName,
    setData,
  ]);

  return {
    isOpenedToday,
    todayMessage,
    openFortuneCookie,
  };
}
