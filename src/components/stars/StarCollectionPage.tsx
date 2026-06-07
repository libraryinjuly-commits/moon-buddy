"use client";

import { useState } from "react";

import { FutureConstellationPlaceholder } from "@/components/stars/FutureConstellationPlaceholder";
import { StarMemoryCard } from "@/components/stars/StarMemoryCard";
import type { LocaleContent } from "@/lib/i18n/types";
import type {
  StarCollectionView,
  StarMemory,
  TemperamentTheme,
} from "@/types";

interface StarCollectionPageProps {
  stars: StarMemory[];
  preferredView: StarCollectionView;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onChangeView: (view: StarCollectionView) => void;
}

export function StarCollectionPage({
  stars,
  preferredView,
  locale,
  theme,
  onChangeView,
}: StarCollectionPageProps) {
  const { ui } = locale;
  const [selectedStar, setSelectedStar] = useState<StarMemory | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto pb-2">
      <div>
        <h2 className={`text-base font-bold ${theme.accentText}`}>
          {ui.starCollectionTitle}
        </h2>
        <p className={`text-xs ${theme.accentMuted}`}>{ui.starCollectionDesc}</p>
      </div>

      <div
        className={`flex rounded-xl border p-0.5 ${theme.accentBorder} ${theme.accentSoft}`}
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={preferredView === "gallery"}
          onClick={() => onChangeView("gallery")}
          className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
            preferredView === "gallery"
              ? `bg-white shadow-sm ${theme.accentText}`
              : theme.accentMuted
          }`}
        >
          {ui.starGalleryTab}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={preferredView === "constellation"}
          onClick={() => onChangeView("constellation")}
          className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
            preferredView === "constellation"
              ? `bg-white shadow-sm ${theme.accentText}`
              : theme.accentMuted
          }`}
        >
          {ui.starConstellationTab}
        </button>
      </div>

      {preferredView === "gallery" ? (
        stars.length === 0 ? (
          <div
            className={`flex flex-1 flex-col items-center justify-center rounded-2xl border px-4 py-10 text-center ${theme.accentBorder} ${theme.accentSoft}`}
          >
            <span className="text-3xl">🌱</span>
            <p className={`mt-2 text-sm font-semibold ${theme.accentText}`}>
              {ui.starCollectionEmptyTitle}
            </p>
            <p className={`mt-1 text-xs leading-relaxed ${theme.accentMuted}`}>
              {ui.starCollectionEmptyDesc}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {stars.map((star) => (
              <StarMemoryCard
                key={star.id}
                star={star}
                locale={locale}
                theme={theme}
                onSelect={setSelectedStar}
              />
            ))}
          </div>
        )
      ) : (
        <FutureConstellationPlaceholder locale={locale} theme={theme} />
      )}

      {selectedStar && preferredView === "gallery" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 md:items-center">
          <div
            className={`w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl ${theme.accentBorder} border`}
          >
            <StarMemoryCard
              star={selectedStar}
              locale={locale}
              theme={theme}
            />
            <button
              type="button"
              onClick={() => setSelectedStar(null)}
              className={`mt-3 w-full rounded-xl py-2 text-sm font-semibold text-white ${theme.accentButton}`}
            >
              {ui.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
