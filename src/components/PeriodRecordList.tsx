import { formatDateByLanguage } from "@/lib/format";
import type { LocaleUI } from "@/lib/i18n/types";
import type { Language, PeriodRecord, TemperamentTheme } from "@/types";

interface PeriodRecordListProps {
  periods: PeriodRecord[];
  language: Language;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onDelete: (periodId: string) => void;
}

export function PeriodRecordList({
  periods,
  language,
  ui,
  theme,
  onDelete,
}: PeriodRecordListProps) {
  if (periods.length === 0) return null;

  const sorted = [...periods].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );

  return (
    <section
      className={`rounded-2xl border ${theme.accentBorder} bg-white/80 p-4 shadow-sm`}
    >
      <h2 className={`mb-3 text-base font-semibold ${theme.accentText}`}>
        {ui.recentPeriods}
      </h2>
      <ul className="flex flex-col gap-2">
        {sorted.map((period) => (
          <li
            key={period.id}
            className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm ${theme.accentSoft} ${theme.accentText}`}
          >
            <span>
              {formatDateByLanguage(period.startDate, language)} ~{" "}
              {formatDateByLanguage(period.endDate, language)}
            </span>
            <button
              type="button"
              onClick={() => onDelete(period.id)}
              className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 active:scale-95"
            >
              {ui.periodDelete}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
