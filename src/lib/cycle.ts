import { DEFAULT_CYCLE_LENGTH, DEFAULT_PERIOD_LENGTH } from "@/lib/constants";
import {
  addDays,
  calculateAverageCycleLength,
  getActivePeriod,
  getPeriodLength,
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
