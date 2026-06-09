"use client";

import { useMemo, useState } from "react";

import { Companion } from "@/components/companion/Companion";
import { CompanionGrowthCard } from "@/components/companion/CompanionGrowthCard";
import { FortuneCookieFloating } from "@/components/FortuneCookieFloating";
import { QuickMoodButtons } from "@/components/QuickMoodButtons";
import { getLiveMoodReaction, LIVE_MOODS } from "@/lib/liveMood";
import { getMascotPhaseForMood } from "@/lib/moodMascot";
import type { LocaleContent } from "@/lib/i18n/types";
import type {
  BuddyIdentity,
  CompanionStage,
  Language,
  LiveMood,
  MascotConfig,
  TemperamentGroup,
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
  temperament: TemperamentGroup;
  language: Language;
  userName: string;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onCompleteMood: (mood: LiveMood) => void;
  onAscend?: () => void;
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
  temperament,
  language,
  userName,
  locale,
  theme,
  onCompleteMood,
  onAscend,
  onMascotTap,
  canCycleSpeech,
  mascotTapHint,
  fortuneIsOpenedToday,
  fortuneTodayMessage,
  onOpenFortuneCookie,
}: CharacterRoomProps) {
  const { ui } = locale;
  const [selectedMood, setSelectedMood] = useState<LiveMood | null>(null);

  const quickOptions = LIVE_MOODS.map((mood) => ({
    value: mood,
    emoji: locale.liveMoodEmojis[mood],
    label: locale.liveMoodLabels[mood],
  }));

  const displayMascot = useMemo(() => {
    if (!selectedMood) return mascot;
    return {
      ...mascot,
      phase: getMascotPhaseForMood(selectedMood),
    };
  }, [mascot, selectedMood]);

  const previewSpeech = useMemo(() => {
    if (!selectedMood) return null;
    return getLiveMoodReaction(selectedMood, language, temperament, {
      userName,
      characterName: buddyIdentity.customName,
    });
  }, [
    selectedMood,
    language,
    temperament,
    userName,
    buddyIdentity.customName,
  ]);

  const bubbleSpeech = liveSpeech ?? previewSpeech ?? speech;

  function handleCompleteMood() {
    if (!selectedMood) return;
    onCompleteMood(selectedMood);
  }

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
        <Companion
          mascot={displayMascot}
          growthProgress={growthProgress}
          displayLevel={displayLevel}
          companionStage={companionStage}
          speech={bubbleSpeech}
          thankSpeech={thankSpeech}
          buddyIdentity={buddyIdentity}
          thankTrigger={thankTrigger}
          locale={locale}
          onAscend={onAscend}
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
          selectedMood={selectedMood}
          onSelect={setSelectedMood}
        />
        <button
          type="button"
          disabled={!selectedMood}
          onClick={handleCompleteMood}
          className={`mt-2 w-full rounded-xl px-3 py-2.5 text-xs font-bold text-white shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 ${theme.accentButton} hover:opacity-95`}
        >
          {ui.moodCompleteButton}
        </button>
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
