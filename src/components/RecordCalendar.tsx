"use client";

import { useMemo, useState } from "react";

import { formatMonthYear } from "@/lib/format";
import type { LocaleUI } from "@/lib/i18n/types";
import {
  getMonthGrid,
  getMoodForDate,
  hasDayRecord,
  isDateInPeriod,
  toDateString,
} from "@/lib/periodDays";
import { getTodayDateString } from "@/lib/storage";
import type { Language, MoodLog, PeriodRecord, TemperamentTheme } from "@/types";

interface RecordCalendarProps {
  moodLogs: MoodLog[];
  periods: PeriodRecord[];
  moodEmojis: Record<MoodLog["mood"], string>;
  language: Language;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onSelectRecordedDay: (date: string) => void;
}

export function RecordCalendar({
  moodLogs,
  periods,
  moodEmojis,
  language,
  ui,
  theme,
  onSelectRecordedDay,
}: RecordCalendarProps) {
  const today = getTodayDateString();
  const initial = new Date(`${today}T12:00:00`);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const days = useMemo(
    () => getMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

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
          <span className={`min-w-[7rem] text-center text-sm font-medium ${theme.accentText}`}>
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

      <div className="grid grid-cols-7 gap-1">
        {days.map((date) => {
          const dateStr = toDateString(date);
          const inCurrentMonth = date.getMonth() === viewMonth;
          const mood = getMoodForDate(dateStr, moodLogs);
          const isPeriod = isDateInPeriod(dateStr, periods);
          const hasRecord = hasDayRecord(dateStr, moodLogs, periods);
          const isToday = dateStr === today;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={!hasRecord}
              onClick={() => hasRecord && onSelectRecordedDay(dateStr)}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition active:scale-95 disabled:cursor-default ${
                inCurrentMonth ? theme.accentText : `${theme.accentMuted} opacity-40`
              } ${
                hasRecord
                  ? `cursor-pointer ${theme.accentSoft} hover:ring-2 hover:ring-violet-300`
                  : "bg-transparent"
              } ${isToday ? "ring-2 ring-violet-400" : ""} ${
                isPeriod ? "bg-rose-100/80" : ""
              }`}
            >
              <span className="font-medium">{date.getDate()}</span>
              {mood && (
                <span className="text-[10px] leading-none">
                  {moodEmojis[mood]}
                </span>
              )}
              {isPeriod && !mood && (
                <span className="text-[8px] leading-none text-rose-500">●</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
