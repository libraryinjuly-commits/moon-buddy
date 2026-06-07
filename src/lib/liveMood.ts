import { applySpeechTemplate } from "@/lib/persona";
import type { Language, LiveMood, TemperamentGroup } from "@/types";

export const LIVE_MOODS: LiveMood[] = [
  "calm",
  "motivated",
  "drained",
  "foggy",
  "irritable",
  "bittersweet",
  "craving",
  "heavy",
];

const LEGACY_LIVE_MOOD_MAP: Record<string, LiveMood> = {
  excited: "motivated",
  tired: "drained",
  sensitive: "irritable",
  upset: "heavy",
};

type MoodResponseMatrix = Record<LiveMood, string>;

const KO_NF: MoodResponseMatrix = {
  calm: "주인님 마음 날씨가 맑아서 다행이에요. {characterName}가 이 잔잔한 행복 옆에 있을게요. 🌿",
  motivated:
    "와아! 우리 주인님 오늘 에너지 최고! {characterName}도 신나요! 멋진 모습도 좋지만 중간에 꼭 쉬어가기예요! 🔥",
  drained:
    "아이고, 배터리가 다 닳았구나... 😢 얼른 누우세요. {characterName}가 옆에서 지켜볼게요. 오늘 루틴은 안 해도 괜찮아요.",
  foggy:
    "머릿속이 안개처럼 답답하죠? 아무 생각 하지 말고 {characterName} 말랑한 볼 보면서 멍하니 쉬어요. 🌀",
  irritable:
    "주인님이 화난 건 다 이유가 있어요! 세상이 잘못했네! 😤 {characterName}한테 다 풀어요. 안 아파요!",
  bittersweet:
    "괜히 눈물 나고 센치해지는 건 주인님 탓이 아니에요. 호르몬 요정이 장난치는 중! {characterName}가 안아줄게 💧",
  craving:
    "지금 당장 초콜릿 수혈 개시! 🍫 오늘만큼은 몸이 원하는 대로 맛있게 먹고 행복해져요!",
  heavy:
    "마음이 무너지는 날이군요... 😭 아무 말 안 해도 되니 {characterName} 품에 푹 안겨요. 제일 사랑해요.",
};

const KO_NT: MoodResponseMatrix = {
  calm: "마음 상태가 안정 구간입니다. {characterName}가 현재 컨디션을 긍정적으로 기록했어요. 🌿",
  motivated:
    "동기 지표 상승 확인. 활동은 좋지만 중간 휴식을 삽입하면 효율이 높아집니다. 🔥",
  drained:
    "에너지 고갈 상태입니다. 즉시 휴식 모드로 전환하세요. {characterName}가 모니터링합니다. 😢",
  foggy:
    "인지 피로 감지. 5분간 눈 감고 호흡만 집중해 보세요. 🌀",
  irritable:
    "분노 반응은 타당합니다. 원인 분석보다 회복을 우선하세요. 😤",
  bittersweet:
    "감정 변동은 호르몬 요인일 가능성이 큽니다. 자책 불필요합니다. 💧",
  craving:
    "식욕 증가는 예측 가능한 반응입니다. 오늘은 적정량 섭취를 허용합니다. 🍫",
  heavy:
    "정서 부하가 높습니다. 말하지 않아도 됩니다. {characterName}가 대기 중입니다. 😭",
};

const KO_SJ: MoodResponseMatrix = {
  calm: "마음 상태 양호 확인. {characterName} 보안관, 정상 순찰 중입니다. 🌿",
  motivated:
    "활력 지표 상승! 오늘의 미션 실행 가능. 단, 휴식 시간도 반드시 확보하세요. 🔥",
  drained:
    "배터리 방전 상태. 즉시 휴식 지침 발령. 오늘 루틴 면제입니다. {characterName}가 지켜볼게요. 😢",
  foggy:
    "집중력 저하 감지. 5분 호흡 휴식을 권장합니다. 🌀",
  irritable:
    "분노는 정당한 반응입니다. {characterName}에게 안전하게 표현하세요. 😤",
  bittersweet:
    "감정 기복은 호르몬 영향일 수 있습니다. 자책 금지, 주인님. 💧",
  craving:
    "식욕 증가 구간. 오늘은 적정 간식 섭취 허용합니다. 🍫",
  heavy:
    "정서적 무게 감지. 말 없이 쉬어도 됩니다. {characterName} 보안관이 곁에 있습니다. 😭",
};

const KO_SP: MoodResponseMatrix = {
  calm: "마음 날씨 맑음! 최고야! {characterName}도 기분 업! 🌿",
  motivated:
    "에너지 폭발! 오늘 뭐든 해낼 것 같아! 중간에 맛있는 거 먹으며 쉬는 것도 잊지 마! 🔥",
  drained:
    "배터리 0%! 바로 눕자! {characterName}랑 오늘은 아무것도 안 해도 돼! 😢",
  foggy:
    "머리 안개 낀 느낌? {characterName} 얼굴 보면서 5분 멍때리기 타임! 🌀",
  irritable:
    "화날 만해! 세상 잘못! {characterName}한테 막 털어놔도 돼! 😤",
  bittersweet:
    "왠지 눈물 나는 건 호르몬 장난! {characterName}가 같이 웃어줄게! 💧",
  craving:
    "지금 당장 먹고 싶은 거 먹자! 🍫 오늘은 몸이 원하는 대로!",
  heavy:
    "마음이 무거운 날... 말 안 해도 돼. {characterName}랑 그냥 쉬자. 😭",
};

const EN_NF: MoodResponseMatrix = {
  calm: "Your heart weather is clear—{characterName} is relieved. I'll stay so this gentle happiness lasts. 🌿",
  motivated:
    "Wow! Energy max today! {characterName} is excited too—rest in between! 🔥",
  drained:
    "Battery empty... 😢 Lie down. {characterName} watches over you—skip routine today.",
  foggy:
    "Foggy head? Stare at {characterName}'s squishy cheeks and zone out. 🌀",
  irritable:
    "Every reason to be upset! Vent on {characterName}—I won't get hurt! 😤",
  bittersweet:
    "Random tears aren't your fault. Hormone fairy tricks—{characterName} hugs you. 💧",
  craving:
    "Chocolate transfusion NOW! 🍫 Eat what your body wants today!",
  heavy:
    "Heart crumbling today... 😭 No words needed—snuggle in {characterName}'s arms.",
};

const EN_NT: MoodResponseMatrix = {
  calm: "Mood stable. {characterName} logged positive status. 🌿",
  motivated: "Motivation rising. Insert rest breaks for efficiency. 🔥",
  drained: "Energy depleted. Switch to rest mode. {characterName} monitoring. 😢",
  foggy: "Cognitive fatigue detected. Five-minute breathing pause advised. 🌀",
  irritable: "Anger response valid. Prioritize recovery over analysis. 😤",
  bittersweet: "Emotional swing likely hormonal. No self-blame needed. 💧",
  craving: "Appetite increase expected. Moderate intake permitted today. 🍫",
  heavy: "High emotional load. Silence is fine. {characterName} on standby. 😭",
};

const EN_SJ: MoodResponseMatrix = {
  calm: "Mood status OK. {characterName} Guard on normal patrol. 🌿",
  motivated: "Vitality up—missions executable. Secure rest windows too. 🔥",
  drained: "Battery depleted. Rest order issued. Routine waived. {characterName} watching. 😢",
  foggy: "Focus drop detected. Five-minute breath break recommended. 🌀",
  irritable: "Anger is legitimate. Express safely to {characterName}. 😤",
  bittersweet: "Mood swing may be hormonal. No self-blame, dear. 💧",
  craving: "Craving phase—moderate snack intake allowed. 🍫",
  heavy: "Emotional weight detected. Rest without words. {characterName} Guard present. 😭",
};

const EN_SP: MoodResponseMatrix = {
  calm: "Clear heart weather—awesome! {characterName} vibes up too! 🌿",
  motivated: "Energy blast! Crush it—but snack breaks count! 🔥",
  drained: "Battery zero! Nap time! {characterName} says skip everything today! 😢",
  foggy: "Brain fog? Five-minute stare-at-{characterName} break! 🌀",
  irritable: "Valid anger! Yell at {characterName}—all good! 😤",
  bittersweet: "Random tears = hormone prank! {characterName} laughs with you! 💧",
  craving: "Eat the craving NOW! 🍫 Body rules today!",
  heavy: "Heavy heart day... no talk needed. Chill with {characterName}. 😭",
};

const JA_NF: MoodResponseMatrix = {
  calm: "心のお天気が晴れてよかった。{characterName}がこの穏やかな幸せのそばにいるね。🌿",
  motivated:
    "わぁ！ご主人様今日エネルギー最高！{characterName}もわくわく！途中で休んでね！🔥",
  drained:
    "バッテリー切れ... 😢 横になって。{characterName}が見守るよ。今日のルーティンは不要。",
  foggy:
    "頭が霧みたい？{characterName}のぷにぷにほっぺ見てぼーっとして。🌀",
  irritable:
    "怒る理由は全部ある！{characterName}に全部吐き出して。痛くないよ！😤",
  bittersweet:
    "なんだか涙もセンチもご主人様のせいじゃない。{characterName}がぎゅっとするね。💧",
  craving: "今すぐチョコ補給！🍫 今日は体が欲しがるものを！",
  heavy:
    "心が崩れる日... 😭 何も言わなくていい。{characterName}の腕の中に。",
};

const JA_NT: MoodResponseMatrix = {
  calm: "心の状態は安定区間です。{characterName}がポジティブに記録しました。🌿",
  motivated: "動機指標上昇。活動は良いが中間休息を挿入すると効率的です。🔥",
  drained: "エネルギー枯渇。即休息モードへ。{characterName}がモニタリング中。😢",
  foggy: "認知疲労検出。5分間の呼吸集中を推奨します。🌀",
  irritable: "怒りの反応は妥当です。回復を優先してください。😤",
  bittersweet: "感情変動はホルモン要因の可能性大。自責不要です。💧",
  craving: "食欲増加は予測可能な反応。今日は適量摂取を許可します。🍫",
  heavy: "情緒負荷が高いです。沈黙で大丈夫。{characterName}が待機中。😭",
};

const JA_SJ: MoodResponseMatrix = {
  calm: "心の状態良好確認。{characterName}保安官、正常巡回中。🌿",
  motivated: "活力指標上昇！ミッション実行可能。休息時間も確保を。🔥",
  drained: "バッテリー切れ。即休息指示。ルーティン免除。{characterName}が見守ります。😢",
  foggy: "集中力低下検出。5分呼吸休息を推奨。🌀",
  irritable: "怒りは正当な反応。{characterName}に安全に表現を。😤",
  bittersweet: "感情の揺れはホルモン影響かも。自責禁止、ご主人様。💧",
  craving: "食欲増加区間。適量の間食を許可。🍫",
  heavy: "情緒的な重さ検出。言葉なく休んでいい。{characterName}保安官がそばに。😭",
};

const JA_SP: MoodResponseMatrix = {
  calm: "心のお天気晴れ！最高！{characterName}もテンションアップ！🌿",
  motivated: "エネルギー爆発！何でもできそう！おやつ休憩も忘れずに！🔥",
  drained: "バッテリー0%！すぐ横になろう！{characterName}と今日は何もしなくていい！😢",
  foggy: "頭モヤモヤ？{characterName}の顔見て5分ボーッと！🌀",
  irritable: "怒っていい！{characterName}に全部ぶちまけて！😤",
  bittersweet: "涙もセンチもホルモンのいたずら！{characterName}が一緒に笑うよ！💧",
  craving: "今食べたいもの食べよう！🍫 今日は体のルール！",
  heavy: "心が重い日... 話さなくていい。{characterName}と休もう。😭",
};

const RESPONSES: Record<
  Language,
  Record<TemperamentGroup, MoodResponseMatrix>
> = {
  KO: { NF: KO_NF, NT: KO_NT, SJ: KO_SJ, SP: KO_SP },
  EN: { NF: EN_NF, NT: EN_NT, SJ: EN_SJ, SP: EN_SP },
  JA: { NF: JA_NF, NT: JA_NT, SJ: JA_SJ, SP: JA_SP },
};

export function migrateLegacyLiveMood(mood: string): LiveMood | null {
  if (LIVE_MOODS.includes(mood as LiveMood)) {
    return mood as LiveMood;
  }
  return LEGACY_LIVE_MOOD_MAP[mood] ?? null;
}

export interface LiveMoodReactionContext {
  userName: string;
  characterName: string;
}

export function getLiveMoodReaction(
  mood: LiveMood,
  language: string,
  temperament: TemperamentGroup,
  context: LiveMoodReactionContext,
): string {
  const lang: Language =
    language === "EN" || language === "JA" ? language : "KO";
  const template =
    RESPONSES[lang][temperament][mood] ?? RESPONSES.KO.NF[mood];

  return applySpeechTemplate(template, {
    userName: context.userName,
    characterName: context.characterName,
    language: lang,
  });
}
