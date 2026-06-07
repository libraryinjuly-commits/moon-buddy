"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import {
  getStageProgressInBand,
  isAscensionReady,
  isCycleComplete,
  markAscensionPending,
} from "@/lib/companionLifecycle";
import { completeAscension } from "@/lib/starMemory";
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
    const companionName = data.settings.buddyCustomName.trim() || "Moon Buddy";
    const activeCycleId =
      data.periodHistory.find((entry) => entry.endDate === null)?.id ??
      data.periodHistory[0]?.id ??
      null;

    const { star, newCompanion } = completeAscension(
      data.companion,
      companionName,
      today,
      data.settings.language,
      activeCycleId,
    );

    setData((prev) => ({
      ...prev,
      companion: newCompanion,
      starCollection: {
        ...prev.starCollection,
        stars: [star, ...prev.starCollection.stars],
      },
      character: { level: 1, exp: 0, totalMoodLogs: 0 },
    }));

    return star;
  }, [data, setData]);

  return {
    companion,
    stageProgress,
    cycleComplete,
    readyToAscend,
    ascensionPending: companion.ascensionPending,
    checkAscension,
    finishAscension,
  };
}
