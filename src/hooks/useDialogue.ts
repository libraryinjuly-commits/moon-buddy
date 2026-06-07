"use client";

import { useMemo } from "react";

import { resolveTemperament } from "@/lib/companionSpecies";
import { getDialogue, getThankSpeech } from "@/lib/dialogue";
import { getBuddyIdentity } from "@/lib/epithets";
import { getDefaultMascotConfig, getMascotConfig } from "@/lib/mascot";
import { getTemperamentTheme } from "@/lib/mbti";
import type { CycleInfo, Mood, MoonBuddyData } from "@/types/moonBuddy";

export function useDialogue(
  data: MoonBuddyData,
  cycleInfo: CycleInfo | null,
  todayMood: Mood | null,
) {
  const { settings } = data;

  const temperament = useMemo(
    () => resolveTemperament(settings),
    [settings.mbti, settings.temperament],
  );

  const temperamentTheme = useMemo(
    () => getTemperamentTheme(temperament),
    [temperament],
  );

  const mascotContext = useMemo(
    () => ({
      buddyCustomName: settings.buddyCustomName,
      language: settings.language,
    }),
    [settings.buddyCustomName, settings.language],
  );

  const buddyIdentity = useMemo(
    () =>
      getBuddyIdentity(
        data.character.level,
        settings.buddyCustomName,
        temperament,
        settings.language,
      ),
    [
      data.character.level,
      settings.buddyCustomName,
      settings.language,
      temperament,
    ],
  );

  const mascot = useMemo(() => {
    if (!cycleInfo) return getDefaultMascotConfig(settings.mbti, mascotContext);
    return getMascotConfig(cycleInfo.phase, settings.mbti, mascotContext);
  }, [cycleInfo, settings.mbti, mascotContext]);

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
