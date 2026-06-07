"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import {
  applyFeedToCompanion,
  isAscensionReady,
  markAscensionPending,
} from "@/lib/companionLifecycle";
import { getDominantMoodForDate, getMoodEntriesForDate } from "@/lib/dailyMood";
import { getLiveMoodReaction } from "@/lib/liveMood";
import { getTemperamentFromMbti } from "@/lib/mbti";
import { resolveCharacterName, getPersonaDefinition } from "@/lib/persona";
import { getTodayDateString } from "@/lib/storage";
import type { CycleInfo, LiveMood, MoonBuddyData } from "@/types/moonBuddy";

export function useMood(
  data: MoonBuddyData,
  setData: SetMoonBuddyData,
  cycleInfo: CycleInfo | null = null,
) {
  const todayDominantMood = useMemo(() => {
    const today = getTodayDateString();
    return getDominantMoodForDate(data.dailyMoodLogs, today);
  }, [data.dailyMoodLogs]);

  const todayMoodEntries = useMemo(() => {
    const today = getTodayDateString();
    return getMoodEntriesForDate(data.dailyMoodLogs, today);
  }, [data.dailyMoodLogs]);

  const appendMoodEntry = useCallback(
    (date: string, mood: LiveMood, applyCompanionFeed: boolean): string | null => {
      const entry = { date, mood, timestamp: Date.now() };
      const { settings } = data;
      const temperament = getTemperamentFromMbti(settings.mbti);
      const persona = getPersonaDefinition(temperament, settings.language);
      const characterName = resolveCharacterName(
        settings.buddyCustomName,
        persona.defaultBuddyName,
      );

      setData((prev) => {
        let companion = prev.companion;

        if (applyCompanionFeed) {
          const { companion: fedCompanion } = applyFeedToCompanion(
            prev.companion,
            mood,
          );

          const withCycle: typeof fedCompanion = {
            ...fedCompanion,
            cycleId: fedCompanion.cycleId ?? prev.periodHistory[0]?.id ?? null,
          };

          companion = isAscensionReady(
            { ...withCycle, ascensionPending: false },
            cycleInfo,
          )
            ? markAscensionPending(withCycle)
            : withCycle;
        }

        return {
          ...prev,
          dailyMoodLogs: [...prev.dailyMoodLogs, entry],
          companion,
          character: {
            ...prev.character,
            totalMoodLogs: prev.character.totalMoodLogs + 1,
          },
        };
      });

      return applyCompanionFeed
        ? getLiveMoodReaction(mood, settings.language, temperament, {
            userName: settings.userName,
            characterName,
          })
        : null;
    },
    [data, setData, cycleInfo],
  );

  const logLiveMood = useCallback(
    (mood: LiveMood): string => {
      const today = getTodayDateString();
      return appendMoodEntry(today, mood, true) ?? "";
    },
    [appendMoodEntry],
  );

  const logMoodForDate = useCallback(
    (date: string, mood: LiveMood) => {
      const today = getTodayDateString();
      appendMoodEntry(date, mood, date === today);
    },
    [appendMoodEntry],
  );

  return {
    todayDominantMood,
    todayMoodEntries,
    logLiveMood,
    logMoodForDate,
  };
}
