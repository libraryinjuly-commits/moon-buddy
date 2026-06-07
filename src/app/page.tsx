"use client";

import { Sparkles, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AppHeader } from "@/components/AppHeader";
import { CharacterRoom } from "@/components/CharacterRoom";
import { CalendarTab } from "@/components/CalendarTab";
import { InsightsTab } from "@/components/InsightsTab";
import { LivePeriodSwitch } from "@/components/LivePeriodSwitch";
import { ProfileTab } from "@/components/ProfileTab";
import { TabBar } from "@/components/TabBar";
import { useBuddySpeech } from "@/hooks/useBuddySpeech";
import { useMoonBuddy } from "@/hooks/useMoonBuddy";
import { getCustomAdviceTitle } from "@/lib/characterAdviceTitle";
import { getCycleInsight } from "@/lib/cycleInsights";
import { getCurrentCycleMoodStats } from "@/lib/insightsStats";
import { isProfileComplete } from "@/lib/profile";
import type { AppTab, LiveMood } from "@/types";

const PAGE_BG: Record<string, string> = {
  NT: "from-slate-50 via-blue-50 to-indigo-100",
  NF: "from-violet-50 via-fuchsia-50 to-indigo-100",
  SJ: "from-teal-50 via-emerald-50 to-green-100",
  SP: "from-orange-50 via-amber-50 to-yellow-100",
};

export default function Home() {
  const {
    data,
    isLoaded,
    locale,
    cycleInfo,
    mascot,
    dialogue,
    thankSpeech,
    buddyIdentity,
    temperament,
    temperamentTheme,
    todayDominantMood,
    menstruationStatus,
    periodDay,
    toggleMenstruation,
    toggleDayPeriod,
    startPeriod,
    endPeriod,
    addPeriod,
    deletePeriod,
    logLiveMood,
    updateSettings,
    updateProfile,
    fortuneIsOpenedToday,
    fortuneTodayMessage,
    openFortuneCookie,
  } = useMoonBuddy();

  const [activeTab, setActiveTab] = useState<AppTab | null>(null);
  const [thankTrigger, setThankTrigger] = useState(0);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(
    null,
  );
  const [liveSpeech, setLiveSpeech] = useState<string | null>(null);
  const liveSpeechTimer = useRef<number | undefined>(undefined);
  const { ui } = locale;

  const tabs = useMemo(
    () => [
      { id: "home" as const, emoji: "🏠", label: ui.tabHome },
      { id: "calendar" as const, emoji: "📅", label: ui.tabCalendar },
      {
        id: "insights" as const,
        icon: <Sparkles strokeWidth={2.25} aria-hidden />,
        label: ui.tabInsights,
      },
      {
        id: "profile" as const,
        icon: <User strokeWidth={2.25} aria-hidden />,
        label: ui.tabProfile,
      },
    ],
    [ui],
  );

  useEffect(() => {
    if (!isLoaded || activeTab !== null) return;

    setActiveTab(isProfileComplete(data.settings) ? "home" : "profile");
  }, [isLoaded, activeTab, data.settings]);

  const homePhase =
    menstruationStatus === "ON_PERIOD" ? "menstrual" : (cycleInfo?.phase ?? null);

  const { speech: buddySpeech, onSpeechTap, canCycle } = useBuddySpeech({
    phase: homePhase,
    language: data.settings.language,
    temperament,
    userName: data.settings.userName,
    characterName: buddyIdentity.customName,
    menstruationStatus,
    liveSpeech,
  });

  const cycleInsight = getCycleInsight(
    cycleInfo?.phase ?? null,
    data.settings.userName,
    data.settings.mbti,
    data.settings.language,
    data.settings.buddyCustomName,
  );

  const moodStats = useMemo(
    () => getCurrentCycleMoodStats(data.dailyMoodLogs, cycleInfo),
    [data.dailyMoodLogs, cycleInfo],
  );

  const pageBg = PAGE_BG[temperamentTheme.group] ?? PAGE_BG.NF;
  const phaseLabel = cycleInfo ? locale.phaseLabels[cycleInfo.phase] : null;
  const moodLabel = todayDominantMood
    ? locale.liveMoodLabels[todayDominantMood]
    : null;
  const customAdviceTitle = getCustomAdviceTitle(
    data.settings.buddyCustomName,
    ui,
  );

  function handleProfileSave(
    userName: string,
    mbti: string,
    buddyCustomName: string,
    language: typeof data.settings.language,
  ) {
    const wasOnboarding = !isProfileComplete(data.settings);
    updateProfile(userName, mbti, buddyCustomName, language);

    if (
      wasOnboarding &&
      userName.trim().length > 0 &&
      mbti.trim().length > 0
    ) {
      setActiveTab("home");
    }
  }

  function handleLiveMood(mood: LiveMood) {
    const speech = logLiveMood(mood);
    setThankTrigger((count) => count + 1);
    setLiveSpeech(speech);
    window.clearTimeout(liveSpeechTimer.current);
    liveSpeechTimer.current = window.setTimeout(() => setLiveSpeech(null), 5000);
  }

  if (!isLoaded || activeTab === null) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[450px] flex-col overflow-hidden rounded-none bg-white/40 shadow-xl ring-1 ring-black/5 md:my-auto md:h-[calc(100dvh-1.5rem)] md:max-h-[900px] md:rounded-[2rem]">
        <AppHeader shareCopiedMessage={ui.shareCopiedToast} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-violet-600">{ui.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full max-w-[450px] flex-col overflow-hidden bg-gradient-to-b shadow-xl ring-1 ring-black/5 md:my-auto md:h-[calc(100dvh-1.5rem)] md:max-h-[900px] md:rounded-[2rem] ${pageBg}`}
    >
      <AppHeader
        logoColorClass={temperamentTheme.accentText}
        shareCopiedMessage={ui.shareCopiedToast}
      />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-2.5">
        {activeTab === "home" && (
          <div className="flex h-full min-h-0 flex-col gap-1.5 overflow-hidden pb-0.5">
            <LivePeriodSwitch
              status={menstruationStatus}
              periodDay={periodDay}
              ui={ui}
              theme={temperamentTheme}
              onToggle={toggleMenstruation}
            />

            <CharacterRoom
              mascot={mascot}
              level={data.character.level}
              speech={buddySpeech}
              liveSpeech={liveSpeech}
              thankSpeech={thankSpeech}
              buddyIdentity={buddyIdentity}
              thankTrigger={thankTrigger}
              locale={locale}
              theme={temperamentTheme}
              onLiveMood={handleLiveMood}
              onSpeechClick={onSpeechTap}
              canCycleSpeech={canCycle}
              speechTapHint={ui.speechTapHint}
              fortuneIsOpenedToday={fortuneIsOpenedToday}
              fortuneTodayMessage={fortuneTodayMessage}
              onOpenFortuneCookie={openFortuneCookie}
            />
          </div>
        )}

        {activeTab === "calendar" && (
          <CalendarTab
            data={data}
            locale={locale}
            theme={temperamentTheme}
            cycleInfo={cycleInfo}
            selectedDate={selectedCalendarDate}
            onSelectDate={setSelectedCalendarDate}
            onCloseSheet={() => setSelectedCalendarDate(null)}
            onToggleDayPeriod={toggleDayPeriod}
            onStartPeriod={startPeriod}
            onEndPeriod={endPeriod}
            onAddPeriod={addPeriod}
            onDeletePeriod={deletePeriod}
            onSaveSettings={updateSettings}
          />
        )}

        {activeTab === "insights" && (
          <InsightsTab
            locale={locale}
            theme={temperamentTheme}
            analysisTitle={ui.analysisReportTitle}
            customAdviceTitle={customAdviceTitle}
            cycleInsight={cycleInsight}
            cycleInfo={cycleInfo}
            phaseLabel={phaseLabel}
            dialogue={dialogue}
            moodLabel={moodLabel}
            moodStats={moodStats}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab
            settings={data.settings}
            character={data.character}
            buddyIdentity={buddyIdentity}
            locale={locale}
            theme={temperamentTheme}
            onSave={handleProfileSave}
          />
        )}
      </main>

      <TabBar
        activeTab={activeTab}
        tabs={tabs}
        theme={temperamentTheme}
        onChange={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
