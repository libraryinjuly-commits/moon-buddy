import {
  EVOLUTION_ASSET_MAP,
  getEvolutionVisualStage,
} from "@/lib/companionEvolution";
import type { MascotConfig } from "@/types";

interface CompanionEvolutionPortraitProps {
  growthProgress: number;
  mascot: MascotConfig;
  className?: string;
}

export function CompanionEvolutionPortrait({
  growthProgress,
  mascot,
  className = "h-24 w-24",
}: CompanionEvolutionPortraitProps) {
  const visualStage = getEvolutionVisualStage(growthProgress);
  const asset = EVOLUTION_ASSET_MAP[mascot.temperament][visualStage];

  if (visualStage === 1) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-hidden
      >
        {/* ASSET: {asset.imagePath} — 1단계 새싹 달달이 (0–25%) */}
        <span className="text-5xl">{asset.placeholderEmoji}</span>
      </div>
    );
  }

  if (visualStage === 2) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-hidden
      >
        {/* ASSET: {asset.imagePath} — 2단계 꽃봉오리 달달이 (26–50%) */}
        <span className="text-5xl">{asset.placeholderEmoji}</span>
      </div>
    );
  }

  if (visualStage === 3) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-hidden
      >
        {/* ASSET: {asset.imagePath} — 3단계 만개한 달달이 (51–75%) */}
        <span className="text-5xl">{asset.placeholderEmoji}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-hidden
    >
      {/* ASSET: {asset.imagePath} — 4단계 승천 직전 달달이 (76–100%) */}
      <span className="text-5xl drop-shadow-[0_0_12px_rgba(251,191,36,0.65)]">
        {asset.placeholderEmoji}
      </span>
    </div>
  );
}
