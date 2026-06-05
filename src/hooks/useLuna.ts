"use client";

import { useCallback } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { drawRandomCard, type MoonCardDefinition } from "@/lib/cards";
import { GACHA_COST } from "@/lib/rewards";
import type { CollectedCard, MoonBuddyData } from "@/types/moonBuddy";

export function useLuna(data: MoonBuddyData, setData: SetMoonBuddyData) {
  const lunaPoints = data.luna.lunaPoints;
  const collection = data.luna.collection;

  const drawCard = useCallback((): MoonCardDefinition | null => {
    if (data.luna.lunaPoints < GACHA_COST) return null;

    const card = drawRandomCard();
    const entry: CollectedCard = {
      id: crypto.randomUUID(),
      cardId: card.id,
      drawnAt: new Date().toISOString(),
    };

    setData((prev) => ({
      ...prev,
      luna: {
        ...prev.luna,
        lunaPoints: prev.luna.lunaPoints - GACHA_COST,
        collection: [entry, ...prev.luna.collection],
      },
    }));

    return card;
  }, [data.luna.lunaPoints, setData]);

  return { lunaPoints, collection, drawCard };
}
