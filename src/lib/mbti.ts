import type { CyclePhase, MascotPhase, TemperamentGroup, TemperamentTheme } from "@/types";

export const MBTI_TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export type MbtiType = (typeof MBTI_TYPES)[number];

const MBTI_TO_TEMPERAMENT: Record<MbtiType, TemperamentGroup> = {
  INTJ: "NT",
  INTP: "NT",
  ENTJ: "NT",
  ENTP: "NT",
  INFJ: "NF",
  INFP: "NF",
  ENFJ: "NF",
  ENFP: "NF",
  ISTJ: "SJ",
  ISFJ: "SJ",
  ESTJ: "SJ",
  ESFJ: "SJ",
  ISTP: "SP",
  ISFP: "SP",
  ESTP: "SP",
  ESFP: "SP",
};

export const TEMPERAMENT_GROUPS: TemperamentGroup[] = ["NT", "NF", "SJ", "SP"];

export const TEMPERAMENT_THEMES: Record<TemperamentGroup, TemperamentTheme> = {
  NT: {
    group: "NT",
    buddyName: "달달이",
    groupLabel: "따뜻한 맹목적 공감파",
    groupDescription: "무조건 옆에서 안아주는 달달이",
    badgeBg: "bg-slate-700",
    bubbleLabel: "text-slate-500",
    bubbleText: "text-slate-800",
    bubbleBg: "bg-slate-50",
    accentButton: "bg-slate-700 hover:bg-slate-800",
    accentBorder: "border-slate-200",
    accentText: "text-slate-800",
    accentMuted: "text-slate-600",
    accentSoft: "bg-slate-50",
    glowClass: "shadow-xl shadow-slate-200",
    thankEmoji: "✨",
  },
  NF: {
    group: "NF",
    buddyName: "달달이",
    groupLabel: "따뜻한 맹목적 공감파",
    groupDescription: "무조건 옆에서 안아주는 달달이",
    badgeBg: "bg-violet-600",
    bubbleLabel: "text-violet-500",
    bubbleText: "text-violet-900",
    bubbleBg: "bg-white",
    accentButton: "bg-violet-600 hover:bg-violet-700",
    accentBorder: "border-violet-100",
    accentText: "text-violet-900",
    accentMuted: "text-violet-600",
    accentSoft: "bg-violet-50",
    glowClass: "shadow-xl shadow-violet-200",
    thankEmoji: "💜",
  },
  SJ: {
    group: "SJ",
    buddyName: "달달이",
    groupLabel: "따뜻한 맹목적 공감파",
    groupDescription: "무조건 옆에서 안아주는 달달이",
    badgeBg: "bg-teal-700",
    bubbleLabel: "text-teal-600",
    bubbleText: "text-teal-900",
    bubbleBg: "bg-teal-50",
    accentButton: "bg-teal-700 hover:bg-teal-800",
    accentBorder: "border-teal-100",
    accentText: "text-teal-900",
    accentMuted: "text-teal-600",
    accentSoft: "bg-teal-50",
    glowClass: "shadow-xl shadow-teal-200",
    thankEmoji: "🌿",
  },
  SP: {
    group: "SP",
    buddyName: "달달이",
    groupLabel: "따뜻한 맹목적 공감파",
    groupDescription: "무조건 옆에서 안아주는 달달이",
    badgeBg: "bg-orange-500",
    bubbleLabel: "text-orange-500",
    bubbleText: "text-orange-900",
    bubbleBg: "bg-orange-50",
    accentButton: "bg-orange-500 hover:bg-orange-600",
    accentBorder: "border-orange-100",
    accentText: "text-orange-900",
    accentMuted: "text-orange-600",
    accentSoft: "bg-orange-50",
    glowClass: "shadow-xl shadow-orange-200",
    thankEmoji: "🎈",
  },
};

const PHASE_COLORS: Record<
  TemperamentGroup,
  Record<MascotPhase, { bgColor: string; ringColor: string }>
> = {
  NT: {
    default: { bgColor: "bg-slate-100", ringColor: "ring-slate-300" },
    menstrual: { bgColor: "bg-slate-200", ringColor: "ring-slate-400" },
    follicular: { bgColor: "bg-blue-100", ringColor: "ring-blue-300" },
    ovulation: { bgColor: "bg-indigo-100", ringColor: "ring-indigo-300" },
    luteal: { bgColor: "bg-zinc-200", ringColor: "ring-zinc-400" },
  },
  NF: {
    default: { bgColor: "bg-indigo-100", ringColor: "ring-indigo-300" },
    menstrual: { bgColor: "bg-rose-100", ringColor: "ring-rose-300" },
    follicular: { bgColor: "bg-sky-100", ringColor: "ring-sky-300" },
    ovulation: { bgColor: "bg-amber-100", ringColor: "ring-amber-300" },
    luteal: { bgColor: "bg-violet-100", ringColor: "ring-violet-300" },
  },
  SJ: {
    default: { bgColor: "bg-teal-50", ringColor: "ring-teal-200" },
    menstrual: { bgColor: "bg-emerald-100", ringColor: "ring-emerald-300" },
    follicular: { bgColor: "bg-teal-100", ringColor: "ring-teal-300" },
    ovulation: { bgColor: "bg-green-100", ringColor: "ring-green-300" },
    luteal: { bgColor: "bg-stone-200", ringColor: "ring-stone-300" },
  },
  SP: {
    default: { bgColor: "bg-orange-50", ringColor: "ring-orange-200" },
    menstrual: { bgColor: "bg-rose-50", ringColor: "ring-rose-200" },
    follicular: { bgColor: "bg-amber-50", ringColor: "ring-amber-200" },
    ovulation: { bgColor: "bg-yellow-100", ringColor: "ring-yellow-300" },
    luteal: { bgColor: "bg-orange-100", ringColor: "ring-orange-300" },
  },
};

export function getTemperamentFromMbti(mbti: string): TemperamentGroup {
  const upper = mbti.toUpperCase() as MbtiType;
  return MBTI_TO_TEMPERAMENT[upper] ?? "NF";
}

export function getTemperamentTheme(temperament: TemperamentGroup): TemperamentTheme {
  return TEMPERAMENT_THEMES[temperament];
}

export function getMascotColors(
  temperament: TemperamentGroup,
  phase: MascotPhase,
): { bgColor: string; ringColor: string } {
  return PHASE_COLORS[temperament][phase];
}

export function isValidMbti(value: string): value is MbtiType {
  return MBTI_TYPES.includes(value.toUpperCase() as MbtiType);
}

export const MBTI_BY_GROUP: Record<TemperamentGroup, MbtiType[]> = {
  NT: ["INTJ", "INTP", "ENTJ", "ENTP"],
  NF: ["INFJ", "INFP", "ENFJ", "ENFP"],
  SJ: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  SP: ["ISTP", "ISFP", "ESTP", "ESFP"],
};
