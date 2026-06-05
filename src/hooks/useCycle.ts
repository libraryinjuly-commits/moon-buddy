"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { calculateCycleInfo } from "@/lib/cycle";
import type { MoonBuddyData, PeriodRecord } from "@/types/moonBuddy";

export function useCycle(data: MoonBuddyData, setData: SetMoonBuddyData) {
  const cycleInfo = useMemo(
    () => calculateCycleInfo(data.periods, data.settings),
    [data.periods, data.settings],
  );

  const addPeriod = useCallback(
    (startDate: string, endDate: string) => {
      if (!startDate || !endDate) return false;
      if (startDate > endDate) return false;

      const period: PeriodRecord = {
        id: crypto.randomUUID(),
        startDate,
        endDate,
      };

      setData((prev) => ({
        ...prev,
        periods: [period, ...prev.periods],
      }));
      return true;
    },
    [setData],
  );

  const deletePeriod = useCallback(
    (periodId: string) => {
      setData((prev) => ({
        ...prev,
        periods: prev.periods.filter((period) => period.id !== periodId),
      }));
    },
    [setData],
  );

  return { cycleInfo, addPeriod, deletePeriod };
}
