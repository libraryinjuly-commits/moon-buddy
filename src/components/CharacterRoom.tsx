"use client";

import { FortuneCookieFloating } from "@/components/FortuneCookieFloating";
import { MascotCharacter } from "@/components/MascotCharacter";
import { QuickMoodButtons } from "@/components/QuickMoodButtons";
import { LIVE_MOODS } from "@/lib/liveMood";
import type { LocaleContent } from "@/lib/i18n/types";
import type {
  BuddyIdentity,
  LiveMood,
  MascotConfig,
  TemperamentTheme,
} from "@/types";

interface CharacterRoomProps {
  mascot: MascotConfig;
  level: number;
  speech: string;
  liveSpeech: string | null;
  thankSpeech: string;
  buddyIdentity: BuddyIdentity;
  thankTrigger?: number;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onLiveMood: (mood: LiveMood) => void;
  onSpeechClick?: () => void;
  canCycleSpeech?: boolean;
  speechTapHint?: string;
  fortuneIsOpenedToday: boolean;
  fortuneTodayMessage: string | null;
  onOpenFortuneCookie: () => string;
}

export function CharacterRoom({
  mascot,
  level,
  speech,
  liveSpeech,
  thankSpeech,
  buddyIdentity,
  thankTrigger,
  locale,
  theme,
  onLiveMood,
  onSpeechClick,
  canCycleSpeech,
  speechTapHint,
  fortuneIsOpenedToday,
  fortuneTodayMessage,
  onOpenFortuneCookie,
}: CharacterRoomProps) {
  const quickOptions = LIVE_MOODS.map((mood) => ({
    value: mood,
    emoji: locale.liveMoodEmojis[mood],
    label: locale.liveMoodLabels[mood],
  }));

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
          level={level}
          speech={liveSpeech ?? speech}
          thankSpeech={thankSpeech}
          buddyIdentity={buddyIdentity}
          thankTrigger={thankTrigger}
          compact
          showTitle={false}
          onSpeechClick={onSpeechClick}
          canCycleSpeech={canCycleSpeech}
          speechTapHint={speechTapHint}
        />
      </div>

      <div className="flex-shrink-0 px-0.5 pb-0.5">
        <QuickMoodButtons
          options={quickOptions}
          theme={theme}
          onSelect={onLiveMood}
        />
      </div>
    </div>
  );
}
