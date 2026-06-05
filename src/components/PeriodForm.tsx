"use client";

import { useState } from "react";

import { DateInput } from "@/components/DateInput";

interface PeriodFormProps {
  title: string;
  description: string;
  startLabel: string;
  endLabel: string;
  saveLabel: string;
  errorMessage: string;
  onSubmit: (startDate: string, endDate: string) => boolean;
}

export function PeriodForm({
  title,
  description,
  startLabel,
  endLabel,
  saveLabel,
  errorMessage,
  onSubmit,
}: PeriodFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const success = onSubmit(startDate, endDate);
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
