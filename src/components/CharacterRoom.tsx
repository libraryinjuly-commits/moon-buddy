"use client";

import { LiveMoodTimeline } from "@/components/LiveMoodTimeline";
import { MascotCharacter } from "@/components/MascotCharacter";
import { QuickMoodButtons } from "@/components/QuickMoodButtons";
import { LIVE_MOODS } from "@/lib/liveMood";
import type { LocaleContent } from "@/lib/i18n/types";
import type {
  BuddyIdentity,
  LiveMood,
  LiveMoodEntry,
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
  todayLiveEntries: LiveMoodEntry[];
  locale: LocaleContent;
  theme: TemperamentTheme;
  onLiveMood: (mood: LiveMood) => void;
}

export function CharacterRoom({
  mascot,
  level,
  speech,
  liveSpeech,
  thankSpeech,
  buddyIdentity,
  thankTrigger,
  todayLiveEntries,
  locale,
  theme,
  onLiveMood,
}: CharacterRoomProps) {
  const quickOptions = LIVE_MOODS.map((mood) => ({
    value: mood,
    emoji: locale.liveMoodEmojis[mood],
    label: locale.liveMoodLabels[mood],
  }));

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1">
      <div className="flex min-h-0 flex-1 flex-row items-stretch gap-1.5">
        <div className="flex min-w-0 flex-1 flex-col items-center justify-start overflow-hidden">
          <MascotCharacter
            mascot={mascot}
            level={level}
            speech={liveSpeech ?? speech}
            thankSpeech={thankSpeech}
            buddyIdentity={buddyIdentity}
            thankTrigger={thankTrigger}
            compact
            showTitle={false}
          />
        </div>

        <LiveMoodTimeline
          entries={todayLiveEntries}
          descriptions={locale.liveMoodDescriptions}
          emojis={locale.liveMoodEmojis}
          language={locale.language}
          ui={locale.ui}
          theme={theme}
        />
      </div>

      <div className="flex-shrink-0 px-0.5">
        <QuickMoodButtons
          options={quickOptions}
          theme={theme}
          onSelect={onLiveMood}
        />
      </div>
    </div>
  );
}
