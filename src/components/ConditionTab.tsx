"use client";

import { CalendarTab } from "@/components/CalendarTab";
import { ConditionGuide } from "@/components/ConditionGuide";
import { LivePeriodSwitch } from "@/components/LivePeriodSwitch";
import { MoonAdviceCard } from "@/components/MoonAdviceCard";
import {
  getConditionScore,
  getMoodTrend,
} from "@/lib/conditionScore";
import { formatFactualCycleLabel } from "@/lib/cycleDisplay";
import type { LocaleContent } from "@/lib/i18n/types";
import type { CycleMoodStats } from "@/lib/insightsStats";
import type {
  CycleInfo,
  CycleInsight,
  CyclePhase,
  DialogueContent,
  LiveMood,
  MenstruationStatus,
  MoonBuddyData,
  TemperamentTheme,
  UserSettings,
} from "@/types";

interface ConditionTabProps {
  data: MoonBuddyData;
  locale: LocaleContent;
  theme: TemperamentTheme;
  cycleInfo: CycleInfo | null;
  cycleInsight: CycleInsight;
  phase: CyclePhase | null;
  phaseLabel: string | null;
  rhythmMessage: string;
  menstruationStatus: MenstruationStatus;
  periodDay: number;
  dialogue: DialogueContent;
  moodLabel: string | null;
  moodStats: CycleMoodStats;
  customAdviceTitle: string;
  selectedCalendarDate: string | null;
  onSelectDate: (date: string) => void;
  onCloseSheet: () => void;
  onToggleDayPeriod: (date: string) => void;
  onStartPeriod: (date: string) => void;
  onEndPeriod: (date: string) => void;
  onAddPeriod: (startDate: string, endDate: string | null) => boolean;
  onDeletePeriod: (periodId: string) => void;
  onSaveSettings: (settings: UserSettings) => void;
  onLogMoodForDate: (date: string, mood: LiveMood) => void;
  onTogglePeriod: () => void;
}

function scoreTone(score: number): string {
  if (score >= 75) return "text-emerald-600";
  if (score >= 55) return "text-amber-600";
  return "text-rose-500";
}

export function ConditionTab({
  data,
  locale,
  theme,
  cycleInfo,
  cycleInsight,
  phase,
  phaseLabel,
  rhythmMessage,
  menstruationStatus,
  periodDay,
  dialogue,
  moodLabel,
  moodStats,
  customAdviceTitle,
  selectedCalendarDate,
  onSelectDate,
  onCloseSheet,
  onToggleDayPeriod,
  onStartPeriod,
  onEndPeriod,
  onAddPeriod,
  onDeletePeriod,
  onSaveSettings,
  onLogMoodForDate,
  onTogglePeriod,
}: ConditionTabProps) {
  const { ui, liveMoodLabels, liveMoodEmojis } = locale;
  const conditionScore = getConditionScore(data.dailyMoodLogs);
  const moodTrend = getMoodTrend(data.dailyMoodLogs);

  const factualLabel = formatFactualCycleLabel(ui, {
    status: menstruationStatus,
    phaseLabel:
      phase && phaseLabel && cycleInfo
        ? `${phaseLabel} · ${cycleInfo.dayOfCycle}${ui.dayUnit}`
        : phaseLabel,
    periodDay,
  });

  const topMoodLabel = moodStats.topMood
    ? liveMoodLabels[moodStats.topMood]
    : null;
  const topMoodEmoji = moodStats.topMood
    ? liveMoodEmojis[moodStats.topMood]
    : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-1.5">
      <div className="px-0.5 pt-0.5">
        <h1 className={`text-base font-bold ${theme.accentText}`}>
          {ui.tabCondition}
        </h1>
        <p className={`mt-0.5 text-xs ${theme.accentMuted}`}>
          {ui.conditionTabDesc}
        </p>
      </div>

      <section
        className={`rounded-2xl border ${theme.accentBorder} bg-white/85 p-3 shadow-sm`}
      >
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {ui.conditionRhythmTitle}
        </h2>
        {factualLabel && (
          <p
            className={`mb-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${theme.accentSoft} ${theme.accentText}`}
          >
            {factualLabel}
          </p>
        )}
        <p className={`text-sm leading-relaxed ${theme.accentText}`}>
          {rhythmMessage}
        </p>
        {cycleInfo && menstruationStatus !== "ON_PERIOD" && (
          <p className={`mt-2 text-xs ${theme.accentMuted}`}>
            {ui.daysUntilPeriod} {cycleInfo.daysUntilNextPeriod}
            {ui.daysCountUnit}
          </p>
        )}
        <div className="mt-3 border-t border-white/50 pt-3">
          <LivePeriodSwitch
            status={menstruationStatus}
            periodDay={periodDay}
            ui={ui}
            theme={theme}
            onToggle={onTogglePeriod}
            compact
          />
        </div>
      </section>

      <section
        className={`rounded-2xl border ${theme.accentBorder} bg-white/85 p-3 shadow-sm`}
      >
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {ui.conditionTodayTitle}
        </h2>

        {conditionScore != null ? (
          <div className="mb-3 flex items-center gap-3">
            <div
              className={`flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl ${theme.accentSoft}`}
            >
              <span
                className={`text-xl font-bold leading-none ${scoreTone(conditionScore)}`}
              >
                {conditionScore}
              </span>
              <span className={`mt-0.5 text-[8px] font-medium ${theme.accentMuted}`}>
                / 100
              </span>
            </div>
            <div className="min-w-0">
              <p className={`text-xs font-semibold ${theme.accentText}`}>
                {ui.conditionScoreLabel}
              </p>
              <p className={`mt-0.5 text-[10px] leading-snug ${theme.accentMuted}`}>
                {ui.conditionScoreHint}
              </p>
            </div>
          </div>
        ) : (
          <p className={`mb-3 text-xs ${theme.accentMuted}`}>
            {ui.liveMoodTimelineEmpty}
          </p>
        )}

        <div
          className={`mb-3 grid grid-cols-3 gap-2 rounded-xl ${theme.accentSoft} p-2.5`}
        >
          <div className="text-center">
            <p className={`text-[10px] ${theme.accentMuted}`}>
              {ui.insightMoodLogs}
            </p>
            <p className={`text-sm font-bold ${theme.accentText}`}>
              {moodStats.totalLogs}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-[10px] ${theme.accentMuted}`}>
              {ui.insightMoodDays}
            </p>
            <p className={`text-sm font-bold ${theme.accentText}`}>
              {moodStats.daysLogged}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-[10px] ${theme.accentMuted}`}>
              {ui.insightTopMood}
            </p>
            <p className={`text-sm font-bold ${theme.accentText}`}>
              {topMoodEmoji && topMoodLabel
                ? `${topMoodEmoji} ${topMoodLabel}`
                : "—"}
            </p>
          </div>
        </div>

        {moodTrend.length > 0 && (
          <div>
            <p className={`mb-1.5 text-[10px] font-semibold ${theme.accentMuted}`}>
              {ui.conditionMoodTrend}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {moodTrend.map(({ mood, count }) => (
                <span
                  key={mood}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${theme.accentSoft} ${theme.accentText}`}
                >
                  {liveMoodEmojis[mood]} {liveMoodLabels[mood]} ×{count}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section
        className={`rounded-2xl border ${theme.accentBorder} bg-white/85 p-4 shadow-sm`}
      >
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {customAdviceTitle}
        </h2>
        <p
          className={`rounded-xl ${theme.accentSoft} px-3 py-3 text-sm leading-relaxed ${theme.accentText}`}
        >
          {dialogue.speech}
        </p>
        {cycleInsight.adviceClosing && (
          <p
            className={`mt-2 rounded-xl border ${theme.accentBorder} bg-white/60 px-3 py-2.5 text-xs leading-relaxed ${theme.accentMuted}`}
          >
            {cycleInsight.adviceClosing}
          </p>
        )}
        <p className={`mt-2 text-[10px] leading-snug ${theme.accentMuted}`}>
          {ui.conditionWellnessDisclaimer}
        </p>
      </section>

      <section
        className={`rounded-2xl border ${theme.accentBorder} bg-white/85 p-4 shadow-sm`}
      >
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {ui.conditionGuideSectionTitle}
        </h2>
        <p className={`mb-3 text-xs leading-relaxed ${theme.accentMuted}`}>
          {cycleInsight.status}
        </p>
        <MoonAdviceCard
          title={ui.moonAdvice}
          adviceItems={cycleInsight.adviceItems}
          closing=""
        />
        <div className="mt-2">
          <ConditionGuide
            title={ui.conditionGuideTip}
            moodTagLabel={ui.moodTag}
            guide={dialogue.guide}
            phase={phase}
            phaseLabel={phaseLabel}
            moodLabel={moodLabel}
          />
        </div>
      </section>

      <section className="px-0.5">
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {ui.journeyTimelineTitle}
        </h2>
        <CalendarTab
          data={data}
          locale={locale}
          theme={theme}
          cycleInfo={cycleInfo}
          phaseLabel={phaseLabel}
          selectedDate={selectedCalendarDate}
          onSelectDate={onSelectDate}
          onCloseSheet={onCloseSheet}
          onToggleDayPeriod={onToggleDayPeriod}
          onStartPeriod={onStartPeriod}
          onEndPeriod={onEndPeriod}
          onAddPeriod={onAddPeriod}
          onDeletePeriod={onDeletePeriod}
          onSaveSettings={onSaveSettings}
          onLogMoodForDate={onLogMoodForDate}
          embedded
        />
      </section>
    </div>
  );
}
