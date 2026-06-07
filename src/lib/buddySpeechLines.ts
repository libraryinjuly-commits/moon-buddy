import type { CyclePhase, Language } from "@/types";

export type BuddySpeechPhase = CyclePhase | "default" | "comfort" | "onPeriod";

export type BuddySpeechLines = Record<BuddySpeechPhase, string[]>;

export const BUDDY_SPEECH_LINES_KO: BuddySpeechLines = {
  menstrual: [
    "주인님, 지금은 호르몬이 변하는 시기라 몸이 붓고 무거울 수 있어요. 제가 따뜻한 찜질팩 챙겨드릴 테니 무리하지 말고 쉬어요 🤍",
    "오늘은 몸이 주인공이에요. 아무것도 안 해도 괜찮은 날이니까, 이불 속에서 천천히 숨만 쉬어도 돼요.",
    "따뜻한 국물 한 모금, 생강차 한 잔만 같이 해볼까? 몸이 조금이라도 풀리면 내가 옆에 있을게.",
    "무거운 운동은 잠깐 쉬어가도 괜찮아요. 가벼운 스트레칭 10분만 같이 해볼까?",
    "평소보다 일찍 눕는 것도 좋은 날이에요. 따뜻한 샤워 후 푹 쉬면 내일이 조금 가벼워질 거예요.",
  ],
  follicular: [
    "에너지가 살짝살짝 돌아오는 시기예요! 오늘은 마음도 몸도 가볍게 움직이기 좋은 날이에요 ✨",
    "신선한 채소랑 베리류 한 접시, 같이 챙겨볼까? 몸이 조금 더 상쾌해질 거예요.",
    "가벼운 조깅이나 산책, 딱 좋은 타이밍이에요. 무리하지 않는 선에서 천천히 가요.",
    "아침 햇빛 10분만 쬐면 리듬이 잡혀요. 오늘은 새 출발 느낌으로 한 걸음만 내딛어봐요.",
    "집중이 잘 되는 날이 될 수도 있어요. 해보고 싶었던 작은 일 하나만 골라봐도 좋아요.",
  ],
  ovulation: [
    "오늘은 에너지가 제일 솟아오르는 날일 수 있어요! 몸이 좋다고 느껴지면 그건 자연스러운 변화예요.",
    "단백질이랑 좋은 지방으로 오늘 활력을 채워볼까? 달걀, 생선, 아보카도 같은 것들이 딱이에요.",
    "체력 쓰는 운동이 잘 맞는 날이에요. 다만 몸이 보내는 신호는 언제나 제일 먼저 들어줘요.",
    "기분이 좋고 말이 많아지는 날일 수도 있어요. 그 마음, 그대로 받아들여도 괜찮아요.",
    "밤에 잠이 줄어들 수 있는 시기예요. 오늘은 스크린 타임만 조금 줄여볼까?",
  ],
  luteal: [
    "몸과 마음이 예민해질 수 있는 시기예요. 감정이 올라와도 나를 탓하지 않아도 괜찮아요, 주인님.",
    "부종이나 무거움이 느껴지면 그건 호르몼이 바뀌는 자연스러운 반응이에요. 오늘은 나에게 조금 더 다정해도 돼요.",
    "고구마나 현미처럼 든든한 음식, 그리고 바나나 한 개만 챙겨도 기분이 조금 안정될 수 있어요.",
    "15분 산책이나 부드러운 스트레칭만으로도 충분해요. 몸이 무겁다면 움직임을 줄여도 괜찮아요.",
    "수면을 넉넉히 챙기는 날이에요. 카페인만 조금 줄이고, 조용한 음악과 함께 쉬어봐요.",
  ],
  onPeriod: [
    "지금은 휴식 단계니까, 오늘은 속도를 확 줄여도 괜찮아요. 내가 옆에서 계속 지켜볼게요.",
    "따뜻한 찜질팩이나 포근한 이불, 뭐든 좋아요. 지금 필요한 건 '쉼'이에요 🤍",
    "통증이 있어도 괜찮아요. 몸이 보내는 신호니까, 오늘은 무조건 편한 쪽으로만 가요.",
  ],
  default: [
    "리듬 기록을 시작하면, 주인님 흐름에 맞는 이야기를 더 많이 해줄 수 있어요. 천천히 같이 시작해봐요!",
    "오늘 하루도 수고했어요. 기분 버튼을 눌러서 지금 마음을 나에게 살짝 보여줄래?",
    "완벽하지 않아도 괜찮아요. 기록은 나를 이해하는 작은 발걸음일 뿐이에요.",
  ],
  comfort: [
    "오늘 힘들었으면, 그건 충분히 힘든 날이었던 거예요. 내가 옆에서 계속 응원할게요.",
    "잘하고 있어요, 정말로. 몸이 보내는 신호를 들어주는 것만으로도 대단한 일이에요.",
    "비교하지 않아도 돼요. 주인님의 오늘은 주인님만의 속도로 가면 돼요.",
    "물 한 잔 마시고 어깨 힘만 빼봐요. 그것만으로도 오늘은 충분해요.",
    "내일이 걱정되면, 오늘은 내일 걱정을 잠깐 내려놓아도 괜찮아요. 내가 같이 있을게.",
  ],
};

export const BUDDY_SPEECH_LINES_EN: BuddySpeechLines = {
  menstrual: [
    "Your hormones are shifting, so bloating and heaviness are totally natural. Let me warm up a heat pack for you—rest as much as you need 🤍",
    "Today, your body leads. It's okay to do nothing—just breathing under a blanket counts.",
    "How about a warm soup or ginger tea? I'll stay right here while your body unwinds.",
    "Skip heavy workouts today. Even 10 minutes of gentle stretching together is enough.",
    "An early night sounds perfect. A warm shower and deep rest can make tomorrow lighter.",
  ],
  follicular: [
    "Energy is quietly coming back! Today is a lovely day to move lightly, body and heart ✨",
    "Fresh veggies and berries—shall we plate some together? Your body might feel a bit brighter.",
    "A light jog or walk fits today perfectly. Let's go slowly, without pushing.",
    "Ten minutes of morning sun can reset your rhythm. One small step forward is plenty.",
    "Focus might come easier today. Pick one tiny thing you've been wanting to try.",
  ],
  ovulation: [
    "Today your energy might peak—that's a natural shift. If you feel good, trust it.",
    "Let's fuel up with protein and healthy fats—eggs, fish, avocado sound perfect.",
    "Harder workouts can feel great today. Still, your body's signals come first, always.",
    "You might feel chatty or upbeat—that's okay. Let the feeling be what it is.",
    "Sleep might shorten a bit now. Maybe trim screen time a little tonight?",
  ],
  luteal: [
    "Mood swings or sensitivity can show up now—that's hormonal, not your fault, dear.",
    "Bloating or heaviness? That's a natural response. Be extra kind to yourself today.",
    "Sweet potato, brown rice, or a banana might steady your mood just a little.",
    "A 15-minute walk or soft stretch is enough. If you're heavy, moving less is fine too.",
    "Prioritize sleep tonight. Less caffeine, quiet music, and rest can help a lot.",
  ],
  onPeriod: [
    "You're on your period—slow way down today. I'll keep watch right beside you.",
    "Heat pack, cozy blanket—whatever helps. What you need now is rest 🤍",
    "Pain is a signal, not a failure. Today we choose comfort, no questions asked.",
  ],
  default: [
    "Once you log your cycle, I can share more stories tailored to you. Let's start gently!",
    "You did well today. Tap a mood button and show me how your heart feels?",
    "You don't have to be perfect. Logging is just a small step toward understanding you.",
  ],
  comfort: [
    "If today was hard, it was hard enough. I'm cheering for you, no conditions.",
    "You're doing enough—really. Listening to your body is already something big.",
    "No comparing needed. Your today can move at your pace only.",
    "Sip some water and drop your shoulders. That's enough for today.",
    "If tomorrow worries you, it's okay to set that down tonight. I'm here.",
  ],
};

export const BUDDY_SPEECH_LINES_JA: BuddySpeechLines = {
  menstrual: [
    "今はホルモンが変わる時期だから、体がむくんで重く感じるかも。温かい温熱パックを用意するね。無理せず休んでね 🤍",
    "今日は体が主役の日。何もしなくて大丈夫。布団の中でゆっくり呼吸するだけでいいよ。",
    "温かいスープや生姜茶、一緒にいかが？体がほぐれたら、ずっとそばにいるから。",
    "激しい運動はお休みでも大丈夫。10分の軽いストレッチだけ一緒にしよう。",
    "いつもより早く寝るのもいい日。温かいシャワーのあと、ゆっくり休もう。",
  ],
  follicular: [
    "エネルギーが少しずつ戻ってくる時期だよ！今日は心も体も軽く動くのにぴったり ✨",
    "新鮮な野菜やベリー、一緒に食べてみない？体が少しすっきりするかも。",
    "軽いジョギングや散歩がちょうどいいよ。無理せずゆっくりね。",
    "朝の日光を10分浴びるとリズムが整うよ。小さな一歩だけ踏み出してみよう。",
    "集中しやすい日かも。やってみたかった小さなことを一つ選んでみて。",
  ],
  ovulation: [
    "今日はエネルギーがいちばん高まる日かも。体が軽く感じたら、それは自然な変化だよ。",
    "タンパク質と良い脂質で元気をチャージしよう。卵、魚、アボカドがぴったり。",
    "体力を使う運動が合う日。でも体のサインがいつも最優先だよ。",
    "気分が高くておしゃべりしたくなる日かも。そのまま受け入れていいよ。",
    "夜、眠りが浅くなる時期かも。今夜はスクリーンタイムを少し減らしてみよう。",
  ],
  luteal: [
    "心と体が敏感になりやすい時期だよ。感情が揺れても自分を責めなくていいよ。",
    "むくみや重さはホルモンの自然な反応。今日は自分にもっと優しくしてね。",
    "さつまいもや玄米、バナナが気分の安定に少し役立つかも。",
    "15分の散歩ややわらかいストレッチで十分。重いなら動かない日でも大丈夫。",
    "睡眠をたっぷりとる日。カフェインを控えて、静かな音楽と一緒に休もう。",
  ],
  onPeriod: [
    "生理中だから、今日はペースをぐっと落として大丈夫。ずっとそばにいるよ。",
    "温熱パックやふわふわの毛布、何でもいいよ。今必要なのは休息 🤍",
    "痛みがあるのも体のサイン。今日は楽な方だけを選ぼう。",
  ],
  default: [
    "生理記録を始めると、あなたの周期に合った話をもっとできるよ。ゆっくり一緒に始めよう。",
    "今日もお疲れさま。気分ボタンを押して、今の気持ちを見せてくれる？",
    "完璧じゃなくていい。記録は自分を知る小さな一歩だよ。",
  ],
  comfort: [
    "今日がつらかったなら、それだけつらい日だったんだよ。ずっと応援してる。",
    "十分やってるよ、本当に。体の声に耳を傾けるだけで立派だよ。",
    "比べなくていい。あなたの今日はあなたのペースでいい。",
    "水を一口飲んで、肩の力を抜いて。それだけで今日は十分。",
    "明日が心配なら、今夜は少し置いておいてもいい。そばにいるから。",
  ],
};

const LINES_BY_LANG: Record<Language, BuddySpeechLines> = {
  KO: BUDDY_SPEECH_LINES_KO,
  EN: BUDDY_SPEECH_LINES_EN,
  JA: BUDDY_SPEECH_LINES_JA,
};

export function getBuddySpeechLines(language: Language): BuddySpeechLines {
  return LINES_BY_LANG[language] ?? BUDDY_SPEECH_LINES_KO;
}
