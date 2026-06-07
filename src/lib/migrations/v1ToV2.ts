import { getStageFromProgress } from "@/lib/companionLifecycle";
import { emptyMoodStatistics, liveMoodToEmotionScale } from "@/lib/moodScale";
import { getTodayDateString } from "@/lib/storage";
import type {
  CompanionState,
  MoodStatistics,
  StarCollectionState,
} from "@/types/companion";
import type {
  CharacterState,
  DailyMoodLogEntry,
  MoonBuddyData,
  PeriodHistoryEntry,
} from "@/types/moonBuddy";


function mapLevelToProgress(level: number, exp: number): number {
  const tierProgress: Record<number, number> = {
    1: 5,
    2: 25,
    3: 45,
    4: 65,
    5: 85,
  };
  const cappedLevel = Math.min(Math.max(level, 1), 10);
  const base =
    tierProgress[Math.min(cappedLevel, 5)] ??
    Math.min(80, cappedLevel * 8);
  const bonus = (exp % 100) * 0.15;
  return Math.min(99, Math.round(base + bonus));
}

function inferMoodStats(logs: DailyMoodLogEntry[]): MoodStatistics {
  const stats = emptyMoodStatistics() as MoodStatistics;
  for (const entry of logs) {
    const scale = liveMoodToEmotionScale(entry.mood);
    stats[scale] += 1;
  }
  return stats;
}

function inferCycleId(periodHistory: PeriodHistoryEntry[]): string | null {
  const active = periodHistory.find((entry) => entry.endDate === null);
  if (active) return active.id;
  return periodHistory[0]?.id ?? null;
}

function inferBirthDate(
  periodHistory: PeriodHistoryEntry[],
  fallback: string,
): string {
  const active = periodHistory.find((entry) => entry.endDate === null);
  if (active) return active.startDate;
  return periodHistory[0]?.startDate ?? fallback;
}

export function migrateCharacterToCompanion(
  character: CharacterState,
  dailyMoodLogs: DailyMoodLogEntry[],
  periodHistory: PeriodHistoryEntry[],
): CompanionState {
  const today = getTodayDateString();
  const growthProgress = mapLevelToProgress(character.level, character.exp);
  const moodStatistics = inferMoodStats(dailyMoodLogs);

  return {
    id: `migrated-${Date.now()}`,
    birthDate: inferBirthDate(periodHistory, today),
    currentStage: getStageFromProgress(growthProgress),
    growthProgress,
    currentForm: getStageFromProgress(growthProgress),
    totalFeeds: character.totalMoodLogs,
    moodStatistics,
    cycleId: inferCycleId(periodHistory),
    ascensionPending: false,
  };
}

export function applyV2Fields(data: MoonBuddyData): MoonBuddyData {
  const companion =
    data.schemaVersion >= 2
      ? data.companion
      : migrateCharacterToCompanion(
          data.character,
          data.dailyMoodLogs,
          data.periodHistory,
        );

  return {
    ...data,
    schemaVersion: 2,
    companion,
    starCollection: {
      stars: data.starCollection?.stars ?? [],
      preferredView: data.starCollection?.preferredView ?? "gallery",
    },
  };
}
