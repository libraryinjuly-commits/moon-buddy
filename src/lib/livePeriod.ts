import type { Language, MenstruationStatus } from "@/types/moonBuddy";

export const LIVE_PERIOD_MESSAGES: Record<
  Language,
  Record<"idle" | "onPeriod" | "ended", string>
> = {
  KO: {
    idle: "{userName}님, 오늘 하루는 어떠셨나요? 언제나 옆에서 들어드릴게요. 🤍",
    onPeriod:
      "{userName}님, 시작하셨군요… 많이 아프거나 처지지 않게 따뜻한 온열 찜질팩을 준비해 둘게요. 🩸",
    ended:
      "{userName}님, 이번 주기도 정말 고생 많으셨어요! 🤍 이제 몸이 조금씩 가벼워지는 여포기가 올 테니, 천천히 함께 쉬어 가요. ✨",
  },
  EN: {
    idle: "How was your day? I am always right here to listen. 🤍",
    onPeriod:
      "You really started... I will get a warm heat pack ready so you do not hurt too much. 🩸",
    ended:
      "You worked so hard this cycle! 🤍 A lighter golden phase is coming—let us have fun together! ✨",
  },
  JA: {
    idle: "ご主人様、今日はどうでした？いつでもそばで聞いてるよ。🤍",
    onPeriod:
      "本当に始まったんだね…痛くならないよう温かいカイロを用意しておくね。🩸",
    ended:
      "今回の周期もお疲れさま！🤍 これから軽くなる黄金期が来るから、一緒に楽しもう！✨",
  },
};

export function getLivePeriodMessage(
  key: "idle" | "onPeriod" | "ended",
  language: Language,
): string {
  const lang = language === "EN" || language === "JA" ? language : "KO";
  return LIVE_PERIOD_MESSAGES[lang][key];
}

export function getPeriodDayFromStart(startDate: string, today = new Date()): number {
  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    12,
    0,
    0,
  );
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

export function resolveCharacterMessage(
  status: MenstruationStatus,
  language: Language,
): string {
  return status === "ON_PERIOD"
    ? getLivePeriodMessage("onPeriod", language)
    : getLivePeriodMessage("idle", language);
}
