"use client";

import { useState } from "react";

import { DateInput } from "@/components/DateInput";
import { getTodayDateString } from "@/lib/storage";

interface PeriodFormProps {
  title: string;
  description: string;
  startLabel: string;
  endLabel: string;
  ongoingLabel: string;
  saveLabel: string;
  errorMessage: string;
  onSubmit: (startDate: string, endDate: string | null) => boolean;
}

export function PeriodForm({
  title,
  description,
  startLabel,
  endLabel,
  ongoingLabel,
  saveLabel,
  errorMessage,
  onSubmit,
}: PeriodFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const today = getTodayDateString();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const resolvedEnd = endDate.trim() ? endDate : null;
    const success = onSubmit(startDate, resolvedEnd);
    if (!success) {
      setError(errorMessage);
      return;
    }

    setStartDate("");
    setEndDate("");
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white/80 p-4 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-violet-900">{title}</h2>
      <p className="mb-4 text-sm text-violet-600">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <DateInput
          id="period-start"
          label={startLabel}
          value={startDate}
          onChange={setStartDate}
        />
        <DateInput
          id="period-end"
          label={endLabel}
          value={endDate}
          onChange={setEndDate}
        />
        {!endDate && startDate && startDate >= today && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
            {ongoingLabel}
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-violet-600 px-4 py-3 text-base font-semibold text-white shadow-md transition hover:bg-violet-700 active:scale-[0.98]"
        >
          {saveLabel}
        </button>
      </form>
    </section>
  );
}
