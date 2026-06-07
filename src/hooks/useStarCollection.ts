"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import {
  calculateStarType,
  createStarMemory,
  generateCycleSummary,
} from "@/lib/starMemory";
import type { CompanionState, StarMemory } from "@/types/companion";
import type { MoonBuddyData } from "@/types/moonBuddy";

export function useStarCollection(
  data: MoonBuddyData,
  setData: SetMoonBuddyData,
) {
  const stars = data.starCollection.stars;
  const preferredView = data.starCollection.preferredView;

  const starCount = stars.length;

  const getStar = useCallback(
    (id: string) => stars.find((star) => star.id === id),
    [stars],
  );

  const createStarFromCompanion = useCallback(
    (
      companion: CompanionState,
      companionName: string,
      ascensionDate: string,
    ): StarMemory => {
      return createStarMemory(
        companion,
        companionName,
        ascensionDate,
        data.settings.language,
      );
    },
    [data.settings.language],
  );

  const setPreferredView = useCallback(
    (view: "gallery" | "constellation") => {
      setData((prev) => ({
        ...prev,
        starCollection: { ...prev.starCollection, preferredView: view },
      }));
    },
    [setData],
  );

  const sortedStars = useMemo(
    () =>
      [...stars].sort((a, b) =>
        b.ascensionDate.localeCompare(a.ascensionDate),
      ),
    [stars],
  );

  return {
    stars: sortedStars,
    starCount,
    preferredView,
    getStar,
    createStarFromCompanion,
    calculateStarType,
    generateCycleSummary,
    setPreferredView,
  };
}
