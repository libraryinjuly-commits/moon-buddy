import type { DailyMoodLogEntry, LiveMood } from "@/types/moonBuddy";

export function getMoodEntriesForDate(
  dailyMoodLogs: DailyMoodLogEntry[],
  date: string,
): DailyMoodLogEntry[] {
  return dailyMoodLogs.filter((entry) => entry.date === date);
}

export function getDominantMoodForDate(
  dailyMoodLogs: DailyMoodLogEntry[],
  date: string,
): LiveMood | null {
  const entries = getMoodEntriesForDate(dailyMoodLogs, date);
  if (entries.length === 0) return null;

  const counts = new Map<LiveMood, number>();
  for (const entry of entries) {
    counts.set(entry.mood, (counts.get(entry.mood) ?? 0) + 1);
  }

  let dominant: LiveMood | null = null;
  let maxCount = 0;

  for (const [mood, count] of counts) {
    if (count > maxCount) {
      maxCount = count;
      dominant = mood;
    }
  }

  return dominant;
}

export function getDominantMoodByDate(
  dailyMoodLogs: DailyMoodLogEntry[],
): Map<string, LiveMood> {
  const dates = new Set(dailyMoodLogs.map((entry) => entry.date));
  const result = new Map<string, LiveMood>();

  for (const date of dates) {
    const dominant = getDominantMoodForDate(dailyMoodLogs, date);
    if (dominant) result.set(date, dominant);
  }

  return result;
}

export function hasMoodOnDate(
  dailyMoodLogs: DailyMoodLogEntry[],
  date: string,
): boolean {
  return dailyMoodLogs.some((entry) => entry.date === date);
}
