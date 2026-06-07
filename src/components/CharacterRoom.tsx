"use client";

import { CompanionGrowthCard } from "@/components/companion/CompanionGrowthCard";
import { FortuneCookieFloating } from "@/components/FortuneCookieFloating";
import { MascotCharacter } from "@/components/MascotCharacter";
import { QuickMoodButtons } from "@/components/QuickMoodButtons";
import { LIVE_MOODS } from "@/lib/liveMood";
import type { LocaleContent } from "@/lib/i18n/types";
import type {
  BuddyIdentity,
  CompanionStage,
  LiveMood,
  MascotConfig,
  TemperamentTheme,
} from "@/types";

interface CharacterRoomProps {
  mascot: MascotConfig;
  companionStage: CompanionStage;
  displayLevel: number;
  growthProgress: number;
  stageProgress: number;
  ascensionPending?: boolean;
  speech: string;
  liveSpeech: string | null;
  thankSpeech: string;
  buddyIdentity: BuddyIdentity;
  thankTrigger?: number;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onLiveMood: (mood: LiveMood) => void;
  onMascotTap?: () => void;
  canCycleSpeech?: boolean;
  mascotTapHint?: string;
  fortuneIsOpenedToday: boolean;
  fortuneTodayMessage: string | null;
  onOpenFortuneCookie: () => string;
}

export function CharacterRoom({
  mascot,
  companionStage,
  displayLevel,
  growthProgress,
  stageProgress,
  ascensionPending,
  speech,
  liveSpeech,
  thankSpeech,
  buddyIdentity,
  thankTrigger,
  locale,
  theme,
  onLiveMood,
  onMascotTap,
  canCycleSpeech,
  mascotTapHint,
  fortuneIsOpenedToday,
  fortuneTodayMessage,
  onOpenFortuneCookie,
}: CharacterRoomProps) {
  const { ui } = locale;
  const quickOptions = LIVE_MOODS.map((mood) => ({
    value: mood,
    emoji: locale.liveMoodEmojis[mood],
    label: locale.liveMoodLabels[mood],
  }));

  const stageLabel = ui.companionStages[companionStage];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-1">
        <FortuneCookieFloating
          isOpenedToday={fortuneIsOpenedToday}
          todayMessage={fortuneTodayMessage}
          onOpen={onOpenFortuneCookie}
          buddyIdentity={buddyIdentity}
          theme={theme}
          ui={locale.ui}
        />
        <MascotCharacter
          mascot={mascot}
          level={displayLevel}
          companionStage={companionStage}
          stageLabel={stageLabel}
          speech={liveSpeech ?? speech}
          thankSpeech={thankSpeech}
          buddyIdentity={buddyIdentity}
          thankTrigger={thankTrigger}
          compact
          showTitle
          onMascotTap={onMascotTap}
          canCycleSpeech={canCycleSpeech}
          mascotTapHint={mascotTapHint}
        />
      </div>

      <div className="flex-shrink-0 px-0.5">
        <p className={`mb-1.5 text-center text-[10px] font-semibold ${theme.accentText}`}>
          {ui.moodFeedTitle}
        </p>
        <QuickMoodButtons
          options={quickOptions}
          theme={theme}
          onSelect={onLiveMood}
        />
      </div>

      <CompanionGrowthCard
        stage={companionStage}
        stageProgress={stageProgress}
        growthProgress={growthProgress}
        locale={locale}
        theme={theme}
        ascensionPending={ascensionPending}
      />
    </div>
  );
}
