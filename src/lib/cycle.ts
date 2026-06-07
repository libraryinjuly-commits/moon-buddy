import { DEFAULT_CYCLE_LENGTH, DEFAULT_PERIOD_LENGTH } from "@/lib/constants";
import {
  addDays,
  calculateAverageCycleLength,
  getActivePeriod,
  getEffectiveEndDate,
  getPeriodLength,
  isDateInPeriodHistory,
} from "@/lib/periodHistory";
import { getTodayDateString } from "@/lib/storage";
import type {
  CycleInfo,
  CyclePhase,
  PeriodHistoryEntry,
  UserSettings,
} from "@/types";

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(start: Date, end: Date): number {
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.floor((utcEnd - utcStart) / (1000 * 60 * 60 * 24));
}

function getDayOfCycle(periodStart: string, today = new Date()): number {
  const start = parseDate(periodStart);
  return daysBetween(start, today) + 1;
}

export interface DateCycleContext {
  phase: CyclePhase;
  dayOfCycle: number;
  periodDay: number | null;
}

function getPhase(
  dayOfCycle: number,
  periodLength: number,
  cycleLength: number,
): CyclePhase {
  const ovulationCenter = Math.max(periodLength + 3, cycleLength - 14);
  const ovulationStart = Math.max(periodLength + 1, ovulationCenter - 1);
  const ovulationEnd = Math.min(cycleLength, ovulationCenter + 1);

  if (dayOfCycle <= periodLength) return "menstrual";
  if (dayOfCycle < ovulationStart) return "follicular";
  if (dayOfCycle <= ovulationEnd) return "ovulation";
  if (dayOfCycle <= cycleLength) return "luteal";
  return "follicular";
}

function findCycleStartForDate(
  date: string,
  periodHistory: PeriodHistoryEntry[],
  cycleLength: number,
): string | null {
  const starts = [...new Set(periodHistory.map((entry) => entry.startDate))].sort(
    (a, b) => a.localeCompare(b),
  );

  if (starts.length === 0) return null;

  const applicable = starts.filter((start) => start <= date);
  if (applicable.length > 0) {
    return applicable[applicable.length - 1];
  }

  let candidate = starts[0];
  while (candidate > date) {
    candidate = addDays(candidate, -cycleLength);
  }
  return candidate;
}

export function getCycleContextForDate(
  date: string,
  periodHistory: PeriodHistoryEntry[],
  settings: UserSettings,
  today = getTodayDateString(),
): DateCycleContext | null {
  if (periodHistory.length === 0) return null;

  const cycleLength = calculateAverageCycleLength(
    periodHistory,
    settings.cycleLength,
  );
  const cycleStart = findCycleStartForDate(date, periodHistory, cycleLength);
  if (!cycleStart) return null;

  let dayOfCycle = daysBetween(parseDate(cycleStart), parseDate(date)) + 1;
  while (dayOfCycle > cycleLength) {
    dayOfCycle -= cycleLength;
  }
  while (dayOfCycle < 1) {
    dayOfCycle += cycleLength;
  }

  const periodLength = settings.defaultPeriodLength;
  const phase = getPhase(dayOfCycle, periodLength, cycleLength);

  let periodDay: number | null = null;
  if (isDateInPeriodHistory(date, periodHistory, today)) {
    for (const entry of periodHistory) {
      const end = getEffectiveEndDate(entry, today);
      if (date >= entry.startDate && date <= end) {
        periodDay = daysBetween(parseDate(entry.startDate), parseDate(date)) + 1;
        break;
      }
    }
  }

  return { phase, dayOfCycle, periodDay };
}

export function calculateCycleInfo(
  periodHistory: PeriodHistoryEntry[],
  settings: UserSettings,
  today = new Date(),
): CycleInfo | null {
  if (periodHistory.length === 0) return null;

  const todayStr = getTodayDateString();
  const averageCycleLength = calculateAverageCycleLength(
    periodHistory,
    settings.cycleLength,
  );
  const cycleLength = averageCycleLength;

  const sorted = [...periodHistory].sort(
    (a, b) => parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime(),
  );
  const latest = sorted[0];
  const active = getActivePeriod(periodHistory);
  const periodLength = active
    ? getPeriodLength(active, todayStr)
    : getPeriodLength(latest, todayStr);

  let dayOfCycle = getDayOfCycle(latest.startDate, today);
  while (dayOfCycle > cycleLength) {
    dayOfCycle -= cycleLength;
  }

  const phase = getPhase(dayOfCycle, periodLength, cycleLength);
  const daysUntilNextPeriod = Math.max(1, cycleLength - dayOfCycle + 1);
  const nextPredictedStart = addDays(latest.startDate, averageCycleLength);

  return {
    phase,
    dayOfCycle,
    cycleLength,
    averageCycleLength,
    periodLength,
    daysUntilNextPeriod,
    nextPredictedStart,
  };
}

export function getDefaultSettings(): UserSettings {
  return {
    cycleLength: DEFAULT_CYCLE_LENGTH,
    defaultPeriodLength: DEFAULT_PERIOD_LENGTH,
    userName: "",
    mbti: "",
    temperament: "",
    buddyCustomName: "",
    language: "KO",
  };
}
