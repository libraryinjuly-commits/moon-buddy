/** Four growth stages from progress (0–100%). */
export type GrowthStage = "sprout" | "bud" | "bloom" | "ascension";

/** 1단계 새싹 0–25% · 2단계 꽃봉오리 26–50% · 3단계 만개 51–75% · 4단계 별빛 76–100% */
export function getGrowthStageFromProgress(progress: number): GrowthStage {
  const clamped = Math.min(100, Math.max(0, progress));
  if (clamped <= 25) return "sprout";
  if (clamped <= 50) return "bud";
  if (clamped <= 75) return "bloom";
  return "ascension";
}

/** Crown badge emoji by progress tier (0–25 / 26–50 / 51–75 / 76–100). */
export function getGrowthBadgeEmoji(progress: number): string {
  switch (getGrowthStageFromProgress(progress)) {
    case "sprout":
      return "🌱";
    case "bud":
      return "🌷";
    case "bloom":
      return "🌸";
    case "ascension":
      return "✨";
  }
}

/** Localized growth stage names shared by Companion badge and growth card. */
export interface GrowthStageLabels {
  sprout: string;
  bud: string;
  bloom: string;
  ascension: string;
}

export function getGrowthStageLabel(
  progress: number,
  labels: GrowthStageLabels,
): string {
  return labels[getGrowthStageFromProgress(progress)];
}
