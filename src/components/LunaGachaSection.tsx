"use client";

import { GACHA_COST } from "@/lib/luna";
import type { LocaleUI } from "@/lib/i18n/types";
import type { TemperamentTheme } from "@/types";

interface LunaGachaSectionProps {
  lunaPoints: number;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onDraw: () => void;
}

export function LunaGachaSection({
  lunaPoints,
  ui,
  theme,
  onDraw,
}: LunaGachaSectionProps) {
  const canDraw = lunaPoints >= GACHA_COST;

  return (
    <section
      className={`rounded-2xl border ${theme.accentBorder} bg-white/80 p-4 shadow-sm`}
    >
      <p className={`text-center text-sm font-semibold ${theme.accentText}`}>
        ✨ {ui.lunaPointsLabel}:{" "}
        {ui.lunaPointsCount.replace("{count}", String(lunaPoints))}
      </p>

      <button
        type="button"
        onClick={onDraw}
        disabled={!canDraw}
        className={`mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${theme.accentButton}`}
      >
        🌙 {ui.gachaButton} ({ui.gachaCost})
      </button>

      {!canDraw && (
        <p className={`mt-2 text-center text-xs ${theme.accentMuted}`}>
          {ui.gachaInsufficient}
        </p>
      )}
    </section>
  );
}
