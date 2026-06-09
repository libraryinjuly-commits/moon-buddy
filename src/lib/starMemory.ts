import { createNewCompanion } from "@/lib/companionLifecycle";
import { getCompanionSpecies } from "@/lib/companionSpecies";
import { getDominantEmotion } from "@/lib/moodScale";
import type {
  CompanionState,
  EmotionScale,
  MoodStatistics,
  StarMemory,
  StarType,
} from "@/types/companion";
import type { Language, TemperamentGroup } from "@/types";

const MIXED_THRESHOLD = 40;
const SECOND_PLACE_THRESHOLD = 22;

export function calculateStarType(stats: MoodStatistics): StarType {
  const total = Object.values(stats).reduce((sum, n) => sum + n, 0);
  if (total === 0) return "aurora";

  const sorted = (Object.entries(stats) as [EmotionScale, number][])
    .map(([key, count]) => ({ key, percent: (count / total) * 100 }))
    .sort((a, b) => b.percent - a.percent);

  const top = sorted[0];
  const second = sorted[1];

  const isMixed =
    top.percent < MIXED_THRESHOLD ||
    (second && second.percent >= SECOND_PLACE_THRESHOLD);

  if (isMixed) return "aurora";

  switch (top.key) {
    case "great":
      return "golden";
    case "good":
      return "emerald";
    case "okay":
      return "silver_moon";
    case "low":
    case "bad":
      return "deep_blue";
    default:
      return "aurora";
  }
}

const SUMMARY_TEMPLATES: Record<
  Language,
  Record<TemperamentGroup, Record<StarType, string>>
> = {
  KO: {
    NF: {
      golden: "달토끼와 함께한 이번 달은 따뜻하고 밝은 마음이 가득했어요.",
      emerald: "달토끼와 함께한 이번 달은 부드럽고 편안한 날들이 이어졌어요.",
      silver_moon: "달토끼와 함께한 이번 달은 잔잔하고 고요한 시간이 많았어요.",
      deep_blue: "달토끼가 힘든 날에도 곁에서 조용히 안아 준 한 달이었어요.",
      aurora: "달토끼와 함께 오르락내리락했지만, 모든 날이 소중한 여정이었어요.",
    },
    NT: {
      golden: "별여우와 함께 정리해 본 이번 달, 마음이 꽤 맑고 밝았어요.",
      emerald: "별여우와 함께한 이번 달은 차분하고 안정적인 흐름이었어요.",
      silver_moon: "별여우와 함께한 이번 달은 고요하게 관찰하며 지낸 시간이 많았어요.",
      deep_blue: "별여우가 힘든 날의 신호를 함께 읽어 준 한 달이었어요.",
      aurora: "별여우와 함께 다양한 감정의 패턴을 살펴본 한 달이었어요.",
    },
    SJ: {
      golden: "구름곰이 곁을 지켜 준 이번 달, 따뜻하고 든든한 날이 많았어요.",
      emerald: "구름곰과 함께 꾸준히 쌓아 온 이번 달은 편안한 날들이 이어졌어요.",
      silver_moon: "구름곰과 함께한 이번 달은 잔잔한 루틴 속에서 지켜진 시간이었어요.",
      deep_blue: "구름곰이 힘든 날에도 흔들리지 않고 곁에 있어 준 한 달이었어요.",
      aurora: "구름곰과 함께 여러 감정을 차곡차곡 기록해 낸 한 달이었어요.",
    },
    SP: {
      golden: "꿈다람쥐와 함께 탐험한 이번 달, 반짝이는 기분이 많았어요.",
      emerald: "꿈다람쥐와 함께한 이번 달은 가볍고 즐거운 날들이 이어졌어요.",
      silver_moon: "꿈다람쥐와 함께한 이번 달은 잔잔히 쉬어 가며 보낸 시간이 많았어요.",
      deep_blue: "꿈다람쥐가 힘든 날에도 놓지 않고 곁에 있어 준 한 달이었어요.",
      aurora: "꿈다람쥐와 함께 오늘의 감정을 오가며 지낸, 알록달록한 한 달이었어요.",
    },
  },
  EN: {
    NF: {
      golden: "With Moon Rabbit, this month felt warm and bright.",
      emerald: "With Moon Rabbit, this month flowed with gentle, good days.",
      silver_moon: "With Moon Rabbit, this month held calm and quiet moments.",
      deep_blue: "Moon Rabbit stayed close through the harder days this month.",
      aurora: "With Moon Rabbit, this month was a tender, mixed journey.",
    },
    NT: {
      golden: "With Star Fox, this month felt clear and bright.",
      emerald: "With Star Fox, this month stayed steady and composed.",
      silver_moon: "With Star Fox, this month was quietly observed and understood.",
      deep_blue: "Star Fox helped read the signals on the difficult days this month.",
      aurora: "With Star Fox, this month mapped many shifting emotional patterns.",
    },
    SJ: {
      golden: "With Cloud Bear, this month felt warm and reassuring.",
      emerald: "With Cloud Bear, this month built gentle, steady comfort.",
      silver_moon: "With Cloud Bear, this month was guarded in calm routines.",
      deep_blue: "Cloud Bear stood firm beside you through the heavy days this month.",
      aurora: "With Cloud Bear, this month was patiently recorded day by day.",
    },
    SP: {
      golden: "With Dream Squirrel, this month sparkled with bright moods.",
      emerald: "With Dream Squirrel, this month bounced through light, good days.",
      silver_moon: "With Dream Squirrel, this month slowed into quiet rests.",
      deep_blue: "Dream Squirrel never let go on the tougher days this month.",
      aurora: "With Dream Squirrel, this month was a playful, colorful adventure.",
    },
  },
  JA: {
    NF: {
      golden: "月うさぎと過ごした今月は、あたたかく明るい気持ちがたくさんありました。",
      emerald: "月うさぎと過ごした今月は、やさしく心地よい日が続きました。",
      silver_moon: "月うさぎと過ごした今月は、静かで穏やかな時間が多くありました。",
      deep_blue: "月うさぎがつらい日にもそばで抱きしめてくれた一ヶ月でした。",
      aurora: "月うさぎと一緒に、色々な感情を旅した大切な一ヶ月でした。",
    },
    NT: {
      golden: "星きつねと過ごした今月は、すっきり明るい気持ちが多くありました。",
      emerald: "星きつねと過ごした今月は、落ち着いた安定した流れでした。",
      silver_moon: "星きつねと過ごした今月は、静かに観察しながら過ごす時間が多くありました。",
      deep_blue: "星きつねがつらい日のサインを一緒に読んでくれた一ヶ月でした。",
      aurora: "星きつねと一緒に、さまざまな感情のパターンを見つめた一ヶ月でした。",
    },
    SJ: {
      golden: "雲くまと過ごした今月は、あたたかく心強い日が多くありました。",
      emerald: "雲くまと過ごした今月は、穏やかで安心できる日が続きました。",
      silver_moon: "雲くまと過ごした今月は、静かなルーティンの中で守られた時間でした。",
      deep_blue: "雲くまがつらい日にも揺るがずそばにいてくれた一ヶ月でした。",
      aurora: "雲くまと一緒に、いろいろな感情を丁寧に記録した一ヶ月でした。",
    },
    SP: {
      golden: "ゆめりすと過ごした今月は、きらきらした気分がたくさんありました。",
      emerald: "ゆめりすと過ごした今月は、軽やかで楽しい日が続きました。",
      silver_moon: "ゆめりすと過ごした今月は、静かに休みながら過ごす時間が多くありました。",
      deep_blue: "ゆめりすがつらい日にも手を離さずそばにいてくれた一ヶ月でした。",
      aurora: "ゆめりすと一緒に、今日の気持ちを探検した色とりどりの一ヶ月でした。",
    },
  },
};

export function generateCycleSummary(
  starType: StarType,
  language: Language,
  temperament: TemperamentGroup,
): string {
  return SUMMARY_TEMPLATES[language][temperament][starType];
}

export function createStarMemoryId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `star-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createStarMemory(
  companion: CompanionState,
  companionName: string,
  ascensionDate: string,
  language: Language,
  temperament: TemperamentGroup,
): StarMemory {
  const starType = calculateStarType(companion.moodStatistics);
  const dominantEmotion = getDominantEmotion(companion.moodStatistics);
  const species = getCompanionSpecies(temperament);
  const resolvedName =
    companionName.trim() || species.defaultBuddyName[language];

  return {
    id: createStarMemoryId(),
    birthDate: companion.birthDate,
    ascensionDate,
    dominantEmotion,
    starType,
    cycleSummary: generateCycleSummary(starType, language, temperament),
    companionName: resolvedName,
    temperament,
    moodStatistics: { ...companion.moodStatistics },
  };
}

export interface AscensionResult {
  star: StarMemory;
  newCompanion: CompanionState;
}

export function completeAscension(
  companion: CompanionState,
  companionName: string,
  ascensionDate: string,
  language: Language,
  cycleId: string | null,
  temperament: TemperamentGroup,
  ascendedCompanionCount: number,
): AscensionResult {
  const star = createStarMemory(
    companion,
    companionName,
    ascensionDate,
    language,
    temperament,
  );
  const newCompanion = createNewCompanion(
    ascensionDate,
    cycleId,
    ascendedCompanionCount,
  );
  return { star, newCompanion };
}
