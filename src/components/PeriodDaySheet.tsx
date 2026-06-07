"use client";

import { useEffect, useState } from "react";

import { formatDateByLanguage } from "@/lib/format";
import type { LocaleUI } from "@/lib/i18n/types";
import {
  getActivePeriod,
  isDateInPeriodHistory,
} from "@/lib/periodHistory";
import { getTodayDateString } from "@/lib/storage";
import type { Language, PeriodHistoryEntry, TemperamentTheme } from "@/types";

interface PeriodDaySheetProps {
  date: string | null;
  periodHistory: PeriodHistoryEntry[];
  language: Language;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onTogglePeriod: (date: string) => void;
  onStartPeriod: (date: string) => void;
  onEndPeriod: (date: string) => void;
  onClose: () => void;
}

export function PeriodDaySheet({
  date,
  periodHistory,
  language,
  ui,
  theme,
  onTogglePeriod,
  onStartPeriod,
  onEndPeriod,
  onClose,
}: PeriodDaySheetProps) {
  const [isPeriod, setIsPeriod] = useState(false);
  const today = getTodayDateString();

  useEffect(() => {
    if (!date) return;
    setIsPeriod(isDateInPeriodHistory(date, periodHistory, today));
  }, [date, periodHistory, today]);

  if (!date) return null;

  const activeDate = date;
  const activePeriod = getActivePeriod(periodHistory);
  const canEnd =
    activePeriod !== null &&
    date >= activePeriod.startDate &&
    date <= today;
  const canStart = !activePeriod && !isPeriod;

  function handleToggle(nextValue: boolean) {
    setIsPeriod(nextValue);
    onTogglePeriod(activeDate);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 px-4 pb-6 pt-10 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-sm animate-[modal-pop_0.3s_ease-out] rounded-2xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="period-day-title"
      >
        <h2
          id="period-day-title"
          className={`text-lg font-bold ${theme.accentText}`}
        >
          {ui.periodDaySheetTitle}
        </h2>
        <p className={`mt-1 text-sm ${theme.accentMuted}`}>
          {formatDateByLanguage(activeDate, language)}
        </p>

        <label
          className={`mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-3 ${theme.accentBorder} ${theme.accentSoft}`}
        >
          <span className={`text-sm font-medium ${theme.accentText}`}>
            {ui.periodToggleLabel}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isPeriod}
            onClick={() => handleToggle(!isPeriod)}
            className={`relative h-7 w-12 rounded-full transition ${
              isPeriod ? "bg-rose-500" : "bg-slate-200"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                isPeriod ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </label>

        <div className="mt-3 flex flex-col gap-2">
          {canStart && (
            <button
              type="button"
              onClick={() => {
                onStartPeriod(activeDate);
                onClose();
              }}
              className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white ${theme.accentButton}`}
            >
              {ui.periodStartOnDay}
            </button>
          )}

          {canEnd && (
            <button
              type="button"
              onClick={() => {
                onEndPeriod(activeDate);
                onClose();
              }}
              className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]"
            >
              {ui.periodEndOnDay}
            </button>
          )}

          {activePeriod?.startDate === date && activePeriod.endDate === null && (
            <p className={`text-center text-xs ${theme.accentMuted}`}>
              {ui.periodOngoing}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`mt-4 w-full rounded-xl border px-4 py-3 text-sm font-semibold ${theme.accentBorder} ${theme.accentText}`}
        >
          {ui.cardClose}
        </button>
      </div>
    </div>
  );
}
