import {
  createNewCompanion,
  getStageFromProgress,
  markAscensionPending,
  MAX_GROWTH_PROGRESS,
} from "@/lib/companionLifecycle";
import { getDominantEmotion } from "@/lib/moodScale";
import {
  calculateStarType,
  createStarMemoryId,
  generateCycleSummary,
} from "@/lib/starMemory";
import { DEFAULT_DATA } from "@/lib/normalizeData";
import { getTodayDateString } from "@/lib/storage";
import type {
  CompanionStage,
  CompanionState,
  EmotionScale,
  MoodStatistics,
  StarMemory,
  StarType,
} from "@/types/companion";
import type { Language, MoonBuddyData } from "@/types/moonBuddy";

const STAGE_DEBUG_PROGRESS: Record<CompanionStage, number> = {
  seed: 10,
  sprout: 30,
  young: 50,
  blooming: 70,
  star_spirit: 90,
};

const SAMPLE_MOOD_PROFILES: MoodStatistics[] = [
  { great: 12, good: 6, okay: 2, low: 1, bad: 0 },
  { great: 2, good: 14, okay: 4, low: 1, bad: 0 },
  { great: 1, good: 3, okay: 15, low: 2, bad: 1 },
  { great: 0, good: 2, okay: 3, low: 10, bad: 5 },
  { great: 4, good: 4, okay: 4, low: 4, bad: 4 },
  { great: 8, good: 2, okay: 1, low: 0, bad: 1 },
  { great: 1, good: 5, okay: 8, low: 3, bad: 2 },
  { great: 0, good: 1, okay: 2, low: 4, bad: 8 },
  { great: 6, good: 6, okay: 0, low: 0, bad: 0 },
  { great: 2, good: 2, okay: 2, low: 2, bad: 2 },
];

const SAMPLE_NAMES = [
  "달이",
  "루나",
  "별희",
  "하늘",
  "소라",
  "미소",
  "은별",
  "노을",
];

function clampProgress(value: number): number {
  return Math.min(MAX_GROWTH_PROGRESS, Math.max(0, value));
}

function applyProgress(companion: CompanionState, progress: number): CompanionState {
  const growthProgress = clampProgress(progress);
  const currentStage = getStageFromProgress(growthProgress);
  return {
    ...companion,
    growthProgress,
    currentStage,
    currentForm: currentStage,
    ascensionPending: false,
  };
}

export function devAddGrowth(
  companion: CompanionState,
  amount: number,
): CompanionState {
  return applyProgress(companion, companion.growthProgress + amount);
}

export function devSetStage(
  companion: CompanionState,
  stage: CompanionStage,
): CompanionState {
  return applyProgress(companion, STAGE_DEBUG_PROGRESS[stage]);
}

export function devPrepareAscension(companion: CompanionState): CompanionState {
  const withStats: CompanionState = {
    ...companion,
    moodStatistics:
      companion.totalFeeds > 0
        ? companion.moodStatistics
        : { great: 8, good: 5, okay: 3, low: 1, bad: 1 },
  };

  return markAscensionPending(
    applyProgress(withStats, STAGE_DEBUG_PROGRESS.star_spirit),
  );
}

function offsetDate(base: string, monthOffset: number): string {
  const [year, month, day] = base.split("-").map(Number);
  const date = new Date(year, month - 1 + monthOffset, day);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildSampleStar(
  profile: MoodStatistics,
  ascensionDate: string,
  birthDate: string,
  companionName: string,
  language: Language,
  starTypeOverride?: StarType,
): StarMemory {
  const starType = starTypeOverride ?? calculateStarType(profile);
  const dominantEmotion = getDominantEmotion(profile);

  return {
    id: createStarMemoryId(),
    birthDate,
    ascensionDate,
    dominantEmotion,
    starType,
    cycleSummary: generateCycleSummary(starType, language),
    companionName,
    moodStatistics: { ...profile },
  };
}

export function devGenerateSampleStars(
  language: Language,
  count = 8,
): StarMemory[] {
  const today = getTodayDateString();
  const starTypes: StarType[] = [
    "golden",
    "emerald",
    "silver_moon",
    "deep_blue",
    "aurora",
    "golden",
    "emerald",
    "silver_moon",
  ];

  return Array.from({ length: Math.min(10, Math.max(5, count)) }, (_, index) => {
    const profile = SAMPLE_MOOD_PROFILES[index % SAMPLE_MOOD_PROFILES.length];
    const monthOffset = -(index + 1);
    const ascensionDate = offsetDate(today, monthOffset);
    const birthDate = offsetDate(ascensionDate, -1);
    const companionName = SAMPLE_NAMES[index % SAMPLE_NAMES.length];

    return buildSampleStar(
      profile,
      ascensionDate,
      birthDate,
      companionName,
      language,
      starTypes[index % starTypes.length],
    );
  });
}

export function devResetCompanion(
  cycleId: string | null = null,
): CompanionState {
  return createNewCompanion(getTodayDateString(), cycleId);
}

export function devResetAllData(): MoonBuddyData {
  return { ...DEFAULT_DATA };
}
