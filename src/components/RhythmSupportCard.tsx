"use client";

import { LivePeriodSwitch } from "@/components/LivePeriodSwitch";
import type { LocaleUI } from "@/lib/i18n/types";
import type { CyclePhase, MenstruationStatus, TemperamentTheme } from "@/types";

interface RhythmSupportCardProps {
  rhythmMessage: string;
  phase: CyclePhase | null;
  phaseLabel: string | null;
  status: MenstruationStatus;
  periodDay: number;
  ui: LocaleUI;
  theme: TemperamentTheme;
  onTogglePeriod: () => void;
}

export function RhythmSupportCard({
  rhythmMessage,
  phase,
  phaseLabel,
  status,
  periodDay,
  ui,
  theme,
  onTogglePeriod,
}: RhythmSupportCardProps) {
  return (
    <section
      className={`flex-shrink-0 rounded-2xl border px-3 py-2.5 shadow-sm ${theme.accentSoft} ${theme.accentBorder} opacity-95`}
    >
      <p className={`text-[10px] font-semibold ${theme.accentMuted}`}>
        {ui.rhythmCardTitle}
      </p>
      {phase && phaseLabel && (
        <p className={`mt-0.5 text-[10px] font-medium ${theme.accentMuted}`}>
          {phaseLabel}
        </p>
      )}
      <p className={`mt-1 text-xs leading-relaxed ${theme.accentText}`}>
        {rhythmMessage}
      </p>

      <div className="mt-2 border-t border-white/40 pt-2">
        <LivePeriodSwitch
          status={status}
          periodDay={periodDay}
          ui={ui}
          theme={theme}
          onToggle={onTogglePeriod}
          compact
        />
      </div>
    </section>
  );
}
