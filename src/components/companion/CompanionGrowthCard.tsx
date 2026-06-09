"use client";

import { getGrowthStageLabel } from "@/lib/companionEvolution";
import type { LocaleContent } from "@/lib/i18n/types";
import type { TemperamentTheme } from "@/types";

interface CompanionGrowthCardProps {
  stageProgress: number;
  growthProgress: number;
  locale: LocaleContent;
  theme: TemperamentTheme;
  ascensionPending?: boolean;
}

export function CompanionGrowthCard({
  stageProgress,
  growthProgress,
  locale,
  theme,
  ascensionPending = false,
}: CompanionGrowthCardProps) {
  const { ui } = locale;
  const stageLabel = getGrowthStageLabel(growthProgress, ui.growthStageLabels);

  return (
    <div
      className={`rounded-2xl border px-3 py-2 backdrop-blur-sm bg-white/45 ${theme.accentSoft} ${theme.accentBorder} ${theme.glowClass}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 text-left">
          <p className={`text-[10px] font-medium ${theme.accentMuted}`}>
            {ui.companionGrowthLabel}
          </p>
          <p className={`truncate text-sm font-bold ${theme.accentText}`}>
            {stageLabel}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white/95 ${theme.badgeBg}`}
        >
          {ui.companionGrowthNextProgress.replace(
            "{percent}",
            String(stageProgress),
          )}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#FDFCF5]/70">
        <div
          className={`h-full rounded-full opacity-85 transition-all duration-500 ${theme.accentButton.split(" ")[0]}`}
          style={{ width: `${stageProgress}%` }}
        />
      </div>

      {ascensionPending && (
        <p className={`mt-1.5 text-[10px] font-medium ${theme.accentText}`}>
          {ui.ascensionReadyHint}
        </p>
      )}
    </div>
  );
}
