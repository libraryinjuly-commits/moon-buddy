"use client";

import { useMemo } from "react";

import { getPeriodDayFromStart } from "@/lib/livePeriod";
import { getActivePeriod } from "@/lib/periodHistory";
import type { MenstruationStatus, MoonBuddyData } from "@/types/moonBuddy";

export function useLivePeriod(data: MoonBuddyData) {
  const activePeriod = useMemo(
    () => getActivePeriod(data.periodHistory),
    [data.periodHistory],
  );

  const menstruationStatus: MenstruationStatus = activePeriod
    ? "ON_PERIOD"
    : "NOT_PERIOD";

  const periodDay = useMemo(() => {
    if (!activePeriod) return 1;
    return getPeriodDayFromStart(activePeriod.startDate);
  }, [activePeriod]);

  const characterMessage = data.livePeriod.characterMessage;

  return {
    menstruationStatus,
    periodDay,
    characterMessage,
    activePeriod,
  };
}
