"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getRarityLabels,
  getRarityStyle,
  type MoonCardDefinition,
} from "@/lib/cards";
import type { LocaleUI } from "@/lib/i18n/types";

interface CardRevealModalProps {
  card: MoonCardDefinition | null;
  ui: LocaleUI;
  onClose: () => void;
}

export function CardRevealModal({ card, ui, onClose }: CardRevealModalProps) {
  const [flipped, setFlipped] = useState(false);

  const rarityLabels = useMemo(() => getRarityLabels(ui), [ui]);

  useEffect(() => {
    if (!card) {
      setFlipped(false);
      return;
    }

    const timer = window.setTimeout(() => setFlipped(true), 400);
    return () => window.clearTimeout(timer);
  }, [card]);

  if (!card) return null;

  const style = getRarityStyle(card.rarity);
  const rarityLabel = rarityLabels[card.rarity];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-xs animate-[modal-pop_0.35s_ease-out]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-reveal-title"
      >
        <p
          id="card-reveal-title"
          className="mb-4 text-center text-lg font-bold text-white drop-shadow"
        >
          ✨ {ui.cardRevealTitle}
        </p>

        <div className="card-flip-scene mx-auto h-80 w-48">
          <div
            className={`card-flip-inner h-full w-full ${flipped ? "is-flipped" : ""}`}
          >
            <div className="card-flip-face card-flip-back flex flex-col items-center justify-center rounded-2xl border-2 border-violet-300 bg-gradient-to-br from-indigo-500 to-violet-700 shadow-xl">
              <span className="text-5xl">🌙</span>
              <p className="mt-3 text-sm font-medium text-violet-100">
                Moon Buddy
              </p>
              <p className="mt-1 text-xs text-violet-200">{ui.cardRevealFlipping}</p>
            </div>

            <div
              className={`card-flip-face card-flip-front flex flex-col rounded-2xl border-2 p-3 shadow-xl ${style.frontClass} ${style.borderClass}`}
            >
              <span
                className={`self-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${style.badgeClass}`}
              >
                {rarityLabel}
              </span>

              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <span className="text-5xl drop-shadow-sm">{card.emoji}</span>
                <p className={`mt-2 text-sm font-bold leading-tight ${style.textClass}`}>
                  {card.name}
                </p>
                <p className={`mt-2 text-[11px] leading-relaxed ${style.descClass}`}>
                  {card.description}
                </p>
              </div>

              <div className="mt-2 rounded-xl bg-white/55 px-2.5 py-2 text-left backdrop-blur-sm">
                <p className={`text-[9px] font-semibold ${style.textClass}`}>
                  💬 {ui.cardSecretLabel}
                </p>
                <p className={`mt-0.5 text-[10px] leading-snug ${style.descClass}`}>
                  {card.secretMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-white/95 px-4 py-3 text-sm font-semibold text-violet-700 shadow-lg transition active:scale-[0.98]"
        >
          {ui.cardClose}
        </button>
      </div>
    </div>
  );
}
