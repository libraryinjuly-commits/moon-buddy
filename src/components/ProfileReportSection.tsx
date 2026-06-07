import { CharacterStats } from "@/components/CharacterStats";
import { ConditionGuide } from "@/components/ConditionGuide";
import { CyclePhaseBadge } from "@/components/CyclePhaseBadge";
import { MoonAdviceCard } from "@/components/MoonAdviceCard";
import { TodayStatusCard } from "@/components/TodayStatusCard";
import type { LocaleUI } from "@/lib/i18n/types";
import type {
  BuddyIdentity,
  CharacterState,
  CycleInfo,
  CycleInsight,
  DialogueContent,
  LiveMood,
  TemperamentTheme,
} from "@/types";

interface ProfileReportSectionProps {
  ui: LocaleUI;
  reportTitle: string;
  cycleInsight: CycleInsight;
  cycleInfo: CycleInfo | null;
  phaseLabel: string | null;
  dialogue: DialogueContent;
  todayDominantMood: LiveMood | null;
  moodLabel: string | null;
  character: CharacterState;
  buddyIdentity: BuddyIdentity;
  theme: TemperamentTheme;
}

export function ProfileReportSection({
  ui,
  reportTitle,
  cycleInsight,
  cycleInfo,
  phaseLabel,
  dialogue,
  todayDominantMood,
  moodLabel,
  character,
  buddyIdentity,
  theme,
}: ProfileReportSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className={`px-0.5 text-sm font-semibold ${theme.accentText}`}>
        {reportTitle}
      </h2>

      <TodayStatusCard
        title={ui.todayStatus}
        dayUnit={ui.dayUnit}
        daysUntilLabel={ui.daysUntilPeriod}
        daysCountUnit={ui.daysCountUnit}
        daysUntilCount={cycleInfo?.daysUntilNextPeriod ?? null}
        status={cycleInsight.status}
        phase={cycleInfo?.phase ?? null}
        phaseLabel={phaseLabel}
        dayOfCycle={cycleInfo?.dayOfCycle ?? null}
      />

      <MoonAdviceCard
        title={ui.moonAdvice}
        adviceItems={cycleInsight.adviceItems}
        closing={cycleInsight.adviceClosing}
      />

      <ConditionGuide
        title={ui.conditionGuide}
        moodTagLabel={ui.moodTag}
        guide={dialogue.guide}
        phase={cycleInfo?.phase ?? null}
        phaseLabel={phaseLabel}
        moodLabel={moodLabel}
      />

      {cycleInfo && phaseLabel && (
        <CyclePhaseBadge
          cycleInfo={cycleInfo}
          phaseLabel={phaseLabel}
          dayUnit={ui.dayUnit}
          daysUntilLabel={ui.daysUntilPeriod}
          daysCountUnit={ui.daysCountUnit}
        />
      )}

      <CharacterStats
        character={character}
        buddyIdentity={buddyIdentity}
        theme={theme}
        ui={ui}
      />
    </section>
  );
}
