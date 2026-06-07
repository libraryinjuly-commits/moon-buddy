"use client";

import { useCallback } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import {
  devAddGrowth,
  devGenerateSampleStars,
  devPrepareAscension,
  devResetAllData,
  devResetCompanion,
  devResetCompanionInPlace,
  devSetStage,
} from "@/lib/devTools";
import type { CompanionStage } from "@/types/companion";
import type { Language } from "@/types/moonBuddy";

export function useDevTools(
  setData: SetMoonBuddyData,
  language: Language,
) {
  const addGrowth = useCallback(
    (amount: number) => {
      setData((prev) => ({
        ...prev,
        companion: devAddGrowth(prev.companion, amount),
      }));
    },
    [setData],
  );

  const setStage = useCallback(
    (stage: CompanionStage) => {
      setData((prev) => ({
        ...prev,
        companion: devSetStage(prev.companion, stage),
      }));
    },
    [setData],
  );

  const triggerAscension = useCallback(
    (onOpenModal: () => void) => {
      setData((prev) => ({
        ...prev,
        companion: devPrepareAscension(prev.companion),
      }));
      onOpenModal();
    },
    [setData],
  );

  const generateSampleStars = useCallback(() => {
    const samples = devGenerateSampleStars(language);
    setData((prev) => ({
      ...prev,
      starCollection: {
        ...prev.starCollection,
        stars: [...samples, ...prev.starCollection.stars],
      },
    }));
  }, [setData, language]);

  const createNewCompanion = useCallback(() => {
    setData((prev) => ({
      ...prev,
      companion: devResetCompanion(
        prev.periodHistory.find((entry) => entry.endDate === null)?.id ??
          prev.periodHistory[0]?.id ??
          null,
      ),
      character: { level: 1, exp: 0, totalMoodLogs: 0 },
    }));
  }, [setData]);

  const resetCompanion = useCallback(() => {
    setData((prev) => ({
      ...prev,
      companion: devResetCompanionInPlace(prev.companion),
      character: { level: 1, exp: 0, totalMoodLogs: 0 },
    }));
  }, [setData]);

  const resetAllData = useCallback(() => {
    const confirmed = window.confirm(
      "Reset ALL Moon Buddy data? This cannot be undone.",
    );
    if (!confirmed) return;
    setData(devResetAllData());
  }, [setData]);

  return {
    addGrowth,
    setStage,
    triggerAscension,
    generateSampleStars,
    createNewCompanion,
    resetCompanion,
    resetAllData,
  };
}
