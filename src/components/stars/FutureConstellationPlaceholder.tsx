"use client";

import type { LocaleContent } from "@/lib/i18n/types";
import type { TemperamentTheme } from "@/types";

interface FutureConstellationPlaceholderProps {
  locale: LocaleContent;
  theme: TemperamentTheme;
}

export function FutureConstellationPlaceholder({
  locale,
  theme,
}: FutureConstellationPlaceholderProps) {
  const { ui } = locale;

  return (
    <div
      className={`rounded-2xl border border-dashed px-4 py-6 text-center ${theme.accentBorder} ${theme.accentSoft}`}
      aria-hidden
    >
      <p className="text-2xl">✦ ─ ✦ ─ ✦</p>
      <p className={`mt-2 text-sm font-semibold ${theme.accentText}`}>
        {ui.constellationComingSoonTitle}
      </p>
      <p className={`mt-1 text-xs leading-relaxed ${theme.accentMuted}`}>
        {ui.constellationComingSoonDesc}
      </p>
    </div>
  );
}
