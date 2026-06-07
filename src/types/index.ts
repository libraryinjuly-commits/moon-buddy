import type { CyclePhase } from "@/types/moonBuddy";

export type {
  CyclePhase,
  Language,
  LiveMood,
  LiveMoodEntry,
  DailyLiveMoods,
  Mood,
  PeriodRecord,
  PeriodHistoryEntry,
  DailyMoodLogEntry,
  MoodLog,
  CharacterState,
  CollectedCard,
  LunaState,
  UserSettings,
  MoonBuddyData,
  CycleInfo,
  MenstruationStatus,
  LivePeriodState,
} from "@/types/moonBuddy";

export type AppTab = "home" | "calendar" | "insights" | "profile";

export type MascotPhase = CyclePhase | "default";

export type TemperamentGroup = "NT" | "NF" | "SJ" | "SP";

export interface BuddyIdentity {
  epithet: string;
  personaRole: string;
  personaLabel: string;
  customName: string;
  displayTitle: string;
  level: number;
  nextEpithet: string | null;
  nextEpithetLevel: number | null;
}

export interface TemperamentTheme {
  group: TemperamentGroup;
  groupLabel: string;
  groupDescription: string;
  badgeBg: string;
  bubbleLabel: string;
  bubbleText: string;
  bubbleBg: string;
  accentButton: string;
  accentBorder: string;
  accentText: string;
  accentMuted: string;
  accentSoft: string;
  glowClass: string;
  thankEmoji: string;
}

export interface MascotConfig {
  phase: MascotPhase;
  label: string;
  buddyName: string;
  bgColor: string;
  ringColor: string;
  temperament: TemperamentGroup;
}

export interface DialogueContent {
  guide: string;
  speech: string;
}

export interface AdviceItem {
  icon: string;
  label: string;
  text: string;
}

export interface CycleInsight {
  status: string;
  adviceItems: AdviceItem[];
  adviceClosing: string;
}
