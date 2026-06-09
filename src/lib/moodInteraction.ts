import type { LiveMood } from "@/types";

/** Tracks the latest mood button tap for speech + mascot motion. */
export interface MoodInteractionState {
  mood: LiveMood;
  triggerId: number;
}

export type MoodInteractionMotion = "bounce" | "gentle-shake" | "sink";

const MOOD_INTERACTION_MS = 1500;

export const MOOD_INTERACTION_DURATION_MS = MOOD_INTERACTION_MS;

/** Positive / energy moods bounce; low or heavy moods sink or gently shake. */
export function getMoodInteractionMotion(mood: LiveMood): MoodInteractionMotion {
  switch (mood) {
    case "motivated":
    case "craving":
    case "calm":
      return "bounce";
    case "irritable":
    case "foggy":
      return "gentle-shake";
    case "drained":
    case "heavy":
    case "bittersweet":
      return "sink";
  }
}

export function getMoodInteractionMotionClass(
  motion: MoodInteractionMotion,
): string {
  switch (motion) {
    case "bounce":
      return "animate-mood-interaction-bounce";
    case "gentle-shake":
      return "animate-mood-interaction-shake";
    case "sink":
      return "animate-mood-interaction-sink";
  }
}

export function createMoodInteractionState(mood: LiveMood): MoodInteractionState {
  return { mood, triggerId: Date.now() };
}
