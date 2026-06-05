import type { LocaleUI } from "@/lib/i18n/types";
import type { MenstruationStatus, TemperamentTheme } from "@/types";

interface LivePeriodSwitchProps {
  status: MenstruationStatus;
  periodDay: number;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onToggle: () => void;
}

export function LivePeriodSwitch({
  status,
  periodDay,
  ui,
  theme,
  onToggle,
}: LivePeriodSwitchProps) {
  const isOnPeriod = status === "ON_PERIOD";

  return (
    <section className="flex-shrink-0">
      <p className={`mb-1 text-center text-[9px] font-semibold ${theme.accentMuted}`}>
        {isOnPeriod
          ? `${ui.livePeriodOn} · ${periodDay}${ui.livePeriodDayUnit}`
          : ui.livePeriodOff}
      </p>

      <button
        type="button"
        onClick={onToggle}
        className={`w-full rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all duration-300 active:scale-[0.98] ${
          isOnPeriod
            ? "bg-gradient-to-r from-teal-400 to-emerald-500"
            : "animate-pulse bg-gradient-to-r from-rose-400 to-pink-500"
        }`}
      >
        {isOnPeriod ? ui.livePeriodEndButton : ui.livePeriodStartButton}
      </button>
    </section>
  );
}
