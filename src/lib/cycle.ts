import { DEFAULT_CYCLE_LENGTH, DEFAULT_PERIOD_LENGTH } from "@/lib/constants";
import type { CycleInfo, CyclePhase, PeriodRecord, UserSettings } from "@/types";

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.floor((utcEnd - utcStart) / msPerDay);
}

function getPeriodLength(period: PeriodRecord): number {
  const length = daysBetween(parseDate(period.startDate), parseDate(period.endDate)) + 1;
  return Math.max(1, length);
}

function getDayOfCycle(periodStart: string, today = new Date()): number {
  const start = parseDate(periodStart);
  const diff = daysBetween(start, today);
  return diff + 1;
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
  periods: PeriodRecord[],
  settings: UserSettings,
  today = new Date(),
): CycleInfo | null {
  const cycleLength = settings.cycleLength;

  if (periods.length === 0) return null;

  const sorted = [...periods].sort(
    (a, b) => parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime(),
  );
  const latest = sorted[0];
  const periodLength = getPeriodLength(latest);

  let dayOfCycle = getDayOfCycle(latest.startDate, today);

  while (dayOfCycle > cycleLength) {
    dayOfCycle -= cycleLength;
  }

  const phase = getPhase(dayOfCycle, periodLength, cycleLength);
  const daysUntilNextPeriod = cycleLength - dayOfCycle + 1;

  return {
    phase,
    dayOfCycle,
    cycleLength,
    periodLength,
    daysUntilNextPeriod,
  };
}

export function getDefaultSettings(): UserSettings {
  return {
    cycleLength: DEFAULT_CYCLE_LENGTH,
    defaultPeriodLength: DEFAULT_PERIOD_LENGTH,
    userName: "",
    mbti: "",
    buddyCustomName: "",
    language: "KO",
  };
}
