import { getDefaultSettings } from "@/lib/cycle";
import { normalizeLanguage } from "@/lib/i18n";
import { syncLivePeriodFromHistory } from "@/lib/livePeriodSync";
import { LIVE_MOODS, migrateLegacyLiveMood } from "@/lib/liveMood";
import { getLivePeriodMessage } from "@/lib/livePeriod";
import { createPeriodId } from "@/lib/periodHistory";
import { normalizeMbti } from "@/lib/mbti";
import type {
  DailyMoodLogEntry,
  DailyLiveMoods,
  LiveMood,
  MoodLog,
  MoonBuddyData,
  PeriodHistoryEntry,
} from "@/types/moonBuddy";

const VALID_LIVE_MOODS = new Set<LiveMood>(LIVE_MOODS);

type LegacyMoonBuddyData = MoonBuddyData & {
  periods?: PeriodHistoryEntry[];
  moodLogs?: MoodLog[];
  liveMoodLogs?: DailyLiveMoods[];
};

function normalizeDailyMoodLogs(data: LegacyMoonBuddyData): DailyMoodLogEntry[] {
  if (data.dailyMoodLogs?.length) {
    return data.dailyMoodLogs
      .map((entry) => {
        const mood = VALID_LIVE_MOODS.has(entry.mood)
          ? entry.mood
          : migrateLegacyLiveMood(String(entry.mood));
        if (!mood) return null;
        return {
          date: entry.date,
          mood,
          timestamp: entry.timestamp ?? Date.now(),
        };
      })
      .filter((entry): entry is DailyMoodLogEntry => entry !== null);
  }

  const migrated: DailyMoodLogEntry[] = [];

  for (const day of data.liveMoodLogs ?? []) {
    for (const entry of day.entries) {
      const mood = VALID_LIVE_MOODS.has(entry.mood)
        ? entry.mood
        : migrateLegacyLiveMood(entry.mood);
      if (!mood) continue;
      migrated.push({
        date: day.date,
        mood,
        timestamp: Date.parse(entry.time) || Date.now(),
      });
    }
  }

  return migrated;
}

function normalizePeriodHistory(data: LegacyMoonBuddyData): PeriodHistoryEntry[] {
  const raw = data.periodHistory ?? data.periods ?? [];

  let history = raw.map((entry) => ({
    id: entry.id || createPeriodId(),
    startDate: entry.startDate,
    endDate: entry.endDate ?? null,
  }));

  if (data.livePeriod?.status === "ON_PERIOD") {
    const activeId = data.livePeriod.activePeriodId;
    const activeStart = data.livePeriod.actualStartDate;

    if (activeId) {
      history = history.map((entry) =>
        entry.id === activeId ? { ...entry, endDate: null } : entry,
      );
    } else if (activeStart) {
      const match = history.find((entry) => entry.startDate === activeStart);
      if (match) {
        history = history.map((entry) =>
          entry.id === match.id ? { ...entry, endDate: null } : entry,
        );
      }
    }
  }

  const activeEntries = history.filter((entry) => entry.endDate === null);
  if (activeEntries.length > 1) {
    const latestActive = activeEntries.sort((a, b) =>
      b.startDate.localeCompare(a.startDate),
    )[0];
    history = history.map((entry) =>
      entry.endDate === null && entry.id !== latestActive.id
        ? { ...entry, endDate: entry.startDate }
        : entry,
    );
  }

  return history.sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export const DEFAULT_DATA: MoonBuddyData = {
  periodHistory: [],
  dailyMoodLogs: [],
  livePeriod: {
    status: "NOT_PERIOD",
    actualStartDate: null,
    activePeriodId: null,
    characterMessage: getLivePeriodMessage("idle", "KO"),
  },
  character: {
    level: 1,
    exp: 0,
    totalMoodLogs: 0,
  },
  luna: {
    lunaPoints: 0,
    collection: [],
  },
  fortuneCookie: null,
  settings: getDefaultSettings(),
};

export function normalizeData(data: LegacyMoonBuddyData): MoonBuddyData {
  const language = normalizeLanguage(data.settings?.language ?? "KO");
  const periodHistory = normalizePeriodHistory(data);
  const livePeriod = syncLivePeriodFromHistory(
    periodHistory,
    language,
    data.livePeriod?.characterMessage,
  );

  return {
    ...DEFAULT_DATA,
    ...data,
    periodHistory,
    character: { ...DEFAULT_DATA.character, ...data.character },
    luna: {
      ...DEFAULT_DATA.luna,
      ...data.luna,
      collection: data.luna?.collection ?? [],
    },
    fortuneCookie: data.fortuneCookie ?? null,
    livePeriod: {
      ...livePeriod,
      characterMessage:
        data.livePeriod?.characterMessage ??
        livePeriod.characterMessage ??
        getLivePeriodMessage(
          livePeriod.status === "ON_PERIOD" ? "onPeriod" : "idle",
          language,
        ),
    },
    dailyMoodLogs: normalizeDailyMoodLogs(data),
    settings: {
      ...DEFAULT_DATA.settings,
      ...data.settings,
      language,
      mbti: normalizeMbti(data.settings?.mbti ?? ""),
    },
  };
}
