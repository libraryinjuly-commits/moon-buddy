import {
  DEFAULT_CYCLE_LENGTH,
  DEFAULT_PERIOD_LENGTH,
  MAX_CYCLE_LENGTH,
  MIN_CYCLE_LENGTH,
} from "@/lib/constants";
import { getTodayDateString } from "@/lib/storage";
import type { PeriodHistoryEntry, UserSettings } from "@/types/moonBuddy";

export type PeriodVisualType = "actual" | "predicted" | "none";
export type PeriodVisualPosition = "single" | "start" | "middle" | "end";

export interface PeriodVisualState {
  type: PeriodVisualType;
  position: PeriodVisualPosition;
}

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

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

function daysBetween(start: Date, end: Date): number {
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.floor((utcEnd - utcStart) / (1000 * 60 * 60 * 24));
}

export function createPeriodId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `period-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getEffectiveEndDate(
  entry: PeriodHistoryEntry,
  today = getTodayDateString(),
): string {
  if (!entry.endDate) return today;
  return entry.endDate < entry.startDate ? entry.startDate : entry.endDate;
}

export function getActivePeriod(
  history: PeriodHistoryEntry[],
): PeriodHistoryEntry | null {
  const active = history.filter((entry) => entry.endDate === null);
  if (active.length === 0) return null;
  return active.sort((a, b) => b.startDate.localeCompare(a.startDate))[0];
}

export function isDateInPeriodHistory(
  date: string,
  history: PeriodHistoryEntry[],
  today = getTodayDateString(),
): boolean {
  return history.some((entry) => {
    const end = getEffectiveEndDate(entry, today);
    return date >= entry.startDate && date <= end;
  });
}

export function getPeriodLength(
  entry: PeriodHistoryEntry,
  today = getTodayDateString(),
): number {
  const end = getEffectiveEndDate(entry, today);
  return Math.max(1, daysBetween(parseDate(entry.startDate), parseDate(end)) + 1);
}

export function calculateAverageCycleLength(
  history: PeriodHistoryEntry[],
  fallback = DEFAULT_CYCLE_LENGTH,
): number {
  const starts = [...history]
    .map((entry) => entry.startDate)
    .sort((a, b) => a.localeCompare(b));

  if (starts.length < 2) return fallback;

  const gaps: number[] = [];
  for (let index = 0; index < starts.length - 1; index += 1) {
    const gap = daysBetween(
      parseDate(starts[index]),
      parseDate(starts[index + 1]),
    );
    if (gap >= MIN_CYCLE_LENGTH && gap <= MAX_CYCLE_LENGTH) {
      gaps.push(gap);
    }
  }

  if (gaps.length === 0) return fallback;

  const average = Math.round(gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length);
  return Math.min(MAX_CYCLE_LENGTH, Math.max(MIN_CYCLE_LENGTH, average));
}

export function getPredictedPeriodDates(
  history: PeriodHistoryEntry[],
  settings: UserSettings,
  rangeStart: string,
  rangeEnd: string,
  today = getTodayDateString(),
): Set<string> {
  if (history.length === 0) return new Set();

  const avgCycle = calculateAverageCycleLength(history, settings.cycleLength);
  const periodLength = settings.defaultPeriodLength;
  const latestStart = [...history].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  )[0].startDate;

  const predicted = new Set<string>();
  let nextStart = addDays(latestStart, avgCycle);

  for (let guard = 0; guard < 24 && nextStart <= rangeEnd; guard += 1) {
    if (nextStart >= rangeStart) {
      for (let offset = 0; offset < periodLength; offset += 1) {
        const day = addDays(nextStart, offset);
        if (day > rangeEnd) break;
        if (day >= rangeStart && !isDateInPeriodHistory(day, history, today)) {
          predicted.add(day);
        }
      }
    }
    nextStart = addDays(nextStart, avgCycle);
  }

  return predicted;
}

function getRangePosition(
  date: string,
  startDate: string,
  endDate: string,
): PeriodVisualPosition {
  if (startDate === endDate) return "single";
  if (date === startDate) return "start";
  if (date === endDate) return "end";
  return "middle";
}

export function getDatePeriodVisual(
  date: string,
  history: PeriodHistoryEntry[],
  predictedDates: Set<string>,
  today = getTodayDateString(),
): PeriodVisualState {
  for (const entry of history) {
    const end = getEffectiveEndDate(entry, today);
    if (date >= entry.startDate && date <= end) {
      return {
        type: "actual",
        position: getRangePosition(date, entry.startDate, end),
      };
    }
  }

  if (predictedDates.has(date)) {
    const run = getContiguousPredictedRun(date, predictedDates);
    return {
      type: "predicted",
      position: getRangePosition(date, run.start, run.end),
    };
  }

  return { type: "none", position: "single" };
}

function getContiguousPredictedRun(
  date: string,
  predictedDates: Set<string>,
): { start: string; end: string } {
  let start = date;
  let end = date;

  while (predictedDates.has(addDays(start, -1))) {
    start = addDays(start, -1);
  }
  while (predictedDates.has(addDays(end, 1))) {
    end = addDays(end, 1);
  }

  return { start, end };
}

export function removeDateFromHistory(
  date: string,
  history: PeriodHistoryEntry[],
  today = getTodayDateString(),
): PeriodHistoryEntry[] {
  const result: PeriodHistoryEntry[] = [];

  for (const entry of history) {
    const effectiveEnd = getEffectiveEndDate(entry, today);
    if (date < entry.startDate || date > effectiveEnd) {
      result.push(entry);
      continue;
    }

    if (entry.startDate === effectiveEnd) {
      continue;
    }

    if (entry.startDate === date) {
      const nextStart = addDays(date, 1);
      result.push({
        ...entry,
        startDate: nextStart,
        endDate:
          entry.endDate === null && nextStart <= today
            ? null
            : entry.endDate ?? effectiveEnd,
      });
      continue;
    }

    if (effectiveEnd === date) {
      const prevEnd = addDays(date, -1);
      result.push({
        ...entry,
        endDate: entry.endDate === null ? prevEnd : prevEnd,
      });
      continue;
    }

    result.push({
      ...entry,
      endDate: addDays(date, -1),
    });
    result.push({
      id: createPeriodId(),
      startDate: addDays(date, 1),
      endDate: entry.endDate,
    });
  }

  return result.filter((entry) => {
    const end = getEffectiveEndDate(entry, today);
    return entry.startDate <= end;
  });
}

export function addDateToHistory(
  date: string,
  history: PeriodHistoryEntry[],
  today = getTodayDateString(),
): PeriodHistoryEntry[] {
  const prevDay = addDays(date, -1);
  const nextDay = addDays(date, 1);
  const prevEntry = history.find((entry) => getEffectiveEndDate(entry, today) === prevDay);
  const nextEntry = history.find((entry) => entry.startDate === nextDay);

  if (prevEntry && nextEntry) {
    return history
      .filter((entry) => entry.id !== prevEntry.id && entry.id !== nextEntry.id)
      .concat([{ ...prevEntry, endDate: nextEntry.endDate }]);
  }

  if (prevEntry) {
    return history.map((entry) => {
      if (entry.id !== prevEntry.id) return entry;
      if (entry.endDate === null) return entry;
      return { ...entry, endDate: date >= entry.startDate ? date : entry.endDate };
    });
  }

  if (nextEntry) {
    return history.map((entry) =>
      entry.id === nextEntry.id ? { ...entry, startDate: date } : entry,
    );
  }

  return [
    {
      id: createPeriodId(),
      startDate: date,
      endDate: date,
    },
    ...history,
  ];
}

export function startPeriodOnDate(
  history: PeriodHistoryEntry[],
  date: string,
  today = getTodayDateString(),
): PeriodHistoryEntry[] {
  const withoutActive = closeActivePeriod(history, addDays(date, -1), today);
  const cleaned = removeOverlappingStarts(withoutActive, date, today);

  const entry: PeriodHistoryEntry = {
    id: createPeriodId(),
    startDate: date,
    endDate: date >= today ? null : date,
  };

  return [entry, ...cleaned];
}

export function endPeriodOnDate(
  history: PeriodHistoryEntry[],
  date: string,
  today = getTodayDateString(),
): PeriodHistoryEntry[] {
  const active = getActivePeriod(history);
  if (!active) return history;

  const endDate = date < active.startDate ? active.startDate : date;
  return history.map((entry) =>
    entry.id === active.id ? { ...entry, endDate } : entry,
  );
}

export function closeActivePeriod(
  history: PeriodHistoryEntry[],
  endDate: string,
  today = getTodayDateString(),
): PeriodHistoryEntry[] {
  const active = getActivePeriod(history);
  if (!active) return history;

  const resolvedEnd = endDate < active.startDate ? active.startDate : endDate;
  return history.map((entry) =>
    entry.id === active.id ? { ...entry, endDate: resolvedEnd } : entry,
  );
}

function removeOverlappingStarts(
  history: PeriodHistoryEntry[],
  date: string,
  today = getTodayDateString(),
): PeriodHistoryEntry[] {
  return history.filter((entry) => {
    const end = getEffectiveEndDate(entry, today);
    return date < entry.startDate || date > end;
  });
}

export function togglePeriodDay(
  history: PeriodHistoryEntry[],
  date: string,
  today = getTodayDateString(),
): PeriodHistoryEntry[] {
  if (isDateInPeriodHistory(date, history, today)) {
    return removeDateFromHistory(date, history, today);
  }
  return addDateToHistory(date, history, today);
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

export function getMonthDateRange(year: number, month: number): {
  start: string;
  end: string;
} {
  const days = getMonthGrid(year, month);
  return {
    start: toDateString(days[0]),
    end: toDateString(days[days.length - 1]),
  };
}

export function getDefaultPeriodLength(): number {
  return DEFAULT_PERIOD_LENGTH;
}
