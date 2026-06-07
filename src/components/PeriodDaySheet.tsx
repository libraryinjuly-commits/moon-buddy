"use client";

import { useEffect, useMemo, useState } from "react";

import { QuickMoodButtons } from "@/components/QuickMoodButtons";
import { formatDateByLanguage, formatTimeByLanguage } from "@/lib/format";
import { getCycleContextForDate } from "@/lib/cycle";
import { getMoodEntriesForDate } from "@/lib/dailyMood";
import { formatPeriodDayLabel } from "@/lib/cycleDisplay";
import type { LocaleContent } from "@/lib/i18n/types";
import {
  getActivePeriod,
  isDateInPeriodHistory,
} from "@/lib/periodHistory";
import { getTodayDateString } from "@/lib/storage";
import type {
  DailyMoodLogEntry,
  Language,
  LiveMood,
  PeriodHistoryEntry,
  TemperamentTheme,
  UserSettings,
} from "@/types";

interface PeriodDaySheetProps {
  date: string | null;
  periodHistory: PeriodHistoryEntry[];
  dailyMoodLogs: DailyMoodLogEntry[];
  settings: UserSettings;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onTogglePeriod: (date: string) => void;
  onStartPeriod: (date: string) => void;
  onEndPeriod: (date: string) => void;
  onLogMood: (date: string, mood: LiveMood) => void;
  onClose: () => void;
}

export function PeriodDaySheet({
  date,
  periodHistory,
  dailyMoodLogs,
  settings,
  locale,
  theme,
  onTogglePeriod,
  onStartPeriod,
  onEndPeriod,
  onLogMood,
  onClose,
}: PeriodDaySheetProps) {
  const { ui, phaseLabels, liveMoodLabels, liveMoodEmojis, liveMoodDescriptions } =
    locale;
  const language = settings.language;
  const [isPeriod, setIsPeriod] = useState(false);
  const today = getTodayDateString();

  useEffect(() => {
    if (!date) return;
    setIsPeriod(isDateInPeriodHistory(date, periodHistory, today));
  }, [date, periodHistory, today]);

  const moodOptions = useMemo(
    () =>
      (Object.keys(liveMoodLabels) as LiveMood[]).map((value) => ({
        value,
        emoji: liveMoodEmojis[value],
        label: liveMoodLabels[value],
      })),
    [liveMoodEmojis, liveMoodLabels],
  );

  if (!date) return null;

  const activeDate = date;
  const activePeriod = getActivePeriod(periodHistory);
  const canEnd =
    activePeriod !== null &&
    date >= activePeriod.startDate &&
    date <= today;
  const canStart = !activePeriod && !isPeriod;
  const moodEntries = getMoodEntriesForDate(dailyMoodLogs, activeDate).sort(
    (a, b) => b.timestamp - a.timestamp,
  );
  const cycleContext = getCycleContextForDate(
    activeDate,
    periodHistory,
    settings,
    today,
  );

  const cycleStatusLabel = cycleContext
    ? cycleContext.periodDay
      ? formatPeriodDayLabel(ui, cycleContext.periodDay)
      : `${phaseLabels[cycleContext.phase]} · ${cycleContext.dayOfCycle}${ui.dayUnit}`
    : null;

  function handleToggle(nextValue: boolean) {
    setIsPeriod(nextValue);
    onTogglePeriod(activeDate);
  }

  function handleLogMood(mood: LiveMood) {
    onLogMood(activeDate, mood);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 px-4 pb-6 pt-10 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[85dvh] w-full max-w-sm animate-[modal-pop_0.3s_ease-out] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="period-day-title"
      >
        <h2
          id="period-day-title"
          className={`text-lg font-bold ${theme.accentText}`}
        >
          {ui.recordEditTitle}
        </h2>
        <p className={`mt-1 text-sm ${theme.accentMuted}`}>
          {formatDateByLanguage(activeDate, language)}
        </p>

        {cycleStatusLabel && (
          <p
            className={`mt-3 rounded-xl px-3 py-2 text-sm font-semibold ${theme.accentSoft} ${theme.accentText}`}
          >
            {cycleStatusLabel}
          </p>
        )}

        <div className="mt-4">
          <p className={`mb-2 text-xs font-semibold ${theme.accentText}`}>
            {ui.recordEditMood}
          </p>
          {moodEntries.length === 0 ? (
            <p className={`mb-2 text-xs ${theme.accentMuted}`}>
              {ui.liveMoodTimelineEmpty}
            </p>
          ) : (
            <ul className="mb-3 flex flex-col gap-1.5">
              {moodEntries.map((entry, index) => (
                <li
                  key={`${entry.timestamp}-${index}`}
                  className={`rounded-lg px-3 py-2 ${theme.accentSoft}`}
                >
                  <p className={`text-[10px] font-semibold ${theme.accentMuted}`}>
                    {formatTimeByLanguage(
                      new Date(entry.timestamp).toISOString(),
                      language,
                    )}
                  </p>
                  <p className={`text-xs font-medium ${theme.accentText}`}>
                    <span className="mr-1">{liveMoodEmojis[entry.mood]}</span>
                    {liveMoodLabels[entry.mood]} · {liveMoodDescriptions[entry.mood]}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <QuickMoodButtons
            options={moodOptions}
            theme={theme}
            onSelect={handleLogMood}
          />
        </div>

        <label
          className={`mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-3 ${theme.accentBorder} ${theme.accentSoft}`}
        >
          <span className={`text-sm font-medium ${theme.accentText}`}>
            {ui.recordEditPeriodOn}
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
