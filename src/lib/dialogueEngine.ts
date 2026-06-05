import { dialogueEn } from "@/data/dialogue-en";
import { dialogueJa } from "@/data/dialogue-ja";
import { dialogueKo } from "@/data/dialogue-ko";
import type { DialoguePack } from "@/data/dialogue.types";
import { normalizeLanguage } from "@/lib/i18n";
import { getTemperamentFromMbti } from "@/lib/mbti";
import { applyNameForLanguage } from "@/lib/nameParticle";
import { pickVariant } from "@/lib/pickVariant";
import type { CyclePhase, DialogueContent, Language, Mood } from "@/types";

const DIALOGUE_PACKS: Record<Language, DialoguePack> = {
  KO: dialogueKo,
  EN: dialogueEn,
  JA: dialogueJa,
};

export function getDialoguePack(language: string): DialoguePack {
  const lang = normalizeLanguage(language);
  return DIALOGUE_PACKS[lang] ?? dialogueKo;
}

export function getDialogue(
  userName: string,
  mbti: string,
  phase: CyclePhase | null,
  mood: Mood | null,
  language: string,
): DialogueContent {
  const lang = normalizeLanguage(language);
  const pack = getDialoguePack(lang);
  const temperament = getTemperamentFromMbti(mbti);

  if (!phase) {
    return {
      guide: pack.welcomeGuide,
      speech: applyNameForLanguage(
        pickVariant(pack.welcomeSpeech[temperament]),
        userName,
        lang,
      ),
    };
  }

  const phaseDialogues = pack.dialogues[temperament][phase];
  const source = mood ? phaseDialogues[mood] : phaseDialogues.default;

  return {
    guide: applyNameForLanguage(pickVariant(source.guide), userName, lang),
    speech: applyNameForLanguage(pickVariant(source.speech), userName, lang),
  };
}

export function getThankSpeech(
  userName: string,
  mbti: string,
  language: string,
): string {
  const lang = normalizeLanguage(language);
  const pack = getDialoguePack(lang);
  const temperament = getTemperamentFromMbti(mbti);

  return applyNameForLanguage(
    pickVariant(pack.thankSpeech[temperament]),
    userName,
    lang,
  );
}
