import type { EmotionScale } from "@/types/companion";
import type { LiveMood } from "@/types/moonBuddy";

const LIVE_TO_SCALE: Record<LiveMood, EmotionScale> = {
  motivated: "great",
  calm: "good",
  bittersweet: "good",
  foggy: "okay",
  craving: "okay",
  drained: "low",
  irritable: "low",
  heavy: "bad",
};

export function liveMoodToEmotionScale(mood: LiveMood): EmotionScale {
  return LIVE_TO_SCALE[mood];
}

export function emptyMoodStatistics(): Record<EmotionScale, number> {
  return { great: 0, good: 0, okay: 0, low: 0, bad: 0 };
}

export function incrementMoodStat(
  stats: Record<EmotionScale, number>,
  scale: EmotionScale,
): Record<EmotionScale, number> {
  return { ...stats, [scale]: stats[scale] + 1 };
}

export function getMoodPercentages(
  stats: Record<EmotionScale, number>,
): Record<EmotionScale, number> {
  const total = Object.values(stats).reduce((sum, n) => sum + n, 0);
  if (total === 0) {
    return { great: 0, good: 0, okay: 0, low: 0, bad: 0 };
  }
  return {
    great: Math.round((stats.great / total) * 100),
    good: Math.round((stats.good / total) * 100),
    okay: Math.round((stats.okay / total) * 100),
    low: Math.round((stats.low / total) * 100),
    bad: Math.round((stats.bad / total) * 100),
  };
}

export function getDominantEmotion(
  stats: Record<EmotionScale, number>,
): EmotionScale {
  const entries = Object.entries(stats) as [EmotionScale, number][];
  return entries.reduce((best, curr) => (curr[1] > best[1] ? curr : best))[0];
}
