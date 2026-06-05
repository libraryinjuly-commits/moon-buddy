import type { CycleInfo } from "@/types";

interface CyclePhaseBadgeProps {
  cycleInfo: CycleInfo;
  phaseLabel: string;
  dayUnit: string;
  daysUntilLabel: string;
  daysCountUnit: string;
}

export function CyclePhaseBadge({
  cycleInfo,
  phaseLabel,
  dayUnit,
  daysUntilLabel,
  daysCountUnit,
}: CyclePhaseBadgeProps) {
  const style = {
    menstrual: "bg-rose-100 text-rose-800",
    follicular: "bg-sky-100 text-sky-800",
    ovulation: "bg-amber-100 text-amber-800",
    luteal: "bg-violet-100 text-violet-800",
  }[cycleInfo.phase];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${style}`}>
        {phaseLabel}
      </span>
      <span className="text-sm text-violet-600">
        {cycleInfo.dayOfCycle}
        {dayUnit} · {daysUntilLabel} {cycleInfo.daysUntilNextPeriod}
        {daysCountUnit}
      </span>
    </div>
  );
}
