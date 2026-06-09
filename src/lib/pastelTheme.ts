import type { MascotPhase, TemperamentGroup, TemperamentTheme } from "@/types";

/** Global app palette — replaces legacy #005088 / #F3F0DF. */
export const APP_THEME = {
  main: "#709BBF",
  background: "#FDFCF5",
} as const;

/** Species pastel accents (Fox / Rabbit / Bear / Squirrel). */
export const SPECIES_PASTEL: Record<TemperamentGroup, string> = {
  NT: "#B2A4D4",
  NF: "#D7C4F2",
  SJ: "#A9DEF9",
  SP: "#F7C6D7",
};

export const PAGE_BG: Record<TemperamentGroup, string> = {
  NT: "from-[#FDFCF5] via-[#B2A4D4]/18 to-[#709BBF]/12",
  NF: "from-[#FDFCF5] via-[#D7C4F2]/22 to-[#D7C4F2]/8",
  SJ: "from-[#FDFCF5] via-[#A9DEF9]/22 to-[#A9DEF9]/8",
  SP: "from-[#FDFCF5] via-[#F7C6D7]/22 to-[#F7C6D7]/8",
};

export const TEMPERAMENT_THEMES: Record<TemperamentGroup, TemperamentTheme> = {
  NT: {
    group: "NT",
    groupLabel: "NT · 별여우",
    groupDescription: "차분한 관찰과 명확한 말로 마음을 정리해 주는 별여우",
    badgeBg: "bg-[#9A8EC4]",
    bubbleLabel: "text-[#7A758C]",
    bubbleText: "text-[#5C5470]",
    bubbleBg: "bg-[#FDFCF5]/95",
    accentButton: "bg-[#9A8EC4] hover:bg-[#8A7EB4]",
    accentBorder: "border-[#B2A4D4]/35",
    accentText: "text-[#5C5470]",
    accentMuted: "text-[#7A758C]",
    accentSoft: "bg-[#B2A4D4]/18",
    glowClass: "shadow-[0_8px_32px_-8px_rgba(178,164,212,0.45)]",
    thankEmoji: "✨",
  },
  NF: {
    group: "NF",
    groupLabel: "NF · 달토끼",
    groupDescription: "따뜻한 말과 부드러운 위로로 곁을 지키는 달토끼",
    badgeBg: "bg-[#BBA8DE]",
    bubbleLabel: "text-[#8A7A96]",
    bubbleText: "text-[#6B5A80]",
    bubbleBg: "bg-[#FDFCF5]/95",
    accentButton: "bg-[#BBA8DE] hover:bg-[#AB98CE]",
    accentBorder: "border-[#D7C4F2]/40",
    accentText: "text-[#6B5A80]",
    accentMuted: "text-[#8A7A96]",
    accentSoft: "bg-[#D7C4F2]/20",
    glowClass: "shadow-[0_8px_32px_-8px_rgba(215,196,242,0.5)]",
    thankEmoji: "💜",
  },
  SJ: {
    group: "SJ",
    groupLabel: "SJ · 구름곰",
    groupDescription: "꾸준한 루틴과 든든한 말로 안정감을 지켜 주는 구름곰",
    badgeBg: "bg-[#8EC9E8]",
    bubbleLabel: "text-[#6A8596]",
    bubbleText: "text-[#4A6575]",
    bubbleBg: "bg-[#FDFCF5]/95",
    accentButton: "bg-[#8EC9E8] hover:bg-[#7EB9D8]",
    accentBorder: "border-[#A9DEF9]/40",
    accentText: "text-[#4A6575]",
    accentMuted: "text-[#6A8596]",
    accentSoft: "bg-[#A9DEF9]/22",
    glowClass: "shadow-[0_8px_32px_-8px_rgba(169,222,249,0.5)]",
    thankEmoji: "🌿",
  },
  SP: {
    group: "SP",
    groupLabel: "SP · 꿈다람쥐",
    groupDescription: "호기심 가득한 말로 오늘의 감정을 함께 탐험하는 꿈다람쥐",
    badgeBg: "bg-[#E8AEC0]",
    bubbleLabel: "text-[#A67A88]",
    bubbleText: "text-[#8A5A6A]",
    bubbleBg: "bg-[#FDFCF5]/95",
    accentButton: "bg-[#E8AEC0] hover:bg-[#D89EB0]",
    accentBorder: "border-[#F7C6D7]/40",
    accentText: "text-[#8A5A6A]",
    accentMuted: "text-[#A67A88]",
    accentSoft: "bg-[#F7C6D7]/22",
    glowClass: "shadow-[0_8px_32px_-8px_rgba(247,198,215,0.5)]",
    thankEmoji: "🎈",
  },
};

const PHASE_COLORS: Record<
  TemperamentGroup,
  Record<MascotPhase, { bgColor: string; ringColor: string }>
> = {
  NT: {
    default: { bgColor: "bg-[#B2A4D4]/28", ringColor: "ring-[#B2A4D4]/42" },
    menstrual: { bgColor: "bg-[#B2A4D4]/34", ringColor: "ring-[#B2A4D4]/48" },
    follicular: { bgColor: "bg-[#709BBF]/18", ringColor: "ring-[#709BBF]/32" },
    ovulation: { bgColor: "bg-[#B2A4D4]/36", ringColor: "ring-[#B2A4D4]/50" },
    luteal: { bgColor: "bg-[#B2A4D4]/22", ringColor: "ring-[#B2A4D4]/38" },
  },
  NF: {
    default: { bgColor: "bg-[#D7C4F2]/28", ringColor: "ring-[#D7C4F2]/42" },
    menstrual: { bgColor: "bg-[#F7C6D7]/24", ringColor: "ring-[#F7C6D7]/38" },
    follicular: { bgColor: "bg-[#A9DEF9]/20", ringColor: "ring-[#A9DEF9]/34" },
    ovulation: { bgColor: "bg-[#D7C4F2]/34", ringColor: "ring-[#D7C4F2]/48" },
    luteal: { bgColor: "bg-[#D7C4F2]/22", ringColor: "ring-[#D7C4F2]/36" },
  },
  SJ: {
    default: { bgColor: "bg-[#A9DEF9]/26", ringColor: "ring-[#A9DEF9]/40" },
    menstrual: { bgColor: "bg-[#A9DEF9]/32", ringColor: "ring-[#A9DEF9]/46" },
    follicular: { bgColor: "bg-[#A9DEF9]/30", ringColor: "ring-[#A9DEF9]/44" },
    ovulation: { bgColor: "bg-[#709BBF]/16", ringColor: "ring-[#709BBF]/30" },
    luteal: { bgColor: "bg-[#B2A4D4]/18", ringColor: "ring-[#B2A4D4]/30" },
  },
  SP: {
    default: { bgColor: "bg-[#F7C6D7]/26", ringColor: "ring-[#F7C6D7]/40" },
    menstrual: { bgColor: "bg-[#F7C6D7]/30", ringColor: "ring-[#F7C6D7]/44" },
    follicular: { bgColor: "bg-[#D7C4F2]/18", ringColor: "ring-[#D7C4F2]/32" },
    ovulation: { bgColor: "bg-[#F7C6D7]/34", ringColor: "ring-[#F7C6D7]/48" },
    luteal: { bgColor: "bg-[#F7C6D7]/22", ringColor: "ring-[#F7C6D7]/36" },
  },
};

export function getPastelMascotColors(
  temperament: TemperamentGroup,
  phase: MascotPhase,
): { bgColor: string; ringColor: string } {
  return PHASE_COLORS[temperament][phase];
}
