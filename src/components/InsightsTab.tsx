"use client";

import { ConditionGuide } from "@/components/ConditionGuide";
import { MoonAdviceCard } from "@/components/MoonAdviceCard";
import { TodayStatusCard } from "@/components/TodayStatusCard";
import type { LocaleContent } from "@/lib/i18n/types";
import type { CycleMoodStats } from "@/lib/insightsStats";
import type {
  CycleInfo,
  CycleInsight,
  DialogueContent,
  TemperamentTheme,
} from "@/types";

interface InsightsTabProps {
  locale: LocaleContent;
  theme: TemperamentTheme;
  analysisTitle: string;
  customAdviceTitle: string;
  cycleInsight: CycleInsight;
  cycleInfo: CycleInfo | null;
  phaseLabel: string | null;
  dialogue: DialogueContent;
  moodLabel: string | null;
  moodStats: CycleMoodStats;
  hidePageHeader?: boolean;
  hideDaysUntil?: boolean;
  rhythmSectionTitle?: string;
}

export function InsightsTab({
  locale,
  theme,
  analysisTitle,
  customAdviceTitle,
  cycleInsight,
  cycleInfo,
  phaseLabel,
  dialogue,
  moodLabel,
  moodStats,
  hidePageHeader = false,
  hideDaysUntil = false,
  rhythmSectionTitle,
}: InsightsTabProps) {
  const { ui } = locale;
  const topMoodLabel = moodStats.topMood
    ? locale.liveMoodLabels[moodStats.topMood]
    : null;
  const topMoodEmoji = moodStats.topMood
    ? locale.liveMoodEmojis[moodStats.topMood]
    : null;

  return (
    <div
      className={
        hidePageHeader
          ? "flex flex-col gap-3"
          : "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-1.5"
      }
    >
      {!hidePageHeader && (
        <div className="px-0.5 pt-0.5">
          <h1 className={`text-base font-bold ${theme.accentText}`}>
            {ui.tabJourney}
          </h1>
          <p className={`mt-0.5 text-xs ${theme.accentMuted}`}>
            {ui.journeyTabDesc}
          </p>
        </div>
      )}

      <section
        className={`rounded-2xl border ${theme.accentBorder} bg-white/85 p-3 shadow-sm backdrop-blur-sm`}
      >
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {analysisTitle}
        </h2>
        <div
          className={`grid grid-cols-3 gap-2 rounded-xl ${theme.accentSoft} p-2.5`}
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
      </section>

      <section
        className={`rounded-2xl border ${theme.accentBorder} bg-white/85 p-3 shadow-sm backdrop-blur-sm`}
      >
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {rhythmSectionTitle ?? ui.journeyRhythmTitle}
        </h2>
        <TodayStatusCard
          title={ui.todayRhythm}
          dayUnit={ui.dayUnit}
          daysUntilLabel={ui.daysUntilPeriod}
          daysCountUnit={ui.daysCountUnit}
          daysUntilCount={cycleInfo?.daysUntilNextPeriod ?? null}
          status={cycleInsight.status}
          phase={cycleInfo?.phase ?? null}
          phaseLabel={phaseLabel}
          dayOfCycle={cycleInfo?.dayOfCycle ?? null}
          compact
          hideDaysUntil={hideDaysUntil}
          hideCycleDay={hideDaysUntil}
        />
      </section>

      <section
        className={`rounded-2xl border ${theme.accentBorder} bg-white/85 p-4 shadow-sm backdrop-blur-sm`}
      >
        <h2 className={`mb-3 text-sm font-bold ${theme.accentText}`}>
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
      </section>

      <section className="pb-1">
        <MoonAdviceCard
          title={ui.conditionGuide}
          adviceItems={cycleInsight.adviceItems}
          closing=""
        />
        <div className="mt-2">
          <ConditionGuide
            title={ui.conditionGuideTip}
            moodTagLabel={ui.moodTag}
            guide={dialogue.guide}
            phase={cycleInfo?.phase ?? null}
            phaseLabel={phaseLabel}
            moodLabel={moodLabel}
          />
        </div>
      </section>
    </div>
  );
}
