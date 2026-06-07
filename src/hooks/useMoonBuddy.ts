"use client";

import { useMemo } from "react";

import { useCycle } from "@/hooks/useCycle";
import { useDialogue } from "@/hooks/useDialogue";
import { useLivePeriod } from "@/hooks/useLivePeriod";
import { useFortuneCookie } from "@/hooks/useFortuneCookie";
import { useMood } from "@/hooks/useMood";
import { useMoonBuddyStorage } from "@/hooks/useMoonBuddyStorage";
import { usePeriodHistory } from "@/hooks/usePeriodHistory";
import { useSettings } from "@/hooks/useSettings";
import { getMascotConfig } from "@/lib/mascot";

export function useMoonBuddy() {
  const { data, setData, isLoaded } = useMoonBuddyStorage();

  const { cycleInfo } = useCycle(data, setData);
  const {
    toggleDayPeriod,
    startPeriod,
    endPeriod,
    addPeriod,
    deletePeriod,
    toggleMenstruation,
  } = usePeriodHistory(data, setData, isLoaded);
  const { todayDominantMood, todayMoodEntries, logLiveMood } = useMood(
    data,
    setData,
  );
  const {
    mascot: baseMascot,
    dialogue,
    thankSpeech,
    buddyIdentity,
    temperament,
    temperamentTheme,
  } = useDialogue(data, cycleInfo, null);
  const { locale, updateSettings, updateProfile, updateLanguage } = useSettings(
    data,
    setData,
  );
  const { menstruationStatus, periodDay } = useLivePeriod(data);

  const mascotContext = useMemo(
    () => ({
      buddyCustomName: data.settings.buddyCustomName,
      language: data.settings.language,
    }),
    [data.settings.buddyCustomName, data.settings.language],
  );

  const mascot = useMemo(() => {
    if (menstruationStatus === "ON_PERIOD") {
      return getMascotConfig("menstrual", data.settings.mbti, mascotContext);
    }
    return baseMascot;
  }, [menstruationStatus, baseMascot, data.settings.mbti, mascotContext]);

  const {
    isOpenedToday: fortuneIsOpenedToday,
    todayMessage: fortuneTodayMessage,
    openFortuneCookie,
  } = useFortuneCookie(data, setData, {
    characterName: buddyIdentity.customName,
    temperament,
  });

  return {
    data,
    isLoaded,
    locale,
    cycleInfo,
    mascot,
    dialogue,
    thankSpeech,
    buddyIdentity,
    temperament,
    temperamentTheme,
    todayDominantMood,
    todayMoodEntries,
    menstruationStatus,
    periodDay,
    toggleMenstruation,
    toggleDayPeriod,
    startPeriod,
    endPeriod,
    addPeriod,
    deletePeriod,
    logLiveMood,
    updateSettings,
    updateProfile,
    updateLanguage,
    fortuneIsOpenedToday,
    fortuneTodayMessage,
    openFortuneCookie,
  };
}
