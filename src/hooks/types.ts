import type { MoonBuddyData } from "@/types/moonBuddy";

export type SetMoonBuddyData = (
  value: MoonBuddyData | ((prev: MoonBuddyData) => MoonBuddyData),
) => void;
