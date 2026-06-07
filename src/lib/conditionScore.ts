import { getTodayDateString } from "@/lib/storage";
import type { DailyMoodLogEntry, LiveMood } from "@/types/moonBuddy";

const MOOD_WELLNESS_SCORE: Record<LiveMood, number> = {
  calm: 82,
  motivated: 88,
  drained: 42,
  foggy: 48,
  irritable: 38,
  bittersweet: 52,
  craving: 50,
  heavy: 35,
};

export interface MoodTrendItem {
  mood: LiveMood;
  count: number;
}

export function getRecentMoodLogs(
  dailyMoodLogs: DailyMoodLogEntry[],
  days = 7,
): DailyMoodLogEntry[] {
  const today = getTodayDateString();
  const cutoff = new Date(`${today}T12:00:00`);
  cutoff.setDate(cutoff.getDate() - (days - 1));
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  return dailyMoodLogs.filter(
    (entry) => entry.date >= cutoffStr && entry.date <= today,
  );
}

export function getConditionScore(
  dailyMoodLogs: DailyMoodLogEntry[],
  days = 7,
): number | null {
  const recent = getRecentMoodLogs(dailyMoodLogs, days);
  if (recent.length === 0) return null;

  const total = recent.reduce(
    (sum, entry) => sum + MOOD_WELLNESS_SCORE[entry.mood],
    0,
  );
  return Math.round(total / recent.length);
}

export function getMoodTrend(
  dailyMoodLogs: DailyMoodLogEntry[],
  days = 7,
  limit = 3,
): MoodTrendItem[] {
  const recent = getRecentMoodLogs(dailyMoodLogs, days);
  const counts = new Map<LiveMood, number>();

  for (const entry of recent) {
    counts.set(entry.mood, (counts.get(entry.mood) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([mood, count]) => ({ mood, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
