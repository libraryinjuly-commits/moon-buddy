"use client";

import type { LocaleContent } from "@/lib/i18n/types";
import type { CompanionStage, TemperamentTheme } from "@/types";

interface CompanionGrowthCardProps {
  stage: CompanionStage;
  stageProgress: number;
  growthProgress: number;
  locale: LocaleContent;
  theme: TemperamentTheme;
  ascensionPending?: boolean;
}

export function CompanionGrowthCard({
  stage,
  stageProgress,
  growthProgress,
  locale,
  theme,
  ascensionPending = false,
}: CompanionGrowthCardProps) {
  const { ui } = locale;
  const stageLabel = ui.companionStages[stage];

  return (
    <div
      className={`rounded-2xl border px-3 py-2 shadow-sm ${theme.accentSoft} ${theme.accentBorder}`}
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
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${theme.badgeBg} text-white`}
        >
          {growthProgress}%
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${theme.accentButton.split(" ")[0]}`}
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
