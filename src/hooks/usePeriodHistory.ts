"use client";

import { useCallback, useEffect, useRef } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { getLivePeriodMessage } from "@/lib/livePeriod";
import { syncLivePeriodFromHistory } from "@/lib/livePeriodSync";
import {
  createPeriodId,
  endPeriodOnDate,
  getActivePeriod,
  startPeriodOnDate,
  togglePeriodDay,
} from "@/lib/periodHistory";
import { getTodayDateString } from "@/lib/storage";
import type {
  MenstruationStatus,
  MoonBuddyData,
  PeriodHistoryEntry,
} from "@/types/moonBuddy";

const LEGACY_STATUS_KEY = "menstruationStatus";
const LEGACY_START_KEY = "actualStartDate";

function withSyncedLivePeriod(
  prev: MoonBuddyData,
  periodHistory: PeriodHistoryEntry[],
  messageKey?: "onPeriod" | "ended" | "idle",
): MoonBuddyData {
  const message = messageKey
    ? getLivePeriodMessage(messageKey, prev.settings.language)
    : undefined;

  return {
    ...prev,
    periodHistory,
    livePeriod: syncLivePeriodFromHistory(
      periodHistory,
      prev.settings.language,
      message,
    ),
  };
}

export function usePeriodHistory(
  data: MoonBuddyData,
  setData: SetMoonBuddyData,
  isLoaded: boolean,
) {
  const migratedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || migratedRef.current) return;

    const legacyStatus = localStorage.getItem(
      LEGACY_STATUS_KEY,
    ) as MenstruationStatus | null;
    const legacyStart = localStorage.getItem(LEGACY_START_KEY);

    if (
      legacyStatus === "ON_PERIOD" &&
      legacyStart &&
      !getActivePeriod(data.periodHistory)
    ) {
      const startDate = legacyStart.includes("T")
        ? legacyStart.slice(0, 10)
        : legacyStart;
      const today = getTodayDateString();

      setData((prev) => {
        const entry: PeriodHistoryEntry = {
          id: createPeriodId(),
          startDate,
          endDate: null,
        };
        const periodHistory = [entry, ...prev.periodHistory];
        return withSyncedLivePeriod(prev, periodHistory, "onPeriod");
      });
    }

    localStorage.removeItem(LEGACY_STATUS_KEY);
    localStorage.removeItem(LEGACY_START_KEY);
    migratedRef.current = true;
  }, [isLoaded, data.periodHistory, setData]);

  const toggleDayPeriod = useCallback(
    (date: string) => {
      const today = getTodayDateString();
      setData((prev) => {
        const periodHistory = togglePeriodDay(prev.periodHistory, date, today);
        return withSyncedLivePeriod(prev, periodHistory);
      });
    },
    [setData],
  );

  const startPeriod = useCallback(
    (date: string) => {
      const today = getTodayDateString();
      setData((prev) => {
        const periodHistory = startPeriodOnDate(prev.periodHistory, date, today);
        return withSyncedLivePeriod(prev, periodHistory, "onPeriod");
      });
    },
    [setData],
  );

  const endPeriod = useCallback(
    (date: string) => {
      const today = getTodayDateString();
      setData((prev) => {
        const periodHistory = endPeriodOnDate(prev.periodHistory, date, today);
        return withSyncedLivePeriod(prev, periodHistory, "ended");
      });
    },
    [setData],
  );

  const addPeriod = useCallback(
    (startDate: string, endDate: string | null) => {
      if (!startDate) return false;
      if (endDate && startDate > endDate) return false;

      const today = getTodayDateString();
      setData((prev) => {
        let periodHistory = prev.periodHistory;
        const active = getActivePeriod(periodHistory);

        if (active) {
          const closeDate = addDaysBefore(startDate);
          periodHistory = endPeriodOnDate(periodHistory, closeDate, today);
        }

        const effectiveEnd = endDate ?? (startDate >= today ? today : startDate);
        periodHistory = periodHistory.filter((entry) => {
          const entryEnd = entry.endDate ?? today;
          return startDate > entryEnd || effectiveEnd < entry.startDate;
        });

        const entry: PeriodHistoryEntry = {
          id: createPeriodId(),
          startDate,
          endDate: endDate ?? (startDate >= today ? null : startDate),
        };

        const messageKey = entry.endDate === null ? "onPeriod" : undefined;
        return withSyncedLivePeriod(
          prev,
          [entry, ...periodHistory],
          messageKey,
        );
      });
      return true;
    },
    [setData],
  );

  const deletePeriod = useCallback(
    (periodId: string) => {
      setData((prev) => {
        const periodHistory = prev.periodHistory.filter(
          (entry) => entry.id !== periodId,
        );
        return withSyncedLivePeriod(prev, periodHistory);
      });
    },
    [setData],
  );

  const toggleMenstruation = useCallback(() => {
    const today = getTodayDateString();
    setData((prev) => {
      const active = getActivePeriod(prev.periodHistory);
      if (!active) {
        const periodHistory = startPeriodOnDate(prev.periodHistory, today, today);
        return withSyncedLivePeriod(prev, periodHistory, "onPeriod");
      }

      const periodHistory = endPeriodOnDate(prev.periodHistory, today, today);
      return withSyncedLivePeriod(prev, periodHistory, "ended");
    });
  }, [setData]);

  return {
    periodHistory: data.periodHistory,
    toggleDayPeriod,
    startPeriod,
    endPeriod,
    addPeriod,
    deletePeriod,
    toggleMenstruation,
  };
}

function addDaysBefore(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`);
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
