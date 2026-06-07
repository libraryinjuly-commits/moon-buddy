import type { TemperamentDialogueSet } from "@/lib/i18n/types";
import type { SpeechVariants } from "@/lib/pickVariant";
import type { TemperamentGroup } from "@/types";

export interface DialoguePack {
  welcomeGuide: string;
  welcomeSpeech: Record<TemperamentGroup, SpeechVariants>;
  thankSpeech: Record<TemperamentGroup, SpeechVariants>;
  dialogues: Record<TemperamentGroup, TemperamentDialogueSet>;
  /** 홈·기분 입력 화면 말풍선 인사말 (Moon Buddy Voice & Tone) */
  homeGreetings: string[];
}
