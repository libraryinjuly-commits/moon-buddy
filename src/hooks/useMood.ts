"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { getLiveMoodReaction } from "@/lib/liveMood";
import {
  addDateToPeriods,
  isDateInPeriod,
  removeDateFromPeriods,
} from "@/lib/periodDays";
import {
  addExp,
  clampLunaPoints,
  getExpForMood,
  getLunaForMood,
  LIVE_MOOD_LUNA,
} from "@/lib/rewards";
import { getTodayDateString } from "@/lib/storage";
import type { LiveMood, Mood, MoonBuddyData } from "@/types/moonBuddy";

export function useMood(data: MoonBuddyData, setData: SetMoonBuddyData) {
  const todayMood = useMemo(() => {
    const today = getTodayDateString();
    return data.moodLogs.find((log) => log.date === today)?.mood ?? null;
  }, [data.moodLogs]);

  const todayLiveEntries = useMemo(() => {
    const today = getTodayDateString();
    return data.liveMoodLogs.find((log) => log.date === today)?.entries ?? [];
  }, [data.liveMoodLogs]);

  const logMood = useCallback(
    (mood: Mood) => {
      const today = getTodayDateString();
      const existing = data.moodLogs.find((log) => log.date === today);
      const newExpAmount = getExpForMood(mood);
      const oldExpAmount = existing ? getExpForMood(existing.mood) : 0;
      const expDelta = newExpAmount - oldExpAmount;

      setData((prev) => {
        const moodLogs = existing
          ? prev.moodLogs.map((log) =>
              log.date === today ? { ...log, mood } : log,
            )
          : [...prev.moodLogs, { date: today, mood }];

        const character = addExp(
          {
            ...prev.character,
            totalMoodLogs: existing
              ? prev.character.totalMoodLogs
              : prev.character.totalMoodLogs + 1,
          },
          expDelta,
        );

        const lunaDelta = existing ? 0 : getLunaForMood(mood);

        return {
          ...prev,
          moodLogs,
          character,
          luna: {
            ...prev.luna,
            lunaPoints: prev.luna.lunaPoints + lunaDelta,
          },
        };
      });
    },
    [data.moodLogs, setData],
  );

  const logLiveMood = useCallback(
    (mood: LiveMood): string => {
      const today = getTodayDateString();
      const now = new Date().toISOString();
      const entry = { time: now, mood };
      setData((prev) => {
        const existing = prev.liveMoodLogs.find((log) => log.date === today);
        const liveMoodLogs = existing
          ? prev.liveMoodLogs.map((log) =>
              log.date === today
                ? { ...log, entries: [...log.entries, entry] }
                : log,
            )
          : [...prev.liveMoodLogs, { date: today, entries: [entry] }];

        return {
          ...prev,
          liveMoodLogs,
          luna: {
            ...prev.luna,
            lunaPoints: prev.luna.lunaPoints + LIVE_MOOD_LUNA,
          },
        };
      });

      return getLiveMoodReaction(mood, data.settings.language);
    },
    [data.settings.language, setData],
  );

  const updateDayRecord = useCallback(
    (date: string, mood: Mood | null, isPeriod: boolean) => {
      setData((prev) => {
        const existingMood = prev.moodLogs.find((log) => log.date === date);
        const wasPeriod = isDateInPeriod(date, prev.periods);

        let moodLogs = prev.moodLogs;
        let character = prev.character;
        let lunaPoints = prev.luna.lunaPoints;

        if (mood !== (existingMood?.mood ?? null)) {
          const oldExp = existingMood ? getExpForMood(existingMood.mood) : 0;
          const newExp = mood ? getExpForMood(mood) : 0;
          const expDelta = newExp - oldExp;

          if (existingMood && !mood) {
            moodLogs = moodLogs.filter((log) => log.date !== date);
            character = addExp(
              {
                ...character,
                totalMoodLogs: Math.max(0, character.totalMoodLogs - 1),
              },
              -oldExp,
            );
            lunaPoints = clampLunaPoints(
              lunaPoints - getLunaForMood(existingMood.mood),
            );
          } else if (!existingMood && mood) {
            moodLogs = [...moodLogs, { date, mood }];
            character = addExp(
              {
                ...character,
                totalMoodLogs: character.totalMoodLogs + 1,
              },
              newExp,
            );
            lunaPoints += getLunaForMood(mood);
          } else if (existingMood && mood) {
            moodLogs = moodLogs.map((log) =>
              log.date === date ? { ...log, mood } : log,
            );
            character = addExp(character, expDelta);
          }
        }

        let periods = prev.periods;
        if (isPeriod !== wasPeriod) {
          periods = isPeriod
            ? addDateToPeriods(date, periods)
            : removeDateFromPeriods(date, periods);
        }

        return {
          ...prev,
          moodLogs,
          character,
          periods,
          luna: { ...prev.luna, lunaPoints },
        };
      });
    },
    [setData],
  );

  const deleteDayRecord = useCallback(
    (date: string) => {
      setData((prev) => {
        const existingMood = prev.moodLogs.find((log) => log.date === date);
        const wasPeriod = isDateInPeriod(date, prev.periods);

        let character = prev.character;
        let lunaPoints = prev.luna.lunaPoints;

        if (existingMood) {
          character = addExp(
            {
              ...character,
              totalMoodLogs: Math.max(0, character.totalMoodLogs - 1),
            },
            -getExpForMood(existingMood.mood),
          );
          lunaPoints = clampLunaPoints(
            lunaPoints - getLunaForMood(existingMood.mood),
          );
        }

        return {
          ...prev,
          moodLogs: prev.moodLogs.filter((log) => log.date !== date),
          liveMoodLogs: prev.liveMoodLogs.filter((log) => log.date !== date),
          character,
          periods: wasPeriod
            ? removeDateFromPeriods(date, prev.periods)
            : prev.periods,
          luna: { ...prev.luna, lunaPoints },
        };
      });
    },
    [setData],
  );

  return {
    todayMood,
    todayLiveEntries,
    logMood,
    logLiveMood,
    updateDayRecord,
    deleteDayRecord,
  };
}
