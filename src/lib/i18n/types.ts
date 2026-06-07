import type { MbtiTypeTitles } from "@/lib/mbtiTitles";
import type { SpeechVariants } from "@/lib/pickVariant";
import type {
  CompanionStage,
  CycleInsight,
  CyclePhase,
  EmotionScale,
  Language,
  LiveMood,
  Mood,
  StarType,
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
  shareCopiedToast: string;
  shareSheetTitle: string;
  shareSheetClose: string;
  shareApp: string;
  shareCopyLink: string;
  shareFailed: string;
  shareCopyFailed: string;
  fortuneCookieLabel: string;
  fortuneCookieOpenedLabel: string;
  fortuneCookieTitle: string;
  fortuneCookieSubtitle: string;
  fortuneCookieOpenedHint: string;
  fortuneCookieClose: string;
  insightFabLabel: string;
  insightSheetTitle: string;
  insightSheetClose: string;
  analysisReportTitle: string;
  customAdviceTitle: string;
  buddyAdviceFallback: string;
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
  tabJourney: string;
  journeyTabDesc: string;
  journeyEmotionTitle: string;
  journeyRhythmTitle: string;
  journeyTimelineTitle: string;
  moodFeedTitle: string;
  rhythmCardTitle: string;
  rhythmLogHint: string;
  todayRhythm: string;
  insightsTabDesc: string;
  insightMoodLogs: string;
  insightMoodDays: string;
  insightTopMood: string;
  conditionGuideTip: string;
  tabGacha: string;
  tabProfile: string;
  profileEditTitle: string;
  profileEditDesc: string;
  profileReportTitle: string;
  livePeriodSwitchTitle: string;
  livePeriodOn: string;
  livePeriodOff: string;
  livePeriodDayUnit: string;
  livePeriodStartButton: string;
  livePeriodEndButton: string;
  periodDaySheetTitle: string;
  periodToggleLabel: string;
  periodStartOnDay: string;
  periodEndOnDay: string;
  periodActualLegend: string;
  periodPredictedLegend: string;
  periodOngoing: string;
  periodOngoingHint: string;
  periodDayCount: string;
  averageCycleLabel: string;
  speechTapHint: string;
  mascotTapHint: string;
  close: string;
  tabStars: string;
  companionGrowthLabel: string;
  companionGrowthNextProgress: string;
  rhythmCycleLabel: string;
  companionStages: Record<CompanionStage, string>;
  ascensionReadyHint: string;
  ascensionTitle: string;
  ascensionDialogues: string[];
  ascensionBecomingStar: string;
  ascensionComplete: string;
  ascensionContinue: string;
  ascensionMeetNewSeed: string;
  starCollectionTitle: string;
  starCollectionDesc: string;
  starGalleryTab: string;
  starConstellationTab: string;
  starCollectionEmptyTitle: string;
  starCollectionEmptyDesc: string;
  starMoodBreakdown: string;
  starDominantEmotion: string;
  starTypes: Record<StarType, string>;
  emotionScales: Record<EmotionScale, string>;
  constellationComingSoonTitle: string;
  constellationComingSoonDesc: string;
}

export type RhythmPhaseBrief = Record<CyclePhase, string> & { default: string };

export interface LocaleContent {
  language: Language;
  ui: LocaleUI;
  phaseLabels: Record<CyclePhase, string>;
  rhythmPhaseBrief: RhythmPhaseBrief;
  moodLabels: Record<Mood, string>;
  moodEmojis: Record<Mood, string>;
  liveMoodLabels: Record<LiveMood, string>;
  liveMoodEmojis: Record<LiveMood, string>;
  liveMoodDescriptions: Record<LiveMood, string>;
  epithets: Record<number, string>;
  mbtiTypeTitles: MbtiTypeTitles;
  welcomeGuide: string;
  welcomeSpeech: Record<TemperamentGroup, SpeechVariants>;
  thankSpeech: Record<TemperamentGroup, SpeechVariants>;
  dialogues: Record<TemperamentGroup, TemperamentDialogueSet>;
  cycleInsights: Record<CyclePhase, Omit<CycleInsight, "adviceClosing">>;
  cycleClosing: Record<CyclePhase, SpeechVariants>;
  defaultInsight: CycleInsight;
}
