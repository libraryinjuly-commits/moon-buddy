"use client";

import { useMemo } from "react";

import { getDialogue, getThankSpeech } from "@/lib/dialogue";
import { getBuddyIdentity } from "@/lib/epithets";
import {
  getDefaultMascotConfig,
  getMascotConfig,
  getTemperament,
} from "@/lib/mascot";
import { getTemperamentTheme } from "@/lib/mbti";
import type { CycleInfo, Mood, MoonBuddyData } from "@/types/moonBuddy";

export function useDialogue(
  data: MoonBuddyData,
  cycleInfo: CycleInfo | null,
  todayMood: Mood | null,
) {
  const { settings } = data;

  const temperament = useMemo(
    () => getTemperament(settings.mbti),
    [settings.mbti],
  );

  const temperamentTheme = useMemo(
    () => getTemperamentTheme(temperament),
    [temperament],
  );

  const buddyIdentity = useMemo(
    () =>
      getBuddyIdentity(
        data.character.level,
        settings.buddyCustomName,
        temperamentTheme.buddyName,
        settings.language,
      ),
    [
      data.character.level,
      settings.buddyCustomName,
      settings.language,
      temperamentTheme.buddyName,
    ],
  );

  const mascot = useMemo(() => {
    if (!cycleInfo) return getDefaultMascotConfig(settings.mbti);
    return getMascotConfig(cycleInfo.phase, settings.mbti);
  }, [cycleInfo, settings.mbti]);

  const dialogue = useMemo(
    () =>
      getDialogue(
        settings.userName,
        settings.mbti,
        cycleInfo?.phase ?? null,
        todayMood,
        settings.language,
      ),
    [
      settings.userName,
      settings.mbti,
      settings.language,
      cycleInfo?.phase,
      todayMood,
    ],
  );

  const thankSpeech = useMemo(
    () =>
      getThankSpeech(settings.userName, settings.mbti, settings.language),
    [settings.userName, settings.mbti, settings.language],
  );

  return {
    mascot,
    dialogue,
    thankSpeech,
    buddyIdentity,
    temperament,
    temperamentTheme,
  };
}
