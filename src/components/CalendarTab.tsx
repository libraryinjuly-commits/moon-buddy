"use client";

import { CycleSettings } from "@/components/CycleSettings";
import { PeriodDaySheet } from "@/components/PeriodDaySheet";
import { PeriodForm } from "@/components/PeriodForm";
import { PeriodRecordList } from "@/components/PeriodRecordList";
import { RecordCalendar } from "@/components/RecordCalendar";
import type { LocaleContent } from "@/lib/i18n/types";
import type { CycleInfo, MoonBuddyData, TemperamentTheme, UserSettings } from "@/types";

interface CalendarTabProps {
  data: MoonBuddyData;
  locale: LocaleContent;
  theme: TemperamentTheme;
  cycleInfo: CycleInfo | null;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onCloseSheet: () => void;
  onToggleDayPeriod: (date: string) => void;
  onStartPeriod: (date: string) => void;
  onEndPeriod: (date: string) => void;
  onAddPeriod: (startDate: string, endDate: string | null) => boolean;
  onDeletePeriod: (periodId: string) => void;
  onSaveSettings: (settings: UserSettings) => void;
}

export function CalendarTab({
  data,
  locale,
  theme,
  cycleInfo,
  selectedDate,
  onSelectDate,
  onCloseSheet,
  onToggleDayPeriod,
  onStartPeriod,
  onEndPeriod,
  onAddPeriod,
  onDeletePeriod,
  onSaveSettings,
}: CalendarTabProps) {
  const { ui } = locale;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-1.5">
      <RecordCalendar
        dailyMoodLogs={data.dailyMoodLogs}
        periodHistory={data.periodHistory}
        settings={data.settings}
        cycleInfo={cycleInfo}
        liveMoodEmojis={locale.liveMoodEmojis}
        language={data.settings.language}
        ui={ui}
        theme={theme}
        onSelectDay={onSelectDate}
      />

      <PeriodForm
        title={ui.periodRecord}
        description={ui.periodRecordDesc}
        startLabel={ui.periodStart}
        endLabel={ui.periodEnd}
        ongoingLabel={ui.periodOngoingHint}
        saveLabel={ui.periodSave}
        errorMessage={ui.periodError}
        onSubmit={onAddPeriod}
      />

      <PeriodRecordList
        periodHistory={data.periodHistory}
        language={data.settings.language}
        ui={ui}
        theme={theme}
        onDelete={onDeletePeriod}
      />

      <CycleSettings settings={data.settings} ui={ui} onSave={onSaveSettings} />

      <PeriodDaySheet
        date={selectedDate}
        periodHistory={data.periodHistory}
        language={data.settings.language}
        ui={ui}
        theme={theme}
        onTogglePeriod={onToggleDayPeriod}
        onStartPeriod={onStartPeriod}
        onEndPeriod={onEndPeriod}
        onClose={onCloseSheet}
      />
    </div>
  );
}
