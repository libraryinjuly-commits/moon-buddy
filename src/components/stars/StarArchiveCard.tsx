"use client";

import { DOMINANT_EMOTION_GLOW, formatMonthYear } from "@/lib/starVisuals";
import type { LocaleContent } from "@/lib/i18n/types";
import type { StarMemory } from "@/types";

interface StarArchiveCardProps {
  star: StarMemory;
  locale: LocaleContent;
  onSelect?: (star: StarMemory) => void;
}

export function StarArchiveCard({ star, locale, onSelect }: StarArchiveCardProps) {
  const { ui } = locale;
  const glow = DOMINANT_EMOTION_GLOW[star.dominantEmotion];
  const emotionTag = ui.emotionArchiveTags[star.dominantEmotion];
  const dateLocale =
    locale.language === "KO"
      ? "ko-KR"
      : locale.language === "JA"
        ? "ja-JP"
        : "en-US";

  const ascensionLabel = new Date(star.ascensionDate).toLocaleDateString(
    dateLocale,
    { year: "numeric", month: "long", day: "numeric" },
  );
  const monthLabel = formatMonthYear(star.ascensionDate, dateLocale);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(star)}
      className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 active:scale-[0.99] ${glow.shadow}`}
    >
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${glow.gradient}`}
        aria-hidden
      />

      <div className="relative flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-2 ${glow.ring} ${glow.shadow}`}
          style={{ background: `radial-gradient(circle at 35% 35%, ${glow.core}, #1e1b4b)` }}
          aria-hidden
        >
          <span className="text-lg">✦</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">
            {star.companionName}
          </p>
          <p className="mt-0.5 text-[11px] text-indigo-200/80">{monthLabel}</p>
          <p className="mt-1.5 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/90">
            {emotionTag}
          </p>
        </div>
      </div>

      <p className="relative mt-3 text-[11px] leading-relaxed text-indigo-100/75">
        {star.cycleSummary}
      </p>

      <p className="relative mt-2 text-[9px] text-indigo-300/60">
        {ui.starArchiveAscendedOn.replace("{date}", ascensionLabel)}
      </p>
    </button>
  );
}
