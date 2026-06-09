import { applySpeechTemplate } from "@/lib/persona";
import type { Language, LiveMood, TemperamentGroup } from "@/types";

/** Visual keys for mood-reaction portraits — swap image paths in MOOD_REACTION_ASSETS. */
export type MoodReactionVisual =
  | "joyful_sparkle"
  | "peaceful_calm"
  | "cozy_blanket"
  | "sensitive_guard"
  | "low_battery"
  | "foggy_cloud"
  | "bittersweet_tear"
  | "craving_snack";

export const MOOD_REACTION_ASSETS: Record<
  MoodReactionVisual,
  { imagePath: string; placeholderEmoji: string }
> = {
  joyful_sparkle: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/joyful-sparkle.png",
    placeholderEmoji: "✨",
  },
  peaceful_calm: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/peaceful-calm.png",
    placeholderEmoji: "🌿",
  },
  cozy_blanket: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/cozy-blanket.png",
    placeholderEmoji: "🫖",
  },
  sensitive_guard: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/sensitive-guard.png",
    placeholderEmoji: "🌋",
  },
  low_battery: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/low-battery.png",
    placeholderEmoji: "🔋",
  },
  foggy_cloud: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/foggy-cloud.png",
    placeholderEmoji: "🌀",
  },
  bittersweet_tear: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/bittersweet-tear.png",
    placeholderEmoji: "💧",
  },
  craving_snack: {
    // TODO: 실제 이미지 에셋 매핑
    imagePath: "/assets/companions/reactions/craving-snack.png",
    placeholderEmoji: "🍫",
  },
};

const MOOD_TO_VISUAL: Record<LiveMood, MoodReactionVisual> = {
  motivated: "joyful_sparkle",
  calm: "peaceful_calm",
  heavy: "cozy_blanket",
  irritable: "sensitive_guard",
  drained: "low_battery",
  foggy: "foggy_cloud",
  bittersweet: "bittersweet_tear",
  craving: "craving_snack",
};

type MoodFeedDialogueMatrix = Record<LiveMood, string>;

const KO_MOOD_FEED: MoodFeedDialogueMatrix = {
  motivated:
    "{userName}님이 기쁘니 {characterName}도 온몸이 반짝여요!",
  calm: "잔잔한 하루네요. {characterName}가 곁에서 숨 고르기를 도와줄게요.",
  heavy:
    "토닥토닥, 따뜻한 차 한잔 마시며 {characterName}와 같이 쉬어요.",
  irritable:
    "예민한 날이에요. {characterName}가 방어막처럼 곁을 지켜줄게요.",
  drained:
    "배터리가 바닥났군요. {characterName}랑 오늘은 아무것도 안 해도 괜찮아요.",
  foggy:
    "머릿속이 뿌옇죠? {characterName}랑 천천히 멍하니 쉬어요.",
  bittersweet:
    "복잡한 마음도 괜찮아요. {characterName}가 조용히 안아줄게요.",
  craving:
    "몸이 뭔가 원하네요. {characterName}랑 맛있는 걸로 기분 전환해요!",
};

const EN_MOOD_FEED: MoodFeedDialogueMatrix = {
  motivated:
    "{userName}, your joy makes {characterName} sparkle all over!",
  calm: "A calm day. {characterName} will help you breathe easy.",
  heavy:
    "Pat pat — let's sip warm tea and rest together with {characterName}.",
  irritable:
    "A sensitive day. {characterName} will guard your space beside you.",
  drained:
    "You're running on empty. It's okay to do nothing today with {characterName}.",
  foggy:
    "Foggy head? Rest slowly with {characterName} for a little while.",
  bittersweet:
    "Mixed feelings are okay. {characterName} is here with a quiet hug.",
  craving:
    "Your body wants something good — treat yourself a little with {characterName}!",
};

const JA_MOOD_FEED: MoodFeedDialogueMatrix = {
  motivated:
    "{userName}さんがうれしいから、{characterName}もきらきら輝いちゃう！",
  calm: "穏やかな一日ですね。{characterName}がそばで深呼吸を手伝うよ。",
  heavy:
    "トントン、温かいお茶を飲みながら{characterName}と一緒に休もう。",
  irritable:
    "敏感な日ですね。{characterName}がそばで守ってあげる。",
  drained:
    "バッテリー切れですね。今日は{characterName}と何もしなくて大丈夫。",
  foggy:
    "頭がぼんやり？{characterName}とゆっくり休もう。",
  bittersweet:
    "複雑な気持ちも大丈夫。{characterName}がそっと抱きしめるね。",
  craving:
    "何か欲しい日ですね。{characterName}とおいしいもので気分転換しよう！",
};

const DIALOGUES: Record<Language, MoodFeedDialogueMatrix> = {
  KO: KO_MOOD_FEED,
  EN: EN_MOOD_FEED,
  JA: JA_MOOD_FEED,
};

export interface MoodFeedReactionContext {
  userName: string;
  characterName: string;
}

export function getMoodReactionVisual(mood: LiveMood): MoodReactionVisual {
  return MOOD_TO_VISUAL[mood];
}

export function getMoodReactionAsset(mood: LiveMood) {
  return MOOD_REACTION_ASSETS[getMoodReactionVisual(mood)];
}

export function getMoodFeedReaction(
  mood: LiveMood,
  language: string,
  _temperament: TemperamentGroup,
  context: MoodFeedReactionContext,
): string {
  const lang: Language =
    language === "EN" || language === "JA" ? language : "KO";
  const template = DIALOGUES[lang][mood] ?? DIALOGUES.KO[mood];

  return applySpeechTemplate(template, {
    userName: context.userName,
    characterName: context.characterName,
    language: lang,
  });
}
