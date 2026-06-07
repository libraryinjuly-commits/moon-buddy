import type { DialoguePack } from "@/data/dialogue.types";
import { koLocale } from "@/lib/i18n/locales/ko";

/** 홈·기분 입력 화면 인사말 — 따뜻한 해요체, {userName}님 호칭 */
export const homeGreetingsKo: string[] = [
  "{userName}님, 오늘 하루는 어떠셨나요?",
  "{userName}님, 오늘 어떤 감정을 만나셨나요?",
  "{userName}님, 오늘 마음은 어떠세요? 천천히 들려주셔도 괜찮아요.",
  "{userName}님, 오늘 하루도 수고하셨어요. 지금 마음을 나눠 주실래요?",
  "{userName}님, 기분 버튼을 눌러 오늘의 마음을 들려주시면 {characterName}가 더 잘 곁에 있을 수 있어요.",
];

export const dialogueKo: DialoguePack = {
  welcomeGuide: koLocale.welcomeGuide,
  welcomeSpeech: koLocale.welcomeSpeech,
  thankSpeech: koLocale.thankSpeech,
  dialogues: koLocale.dialogues,
  homeGreetings: homeGreetingsKo,
};
