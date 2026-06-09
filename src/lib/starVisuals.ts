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

/** Night-sky archive card styling by dominant emotion */
export const DOMINANT_EMOTION_GLOW: Record<
  EmotionScale,
  { gradient: string; shadow: string; core: string; ring: string }
> = {
  great: {
    gradient: "from-amber-300/40 via-yellow-200/20 to-transparent",
    shadow: "shadow-[0_0_24px_rgba(251,191,36,0.55)]",
    core: "#fbbf24",
    ring: "ring-amber-300/50",
  },
  good: {
    gradient: "from-emerald-300/35 via-green-200/15 to-transparent",
    shadow: "shadow-[0_0_20px_rgba(134,239,172,0.45)]",
    core: "#86efac",
    ring: "ring-emerald-300/40",
  },
  okay: {
    gradient: "from-sky-300/35 via-blue-200/15 to-transparent",
    shadow: "shadow-[0_0_20px_rgba(147,197,253,0.5)]",
    core: "#93c5fd",
    ring: "ring-sky-300/45",
  },
  low: {
    gradient: "from-violet-300/35 via-purple-200/15 to-transparent",
    shadow: "shadow-[0_0_18px_rgba(196,181,253,0.45)]",
    core: "#c4b5fd",
    ring: "ring-violet-300/40",
  },
  bad: {
    gradient: "from-indigo-400/35 via-blue-900/20 to-transparent",
    shadow: "shadow-[0_0_22px_rgba(129,140,248,0.5)]",
    core: "#818cf8",
    ring: "ring-indigo-300/45",
  },
};

export function formatMonthYear(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString(locale, { year: "numeric", month: "long" });
}
