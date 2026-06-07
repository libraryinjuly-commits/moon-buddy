import { addDays } from "@/lib/periodHistory";
import { getTodayDateString } from "@/lib/storage";
import type {
  CycleInfo,
  DailyMoodLogEntry,
  LiveMood,
} from "@/types/moonBuddy";

export interface CycleMoodStats {
  totalLogs: number;
  daysLogged: number;
  topMood: LiveMood | null;
  topMoodCount: number;
}

export function getCurrentCycleMoodStats(
  dailyMoodLogs: DailyMoodLogEntry[],
  cycleInfo: CycleInfo | null,
): CycleMoodStats {
  const today = getTodayDateString();
  const cycleStart =
    cycleInfo && cycleInfo.dayOfCycle > 0
      ? addDays(today, -(cycleInfo.dayOfCycle - 1))
      : null;

  const cycleLogs = cycleStart
    ? dailyMoodLogs.filter(
        (entry) => entry.date >= cycleStart && entry.date <= today,
      )
    : dailyMoodLogs;

  const daysLogged = new Set(cycleLogs.map((entry) => entry.date)).size;
  const counts = new Map<LiveMood, number>();

  for (const entry of cycleLogs) {
    counts.set(entry.mood, (counts.get(entry.mood) ?? 0) + 1);
  }

  let topMood: LiveMood | null = null;
  let topMoodCount = 0;

  for (const [mood, count] of counts) {
    if (count > topMoodCount) {
      topMood = mood;
      topMoodCount = count;
    }
  }

  return {
    totalLogs: cycleLogs.length,
    daysLogged,
    topMood,
    topMoodCount,
  };
}
