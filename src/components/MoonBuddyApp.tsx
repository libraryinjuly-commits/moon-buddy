"use client";

import { CharacterStats } from "@/components/CharacterStats";
import { ConditionGuide } from "@/components/ConditionGuide";
import { CyclePhaseBadge } from "@/components/CyclePhaseBadge";
import { CycleSettings } from "@/components/CycleSettings";
import { LanguageSelector } from "@/components/LanguageSelector";
import { MascotCharacter } from "@/components/MascotCharacter";
import { MoonAdviceCard } from "@/components/MoonAdviceCard";
import { MoodLogger } from "@/components/MoodLogger";
import { PeriodForm } from "@/components/PeriodForm";
import { PeriodRecordList } from "@/components/PeriodRecordList";
import { ProfileSetup } from "@/components/ProfileSetup";
import { TodayStatusCard } from "@/components/TodayStatusCard";
import { useMoonBuddy } from "@/hooks/useMoonBuddy";
import { getCycleInsight } from "@/lib/cycleInsights";
import type { Mood } from "@/types";

export function MoonBuddyApp() {
  const {
    data,
    isLoaded,
    locale,
    cycleInfo,
    mascot,
    dialogue,
    thankSpeech,
    buddyIdentity,
    temperamentTheme,
    todayMood,
    addPeriod,
    deletePeriod,
    logMood,
    updateSettings,
    updateProfile,
    updateLanguage,
  } = useMoonBuddy();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-violet-600">{locale.ui.loading}</p>
      </div>
    );
  }

  const { ui } = locale;
  const cycleInsight = getCycleInsight(
    cycleInfo?.phase ?? null,
    data.settings.userName,
    data.settings.mbti,
    data.settings.language,
  );
  const phaseLabel = cycleInfo ? locale.phaseLabels[cycleInfo.phase] : null;
  const moodLabel = todayMood ? locale.moodLabels[todayMood] : null;
  const moodOptions = (["great", "good", "okay", "low", "bad"] as Mood[]).map(
    (mood) => ({
      value: mood,
      label: locale.moodLabels[mood],
      emoji: locale.moodEmojis[mood],
    }),
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-6 pb-10">
      <LanguageSelector
        language={data.settings.language}
        label={ui.languageLabel}
        onChange={updateLanguage}
        accentBorder={temperamentTheme.accentBorder}
        accentText={temperamentTheme.accentText}
        accentButton={temperamentTheme.accentButton}
      />

      <ProfileSetup
        userName={data.settings.userName}
        mbti={data.settings.mbti}
        buddyCustomName={data.settings.buddyCustomName}
        language={data.settings.language}
        ui={ui}
        levelOneEpithet={locale.epithets[1]}
        onSave={updateProfile}
        accentBorder={temperamentTheme.accentBorder}
        accentMuted={temperamentTheme.accentMuted}
        accentText={temperamentTheme.accentText}
        accentButton={temperamentTheme.accentButton}
        accentSoft={temperamentTheme.accentSoft}
      />

      <MascotCharacter
        mascot={mascot}
        level={data.character.level}
        speech={dialogue.speech}
        thankSpeech={thankSpeech}
        buddyIdentity={buddyIdentity}
      />

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
        mood={todayMood}
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
        character={data.character}
        buddyIdentity={buddyIdentity}
        theme={temperamentTheme}
        ui={ui}
      />

      <MoodLogger
        title={ui.todayMood}
        description={ui.todayMoodDesc}
        moodOptions={moodOptions}
        todayMood={todayMood}
        onLogMood={logMood}
      />

      <PeriodForm
        title={ui.periodRecord}
        description={ui.periodRecordDesc}
        startLabel={ui.periodStart}
        endLabel={ui.periodEnd}
        saveLabel={ui.periodSave}
        errorMessage={ui.periodError}
        onSubmit={addPeriod}
      />

      <CycleSettings settings={data.settings} ui={ui} onSave={updateSettings} />

      <PeriodRecordList
        periods={data.periods}
        language={data.settings.language}
        ui={ui}
        theme={temperamentTheme}
        onDelete={deletePeriod}
      />
    </div>
  );
}
