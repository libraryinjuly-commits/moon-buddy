import { formatPeriodDayLabel } from "@/lib/cycleDisplay";
import type { LocaleUI } from "@/lib/i18n/types";
import type { MenstruationStatus, TemperamentTheme } from "@/types";

interface LivePeriodSwitchProps {
  status: MenstruationStatus;
  periodDay: number;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onToggle: () => void;
  compact?: boolean;
}

export function LivePeriodSwitch({
  status,
  periodDay,
  ui,
  theme,
  onToggle,
  compact = false,
}: LivePeriodSwitchProps) {
  const isOnPeriod = status === "ON_PERIOD";

  const statusLine = isOnPeriod
    ? formatPeriodDayLabel(ui, periodDay)
    : ui.rhythmLogHint;

  if (compact) {
    return (
      <div>
        <p className={`mb-1.5 text-[9px] font-medium ${theme.accentMuted}`}>
          {statusLine}
        </p>
        <button
          type="button"
          onClick={onToggle}
          className={`w-full rounded-lg py-2 text-xs font-semibold text-white transition active:scale-[0.98] ${
            isOnPeriod
              ? "bg-gradient-to-r from-teal-400/90 to-emerald-500/90"
              : `${theme.accentButton} opacity-90`
          }`}
        >
          {isOnPeriod ? ui.livePeriodEndButton : ui.livePeriodStartButton}
        </button>
      </div>
    );
  }

  return (
    <section className="flex-shrink-0">
      <p className={`mb-1 text-center text-[9px] font-semibold ${theme.accentMuted}`}>
        {isOnPeriod ? statusLine : ui.livePeriodOff}
      </p>

      <button
        type="button"
        onClick={onToggle}
        className={`w-full rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all duration-300 active:scale-[0.98] ${
          isOnPeriod
            ? "bg-gradient-to-r from-teal-400 to-emerald-500"
            : `${theme.accentButton} opacity-90`
        }`}
      >
        {isOnPeriod ? ui.livePeriodEndButton : ui.livePeriodStartButton}
      </button>
    </section>
  );
}
