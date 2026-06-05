import { DEFAULT_DATA, normalizeData } from "@/lib/normalizeData";
import type { MoonBuddyData } from "@/types/moonBuddy";

export const STORAGE_KEY = "moon-buddy-data";

export { DEFAULT_DATA, normalizeData };

export function loadData(): MoonBuddyData {
  if (typeof window === "undefined") return DEFAULT_DATA;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;

    return normalizeData(JSON.parse(raw));
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data: MoonBuddyData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeData(data)));
}

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
