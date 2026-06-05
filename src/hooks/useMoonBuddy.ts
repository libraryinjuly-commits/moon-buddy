"use client";

import { useCycle } from "@/hooks/useCycle";
import { useDialogue } from "@/hooks/useDialogue";
import { useLuna } from "@/hooks/useLuna";
import { useMood } from "@/hooks/useMood";
import { useMoonBuddyStorage } from "@/hooks/useMoonBuddyStorage";
import { useSettings } from "@/hooks/useSettings";

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
    mascot,
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
