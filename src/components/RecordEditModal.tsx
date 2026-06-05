"use client";

import { useEffect, useState } from "react";

import { formatDateByLanguage } from "@/lib/format";
import type { LocaleUI } from "@/lib/i18n/types";
import { isDateInPeriod } from "@/lib/periodDays";
import type { Language, Mood, MoodLog, PeriodRecord, TemperamentTheme } from "@/types";

interface MoodOption {
  value: Mood;
  label: string;
  emoji: string;
}

interface RecordEditModalProps {
  date: string | null;
  moodLogs: MoodLog[];
  periods: PeriodRecord[];
  moodOptions: MoodOption[];
  language: Language;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onSave: (date: string, mood: Mood | null, isPeriod: boolean) => void;
  onDelete: (date: string) => void;
  onClose: () => void;
}

export function RecordEditModal({
  date,
  moodLogs,
  periods,
  moodOptions,
  language,
  ui,
  theme,
  onSave,
  onDelete,
  onClose,
}: RecordEditModalProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isPeriod, setIsPeriod] = useState(false);

  useEffect(() => {
    if (!date) return;
    const existingMood = moodLogs.find((log) => log.date === date)?.mood ?? null;
    setSelectedMood(existingMood);
    setIsPeriod(isDateInPeriod(date, periods));
  }, [date, moodLogs, periods]);

  if (!date) return null;

  const activeDate = date;

  function handleSave() {
    onSave(activeDate, selectedMood, isPeriod);
    onClose();
  }

  function handleDelete() {
    onDelete(activeDate);
    onClose();
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
        aria-labelledby="record-edit-title"
      >
        <h2
          id="record-edit-title"
          className={`text-lg font-bold ${theme.accentText}`}
        >
          {ui.recordEditTitle}
        </h2>
        <p className={`mt-1 text-sm ${theme.accentMuted}`}>
          {formatDateByLanguage(date, language)}
        </p>

        <div className="mt-4">
          <p className={`mb-2 text-sm font-semibold ${theme.accentText}`}>
            {ui.recordEditMood}
          </p>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((option) => {
              const isSelected = selectedMood === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setSelectedMood(isSelected ? null : option.value)
                  }
                  className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-2 transition active:scale-95 ${
                    isSelected
                      ? `border-violet-400 ring-2 ring-violet-300 ${theme.accentSoft}`
                      : "border-violet-100 bg-white hover:border-violet-200"
                  }`}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className="text-[9px] font-medium text-violet-700">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <label
          className={`mt-4 flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 ${theme.accentBorder} ${theme.accentSoft}`}
        >
          <input
            type="checkbox"
            checked={isPeriod}
            onChange={(event) => setIsPeriod(event.target.checked)}
            className="h-4 w-4 rounded border-violet-300 text-violet-600"
          />
          <span className={`text-sm font-medium ${theme.accentText}`}>
            🩸 {ui.recordEditPeriodOn}
          </span>
        </label>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSave}
            className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white ${theme.accentButton}`}
          >
            {ui.recordEditSave}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition active:scale-[0.98]"
          >
            {ui.recordEditDelete}
          </button>
        </div>
      </div>
    </div>
  );
}
