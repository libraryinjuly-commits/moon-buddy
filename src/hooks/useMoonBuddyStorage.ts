"use client";

import { useCallback, useMemo } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { SetMoonBuddyData } from "@/hooks/types";
import { DEFAULT_DATA, normalizeData } from "@/lib/normalizeData";
import { STORAGE_KEY } from "@/lib/storage";
import type { MoonBuddyData } from "@/types/moonBuddy";

export function useMoonBuddyStorage(): {
  data: MoonBuddyData;
  setData: SetMoonBuddyData;
  isLoaded: boolean;
} {
  const [rawData, setRawData, isLoaded] = useLocalStorage<MoonBuddyData>(
    STORAGE_KEY,
    DEFAULT_DATA,
  );

  const setData = useCallback<SetMoonBuddyData>(
    (value) => {
      setRawData((prev) => {
        const normalizedPrev = normalizeData(prev);
        const next =
          value instanceof Function ? value(normalizedPrev) : value;
        return normalizeData(next);
      });
    },
    [setRawData],
  );

  const data = useMemo(() => normalizeData(rawData), [rawData]);

  return { data, setData, isLoaded };
}
