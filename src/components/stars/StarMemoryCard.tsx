"use client";

import { getMoodPercentages } from "@/lib/moodScale";
import type { LocaleContent } from "@/lib/i18n/types";
import {
  EMOTION_SCALE_COLOR,
  formatMonthYear,
  STAR_TYPE_EMOJI,
  STAR_TYPE_GRADIENT,
} from "@/lib/starVisuals";
import type { StarMemory, TemperamentTheme } from "@/types";

interface StarMemoryCardProps {
  star: StarMemory;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onSelect?: (star: StarMemory) => void;
}

export function StarMemoryCard({
  star,
  locale,
  theme,
  onSelect,
}: StarMemoryCardProps) {
  const { ui } = locale;
  const percentages = getMoodPercentages(star.moodStatistics);
  const monthLabel = formatMonthYear(
    star.ascensionDate,
    locale.language === "KO"
      ? "ko-KR"
      : locale.language === "JA"
        ? "ja-JP"
        : "en-US",
  );
  const starTypeLabel = ui.starTypes[star.starType];
  const dominantLabel = ui.emotionScales[star.dominantEmotion];

  const moodRows = (
    ["great", "good", "okay", "low", "bad"] as const
  ).filter((key) => percentages[key] > 0);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(star)}
      className={`w-full rounded-2xl border bg-gradient-to-br p-3 text-left shadow-sm transition hover:scale-[1.01] active:scale-[0.99] ${STAR_TYPE_GRADIENT[star.starType]} ${theme.accentBorder}`}
    >
      <div className="flex items-start gap-2">
        <span className="text-2xl" aria-hidden>
          {STAR_TYPE_EMOJI[star.starType]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-800">{starTypeLabel}</p>
          <p className="text-[11px] text-slate-600">{monthLabel}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">
            {star.cycleSummary}
          </p>
        </div>
      </div>

      <div className="mt-2 space-y-0.5 border-t border-white/50 pt-2">
        <p className="text-[10px] font-semibold text-slate-600">
          {ui.starMoodBreakdown}
        </p>
        {moodRows.map((key) => (
          <div
            key={key}
            className="flex items-center justify-between text-[10px]"
          >
            <span className={EMOTION_SCALE_COLOR[key]}>
              {ui.emotionScales[key]}
            </span>
            <span className="font-medium text-slate-700">
              {percentages[key]}%
            </span>
          </div>
        ))}
        <p className="pt-0.5 text-[9px] text-slate-500">
          {ui.starDominantEmotion}: {dominantLabel}
        </p>
      </div>
    </button>
  );
}
