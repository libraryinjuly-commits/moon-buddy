import type { TemperamentDialogueSet } from "@/lib/i18n/types";
import type { SpeechVariants } from "@/lib/pickVariant";
import type { TemperamentGroup } from "@/types";

export interface DialoguePack {
  welcomeGuide: string;
  welcomeSpeech: Record<TemperamentGroup, SpeechVariants>;
  thankSpeech: Record<TemperamentGroup, SpeechVariants>;
  dialogues: Record<TemperamentGroup, TemperamentDialogueSet>;
}
