import { formatTimeByLanguage } from "@/lib/format";
import type { LocaleUI } from "@/lib/i18n/types";
import type { DailyMoodLogEntry, Language, LiveMood, TemperamentTheme } from "@/types";

interface LiveMoodTimelineProps {
  entries: DailyMoodLogEntry[];
  descriptions: Record<LiveMood, string>;
  emojis: Record<LiveMood, string>;
  language: Language;
  ui: LocaleUI;
  theme: TemperamentTheme;
}

export function LiveMoodTimeline({
  entries,
  descriptions,
  emojis,
  language,
  ui,
  theme,
}: LiveMoodTimelineProps) {
  const sorted = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div
      className={`flex h-full min-h-0 w-[40%] max-w-[8.5rem] min-w-0 flex-shrink-0 flex-col rounded-xl border ${theme.accentBorder} bg-white/92 p-1.5 shadow-md backdrop-blur-sm`}
    >
      <p className={`mb-1.5 flex-shrink-0 text-[9px] font-bold leading-tight ${theme.accentText}`}>
        🌙 {ui.liveMoodTimelineTitle}
      </p>

      {sorted.length === 0 ? (
        <p className={`break-keep text-[9px] leading-snug whitespace-normal ${theme.accentMuted}`}>
          {ui.liveMoodTimelineEmpty}
        </p>
      ) : (
        <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-0.5">
          {sorted.map((entry, index) => (
            <li
              key={`${entry.timestamp}-${index}`}
              className={`min-w-0 flex-shrink-0 rounded-lg px-1.5 py-1 ${theme.accentSoft}`}
            >
              <p className={`mb-0.5 text-[8px] font-semibold ${theme.accentMuted}`}>
                {formatTimeByLanguage(new Date(entry.timestamp).toISOString(), language)}
              </p>
              <p
                className={`break-keep text-[9px] font-medium leading-snug whitespace-normal ${theme.accentText}`}
              >
                <span className="mr-0.5">{emojis[entry.mood]}</span>
                {descriptions[entry.mood]}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
