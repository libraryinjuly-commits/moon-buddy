"use client";

import { CompanionEvolutionPortrait } from "@/components/companion/CompanionEvolutionPortrait";
import { MascotCharacter } from "@/components/MascotCharacter";
import { MAX_GROWTH_PROGRESS } from "@/lib/companionLifecycle";
import { getEvolutionVisualStage } from "@/lib/companionEvolution";
import type { LocaleContent } from "@/lib/i18n/types";
import type { BuddyIdentity, CompanionStage, MascotConfig } from "@/types";

interface CompanionProps {
  mascot: MascotConfig;
  growthProgress: number;
  displayLevel: number;
  companionStage: CompanionStage;
  speech: string;
  thankSpeech: string;
  buddyIdentity: BuddyIdentity;
  thankTrigger?: number;
  locale: LocaleContent;
  onMascotTap?: () => void;
  canCycleSpeech?: boolean;
  mascotTapHint?: string;
  onAscend?: () => void;
}

export function Companion({
  mascot,
  growthProgress,
  displayLevel,
  companionStage,
  speech,
  thankSpeech,
  buddyIdentity,
  thankTrigger,
  locale,
  onMascotTap,
  canCycleSpeech,
  mascotTapHint,
  onAscend,
}: CompanionProps) {
  const { ui } = locale;
  const visualStage = getEvolutionVisualStage(growthProgress);
  const stageLabel = ui.evolutionVisualStages[visualStage];
  const canAscend = growthProgress >= MAX_GROWTH_PROGRESS;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <MascotCharacter
        mascot={mascot}
        level={displayLevel}
        companionStage={companionStage}
        stageLabel={stageLabel}
        speech={speech}
        thankSpeech={thankSpeech}
        buddyIdentity={buddyIdentity}
        thankTrigger={thankTrigger}
        compact
        showTitle
        onMascotTap={onMascotTap}
        canCycleSpeech={canCycleSpeech}
        mascotTapHint={mascotTapHint}
        portrait={
          <CompanionEvolutionPortrait
            growthProgress={growthProgress}
            mascot={mascot}
          />
        }
      />

      {canAscend && onAscend && (
        <button
          type="button"
          onClick={onAscend}
          className="w-full max-w-xs animate-pulse rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition active:scale-[0.98] hover:opacity-95"
        >
          {ui.ascendButton}
        </button>
      )}
    </div>
  );
}
