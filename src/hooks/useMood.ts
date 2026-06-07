"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { getDominantMoodForDate, getMoodEntriesForDate } from "@/lib/dailyMood";
import { getLiveMoodReaction } from "@/lib/liveMood";
import { getTemperamentFromMbti } from "@/lib/mbti";
import { resolveCharacterName, getPersonaDefinition } from "@/lib/persona";
import { addExp, LIVE_MOOD_EXP } from "@/lib/rewards";
import { getTodayDateString } from "@/lib/storage";
import type { LiveMood, MoonBuddyData } from "@/types/moonBuddy";

export function useMood(data: MoonBuddyData, setData: SetMoonBuddyData) {
  const todayDominantMood = useMemo(() => {
    const today = getTodayDateString();
    return getDominantMoodForDate(data.dailyMoodLogs, today);
  }, [data.dailyMoodLogs]);

  const todayMoodEntries = useMemo(() => {
    const today = getTodayDateString();
    return getMoodEntriesForDate(data.dailyMoodLogs, today);
  }, [data.dailyMoodLogs]);

  const logLiveMood = useCallback(
    (mood: LiveMood): string => {
      const today = getTodayDateString();
      const entry = { date: today, mood, timestamp: Date.now() };
      const { settings } = data;
      const temperament = getTemperamentFromMbti(settings.mbti);
      const persona = getPersonaDefinition(temperament, settings.language);
      const characterName = resolveCharacterName(
        settings.buddyCustomName,
        persona.defaultBuddyName,
      );

      setData((prev) => ({
        ...prev,
        dailyMoodLogs: [...prev.dailyMoodLogs, entry],
        character: addExp(
          {
            ...prev.character,
            totalMoodLogs: prev.character.totalMoodLogs + 1,
          },
          LIVE_MOOD_EXP,
        ),
      }));

      return getLiveMoodReaction(mood, settings.language, temperament, {
        userName: settings.userName,
        characterName,
      });
    },
    [data, setData],
  );

  return {
    todayDominantMood,
    todayMoodEntries,
    logLiveMood,
  };
}
