"use client";

import { ProfileSetup } from "@/components/ProfileSetup";
import type { LocaleContent } from "@/lib/i18n/types";
import { isProfileComplete } from "@/lib/profile";
import type { MbtiTypeKey } from "@/lib/mbti";
import type { TemperamentTheme, UserSettings } from "@/types";

interface ProfileTabProps {
  settings: UserSettings;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onSave: (
    userName: string,
    mbtiType: MbtiTypeKey,
    buddyCustomName: string,
    language: UserSettings["language"],
  ) => void;
}

export function ProfileTab({
  settings,
  locale,
  theme,
  onSave,
}: ProfileTabProps) {
  const { ui } = locale;
  const profileComplete = isProfileComplete(settings);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-1.5">
      <ProfileSetup
        userName={settings.userName}
        mbtiType={settings.mbtiType}
        buddyCustomName={settings.buddyCustomName}
        language={settings.language}
        ui={ui}
        mbtiTypeTitles={locale.mbtiTypeTitles}
        onSave={onSave}
        accentBorder={theme.accentBorder}
        accentMuted={theme.accentMuted}
        accentText={theme.accentText}
        accentButton={theme.accentButton}
        accentSoft={theme.accentSoft}
        variant={profileComplete ? "edit" : "onboarding"}
      />
    </div>
  );
}
