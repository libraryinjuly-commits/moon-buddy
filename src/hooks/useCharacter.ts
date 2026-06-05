"use client";

import { useMemo } from "react";

import { getExpProgress } from "@/lib/rewards";
import type { MoonBuddyData } from "@/types/moonBuddy";

export function useCharacter(data: MoonBuddyData) {
  const character = data.character;

  const expProgress = useMemo(
    () => getExpProgress(character.exp),
    [character.exp],
  );

  return { character, expProgress };
}
