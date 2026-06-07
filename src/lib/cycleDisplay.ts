import type { LocaleUI } from "@/lib/i18n/types";
import type { MenstruationStatus } from "@/types";

export function formatFactualCycleLabel(
  ui: LocaleUI,
  options: {
    status: MenstruationStatus;
    phaseLabel: string | null;
    periodDay: number;
  },
): string | null {
  if (options.status === "ON_PERIOD") {
    return `${ui.livePeriodOn} · ${options.periodDay}${ui.livePeriodDayUnit}`;
  }

  return options.phaseLabel;
}

export function formatPeriodDayLabel(ui: LocaleUI, periodDay: number): string {
  return `${ui.livePeriodOn} · ${periodDay}${ui.livePeriodDayUnit}`;
}
