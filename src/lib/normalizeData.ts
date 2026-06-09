import { getDefaultSettings } from "@/lib/cycle";
import { normalizeLanguage } from "@/lib/i18n";
import { syncLivePeriodFromHistory } from "@/lib/livePeriodSync";
import { LIVE_MOODS, migrateLegacyLiveMood } from "@/lib/liveMood";
import { getLivePeriodMessage } from "@/lib/livePeriod";
import { createPeriodId } from "@/lib/periodHistory";
import {
  createNewCompanion,
  normalizeCompanionState,
} from "@/lib/companionLifecycle";
import { applyV2Fields } from "@/lib/migrations/v1ToV2";
import { isTemperamentGroup } from "@/lib/companionSpecies";
import {
  getTemperamentFromMbti,
  mbtiTypeToMbti,
  normalizeMbti,
  syncMbtiFields,
} from "@/lib/mbti";
import type { TemperamentGroup } from "@/types";
import type {
  DailyMoodLogEntry,
  DailyLiveMoods,
  LiveMood,
  MoodLog,
  MoonBuddyData,
  PeriodHistoryEntry,
} from "@/types/moonBuddy";
import type { StarMemory } from "@/types/companion";

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

const todayForDefault = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const DEFAULT_DATA: MoonBuddyData = {
  schemaVersion: 2,
  periodHistory: [],
  dailyMoodLogs: [],
  livePeriod: {
    status: "NOT_PERIOD",
    actualStartDate: null,
    activePeriodId: null,
    characterMessage: getLivePeriodMessage("idle", "KO"),
  },
  companion: createNewCompanion(todayForDefault()),
  starCollection: { stars: [], preferredView: "gallery" },
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

function normalizeStarMemories(
  stars: StarMemory[] | undefined,
  fallbackTemperament: TemperamentGroup | "",
): StarMemory[] {
  return (stars ?? []).map((star) => ({
    ...star,
    temperament:
      star.temperament && isTemperamentGroup(star.temperament)
        ? star.temperament
        : fallbackTemperament || "NF",
  }));
}

export function normalizeData(data: LegacyMoonBuddyData): MoonBuddyData {
  const language = normalizeLanguage(data.settings?.language ?? "KO");
  const periodHistory = normalizePeriodHistory(data);
  const livePeriod = syncLivePeriodFromHistory(
    periodHistory,
    language,
    data.livePeriod?.characterMessage,
  );

  const base: MoonBuddyData = {
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
    settings: (() => {
      const { mbti, mbtiType } = syncMbtiFields(
        data.settings?.mbti,
        data.settings?.mbtiType,
      );
      const temperament =
        data.settings?.temperament &&
        isTemperamentGroup(data.settings.temperament)
          ? data.settings.temperament
          : mbti
            ? getTemperamentFromMbti(mbti)
            : mbtiType
              ? getTemperamentFromMbti(mbtiTypeToMbti(mbtiType))
              : "";

      return {
        ...DEFAULT_DATA.settings,
        ...data.settings,
        language,
        mbti,
        mbtiType,
        temperament,
      };
    })(),
    schemaVersion: data.schemaVersion ?? 1,
    starCollection: {
      ...(data.starCollection ?? DEFAULT_DATA.starCollection),
      stars: normalizeStarMemories(
        data.starCollection?.stars,
        data.settings?.temperament && isTemperamentGroup(data.settings.temperament)
          ? data.settings.temperament
          : normalizeMbti(data.settings?.mbti ?? "")
            ? getTemperamentFromMbti(normalizeMbti(data.settings?.mbti ?? "")!)
            : "",
      ),
      preferredView:
        data.starCollection?.preferredView ??
        DEFAULT_DATA.starCollection.preferredView,
    },
  };

  const ascendedCompanionCount = base.starCollection.stars.length;
  const withCompanion: MoonBuddyData = {
    ...base,
    companion: normalizeCompanionState(
      base.companion ?? DEFAULT_DATA.companion,
      ascendedCompanionCount,
    ),
  };

  if (withCompanion.schemaVersion < 2) {
    return applyV2Fields(withCompanion);
  }

  return withCompanion;
}
