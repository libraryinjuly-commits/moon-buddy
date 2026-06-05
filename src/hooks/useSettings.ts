"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { getLocale } from "@/lib/i18n";
import type { Language, MoonBuddyData, UserSettings } from "@/types/moonBuddy";

export function useSettings(data: MoonBuddyData, setData: SetMoonBuddyData) {
  const locale = useMemo(
    () => getLocale(data.settings.language),
    [data.settings.language],
  );

  const updateSettings = useCallback(
    (settings: UserSettings) => {
      setData((prev) => ({ ...prev, settings }));
    },
    [setData],
  );

  const updateProfile = useCallback(
    (userName: string, mbti: string, buddyCustomName: string) => {
      setData((prev) => ({
        ...prev,
        settings: { ...prev.settings, userName, mbti, buddyCustomName },
      }));
    },
    [setData],
  );

  const updateLanguage = useCallback(
    (language: Language) => {
      setData((prev) => ({
        ...prev,
        settings: { ...prev.settings, language },
      }));
    },
    [setData],
  );

  return {
    locale,
    settings: data.settings,
    updateSettings,
    updateProfile,
    updateLanguage,
  };
}
