import { EXP_PER_LEVEL } from "@/lib/constants";
import type { CharacterState, Mood } from "@/types/moonBuddy";

export const GACHA_COST = 10;
export const LIVE_MOOD_LUNA = 1;
export const LIVE_MOOD_EXP = 12;

export const MOOD_EXP: Record<Mood, number> = {
  great: 25,
  good: 20,
  okay: 15,
  low: 10,
  bad: 5,
};

export const MOOD_LUNA: Record<Mood, number> = {
  great: 5,
  good: 4,
  okay: 3,
  low: 2,
  bad: 2,
};

export function getExpForMood(mood: Mood): number {
  return MOOD_EXP[mood];
}

export function getLunaForMood(mood: Mood): number {
  return MOOD_LUNA[mood];
}

export function addExp(
  character: CharacterState,
  amount: number,
): CharacterState {
  const newExp = Math.max(0, character.exp + amount);
  const newLevel = Math.max(1, Math.floor(newExp / EXP_PER_LEVEL) + 1);

  return {
    ...character,
    exp: newExp,
    level: newLevel,
  };
}

export function getExpProgress(exp: number): {
  current: number;
  needed: number;
  percent: number;
} {
  const current = exp % EXP_PER_LEVEL;
  const needed = EXP_PER_LEVEL;
  const percent = (current / needed) * 100;

  return { current, needed, percent };
}

export function clampLunaPoints(points: number): number {
  return Math.max(0, points);
}
