"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { getLivePeriodMessage, getPeriodDayFromStart } from "@/lib/livePeriod";
import { getTodayDateString } from "@/lib/storage";
import type {
  LivePeriodState,
  MenstruationStatus,
  MoonBuddyData,
  PeriodRecord,
} from "@/types/moonBuddy";

const LEGACY_STATUS_KEY = "menstruationStatus";
const LEGACY_START_KEY = "actualStartDate";

function toDateOnly(value: string): string {
  return value.includes("T") ? value.slice(0, 10) : value;
}

function syncActivePeriodEndDate(
  periods: PeriodRecord[],
  activePeriodId: string | null,
  today: string,
): PeriodRecord[] {
  if (!activePeriodId) return periods;

  return periods.map((period) =>
    period.id === activePeriodId
      ? {
          ...period,
          endDate: today < period.startDate ? period.startDate : today,
        }
      : period,
  );
}

export function useLivePeriod(
  data: MoonBuddyData,
  setData: SetMoonBuddyData,
  isLoaded: boolean,
) {
  const migratedRef = useRef(false);

  const { status, actualStartDate, activePeriodId } = data.livePeriod;
  const language = data.settings.language;

  const periodDay = useMemo(() => {
    if (status !== "ON_PERIOD" || !actualStartDate) return 1;
    return getPeriodDayFromStart(actualStartDate);
  }, [status, actualStartDate]);

  const characterMessage = useMemo(
    () => data.livePeriod.characterMessage,
    [data.livePeriod.characterMessage],
  );

  useEffect(() => {
    if (!isLoaded || migratedRef.current) return;

    const legacyStatus = localStorage.getItem(
      LEGACY_STATUS_KEY,
    ) as MenstruationStatus | null;
    const legacyStart = localStorage.getItem(LEGACY_START_KEY);

    if (
      legacyStatus === "ON_PERIOD" &&
      legacyStart &&
      data.livePeriod.status === "NOT_PERIOD" &&
      !data.livePeriod.actualStartDate
    ) {
      const startDate = toDateOnly(legacyStart);
      const today = getTodayDateString();
      const period: PeriodRecord = {
        id: crypto.randomUUID(),
        startDate,
        endDate: today,
      };

      setData((prev) => ({
        ...prev,
        periods: [period, ...prev.periods],
        livePeriod: {
          status: "ON_PERIOD",
          actualStartDate: startDate,
          activePeriodId: period.id,
          characterMessage: getLivePeriodMessage("onPeriod", prev.settings.language),
        },
      }));
    }

    localStorage.removeItem(LEGACY_STATUS_KEY);
    localStorage.removeItem(LEGACY_START_KEY);
    migratedRef.current = true;
  }, [isLoaded, data.livePeriod, setData]);

  useEffect(() => {
    if (!isLoaded || status !== "ON_PERIOD" || !activePeriodId) return;

    const today = getTodayDateString();
    setData((prev) => {
      const active = prev.periods.find((period) => period.id === activePeriodId);
      if (!active || active.endDate >= today) return prev;

      return {
        ...prev,
        periods: syncActivePeriodEndDate(
          prev.periods,
          activePeriodId,
          today,
        ),
      };
    });
  }, [isLoaded, status, activePeriodId, setData]);

  const toggleMenstruation = useCallback(() => {
    const today = getTodayDateString();

    setData((prev) => {
      if (prev.livePeriod.status === "NOT_PERIOD") {
        const period: PeriodRecord = {
          id: crypto.randomUUID(),
          startDate: today,
          endDate: today,
        };

        const nextLivePeriod: LivePeriodState = {
          status: "ON_PERIOD",
          actualStartDate: today,
          activePeriodId: period.id,
          characterMessage: getLivePeriodMessage("onPeriod", prev.settings.language),
        };

        return {
          ...prev,
          periods: [period, ...prev.periods],
          livePeriod: nextLivePeriod,
        };
      }

      const periods = syncActivePeriodEndDate(
        prev.periods,
        prev.livePeriod.activePeriodId,
        today,
      );

      const nextLivePeriod: LivePeriodState = {
        status: "NOT_PERIOD",
        actualStartDate: null,
        activePeriodId: null,
        characterMessage: getLivePeriodMessage("ended", prev.settings.language),
      };

      return {
        ...prev,
        periods,
        livePeriod: nextLivePeriod,
      };
    });
  }, [setData]);

  return {
    menstruationStatus: status,
    periodDay,
    characterMessage,
    toggleMenstruation,
  };
}
