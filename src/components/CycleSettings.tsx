"use client";

import { useEffect, useState } from "react";

import {
  MAX_CYCLE_LENGTH,
  MAX_PERIOD_LENGTH,
  MIN_CYCLE_LENGTH,
  MIN_PERIOD_LENGTH,
} from "@/lib/constants";
import type { LocaleUI } from "@/lib/i18n/types";
import type { UserSettings } from "@/types";

interface CycleSettingsProps {
  settings: UserSettings;
  ui: LocaleUI;
  onSave: (settings: UserSettings) => void;
}

export function CycleSettings({ settings, ui, onSave }: CycleSettingsProps) {
  const [cycleLength, setCycleLength] = useState(String(settings.cycleLength));
  const [defaultPeriodLength, setDefaultPeriodLength] = useState(
    String(settings.defaultPeriodLength),
  );
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCycleLength(String(settings.cycleLength));
    setDefaultPeriodLength(String(settings.defaultPeriodLength));
  }, [settings]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cycle = Number(cycleLength);
    const period = Number(defaultPeriodLength);

    if (
      !Number.isInteger(cycle) ||
      cycle < MIN_CYCLE_LENGTH ||
      cycle > MAX_CYCLE_LENGTH
    ) {
      setError(ui.cycleErrorLength);
      return;
    }

    if (
      !Number.isInteger(period) ||
      period < MIN_PERIOD_LENGTH ||
      period > MAX_PERIOD_LENGTH
    ) {
      setError(ui.cycleErrorPeriod);
      return;
    }

    if (period >= cycle) {
      setError(ui.cycleErrorCompare);
      return;
    }

    onSave({
      ...settings,
      cycleLength: cycle,
      defaultPeriodLength: period,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/80 p-4 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-violet-900">
        {ui.cycleSettings}
      </h2>
      <p className="mb-4 text-sm text-violet-600">{ui.cycleSettingsDesc}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-violet-700">
            {ui.cycleLength}
          </span>
          <input
            type="number"
            min={MIN_CYCLE_LENGTH}
            max={MAX_CYCLE_LENGTH}
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-base text-violet-950 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-violet-700">
            {ui.defaultPeriodLength}
          </span>
          <input
            type="number"
            min={MIN_PERIOD_LENGTH}
            max={MAX_PERIOD_LENGTH}
            value={defaultPeriodLength}
            onChange={(e) => setDefaultPeriodLength(e.target.value)}
            className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-base text-violet-950 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          />
          <span className="text-xs text-violet-500">{ui.defaultPeriodHint}</span>
        </label>

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-base font-semibold text-violet-700 transition hover:bg-violet-100 active:scale-[0.98]"
        >
          {saved ? ui.settingsSaved : ui.settingsSave}
        </button>
      </form>
    </section>
  );
}
