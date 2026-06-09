import { liveMoodToEmotionScale } from "@/lib/moodScale";
import type { MascotPhase } from "@/types";
import type { LiveMood } from "@/types/moonBuddy";

/**
 * Maps a live mood to an existing mascot skin phase for instant visual feedback.
 * Swap asset phase names here when custom mood portraits are added.
 */
export function getMascotPhaseForMood(mood: LiveMood): MascotPhase {
  const scale = liveMoodToEmotionScale(mood);
  switch (scale) {
    case "great":
      return "ovulation";
    case "good":
      return "follicular";
    case "okay":
      return "default";
    case "low":
      return "luteal";
    case "bad":
      return "menstrual";
    default:
      return "default";
  }
}
