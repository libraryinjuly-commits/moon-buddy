"use client";

import { useMemo } from "react";

import { getCardById, getRarityLabels, getRarityStyle } from "@/lib/cards";
import type { LocaleUI } from "@/lib/i18n/types";
import type { CollectedCard, TemperamentTheme } from "@/types";

interface CardCollectionProps {
  collection: CollectedCard[];
  ui: LocaleUI;
  theme: TemperamentTheme;
}

interface CodexEntry {
  cardId: string;
  count: number;
  emoji: string;
  name: string;
  rarityLabel: string;
  style: ReturnType<typeof getRarityStyle>;
}

export function CardCollection({
  collection,
  ui,
  theme,
}: CardCollectionProps) {
  const rarityLabels = useMemo(() => getRarityLabels(ui), [ui]);

  const entries = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const item of collection) {
      grouped.set(item.cardId, (grouped.get(item.cardId) ?? 0) + 1);
    }

    const result: CodexEntry[] = [];

    for (const [cardId, count] of grouped) {
      const card = getCardById(cardId);
      if (!card) continue;
      result.push({
        cardId,
        count,
        emoji: card.emoji,
        name: card.name,
        rarityLabel: rarityLabels[card.rarity],
        style: getRarityStyle(card.rarity),
      });
    }

    return result;
  }, [collection, rarityLabels]);

  return (
    <section
      className={`rounded-2xl border ${theme.accentBorder} bg-white/80 p-4 shadow-sm`}
    >
      <h2 className={`mb-3 text-base font-semibold ${theme.accentText}`}>
        📖 {ui.cardCollectionTitle}
      </h2>

      {entries.length === 0 ? (
        <p className={`text-sm ${theme.accentMuted}`}>{ui.cardCollectionEmpty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2">
          {entries.map((entry) => (
            <li
              key={entry.cardId}
              className={`flex flex-col items-center rounded-xl border-2 p-3 text-center shadow-sm ${entry.style.frontClass} ${entry.style.borderClass}`}
            >
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${entry.style.badgeClass}`}
              >
                {entry.rarityLabel}
              </span>
              <span className="mt-1 text-2xl">{entry.emoji}</span>
              <p className={`mt-1 text-xs font-semibold leading-tight ${entry.style.textClass}`}>
                {entry.name}
              </p>
              <p className={`mt-1 text-[10px] font-medium ${entry.style.descClass}`}>
                {ui.cardCollected} ×{entry.count}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
