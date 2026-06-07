import type { Language, TemperamentGroup } from "@/types";

const KO: Record<TemperamentGroup, string[]> = {
  NF: [
    "오늘의 행운은 '포근함'이야. {characterName}가 주인님 옆에 꼭 붙어 있을게 🤍",
    "별이 속삭였어—오늘은 작은 칭찬 한 마디가 큰 힘이 될 거래 ✨",
    "몸이 무거워도 마음만은 가벼워질 수 있어. 오늘은 나에게 기대도 괜찮아.",
    "따뜻한 차 한 잔, 창밖 하늘 한 번—그게 오늘의 행운 레시피야.",
    "주인님 웃는 날, {characterName}도 하늘을 두 배로 예쁘게 느껴.",
    "오늘의 행운: '쉬어도 괜찮다'는 말을 믿는 용기 💜",
    "세상이 조금 느려도 괜찮아. 주인님 속도가 제일 맞는 속도야.",
    "포근한 이불처럼, 오늘 하루도 주인님을 감싸줄게.",
  ],
  NT: [
    "오늘의 행운 지표: '회복 우선' 모드. {characterName}가 일정을 가볍게 조정해 뒀어.",
    "데이터상 오늘의 강점은 '작은 성취 하나'. 완벽보다 완료가 효율적이야.",
    "변수는 많지만, 컨디션을 기록하는 것만으로도 통제감이 회복돼.",
    "오늘의 추천: 수면 + 수분 + 10분 산책. ROI가 가장 높은 조합이야.",
    "감정 기복은 노이즈일 수 있어. 신호와 노이즈를 분리하면 마음이 편해져.",
    "{characterName} 분석 결과, 오늘은 '자기에게 관대하기'가 최적 전략이야.",
    "실패한 날이 아니라 데이터 수집된 날. 그렇게 분류해 두자.",
    "오늘의 행운 키워드: 균형. 일도 쉼도 반반만 챙겨도 충분해.",
  ],
  SJ: [
    "오늘의 행운 미션: 물 한 잔, 심호흡 세 번. {characterName} 보안관이 확인했어.",
    "행동 지침—오늘은 '무리 금지, 휴식 허용'. 주인님 안전이 최우선이야.",
    "작은 루틴 하나만 지켜도 하루가 안정돼. {characterName}가 함께 순찰할게.",
    "오늘의 행운은 든든한 한 끼야. 몸을 지키면 마음도 지켜져.",
    "힘든 날엔 할 일을 줄이는 게 정답. {characterName}가 경계하고 있어.",
    "주인님은 충분히 잘하고 있어. 오늘도 그 사실을 기록해 둘게.",
    "오늘의 보호 수칙: 일찍 쉬기, 따뜻하게 입기, 스스로에게 친절하기.",
    "불안해도 괜찮아. {characterName} 보안관이 오늘 밤까지 지켜볼게.",
  ],
  SP: [
    "오늘의 행운은 깜짝 간식! {characterName}랑 맛있는 거 하나 먹자 🎉",
    "기분 전환 타임! 좋아하는 노래 틀고 3분만 춤춰봐—행운 업!",
    "오늘은 '재미있는 것 하나'가 행운의 열쇠야. 뭐든 가볍게 시작해 볼까?",
    "하늘 보기, 바람 맞기, 멍때리기—오늘은 이게 최고의 루틴이야 ✨",
    "우울해도 괜찮아! {characterName}가 옆에서 텐션 끌어올릴게!",
    "오늘의 행운 메시지: 웃을 일이 분명 있어. 조금만 기다려봐!",
    "작은 모험 하나—새로운 길로 산책하기. 오늘의 행운이 거기 있을지도?",
    "몸이 무거워도 마음은 가볍게! 오늘은 주인님이 주인공이야 🌟",
  ],
};

const EN: Record<TemperamentGroup, string[]> = {
  NF: [
    "Today's luck is coziness. {characterName} will stay right beside you 🤍",
    "The stars whisper—one small compliment will carry you far today ✨",
    "Even if your body feels heavy, your heart can feel light. Lean on me today.",
    "Warm tea and one glance at the sky—that's today's luck recipe.",
    "When you smile, {characterName} sees the sky twice as beautiful.",
    "Today's fortune: the courage to believe 'rest is allowed' 💜",
    "If the world feels slow, that's okay. Your pace is the right pace.",
    "Like a soft blanket, let today wrap around you gently.",
  ],
  NT: [
    "Today's luck metric: recovery-first mode. {characterName} lightened your schedule.",
    "Data says today's win is one small accomplishment. Done beats perfect.",
    "Many variables—but logging how you feel restores a sense of control.",
    "Recommended stack: sleep + hydration + 10-minute walk. Highest ROI today.",
    "Mood swings may be noise. Separating signal from noise eases the mind.",
    "{characterName} analysis: 'self-kindness' is today's optimal strategy.",
    "Not a failed day—a data collection day. Let's file it that way.",
    "Today's luck keyword: balance. Half work, half rest is enough.",
  ],
  SJ: [
    "Today's luck mission: one glass of water, three deep breaths. {characterName} Guard confirms.",
    "Protocol for today: no overwork, rest permitted. Your safety comes first.",
    "One small routine can steady the whole day. {characterName} patrols with you.",
    "Today's fortune is a solid meal. Protect the body, protect the heart.",
    "On hard days, doing less is correct. {characterName} is on watch.",
    "You're doing enough. I'll log that fact again today.",
    "Today's protection rules: rest early, dress warm, speak kindly to yourself.",
    "Anxiety is allowed. {characterName} Guard stays on duty until tonight.",
  ],
  SP: [
    "Today's luck is a surprise snack! Let's eat something yummy with {characterName} 🎉",
    "Mood flip time! Play your favorite song and dance 3 minutes—luck up!",
    "Today, one fun thing is the lucky key. Start something light?",
    "Sky-gazing, breeze-catching, zoning out—best routine today ✨",
    "Feeling down is okay! {characterName} will hype you back up!",
    "Today's fortune: something to smile about is coming. Hang in there!",
    "Tiny adventure—walk a new path. Your luck might be right there?",
    "Heavy body, light heart! You're the star today 🌟",
  ],
};

const JA: Record<TemperamentGroup, string[]> = {
  NF: [
    "今日の幸運は「ふわふわ」。{characterName}がずっとそばにいるね 🤍",
    "星がささやいた—今日は小さな褒め言葉が大きな力になるよ ✨",
    "体が重くても心は軽くなれる。今日は私に頼ってもいいよ。",
    "温かいお茶と空を見上げること—それが今日の幸運レシピ。",
    "ご主人様が笑う日、{characterName}も空を二倍きれいに感じる。",
    "今日の幸運：「休んでいい」を信じる勇気 💜",
    "世界がゆっくりでも大丈夫。ご主人様のペースが正解。",
    "ふかふかの布団みたいに、今日一日を包んであげる。",
  ],
  NT: [
    "今日の幸運指標：回復優先モード。{characterName}が予定を軽くしたよ。",
    "データ上、今日の勝ちは小さな達成一つ。完璧より完了が効率的。",
    "変数は多いけど、気分を記録するだけでコントロール感が戻る。",
    "今日の推奨：睡眠＋水分＋10分散歩。ROI最高の組み合わせ。",
    "感情の揺れはノイズかも。信号とノイズを分けると楽になる。",
    "{characterName}の分析：今日は「自分に優しく」が最適戦略。",
    "失敗した日じゃなくデータ収集した日。そう分類しよう。",
    "今日の幸運キーワード：バランス。仕事も休息も半分ずつで十分。",
  ],
  SJ: [
    "今日の幸運ミッション：水一杯、深呼吸三回。{characterName}保安官確認済み。",
    "本日の行動指針：無理禁止、休息許可。ご主人様の安全が最優先。",
    "小さなルーティン一つで一日が安定する。{characterName}が一緒に巡回するね。",
    "今日の幸運はしっかりした一食。体を守れば心も守れる。",
    "つらい日はやることを減らすのが正解。{characterName}が警戒中。",
    "ご主人様は十分やってる。今日もその事実を記録するね。",
    "今日の保護ルール：早く休む、暖かく着る、自分に優しく話す。",
    "不安でも大丈夫。{characterName}保安官が今夜まで見守るよ。",
  ],
  SP: [
    "今日の幸運はサプライズおやつ！{characterName}と美味しいもの食べよう 🎉",
    "気分チェンジ！好きな曲をかけて3分ダンス—幸運アップ！",
    "今日は「楽しいこと一つ」が幸運の鍵。軽く始めてみない？",
    "空を見る、風を浴びる、ぼーっとする—今日はこれが最高ルーティン ✨",
    "落ち込んでも大丈夫！{characterName}がテンション上げるよ！",
    "今日の幸運：笑えることが必ずある。もう少し待ってみて！",
    "小さな冒険—新しい道を散歩。幸運はそこにあるかも？",
    "体は重くても心は軽く！今日の主役はご主人様 🌟",
  ],
};

const MESSAGES: Record<Language, Record<TemperamentGroup, string[]>> = {
  KO,
  EN,
  JA,
};

export function getFortuneMessages(
  language: Language,
  temperament: TemperamentGroup,
): string[] {
  return MESSAGES[language]?.[temperament] ?? MESSAGES.KO[temperament];
}

export function pickFortuneMessageIndex(poolSize: number): number {
  return Math.floor(Math.random() * poolSize);
}
