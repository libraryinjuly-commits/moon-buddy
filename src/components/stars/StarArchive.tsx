"use client";

import { useState } from "react";

import { StarArchiveCard } from "@/components/stars/StarArchiveCard";
import type { LocaleContent } from "@/lib/i18n/types";
import type { StarMemory, TemperamentTheme } from "@/types";

interface StarArchiveProps {
  stars: StarMemory[];
  locale: LocaleContent;
  theme: TemperamentTheme;
}

export function StarArchive({ stars, locale, theme }: StarArchiveProps) {
  const { ui } = locale;
  const [selectedStar, setSelectedStar] = useState<StarMemory | null>(null);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl">
      {/* Night sky backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-950 to-black"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 70%, white, transparent), radial-gradient(1px 1px at 80% 20%, white, transparent), radial-gradient(1.5px 1.5px at 40% 80%, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90% 50%, white, transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-1 pb-2">
        <header className="px-1 pt-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-300/70">
            {ui.starArchiveBadge}
          </p>
          <h2 className="mt-0.5 text-lg font-bold text-white">
            {ui.starArchiveTitle}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-indigo-200/70">
            {ui.starArchiveDesc}
          </p>
        </header>

        {stars.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 px-4 py-12 text-center">
            <span className="text-3xl opacity-80" aria-hidden>
              🌌
            </span>
            <p className="mt-3 text-sm font-semibold text-white/90">
              {ui.starArchiveEmptyTitle}
            </p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-indigo-200/60">
              {ui.starArchiveEmptyDesc}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {stars.map((star) => (
              <li key={star.id}>
                <StarArchiveCard
                  star={star}
                  locale={locale}
                  onSelect={setSelectedStar}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedStar && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm md:items-center"
          role="dialog"
          aria-modal
          onClick={() => setSelectedStar(null)}
        >
          <div
            className="w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <StarArchiveCard star={selectedStar} locale={locale} />
            <button
              type="button"
              onClick={() => setSelectedStar(null)}
              className={`mt-3 w-full rounded-xl py-2.5 text-sm font-semibold text-white ${theme.accentButton}`}
            >
              {ui.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
