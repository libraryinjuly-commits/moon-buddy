import { liveMoodToEmotionScale, incrementMoodStat } from "@/lib/moodScale";
import type {
  CompanionStage,
  CompanionState,
  MoodStatistics,
} from "@/types/companion";
import type { CycleInfo, LiveMood } from "@/types/moonBuddy";

const GROWTH_ENERGY: Record<string, number> = {
  great: 5,
  good: 4,
  okay: 3,
  low: 3,
  bad: 4,
};

const STAGE_THRESHOLDS: Record<CompanionStage, number> = {
  seed: 0,
  sprout: 20,
  young: 40,
  blooming: 60,
  star_spirit: 80,
};

const STAGE_ORDER: CompanionStage[] = [
  "seed",
  "sprout",
  "young",
  "blooming",
  "star_spirit",
];

export const MAX_GROWTH_PROGRESS = 100;

export function getStageFromProgress(progress: number): CompanionStage {
  const clamped = Math.min(MAX_GROWTH_PROGRESS, Math.max(0, progress));
  if (clamped >= STAGE_THRESHOLDS.star_spirit) return "star_spirit";
  if (clamped >= STAGE_THRESHOLDS.blooming) return "blooming";
  if (clamped >= STAGE_THRESHOLDS.young) return "young";
  if (clamped >= STAGE_THRESHOLDS.sprout) return "sprout";
  return "seed";
}

export function getGrowthEnergyForMood(mood: LiveMood): number {
  const scale = liveMoodToEmotionScale(mood);
  return GROWTH_ENERGY[scale] ?? 3;
}

export interface FeedResult {
  growthDelta: number;
  newProgress: number;
  previousStage: CompanionStage;
  newStage: CompanionStage;
  stageAdvanced: boolean;
  emotionScale: ReturnType<typeof liveMoodToEmotionScale>;
}

export function applyFeedToCompanion(
  companion: CompanionState,
  mood: LiveMood,
): { companion: CompanionState; feed: FeedResult } {
  const emotionScale = liveMoodToEmotionScale(mood);
  const growthDelta = getGrowthEnergyForMood(mood);
  const previousStage = companion.currentStage;
  const newProgress = Math.min(
    MAX_GROWTH_PROGRESS,
    companion.growthProgress + growthDelta,
  );
  const newStage = getStageFromProgress(newProgress);
  const moodStatistics = incrementMoodStat(
    companion.moodStatistics,
    emotionScale,
  ) as MoodStatistics;

  return {
    companion: {
      ...companion,
      growthProgress: newProgress,
      currentStage: newStage,
      currentForm: newStage,
      totalFeeds: companion.totalFeeds + 1,
      moodStatistics,
    },
    feed: {
      growthDelta,
      newProgress,
      previousStage,
      newStage,
      stageAdvanced: newStage !== previousStage,
      emotionScale,
    },
  };
}

export function isCycleComplete(cycleInfo: CycleInfo | null): boolean {
  if (!cycleInfo) return false;
  return (
    cycleInfo.dayOfCycle >= cycleInfo.cycleLength ||
    cycleInfo.daysUntilNextPeriod <= 1
  );
}

export function isAscensionReady(
  companion: CompanionState,
  cycleInfo: CycleInfo | null,
): boolean {
  return (
    companion.currentStage === "star_spirit" &&
    isCycleComplete(cycleInfo) &&
    !companion.ascensionPending
  );
}

export function markAscensionPending(
  companion: CompanionState,
): CompanionState {
  return { ...companion, ascensionPending: true };
}

export function getStageProgressInBand(progress: number): number {
  const stage = getStageFromProgress(progress);
  const stageIndex = STAGE_ORDER.indexOf(stage);
  const floor = STAGE_THRESHOLDS[stage];
  const nextStage = STAGE_ORDER[stageIndex + 1];
  const ceiling = nextStage
    ? STAGE_THRESHOLDS[nextStage]
    : MAX_GROWTH_PROGRESS;
  const span = ceiling - floor;
  if (span <= 0) return 100;
  return Math.round(((progress - floor) / span) * 100);
}

export function createCompanionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `companion-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function companionStageToDisplayLevel(stage: CompanionStage): number {
  const map: Record<CompanionStage, number> = {
    seed: 1,
    sprout: 3,
    young: 6,
    blooming: 8,
    star_spirit: 10,
  };
  return map[stage];
}

export function createNewCompanion(
  birthDate: string,
  cycleId: string | null = null,
): CompanionState {
  return {
    id: createCompanionId(),
    birthDate,
    currentStage: "seed",
    growthProgress: 0,
    currentForm: "seed",
    totalFeeds: 0,
    moodStatistics: { great: 0, good: 0, okay: 0, low: 0, bad: 0 },
    cycleId,
    ascensionPending: false,
  };
}
