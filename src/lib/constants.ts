import type { Mood } from "@/types";

export const STORAGE_KEY = "moon-buddy-data";
export const DEFAULT_CYCLE_LENGTH = 28;
export const DEFAULT_PERIOD_LENGTH = 5;
export const MIN_CYCLE_LENGTH = 21;
export const MAX_CYCLE_LENGTH = 40;
export const MIN_PERIOD_LENGTH = 2;
export const MAX_PERIOD_LENGTH = 10;
export const EXP_PER_LEVEL = 100;

export { MOOD_EXP } from "@/lib/rewards";

export const MOOD_OPTIONS: { value: Mood; label: string; emoji: string }[] = [
  { value: "great", label: "최고", emoji: "😄" },
  { value: "good", label: "좋음", emoji: "🙂" },
  { value: "okay", label: "보통", emoji: "😐" },
  { value: "low", label: "저조", emoji: "😔" },
  { value: "bad", label: "힘듦", emoji: "😢" },
];

export const PHASE_LABELS = {
  menstrual: "생리기",
  follicular: "여포기",
  ovulation: "배란기",
  luteal: "황체기",
} as const;
