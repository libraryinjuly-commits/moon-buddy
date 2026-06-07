"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  buildBuddySpeechPool,
  getSpeechAtIndex,
} from "@/lib/buddySpeech";
import type {
  CyclePhase,
  Language,
  MenstruationStatus,
  TemperamentGroup,
} from "@/types";

interface UseBuddySpeechOptions {
  phase: CyclePhase | null;
  language: Language;
  temperament: TemperamentGroup;
  userName: string;
  characterName: string;
  menstruationStatus: MenstruationStatus;
  liveSpeech: string | null;
}

export function useBuddySpeech({
  phase,
  language,
  temperament,
  userName,
  characterName,
  menstruationStatus,
  liveSpeech,
}: UseBuddySpeechOptions) {
  const [index, setIndex] = useState(0);

  const pool = useMemo(
    () =>
      buildBuddySpeechPool(phase, language, temperament, {
        userName,
        characterName,
      }, menstruationStatus),
    [phase, language, temperament, userName, characterName, menstruationStatus],
  );

  const poolKey = useMemo(() => pool.join("|"), [pool]);

  useEffect(() => {
    setIndex(0);
  }, [poolKey]);

  const buddySpeech = useMemo(
    () => getSpeechAtIndex(pool, index),
    [pool, index],
  );

  const speech = liveSpeech ?? buddySpeech;
  const canCycle = liveSpeech === null && pool.length > 1;

  const onSpeechTap = useCallback(() => {
    if (liveSpeech !== null || pool.length <= 1) return;
    setIndex((current) => (current + 1) % pool.length);
  }, [liveSpeech, pool.length]);

  return { speech, onSpeechTap, canCycle };
}
