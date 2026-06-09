"use client";

import { useCallback, useMemo } from "react";

import type { SetMoonBuddyData } from "@/hooks/types";
import { getLocale, normalizeLanguage } from "@/lib/i18n";
import {
  getTemperamentFromMbti,
  mbtiTypeToMbti,
  normalizeMbtiType,
} from "@/lib/mbti";
import type { MbtiTypeKey } from "@/lib/mbti";
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
      mbtiType: MbtiTypeKey,
      buddyCustomName: string,
      language: Language,
    ) => {
      const normalizedType = normalizeMbtiType(mbtiType);
      const mbti = mbtiTypeToMbti(normalizedType);
      setData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          userName,
          mbti,
          mbtiType: normalizedType,
          temperament: getTemperamentFromMbti(mbti),
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
