"use client";

import { CalendarTab } from "@/components/CalendarTab";
import { InsightsTab } from "@/components/InsightsTab";
import type { LocaleContent } from "@/lib/i18n/types";
import type { CycleMoodStats } from "@/lib/insightsStats";
import type {
  CycleInfo,
  CycleInsight,
  DialogueContent,
  MoonBuddyData,
  TemperamentTheme,
  UserSettings,
} from "@/types";

interface JourneyTabProps {
  data: MoonBuddyData;
  locale: LocaleContent;
  theme: TemperamentTheme;
  cycleInfo: CycleInfo | null;
  cycleInsight: CycleInsight;
  phaseLabel: string | null;
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
}

export function JourneyTab({
  data,
  locale,
  theme,
  cycleInfo,
  cycleInsight,
  phaseLabel,
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
}: JourneyTabProps) {
  const { ui } = locale;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-1.5">
      <div className="px-0.5 pt-0.5">
        <h1 className={`text-base font-bold ${theme.accentText}`}>
          {ui.tabJourney}
        </h1>
        <p className={`mt-0.5 text-xs ${theme.accentMuted}`}>
          {ui.journeyTabDesc}
        </p>
      </div>

      <InsightsTab
        locale={locale}
        theme={theme}
        analysisTitle={ui.journeyEmotionTitle}
        customAdviceTitle={customAdviceTitle}
        cycleInsight={cycleInsight}
        cycleInfo={cycleInfo}
        phaseLabel={phaseLabel}
        dialogue={dialogue}
        moodLabel={moodLabel}
        moodStats={moodStats}
        hidePageHeader
        hideDaysUntil
        rhythmSectionTitle={ui.journeyRhythmTitle}
      />

      <section className="px-0.5">
        <h2 className={`mb-2 text-sm font-bold ${theme.accentText}`}>
          {ui.journeyTimelineTitle}
        </h2>
        <CalendarTab
          data={data}
          locale={locale}
          theme={theme}
          cycleInfo={cycleInfo}
          selectedDate={selectedCalendarDate}
          onSelectDate={onSelectDate}
          onCloseSheet={onCloseSheet}
          onToggleDayPeriod={onToggleDayPeriod}
          onStartPeriod={onStartPeriod}
          onEndPeriod={onEndPeriod}
          onAddPeriod={onAddPeriod}
          onDeletePeriod={onDeletePeriod}
          onSaveSettings={onSaveSettings}
          embedded
        />
      </section>
    </div>
  );
}
