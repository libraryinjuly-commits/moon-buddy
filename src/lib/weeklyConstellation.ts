import { getDominantMoodForDate } from "@/lib/dailyMood";
import { liveMoodToEmotionScale } from "@/lib/moodScale";
import { getTodayDateString } from "@/lib/storage";
import type { EmotionScale } from "@/types/companion";
import type { DailyMoodLogEntry, LiveMood } from "@/types/moonBuddy";

export const EMOTION_CONSTELLATION_COLORS: Record<EmotionScale, string> = {
  great: "#fbbf24",
  good: "#86efac",
  okay: "#93c5fd",
  low: "#c4b5fd",
  bad: "#818cf8",
};

export interface ConstellationDay {
  date: string;
  mood: LiveMood | null;
  color: string;
  hasLog: boolean;
}

function offsetDate(dateStr: string, dayOffset: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + dayOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getLast7DaysConstellation(
  dailyMoodLogs: DailyMoodLogEntry[],
  today: string = getTodayDateString(),
): ConstellationDay[] {
  const days: ConstellationDay[] = [];

  for (let offset = -6; offset <= 0; offset += 1) {
    const date = offsetDate(today, offset);
    const mood = getDominantMoodForDate(dailyMoodLogs, date);
    const color = mood
      ? EMOTION_CONSTELLATION_COLORS[liveMoodToEmotionScale(mood)]
      : "#e2e8f0";

    days.push({
      date,
      mood,
      color,
      hasLog: mood !== null,
    });
  }

  return days;
}
