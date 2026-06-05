import type { SpeechVariants } from "@/lib/pickVariant";
import type {
  CycleInsight,
  CyclePhase,
  Language,
  LiveMood,
  Mood,
  TemperamentGroup,
} from "@/types";

export type { Language };

export type PhaseDialogues = Record<
  Mood,
  { guide: SpeechVariants; speech: SpeechVariants }
> & {
  default: { guide: SpeechVariants; speech: SpeechVariants };
};

export type TemperamentDialogueSet = Record<CyclePhase, PhaseDialogues>;

export interface LocaleUI {
  slogan: string;
  loading: string;
  languageLabel: string;
  setupTitle: string;
  setupDesc: string;
  myName: string;
  myNamePlaceholder: string;
  vocativePreview: string;
  buddyNameLabel: string;
  buddyNamePlaceholder: string;
  buddyNameHint: string;
  buddyPreviewLabel: string;
  mbtiLabel: string;
  profileSave: string;
  profileSaved: string;
  withBuddy: string;
  buddyPersona: string;
  todayStatus: string;
  dayUnit: string;
  daysCountUnit: string;
  daysUntilPeriod: string;
  moonAdvice: string;
  conditionGuide: string;
  moodTag: string;
  growthRecord: string;
  currentEpithet: string;
  moodLogs: string;
  nextEpithet: string;
  maxEpithet: string;
  todayMood: string;
  todayMoodDesc: string;
  periodRecord: string;
  periodRecordDesc: string;
  periodStart: string;
  periodEnd: string;
  periodSave: string;
  periodError: string;
  periodDelete: string;
  cycleSettings: string;
  cycleSettingsDesc: string;
  cycleLength: string;
  defaultPeriodLength: string;
  defaultPeriodHint: string;
  settingsSave: string;
  settingsSaved: string;
  cycleErrorLength: string;
  cycleErrorPeriod: string;
  cycleErrorCompare: string;
  recentPeriods: string;
  defaultFriend: string;
  noCycleInsightClosing: string;
  lunaPointsLabel: string;
  lunaPointsCount: string;
  gachaButton: string;
  gachaCost: string;
  gachaInsufficient: string;
  cardRevealTitle: string;
  cardClose: string;
  cardCollectionTitle: string;
  cardCollectionEmpty: string;
  cardCollected: string;
  cardRarityCommon: string;
  cardRarityRare: string;
  cardRaritySuperRare: string;
  cardSecretLabel: string;
  cardRevealFlipping: string;
  calendarTitle: string;
  calendarPrev: string;
  calendarNext: string;
  recordEditTitle: string;
  recordEditMood: string;
  recordEditPeriod: string;
  recordEditPeriodOn: string;
  recordEditSave: string;
  recordEditDelete: string;
  weekdayShort: string[];
  liveMoodTimelineTitle: string;
  liveMoodTimelineEmpty: string;
  tabHome: string;
  tabCalendar: string;
  tabGacha: string;
  tabReport: string;
}

export interface LocaleContent {
  language: Language;
  ui: LocaleUI;
  phaseLabels: Record<CyclePhase, string>;
  moodLabels: Record<Mood, string>;
  moodEmojis: Record<Mood, string>;
  liveMoodLabels: Record<LiveMood, string>;
  liveMoodEmojis: Record<LiveMood, string>;
  liveMoodDescriptions: Record<LiveMood, string>;
  epithets: Record<number, string>;
  welcomeGuide: string;
  welcomeSpeech: Record<TemperamentGroup, SpeechVariants>;
  thankSpeech: Record<TemperamentGroup, SpeechVariants>;
  dialogues: Record<TemperamentGroup, TemperamentDialogueSet>;
  cycleInsights: Record<CyclePhase, Omit<CycleInsight, "adviceClosing">>;
  cycleClosing: Record<CyclePhase, SpeechVariants>;
  defaultInsight: CycleInsight;
}
