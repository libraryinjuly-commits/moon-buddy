import { getDefaultSettings } from "@/lib/cycle";
import { normalizeLanguage } from "@/lib/i18n";
import { LIVE_MOODS, migrateLegacyLiveMood } from "@/lib/liveMood";
import type { LiveMood, MoonBuddyData } from "@/types/moonBuddy";

const VALID_LIVE_MOODS = new Set<LiveMood>(LIVE_MOODS);

export const DEFAULT_DATA: MoonBuddyData = {
  periods: [],
  moodLogs: [],
  liveMoodLogs: [],
  character: {
    level: 1,
    exp: 0,
    totalMoodLogs: 0,
  },
  luna: {
    lunaPoints: 0,
    collection: [],
  },
  settings: getDefaultSettings(),
};

export function normalizeData(data: MoonBuddyData): MoonBuddyData {
  return {
    ...DEFAULT_DATA,
    ...data,
    character: { ...DEFAULT_DATA.character, ...data.character },
    luna: {
      ...DEFAULT_DATA.luna,
      ...data.luna,
      collection: data.luna?.collection ?? [],
    },
    liveMoodLogs: (data.liveMoodLogs ?? []).map((day) => ({
      ...day,
      entries: day.entries
        .map((entry) => {
          const mood = VALID_LIVE_MOODS.has(entry.mood)
            ? entry.mood
            : migrateLegacyLiveMood(entry.mood);
          return mood ? { ...entry, mood } : null;
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null),
    })),
    settings: {
      ...DEFAULT_DATA.settings,
      ...data.settings,
      language: normalizeLanguage(data.settings.language ?? "KO"),
    },
  };
}
