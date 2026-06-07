import type { CyclePhase } from "@/types";

interface TodayStatusCardProps {
  title: string;
  dayUnit: string;
  daysUntilLabel: string;
  daysCountUnit: string;
  daysUntilCount: number | null;
  status: string;
  phase: CyclePhase | null;
  phaseLabel: string | null;
  dayOfCycle: number | null;
  compact?: boolean;
  hideDaysUntil?: boolean;
  hideCycleDay?: boolean;
}

export function TodayStatusCard({
  title,
  dayUnit,
  daysUntilLabel,
  daysCountUnit,
  daysUntilCount,
  status,
  phase,
  phaseLabel,
  dayOfCycle,
  compact = false,
  hideDaysUntil = false,
  hideCycleDay = false,
}: TodayStatusCardProps) {
  if (compact) {
    return (
      <section className="flex-shrink-0 rounded-xl border border-violet-100/80 bg-gradient-to-br from-white/90 to-violet-50/40 px-2.5 py-2 shadow-sm">
        <div className="mb-1 flex items-center justify-between gap-1">
          <h3 className="text-[11px] font-bold text-violet-900">{title}</h3>
          {phase && phaseLabel && dayOfCycle && !hideCycleDay && (
            <span className="flex-shrink-0 rounded-full bg-violet-100/80 px-2 py-0.5 text-[9px] font-medium text-violet-700">
              {phaseLabel}
            </span>
          )}
        </div>
        <p className="break-keep text-[10px] leading-snug whitespace-normal text-violet-800">
          {status}
        </p>
        {!hideDaysUntil && daysUntilCount != null && (
          <p className="mt-0.5 text-[9px] text-violet-600">
            {daysUntilLabel} {daysUntilCount}
            {daysCountUnit}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/60 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-violet-900">{title}</h2>
        {phase && phaseLabel && dayOfCycle && !hideCycleDay && (
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
            {phaseLabel} · {dayOfCycle}
            {dayUnit}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-violet-800">{status}</p>
      {!hideDaysUntil && daysUntilCount != null && (
        <p className="mt-2 text-xs text-violet-600">
          {daysUntilLabel} {daysUntilCount}
          {daysCountUnit}
        </p>
      )}
    </section>
  );
}
