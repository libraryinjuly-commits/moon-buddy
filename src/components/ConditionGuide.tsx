import type { CyclePhase, Mood } from "@/types";

interface ConditionGuideProps {
  title: string;
  moodTagLabel: string;
  guide: string;
  phase: CyclePhase | null;
  phaseLabel: string | null;
  mood: Mood | null;
  moodLabel: string | null;
}

export function ConditionGuide({
  title,
  moodTagLabel,
  guide,
  phase,
  phaseLabel,
  mood,
  moodLabel,
}: ConditionGuideProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white/80 p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-semibold text-violet-900">{title}</h2>
        {phase && phaseLabel && (
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
            {phaseLabel}
          </span>
        )}
        {mood && moodLabel && (
          <span className="rounded-full bg-fuchsia-100 px-2 py-0.5 text-xs font-medium text-fuchsia-700">
            {moodTagLabel} · {moodLabel}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-violet-800">{guide}</p>
    </section>
  );
}
