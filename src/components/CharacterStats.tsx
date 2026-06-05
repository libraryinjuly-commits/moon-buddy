import { getExpProgress } from "@/lib/exp";
import type { LocaleUI } from "@/lib/i18n/types";
import type { BuddyIdentity, TemperamentTheme } from "@/types";

interface CharacterStatsProps {
  character: { level: number; exp: number; totalMoodLogs: number };
  buddyIdentity: BuddyIdentity;
  theme: TemperamentTheme;
  ui: LocaleUI;
}

export function CharacterStats({
  character,
  buddyIdentity,
  theme,
  ui,
}: CharacterStatsProps) {
  const { current, needed, percent } = getExpProgress(character.exp);

  return (
    <div
      className={`rounded-2xl border ${theme.accentBorder} bg-white/80 p-4 shadow-sm`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className={`text-sm font-semibold ${theme.accentText}`}>
            {ui.growthRecord}
          </h3>
          <p className={`text-xs ${theme.accentMuted}`}>
            {ui.currentEpithet}: {buddyIdentity.epithet}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-0.5 text-sm font-bold text-white ${theme.badgeBg}`}
        >
          Lv. {character.level}
        </span>
      </div>

      <div className={`h-3 overflow-hidden rounded-full ${theme.accentSoft}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className={`mt-2 text-xs ${theme.accentMuted}`}>
        {current} / {needed} EXP · {ui.moodLogs} {character.totalMoodLogs}
      </p>

      {buddyIdentity.nextEpithet && buddyIdentity.nextEpithetLevel ? (
        <p
          className={`mt-2 rounded-lg px-3 py-2 text-xs ${theme.accentSoft} ${theme.accentText}`}
        >
          Lv.{buddyIdentity.nextEpithetLevel}
          {ui.nextEpithet} <strong>{buddyIdentity.nextEpithet}</strong>
        </p>
      ) : (
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {ui.maxEpithet.replace("{name}", buddyIdentity.customName)}
        </p>
      )}
    </div>
  );
}
