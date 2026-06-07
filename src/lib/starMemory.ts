import { createNewCompanion } from "@/lib/companionLifecycle";
import { getDominantEmotion } from "@/lib/moodScale";
import type {
  CompanionState,
  EmotionScale,
  MoodStatistics,
  StarMemory,
  StarType,
} from "@/types/companion";
import type { Language } from "@/types/moonBuddy";

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
  Record<StarType, string>
> = {
  KO: {
    golden: "이번 달은 따뜻하고 밝은 기분이 가득했어요.",
    emerald: "이번 달은 부드럽고 편안한 날들이 많았어요.",
    silver_moon: "이번 달은 잔잔하고 고요한 시간이 이어졌어요.",
    deep_blue: "이번 달은 힘든 순간도 함께 견뎌냈어요.",
    aurora: "이번 달은 오르락내리락했지만 모두 소중한 여정이었어요.",
  },
  EN: {
    golden: "This month felt warm and bright.",
    emerald: "This month was filled with gentle, good days.",
    silver_moon: "This month flowed with calm and quiet moments.",
    deep_blue: "This month held difficult moments we endured together.",
    aurora: "This month was a vivid, mixed emotional journey.",
  },
  JA: {
    golden: "今月は温かく明るい気持ちがたくさんありました。",
    emerald: "今月は穏やかで心地よい日が多くありました。",
    silver_moon: "今月は静かで落ち着いた時間が続きました。",
    deep_blue: "今月は大変な瞬間も一緒に乗り越えました。",
    aurora: "今月は色々な感情が交わる、かけがえのない旅でした。",
  },
};

export function generateCycleSummary(
  starType: StarType,
  language: Language,
): string {
  return SUMMARY_TEMPLATES[language][starType];
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
): StarMemory {
  const starType = calculateStarType(companion.moodStatistics);
  const dominantEmotion = getDominantEmotion(companion.moodStatistics);

  return {
    id: createStarMemoryId(),
    birthDate: companion.birthDate,
    ascensionDate,
    dominantEmotion,
    starType,
    cycleSummary: generateCycleSummary(starType, language),
    companionName,
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
): AscensionResult {
  const star = createStarMemory(
    companion,
    companionName,
    ascensionDate,
    language,
  );
  const newCompanion = createNewCompanion(ascensionDate, cycleId);
  return { star, newCompanion };
}
