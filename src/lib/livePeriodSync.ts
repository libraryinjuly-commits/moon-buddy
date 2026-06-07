import { getLivePeriodMessage } from "@/lib/livePeriod";
import { getActivePeriod } from "@/lib/periodHistory";
import type { Language, LivePeriodState, PeriodHistoryEntry } from "@/types/moonBuddy";

export function syncLivePeriodFromHistory(
  periodHistory: PeriodHistoryEntry[],
  language: Language,
  previousMessage?: string,
): LivePeriodState {
  const active = getActivePeriod(periodHistory);

  if (active) {
    return {
      status: "ON_PERIOD",
      actualStartDate: active.startDate,
      activePeriodId: active.id,
      characterMessage:
        previousMessage ?? getLivePeriodMessage("onPeriod", language),
    };
  }

  return {
    status: "NOT_PERIOD",
    actualStartDate: null,
    activePeriodId: null,
    characterMessage:
      previousMessage ?? getLivePeriodMessage("idle", language),
  };
}
