import type { TemperamentGroup } from "@/types";

/** Four-band visual evolution driven by growthProgress (0–100). */
export type EvolutionVisualStage = 1 | 2 | 3 | 4;

export function getEvolutionVisualStage(progress: number): EvolutionVisualStage {
  const clamped = Math.min(100, Math.max(0, progress));
  if (clamped <= 25) return 1;
  if (clamped <= 50) return 2;
  if (clamped <= 75) return 3;
  return 4;
}

/**
 * Dummy asset map — replace `imagePath` with real filenames when art is ready.
 * e.g. `/assets/companions/nf/daldal-stage-1-sprout.png`
 */
export const EVOLUTION_ASSET_MAP: Record<
  TemperamentGroup,
  Record<EvolutionVisualStage, { imagePath: string; placeholderEmoji: string }>
> = {
  NF: {
    1: { imagePath: "/assets/companions/nf/daldal-stage-1-sprout.png", placeholderEmoji: "🌱" },
    2: { imagePath: "/assets/companions/nf/daldal-stage-2-bud.png", placeholderEmoji: "🌷" },
    3: { imagePath: "/assets/companions/nf/daldal-stage-3-bloom.png", placeholderEmoji: "🌸" },
    4: { imagePath: "/assets/companions/nf/daldal-stage-4-pre-ascend.png", placeholderEmoji: "✨" },
  },
  NT: {
    1: { imagePath: "/assets/companions/nt/starfox-stage-1-sprout.png", placeholderEmoji: "🌱" },
    2: { imagePath: "/assets/companions/nt/starfox-stage-2-bud.png", placeholderEmoji: "🌷" },
    3: { imagePath: "/assets/companions/nt/starfox-stage-3-bloom.png", placeholderEmoji: "🌸" },
    4: { imagePath: "/assets/companions/nt/starfox-stage-4-pre-ascend.png", placeholderEmoji: "✨" },
  },
  SJ: {
    1: { imagePath: "/assets/companions/sj/cloudbear-stage-1-sprout.png", placeholderEmoji: "🌱" },
    2: { imagePath: "/assets/companions/sj/cloudbear-stage-2-bud.png", placeholderEmoji: "🌷" },
    3: { imagePath: "/assets/companions/sj/cloudbear-stage-3-bloom.png", placeholderEmoji: "🌸" },
    4: { imagePath: "/assets/companions/sj/cloudbear-stage-4-pre-ascend.png", placeholderEmoji: "✨" },
  },
  SP: {
    1: { imagePath: "/assets/companions/sp/dreamsquirrel-stage-1-sprout.png", placeholderEmoji: "🌱" },
    2: { imagePath: "/assets/companions/sp/dreamsquirrel-stage-2-bud.png", placeholderEmoji: "🌷" },
    3: { imagePath: "/assets/companions/sp/dreamsquirrel-stage-3-bloom.png", placeholderEmoji: "🌸" },
    4: { imagePath: "/assets/companions/sp/dreamsquirrel-stage-4-pre-ascend.png", placeholderEmoji: "✨" },
  },
};
