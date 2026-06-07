"use client";

import { useMemo } from "react";

import { useCompanion } from "@/hooks/useCompanion";
import { useCycle } from "@/hooks/useCycle";
import { useDialogue } from "@/hooks/useDialogue";
import { useStarCollection } from "@/hooks/useStarCollection";
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
  const companionApi = useCompanion(data, setData, cycleInfo);
  const starCollectionApi = useStarCollection(data, setData);
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
    cycleInfo,
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
    setData,
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
    companion: companionApi.companion,
    stageProgress: companionApi.stageProgress,
    cycleComplete: companionApi.cycleComplete,
    readyToAscend: companionApi.readyToAscend,
    ascensionPending: companionApi.ascensionPending,
    checkAscension: companionApi.checkAscension,
    finishAscension: companionApi.finishAscension,
    stars: starCollectionApi.stars,
    starCount: starCollectionApi.starCount,
    preferredStarView: starCollectionApi.preferredView,
    setPreferredStarView: starCollectionApi.setPreferredView,
  };
}
