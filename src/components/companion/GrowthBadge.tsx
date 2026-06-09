"use client";

import {
  getGrowthBadgeEmoji,
  getGrowthStageFromProgress,
} from "@/lib/companionEvolution";

interface GrowthBadgeProps {
  progress?: number;
}

export function GrowthBadge({ progress = 0 }: GrowthBadgeProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const stage = getGrowthStageFromProgress(clamped);
  const emoji = getGrowthBadgeEmoji(clamped);

  return (
    <span
      className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[42%]"
      aria-hidden="true"
    >
      <span key={stage} className="animate-growth-badge block text-lg leading-none drop-shadow-sm">
        {emoji}
      </span>
    </span>
  );
}
