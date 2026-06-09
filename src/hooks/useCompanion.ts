"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import {
  getStageProgressInBand,
  isAscensionReady,
  isCycleComplete,
  markAscensionPending,
  MAX_GROWTH_PROGRESS,
} from "@/lib/companionLifecycle";
import {
  getCompanionSpecies,
  resolveTemperament,
} from "@/lib/companionSpecies";
import {
  applyArchiveToMoonBuddyData,
  archiveAscendedStar,
} from "@/lib/starArchive";
import { getTodayDateString } from "@/lib/storage";
import type { CycleInfo, MoonBuddyData } from "@/types/moonBuddy";

export function useCompanion(
  data: MoonBuddyData,
  setData: SetMoonBuddyData,
  cycleInfo: CycleInfo | null,
) {
  const companion = data.companion;

  const stageProgress = useMemo(
    () => getStageProgressInBand(companion.growthProgress),
    [companion.growthProgress],
  );

  const cycleComplete = useMemo(
    () => isCycleComplete(cycleInfo),
    [cycleInfo],
  );

  const readyToAscend = useMemo(
    () => isAscensionReady(companion, cycleInfo),
    [companion, cycleInfo],
  );

  const beginAscension = useCallback(() => {
    if (companion.growthProgress < MAX_GROWTH_PROGRESS) return false;
    if (companion.ascensionPending) return true;

    setData((prev) => ({
      ...prev,
      companion: markAscensionPending(prev.companion),
    }));
    return true;
  }, [companion.ascensionPending, companion.growthProgress, setData]);

  const checkAscension = useCallback(() => {
    if (companion.ascensionPending) return true;
    if (readyToAscend) {
      setData((prev) => ({
        ...prev,
        companion: markAscensionPending(prev.companion),
      }));
      return true;
    }
    return false;
  }, [companion.ascensionPending, readyToAscend, setData]);

  const finishAscension = useCallback(() => {
    const today = getTodayDateString();
    const temperament = resolveTemperament(data.settings);
    const species = getCompanionSpecies(temperament);
    const companionName =
      data.settings.buddyCustomName.trim() ||
      species.defaultBuddyName[data.settings.language];
    const activeCycleId =
      data.periodHistory.find((entry) => entry.endDate === null)?.id ??
      data.periodHistory[0]?.id ??
      null;

    let archivedStar: ReturnType<typeof archiveAscendedStar>["star"] | undefined;

    setData((prev) => {
      const ascendedCompanionCount = prev.starCollection.stars.length + 1;
      const archiveResult = archiveAscendedStar(
        {
          companion: prev.companion,
          companionName,
          ascensionDate: today,
          language: prev.settings.language,
          cycleId: activeCycleId,
          temperament,
          ascendedCompanionCount,
        },
        prev.starCollection.stars,
      );
      archivedStar = archiveResult.star;
      return applyArchiveToMoonBuddyData(prev, archiveResult);
    });

    return archivedStar;
  }, [data, setData]);

  return {
    companion,
    stageProgress,
    cycleComplete,
    readyToAscend,
    ascensionPending: companion.ascensionPending,
    beginAscension,
    checkAscension,
    finishAscension,
  };
}
