import type { EmotionScale, StarType } from "@/types/companion";

export const STAR_TYPE_EMOJI: Record<StarType, string> = {
  golden: "⭐",
  emerald: "💚",
  silver_moon: "🌙",
  deep_blue: "💙",
  aurora: "🌌",
};

export const STAR_TYPE_GRADIENT: Record<StarType, string> = {
  golden: "from-amber-200 via-yellow-100 to-amber-300",
  emerald: "from-emerald-200 via-green-100 to-teal-200",
  silver_moon: "from-slate-200 via-blue-50 to-indigo-100",
  deep_blue: "from-indigo-300 via-blue-200 to-slate-300",
  aurora: "from-violet-300 via-fuchsia-200 to-cyan-200",
};

export const EMOTION_SCALE_COLOR: Record<EmotionScale, string> = {
  great: "text-amber-600",
  good: "text-emerald-600",
  okay: "text-sky-600",
  low: "text-violet-600",
  bad: "text-rose-600",
};

export function formatMonthYear(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString(locale, { year: "numeric", month: "long" });
}
