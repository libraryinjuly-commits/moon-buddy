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

export interface LiveMoodEntry {
  time: string;
  mood: LiveMood;
}

export interface DailyLiveMoods {
  date: string;
  entries: LiveMoodEntry[];
}

export interface PeriodRecord {
  id: string;
  startDate: string;
  endDate: string;
}

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

export interface UserSettings {
  cycleLength: number;
  defaultPeriodLength: number;
  userName: string;
  mbti: string;
  buddyCustomName: string;
  language: Language;
}

export interface MoonBuddyData {
  periods: PeriodRecord[];
  moodLogs: MoodLog[];
  liveMoodLogs: DailyLiveMoods[];
  character: CharacterState;
  luna: LunaState;
  settings: UserSettings;
}

export interface CycleInfo {
  phase: CyclePhase;
  dayOfCycle: number;
  cycleLength: number;
  periodLength: number;
  daysUntilNextPeriod: number;
}
