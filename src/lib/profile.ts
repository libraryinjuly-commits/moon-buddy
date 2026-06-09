import { isValidMbtiTypeKey } from "@/lib/mbti";
import type { UserSettings } from "@/types/moonBuddy";

export function isProfileComplete(settings: UserSettings): boolean {
  return (
    settings.userName.trim().length > 0 &&
    isValidMbtiTypeKey(settings.mbtiType)
  );
}
