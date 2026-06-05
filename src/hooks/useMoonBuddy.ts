"use client";

import { useMemo } from "react";

import { useCycle } from "@/hooks/useCycle";
import { useDialogue } from "@/hooks/useDialogue";
import { useLivePeriod } from "@/hooks/useLivePeriod";
import { useLuna } from "@/hooks/useLuna";
import { useMood } from "@/hooks/useMood";
import { useMoonBuddyStorage } from "@/hooks/useMoonBuddyStorage";
import { useSettings } from "@/hooks/useSettings";
import { getMascotConfig } from "@/lib/mascot";

export function useMoonBuddy() {
  const { data, setData, isLoaded } = useMoonBuddyStorage();

  const { cycleInfo, addPeriod, deletePeriod } = useCycle(data, setData);
  const { drawCard } = useLuna(data, setData);
  const {
    todayMood,
    todayLiveEntries,
    logMood,
    logLiveMood,
    updateDayRecord,
    deleteDayRecord,
  } = useMood(data, setData);
  const {
    mascot: baseMascot,
    dialogue,
    thankSpeech,
    buddyIdentity,
    temperament,
    temperamentTheme,
  } = useDialogue(data, cycleInfo, todayMood);
  const { locale, updateSettings, updateProfile, updateLanguage } = useSettings(
    data,
    setData,
  );
  const {
    menstruationStatus,
    periodDay,
    characterMessage,
    toggleMenstruation,
  } = useLivePeriod(data, setData, isLoaded);

  const mascot = useMemo(() => {
    if (menstruationStatus === "ON_PERIOD") {
      return getMascotConfig("menstrual", data.settings.mbti);
    }
    return baseMascot;
  }, [menstruationStatus, baseMascot, data.settings.mbti]);

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
    todayMood,
    todayLiveEntries,
    menstruationStatus,
    periodDay,
    characterMessage,
    toggleMenstruation,
    addPeriod,
    deletePeriod,
    logMood,
    logLiveMood,
    updateSettings,
    updateProfile,
    updateLanguage,
    drawCard,
    updateDayRecord,
    deleteDayRecord,
  };
}
