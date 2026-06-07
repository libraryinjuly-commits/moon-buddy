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
}: TodayStatusCardProps) {
  if (compact) {
    return (
      <section className="flex-shrink-0 rounded-xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/60 px-2.5 py-2 shadow-sm">
        <div className="mb-1 flex items-center justify-between gap-1">
          <h2 className="text-[11px] font-bold text-violet-900">{title}</h2>
          {phase && phaseLabel && dayOfCycle && (
            <span className="flex-shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-[9px] font-semibold text-rose-700">
              {phaseLabel} · {dayOfCycle}
              {dayUnit}
            </span>
          )}
        </div>
        <p className="break-keep text-[10px] leading-snug whitespace-normal text-violet-800">
          {status}
        </p>
        {daysUntilCount != null && (
          <p className="mt-0.5 text-[9px] text-violet-600">
            {daysUntilLabel} {daysUntilCount}
            {daysCountUnit}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/60 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-violet-900">{title}</h2>
        {phase && phaseLabel && dayOfCycle && (
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
            {phaseLabel} · {dayOfCycle}
            {dayUnit}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-violet-800">{status}</p>
      {daysUntilCount != null && (
        <p className="mt-2 text-xs text-violet-600">
          {daysUntilLabel} {daysUntilCount}
          {daysCountUnit}
        </p>
      )}
    </section>
  );
}
