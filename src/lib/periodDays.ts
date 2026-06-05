import type { MoodLog, PeriodRecord } from "@/types";

export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(dateStr: string, delta: number): string {
  const date = new Date(`${dateStr}T12:00:00`);
  date.setDate(date.getDate() + delta);
  return toDateString(date);
}

export function isDateInPeriod(
  date: string,
  periods: PeriodRecord[],
): boolean {
  return periods.some(
    (period) => date >= period.startDate && date <= period.endDate,
  );
}

export function hasDayRecord(
  date: string,
  moodLogs: MoodLog[],
  periods: PeriodRecord[],
): boolean {
  return (
    moodLogs.some((log) => log.date === date) ||
    isDateInPeriod(date, periods)
  );
}

export function removeDateFromPeriods(
  date: string,
  periods: PeriodRecord[],
): PeriodRecord[] {
  const result: PeriodRecord[] = [];

  for (const period of periods) {
    if (date < period.startDate || date > period.endDate) {
      result.push(period);
      continue;
    }

    if (period.startDate === period.endDate) {
      continue;
    }

    if (period.startDate === date) {
      result.push({ ...period, startDate: addDays(date, 1) });
    } else if (period.endDate === date) {
      result.push({ ...period, endDate: addDays(date, -1) });
    } else {
      result.push({ ...period, endDate: addDays(date, -1) });
      result.push({
        ...period,
        id: crypto.randomUUID(),
        startDate: addDays(date, 1),
      });
    }
  }

  return result;
}

export function addDateToPeriods(
  date: string,
  periods: PeriodRecord[],
): PeriodRecord[] {
  if (isDateInPeriod(date, periods)) return periods;

  const prevDay = addDays(date, -1);
  const nextDay = addDays(date, 1);
  const prevPeriod = periods.find((period) => period.endDate === prevDay);
  const nextPeriod = periods.find((period) => period.startDate === nextDay);

  if (prevPeriod && nextPeriod) {
    return periods
      .filter(
        (period) =>
          period.id !== prevPeriod.id && period.id !== nextPeriod.id,
      )
      .concat([{ ...prevPeriod, endDate: nextPeriod.endDate }]);
  }

  if (prevPeriod) {
    return periods.map((period) =>
      period.id === prevPeriod.id ? { ...period, endDate: date } : period,
    );
  }

  if (nextPeriod) {
    return periods.map((period) =>
      period.id === nextPeriod.id ? { ...period, startDate: date } : period,
    );
  }

  return [
    { id: crypto.randomUUID(), startDate: date, endDate: date },
    ...periods,
  ];
}

export function getMonthGrid(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
}

export function getMoodForDate(
  date: string,
  moodLogs: MoodLog[],
): MoodLog["mood"] | null {
  return moodLogs.find((log) => log.date === date)?.mood ?? null;
}
