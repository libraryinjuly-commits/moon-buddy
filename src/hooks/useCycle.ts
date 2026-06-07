"use client";

import { useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { calculateCycleInfo } from "@/lib/cycle";
import type { MoonBuddyData } from "@/types/moonBuddy";

export function useCycle(data: MoonBuddyData, _setData: SetMoonBuddyData) {
  const cycleInfo = useMemo(
    () => calculateCycleInfo(data.periodHistory, data.settings),
    [data.periodHistory, data.settings],
  );

  return { cycleInfo };
}
