export type Mood = "great" | "good" | "okay" | "low" | "bad";

export type LiveMood =
  | "calm"
  | "motivated"
  | "drained"
  | "foggy"
  | "irritable"
  | "bittersweet"
  | "craving"
  | "heavy";

export type Language = "KO" | "EN" | "JA";

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

export type MenstruationStatus = "NOT_PERIOD" | "ON_PERIOD";

export interface LivePeriodState {
  status: MenstruationStatus;
  actualStartDate: string | null;
  activePeriodId: string | null;
  characterMessage: string;
}

export interface DailyMoodLogEntry {
  date: string;
  mood: LiveMood;
  timestamp: number;
}

/** @deprecated Use DailyMoodLogEntry */
export interface LiveMoodEntry {
  time: string;
  mood: LiveMood;
}

/** @deprecated Use DailyMoodLogEntry[] */
export interface DailyLiveMoods {
  date: string;
  entries: LiveMoodEntry[];
}

export interface PeriodHistoryEntry {
  id: string;
  startDate: string;
  endDate: string | null;
}

/** @deprecated Use PeriodHistoryEntry */
export type PeriodRecord = PeriodHistoryEntry;

/** @deprecated Use DailyMoodLogEntry */
export interface MoodLog {
  date: string;
  mood: Mood;
}

export interface CharacterState {
  level: number;
  exp: number;
  totalMoodLogs: number;
}

export interface CollectedCard {
  id: string;
  cardId: string;
  drawnAt: string;
}

export interface LunaState {
  lunaPoints: number;
  collection: CollectedCard[];
}

export interface DailyFortuneCookie {
  date: string;
  messageIndex: number;
}

export interface UserSettings {
  cycleLength: number;
  defaultPeriodLength: number;
  userName: string;
  mbti: string;
  buddyCustomName: string;
  language: Language;
}

export interface MoonBuddyData {
  periodHistory: PeriodHistoryEntry[];
  dailyMoodLogs: DailyMoodLogEntry[];
  livePeriod: LivePeriodState;
  character: CharacterState;
  luna: LunaState;
  fortuneCookie: DailyFortuneCookie | null;
  settings: UserSettings;
}

export interface CycleInfo {
  phase: CyclePhase;
  dayOfCycle: number;
  cycleLength: number;
  averageCycleLength: number;
  periodLength: number;
  daysUntilNextPeriod: number;
  nextPredictedStart: string | null;
}
