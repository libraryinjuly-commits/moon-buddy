import type { TemperamentGroup } from "@/types";

/** Five-scale emotional energy used for star memories and growth */
export type EmotionScale = "great" | "good" | "okay" | "low" | "bad";

export type CompanionStage =
  | "seed"
  | "sprout"
  | "young"
  | "blooming"
  | "star_spirit";

export type StarType =
  | "golden"
  | "emerald"
  | "silver_moon"
  | "deep_blue"
  | "aurora";

export interface MoodStatistics {
  great: number;
  good: number;
  okay: number;
  low: number;
  bad: number;
}

export interface CompanionState {
  id: string;
  birthDate: string;
  currentStage: CompanionStage;
  growthProgress: number;
  currentForm: string;
  totalFeeds: number;
  moodStatistics: MoodStatistics;
  cycleId: string | null;
  ascensionPending: boolean;
  /** Onboarding fast-track: 3 daily mood logs → 100% growth */
  isFirstCompanion: boolean;
  /** Weekly reward fragments; resets after 7 (reward UI handled separately) */
  starFragments: number;
}

export interface StarMemory {
  id: string;
  birthDate: string;
  ascensionDate: string;
  dominantEmotion: EmotionScale;
  starType: StarType;
  cycleSummary: string;
  companionName: string;
  temperament: TemperamentGroup;
  moodStatistics: MoodStatistics;
}

/** Gallery now; constellation later */
export type StarCollectionView = "gallery" | "constellation";

/**
 * Permanent archive of ascended companions (`star_memories` / `ascended_stars`).
 * Persisted via localStorage today; see `lib/starArchive.ts` for Supabase guide.
 */
export interface StarCollectionState {
  stars: StarMemory[];
  preferredView: StarCollectionView;
}
