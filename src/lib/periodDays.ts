import type { DailyMoodLogEntry, PeriodHistoryEntry } from "@/types";

export {
  addDays,
  addDateToHistory,
  getMonthGrid,
  isDateInPeriodHistory,
  removeDateFromHistory,
  toDateString,
} from "@/lib/periodHistory";

import { hasMoodOnDate } from "@/lib/dailyMood";
import {
  addDateToHistory,
  isDateInPeriodHistory,
  removeDateFromHistory,
} from "@/lib/periodHistory";
import { getTodayDateString } from "@/lib/storage";

export function isDateInPeriod(
  date: string,
  periodHistory: PeriodHistoryEntry[],
  today = getTodayDateString(),
): boolean {
  return isDateInPeriodHistory(date, periodHistory, today);
}

export function hasDayRecord(
  date: string,
  dailyMoodLogs: DailyMoodLogEntry[],
  periodHistory: PeriodHistoryEntry[],
  today = getTodayDateString(),
): boolean {
  return (
    hasMoodOnDate(dailyMoodLogs, date) ||
    isDateInPeriodHistory(date, periodHistory, today)
  );
}

export function removeDateFromPeriods(
  date: string,
  periodHistory: PeriodHistoryEntry[],
): PeriodHistoryEntry[] {
  return removeDateFromHistory(date, periodHistory);
}

export function addDateToPeriods(
  date: string,
  periodHistory: PeriodHistoryEntry[],
): PeriodHistoryEntry[] {
  return addDateToHistory(date, periodHistory);
}
