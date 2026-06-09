"use client";

import { MascotCharacter } from "@/components/MascotCharacter";
import { MAX_GROWTH_PROGRESS } from "@/lib/companionLifecycle";
import { getGrowthStageLabel } from "@/lib/companionEvolution";
import type { LocaleContent } from "@/lib/i18n/types";
import type { MoodInteractionState } from "@/lib/moodInteraction";
import type {
  BuddyIdentity,
  CompanionStage,
  MascotConfig,
  TemperamentTheme,
} from "@/types";

interface CompanionProps {
  mascot: MascotConfig;
  theme: TemperamentTheme;
  growthProgress?: number;
  displayLevel: number;
  companionStage: CompanionStage;
  speech: string;
  thankSpeech: string;
  buddyIdentity: BuddyIdentity;
  thankTrigger?: number;
  moodInteraction?: MoodInteractionState | null;
  locale: LocaleContent;
  onMascotTap?: () => void;
  canCycleSpeech?: boolean;
  mascotTapHint?: string;
  onAscend?: () => void;
}

export function Companion({
  mascot,
  theme,
  growthProgress = 0,
  displayLevel,
  companionStage,
  speech,
  thankSpeech,
  buddyIdentity,
  thankTrigger,
  moodInteraction = null,
  locale,
  onMascotTap,
  canCycleSpeech,
  mascotTapHint,
  onAscend,
}: CompanionProps) {
  const { ui } = locale;
  const stageLabel = getGrowthStageLabel(growthProgress, ui.growthStageLabels);
  const canAscend = growthProgress >= MAX_GROWTH_PROGRESS;

  return (
    <div
      className={`flex w-full flex-col items-center gap-2 rounded-3xl px-2 py-2 ring-1 backdrop-blur-[2px] ${theme.accentSoft} ${theme.accentBorder} ${theme.glowClass}`}
    >
      <MascotCharacter
        mascot={mascot}
        level={displayLevel}
        companionStage={companionStage}
        growthProgress={growthProgress}
        stageLabel={stageLabel}
        speech={speech}
        thankSpeech={thankSpeech}
        buddyIdentity={buddyIdentity}
        thankTrigger={thankTrigger}
        moodInteraction={moodInteraction}
        compact
        showTitle
        onMascotTap={onMascotTap}
        canCycleSpeech={canCycleSpeech}
        mascotTapHint={mascotTapHint}
      />

      {canAscend && onAscend && (
        <button
          type="button"
          onClick={onAscend}
          className={`w-full max-w-xs rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-md transition active:scale-[0.98] hover:opacity-95 ${theme.accentButton} ${theme.glowClass}`}
        >
          {ui.ascendButton}
        </button>
      )}
    </div>
  );
}
