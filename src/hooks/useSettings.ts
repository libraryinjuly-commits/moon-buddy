"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { getLocale, normalizeLanguage } from "@/lib/i18n";
import { getTemperamentFromMbti, normalizeMbti } from "@/lib/mbti";
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
    (
      userName: string,
      mbti: string,
      buddyCustomName: string,
      language: Language,
    ) => {
      const normalizedMbti = normalizeMbti(mbti);
      setData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          userName,
          mbti: normalizedMbti,
          temperament: normalizedMbti
            ? getTemperamentFromMbti(normalizedMbti)
            : "",
          buddyCustomName,
          language: normalizeLanguage(language),
        },
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
