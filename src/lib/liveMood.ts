import type { Language, LiveMood } from "@/types";

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

const MOOD_RESPONSES: Record<Language, Record<LiveMood, string>> = {
  KO: {
    calm: "주인님 마음 날씨가 맑아서 다행이에요. 이 잔잔한 행복이 오래 머물게 옆에 있을게요. 🌿",
    motivated:
      "와아! 우리 주인님 오늘 에너지 최고! 멋진 모습도 좋지만 중간에 꼭 쉬어가기예요! 🔥",
    drained:
      "아이고, 배터리가 다 닳았구나... 😢 얼른 누우세요. 오늘 루틴은 안 해도 괜찮아요.",
    foggy:
      "머릿속이 안개처럼 답답하죠? 아무 생각 하지 말고 제 말랑한 볼 보면서 멍하니 쉬어요. 🌀",
    irritable:
      "주인님이 화난 건 다 이유가 있어요! 세상이 잘못했네! 😤 저한테 다 풀어요. 저 안 아파요!",
    bittersweet:
      "괜히 눈물 나고 센치해지는 건 주인님 탓이 아니에요. 호르몬 요정이 장난치는 중! 💧",
    craving:
      "지금 당장 초콜릿 수혈 개시! 🍫 오늘만큼은 몸이 원하는 대로 맛있게 먹고 행복해져요!",
    heavy:
      "마음이 무너지는 날이군요... 😭 아무 말 안 해도 되니 제 품에 푹 안겨요. 제일 사랑해요.",
  },
  EN: {
    calm: "Your heart weather is so clear—I am relieved. I will stay right here so this gentle happiness lasts. 🌿",
    motivated:
      "Wow! Our dear one is full of energy today! Looking amazing is great, but please rest in between! 🔥",
    drained:
      "Oh no, your battery is all used up... 😢 Lie down quickly. Skipping today's routine is totally okay.",
    foggy:
      "Your head feels foggy and stuffy, right? Do not think—just stare at my squishy cheeks and zone out. 🌀",
    irritable:
      "You have every reason to be upset! The world is wrong! 😤 Vent it all on me. I will not get hurt!",
    bittersweet:
      "Random tears and sentimentality are not your fault. The hormone fairy is playing tricks! 💧",
    craving:
      "Chocolate transfusion starts NOW! 🍫 Just for today, eat what your body wants and be happy!",
    heavy:
      "Your heart is crumbling today... 😭 You do not have to say a word—snuggle deep in my arms. I love you most.",
  },
  JA: {
    calm: "ご主人様の心のお天気が晴れてよかった。この穏やかな幸せが長く続くよう、そばにいるね。🌿",
    motivated:
      "わぁ！ご主人様今日エネルギー最高！素敵な姿もいいけど、途中でちゃんと休んでね！🔥",
    drained:
      "あら、バッテリーが切れちゃった... 😢 早く横になって。今日のルーティンはしなくていいよ。",
    foggy:
      "頭の中が霧みたいにモヤモヤするよね？何も考えずに、私のぷにぷにほっぺ見てぼーっとして。🌀",
    irritable:
      "ご主人様が怒るのには全部理由がある！世界が悪い！😤 私に全部吐き出して。私は痛くないよ！",
    bittersweet:
      "なんだか涙出てセンチになるのはご主人様のせいじゃない。ホルモン妖精がいたずら中！💧",
    craving:
      "今すぐチョコ補給開始！🍫 今日だけは体が欲しがるものを美味しく食べて幸せになって！",
    heavy:
      "心が崩れちゃう日だね... 😭 何も言わなくていいから、私の腕の中にぎゅっと。だいすき。",
  },
};

export function migrateLegacyLiveMood(mood: string): LiveMood | null {
  if (LIVE_MOODS.includes(mood as LiveMood)) {
    return mood as LiveMood;
  }
  return LEGACY_LIVE_MOOD_MAP[mood] ?? null;
}

export function getLiveMoodReaction(mood: LiveMood, language: string): string {
  const lang: Language =
    language === "EN" || language === "JA" ? language : "KO";
  return MOOD_RESPONSES[lang][mood];
}
