"use client";

import { useMemo, useState } from "react";

import { getDominantMoodByDate } from "@/lib/dailyMood";
import { formatMonthYear } from "@/lib/format";
import type { LocaleUI } from "@/lib/i18n/types";
import {
  getDatePeriodVisual,
  getMonthDateRange,
  getMonthGrid,
  getPredictedPeriodDates,
  toDateString,
  type PeriodVisualState,
} from "@/lib/periodHistory";
import { getTodayDateString } from "@/lib/storage";
import type {
  CycleInfo,
  DailyMoodLogEntry,
  Language,
  LiveMood,
  PeriodHistoryEntry,
  TemperamentTheme,
  UserSettings,
} from "@/types";

interface RecordCalendarProps {
  dailyMoodLogs: DailyMoodLogEntry[];
  periodHistory: PeriodHistoryEntry[];
  settings: UserSettings;
  cycleInfo: CycleInfo | null;
  liveMoodEmojis: Record<LiveMood, string>;
  language: Language;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onSelectDay: (date: string) => void;
}

function getPeriodBarClass(visual: PeriodVisualState): string {
  if (visual.type === "none") return "";

  const tone =
    visual.type === "actual"
      ? "bg-rose-400"
      : "border border-dashed border-rose-300 bg-rose-50";

  const shape = {
    single: "mx-1 rounded-full",
    start: "ml-1 rounded-l-full rounded-r-none",
    middle: "rounded-none",
    end: "mr-1 rounded-r-full rounded-l-none",
  }[visual.position];

  return `${tone} ${shape}`;
}

export function RecordCalendar({
  dailyMoodLogs,
  periodHistory,
  settings,
  cycleInfo,
  liveMoodEmojis,
  language,
  ui,
  theme,
  onSelectDay,
}: RecordCalendarProps) {
  const today = getTodayDateString();
  const initial = new Date(`${today}T12:00:00`);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const days = useMemo(
    () => getMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const dominantMoods = useMemo(
    () => getDominantMoodByDate(dailyMoodLogs),
    [dailyMoodLogs],
  );

  const predictedDates = useMemo(() => {
    const range = getMonthDateRange(viewYear, viewMonth);
    return getPredictedPeriodDates(
      periodHistory,
      settings,
      range.start,
      range.end,
      today,
    );
  }, [periodHistory, settings, viewYear, viewMonth, today]);

  function goPrevMonth() {
    if (viewMonth === 0) {
      setViewYear((year) => year - 1);
      setViewMonth(11);
      return;
    }
    setViewMonth((month) => month - 1);
  }

  function goNextMonth() {
    if (viewMonth === 11) {
      setViewYear((year) => year + 1);
      setViewMonth(0);
      return;
    }
    setViewMonth((month) => month + 1);
  }

  return (
    <section
      className={`rounded-2xl border ${theme.accentBorder} bg-white/80 p-4 shadow-sm`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className={`text-base font-semibold ${theme.accentText}`}>
          📅 {ui.calendarTitle}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={ui.calendarPrev}
            onClick={goPrevMonth}
            className={`rounded-lg px-2 py-1 text-sm ${theme.accentSoft} ${theme.accentText}`}
          >
            ‹
          </button>
          <span
            className={`min-w-[7rem] text-center text-sm font-medium ${theme.accentText}`}
          >
            {formatMonthYear(viewYear, viewMonth, language)}
          </span>
          <button
            type="button"
            aria-label={ui.calendarNext}
            onClick={goNextMonth}
            className={`rounded-lg px-2 py-1 text-sm ${theme.accentSoft} ${theme.accentText}`}
          >
            ›
          </button>
        </div>
      </div>

      {cycleInfo && (
        <p className={`mb-2 text-[10px] ${theme.accentMuted}`}>
          {ui.averageCycleLabel.replace(
            "{days}",
            String(cycleInfo.averageCycleLength),
          )}
        </p>
      )}

      <div className="mb-2 flex items-center gap-3 text-[9px]">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className={theme.accentMuted}>{ui.periodActualLegend}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full border border-dashed border-rose-300 bg-rose-50" />
          <span className={theme.accentMuted}>{ui.periodPredictedLegend}</span>
        </span>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1">
        {ui.weekdayShort.map((label) => (
          <div
            key={label}
            className={`py-1 text-center text-[10px] font-medium ${theme.accentMuted}`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((date) => {
          const dateStr = toDateString(date);
          const inCurrentMonth = date.getMonth() === viewMonth;
          const dominantMood = dominantMoods.get(dateStr) ?? null;
          const visual = getDatePeriodVisual(
            dateStr,
            periodHistory,
            predictedDates,
            today,
          );
          const isToday = dateStr === today;
          const periodBarClass = getPeriodBarClass(visual);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDay(dateStr)}
              className={`relative flex aspect-square flex-col items-center justify-center text-xs transition active:scale-95 ${
                inCurrentMonth ? theme.accentText : `${theme.accentMuted} opacity-40`
              } ${isToday ? "z-[1] ring-2 ring-violet-400 ring-offset-1" : ""}`}
            >
              {periodBarClass && (
                <span
                  className={`absolute inset-x-0 top-1/2 h-7 -translate-y-1/2 ${periodBarClass}`}
                  aria-hidden
                />
              )}
              {dominantMood && (
                <span className="absolute right-0.5 top-0.5 z-[2] text-[9px] leading-none opacity-90">
                  {liveMoodEmojis[dominantMood]}
                </span>
              )}
              <span
                className={`relative z-[1] font-medium ${
                  visual.type === "actual" ? "text-white" : ""
                }`}
              >
                {date.getDate()}
              </span>
              {visual.type === "actual" && !dominantMood && (
                <span className="relative z-[1] text-[8px] leading-none text-white/90">
                  ●
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
