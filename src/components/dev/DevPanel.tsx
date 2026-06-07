"use client";

import type { ReactNode } from "react";

import type { CompanionStage, CompanionState } from "@/types/companion";

interface DevPanelProps {
  open: boolean;
  companion: CompanionState;
  starCount: number;
  onClose: () => void;
  onAddGrowth: (amount: number) => void;
  onSetStage: (stage: CompanionStage) => void;
  onTriggerAscension: () => void;
  onGenerateSampleStars: () => void;
  onResetCompanion: () => void;
  onResetAllData: () => void;
}

const STAGE_OPTIONS: { stage: CompanionStage; label: string }[] = [
  { stage: "seed", label: "Seed" },
  { stage: "sprout", label: "Sprout" },
  { stage: "young", label: "Young" },
  { stage: "blooming", label: "Blooming" },
  { stage: "star_spirit", label: "Star Spirit" },
];

function DevButton({
  children,
  onClick,
  variant = "default",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "default" | "danger" | "accent";
}) {
  const styles = {
    default:
      "border-white/15 bg-white/10 text-white hover:bg-white/20",
    danger: "border-rose-400/40 bg-rose-500/20 text-rose-100 hover:bg-rose-500/35",
    accent:
      "border-amber-300/40 bg-amber-400/20 text-amber-50 hover:bg-amber-400/35",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition active:scale-[0.98] ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export function DevPanel({
  open,
  companion,
  starCount,
  onClose,
  onAddGrowth,
  onSetStage,
  onTriggerAscension,
  onGenerateSampleStars,
  onResetCompanion,
  onResetAllData,
}: DevPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-end p-3 md:items-center md:p-6">
      <button
        type="button"
        aria-label="Close dev panel overlay"
        className="absolute inset-0 bg-black/25"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal
        aria-label="Development panel"
        className="relative max-h-[80dvh] w-full max-w-sm overflow-y-auto rounded-2xl border border-white/20 bg-slate-900/90 p-4 text-white shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold">Dev Panel</h2>
            <p className="text-[10px] text-white/60">
              {companion.currentStage} · {companion.growthProgress}% ·{" "}
              {starCount} stars
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-2 py-1 text-[10px] text-white/80"
          >
            Close
          </button>
        </div>

        <section className="mb-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
            Growth Progress
          </p>
          <div className="flex flex-wrap gap-1.5">
            <DevButton onClick={() => onAddGrowth(10)}>+10</DevButton>
            <DevButton onClick={() => onAddGrowth(25)}>+25</DevButton>
            <DevButton onClick={() => onAddGrowth(50)}>+50</DevButton>
          </div>
        </section>

        <section className="mb-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
            Set Stage
          </p>
          <div className="flex flex-wrap gap-1.5">
            {STAGE_OPTIONS.map(({ stage, label }) => (
              <DevButton key={stage} onClick={() => onSetStage(stage)}>
                {label}
              </DevButton>
            ))}
          </div>
        </section>

        <section className="mb-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
            Ascension
          </p>
          <DevButton variant="accent" onClick={onTriggerAscension}>
            Trigger Ascension
          </DevButton>
        </section>

        <section className="mb-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
            Star Collection
          </p>
          <DevButton onClick={onGenerateSampleStars}>
            Generate Sample Stars (8)
          </DevButton>
        </section>

        <section className="space-y-1.5 border-t border-white/10 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
            Reset
          </p>
          <div className="flex flex-wrap gap-1.5">
            <DevButton variant="danger" onClick={onResetCompanion}>
              Reset Companion
            </DevButton>
            <DevButton variant="danger" onClick={onResetAllData}>
              Reset All Data
            </DevButton>
          </div>
        </section>
      </div>
    </div>
  );
}
