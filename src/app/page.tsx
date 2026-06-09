"use client";

import { HeartPulse, Star, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AscensionModal } from "@/components/companion/AscensionModal";
import { WeeklyConstellation } from "@/components/companion/WeeklyConstellation";
import { DevTools } from "@/components/dev/DevTools";
import { AppHeader } from "@/components/AppHeader";
import { CharacterRoom } from "@/components/CharacterRoom";
import { StarArchive } from "@/components/stars/StarArchive";
import { ConditionTab } from "@/components/ConditionTab";
import { ProfileTab } from "@/components/ProfileTab";
import { TabBar } from "@/components/TabBar";
import { StarFragmentToast } from "@/components/StarFragmentToast";
import { useBuddySpeech } from "@/hooks/useBuddySpeech";
import { useMoonBuddy } from "@/hooks/useMoonBuddy";
import { companionStageToDisplayLevel } from "@/lib/companionLifecycle";
import { getCustomAdviceTitle } from "@/lib/characterAdviceTitle";
import { getCycleInsight } from "@/lib/cycleInsights";
import { getRhythmBriefMessage } from "@/lib/rhythmMessaging";
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
    setData,
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
    logMoodForDate,
    updateSettings,
    updateProfile,
    fortuneIsOpenedToday,
    fortuneTodayMessage,
    openFortuneCookie,
    companion,
    stageProgress,
    ascensionPending,
    beginAscension,
    finishAscension,
    stars,
    starCount,
  } = useMoonBuddy();

  const [activeTab, setActiveTab] = useState<AppTab | null>(null);
  const [showAscension, setShowAscension] = useState(false);
  const [thankTrigger, setThankTrigger] = useState(0);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(
    null,
  );
  const [liveSpeech, setLiveSpeech] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [showWeeklyConstellation, setShowWeeklyConstellation] = useState(false);
  const liveSpeechTimer = useRef<number | undefined>(undefined);
  const toastTimer = useRef<number | undefined>(undefined);
  const { ui } = locale;

  const tabs = useMemo(
    () => [
      { id: "home" as const, emoji: "🏠", label: ui.tabHome },
      {
        id: "condition" as const,
        icon: <HeartPulse strokeWidth={2.25} aria-hidden />,
        label: ui.tabCondition,
      },
      {
        id: "stars" as const,
        icon: <Star strokeWidth={2.25} aria-hidden />,
        label: ui.tabStars,
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

  useEffect(() => {
    if (ascensionPending) {
      setShowAscension(true);
    }
  }, [ascensionPending]);

  useEffect(() => {
    return () => {
      window.clearTimeout(liveSpeechTimer.current);
      window.clearTimeout(toastTimer.current);
    };
  }, []);

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
  const phaseLabel = homePhase ? locale.phaseLabels[homePhase] : null;
  const moodLabel = todayDominantMood
    ? locale.liveMoodLabels[todayDominantMood]
    : null;
  const customAdviceTitle = getCustomAdviceTitle(
    data.settings.buddyCustomName,
    ui,
  );

  const rhythmMessage = getRhythmBriefMessage(
    homePhase,
    data.settings.language,
    buddyIdentity.customName,
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

  function showStarFragmentToast() {
    setToastVisible(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 2800);
  }

  function handleCompleteMood(mood: LiveMood) {
    const { speech, constellationComplete } = logLiveMood(mood);
    setThankTrigger((count) => count + 1);
    setLiveSpeech(speech);
    showStarFragmentToast();
    if (constellationComplete) {
      setShowWeeklyConstellation(true);
    }
    window.clearTimeout(liveSpeechTimer.current);
    liveSpeechTimer.current = window.setTimeout(() => setLiveSpeech(null), 5000);
  }

  function handleAscend() {
    if (beginAscension()) {
      setShowAscension(true);
    }
  }

  const shellClass =
    "relative mx-auto flex h-full w-full max-w-[450px] flex-col overflow-hidden shadow-xl ring-1 ring-black/5 md:my-auto md:h-[calc(100dvh-1.5rem)] md:max-h-[900px] md:rounded-[2rem]";

  const devTools = isLoaded ? (
    <DevTools
      companion={companion}
      starCount={starCount}
      language={data.settings.language}
      setData={setData}
      onTriggerAscension={() => setShowAscension(true)}
    />
  ) : null;

  if (!isLoaded || activeTab === null) {
    return (
      <div
        className={`${shellClass} rounded-none bg-white/40`}
      >
        <AppHeader ui={ui} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-violet-600">{ui.loading}</p>
        </div>
        {devTools}
      </div>
    );
  }

  return (
    <div
      className={`${shellClass} bg-gradient-to-b ${pageBg}`}
    >
      <AppHeader logoColorClass={temperamentTheme.accentText} ui={ui} />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-2.5">
        {activeTab === "home" && (
          <div className="flex h-full min-h-0 flex-col overflow-hidden pb-0.5">
            <CharacterRoom
              mascot={mascot}
              companionStage={companion.currentStage}
              displayLevel={companionStageToDisplayLevel(companion.currentStage)}
              growthProgress={companion.growthProgress}
              stageProgress={stageProgress}
              starFragments={companion.starFragments}
              ascensionPending={ascensionPending}
              todayDominantMood={todayDominantMood}
              speech={buddySpeech}
              liveSpeech={liveSpeech}
              thankSpeech={thankSpeech}
              buddyIdentity={buddyIdentity}
              thankTrigger={thankTrigger}
              temperament={temperament}
              language={data.settings.language}
              userName={data.settings.userName}
              locale={locale}
              theme={temperamentTheme}
              onCompleteMood={handleCompleteMood}
              onAscend={handleAscend}
              onMascotTap={onSpeechTap}
              canCycleSpeech={canCycle}
              mascotTapHint={ui.mascotTapHint}
              fortuneIsOpenedToday={fortuneIsOpenedToday}
              fortuneTodayMessage={fortuneTodayMessage}
              onOpenFortuneCookie={openFortuneCookie}
            />
          </div>
        )}

        {activeTab === "stars" && (
          <StarArchive
            stars={stars}
            locale={locale}
            theme={temperamentTheme}
          />
        )}

        {activeTab === "condition" && (
          <ConditionTab
            data={data}
            locale={locale}
            theme={temperamentTheme}
            cycleInfo={cycleInfo}
            cycleInsight={cycleInsight}
            phase={homePhase}
            phaseLabel={phaseLabel}
            rhythmMessage={rhythmMessage}
            menstruationStatus={menstruationStatus}
            periodDay={periodDay}
            dialogue={dialogue}
            moodLabel={moodLabel}
            moodStats={moodStats}
            customAdviceTitle={customAdviceTitle}
            selectedCalendarDate={selectedCalendarDate}
            onSelectDate={setSelectedCalendarDate}
            onCloseSheet={() => setSelectedCalendarDate(null)}
            onToggleDayPeriod={toggleDayPeriod}
            onStartPeriod={startPeriod}
            onEndPeriod={endPeriod}
            onAddPeriod={addPeriod}
            onDeletePeriod={deletePeriod}
            onSaveSettings={updateSettings}
            onLogMoodForDate={logMoodForDate}
            onTogglePeriod={toggleMenstruation}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab
            settings={data.settings}
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

      <AscensionModal
        open={showAscension}
        companionName={buddyIdentity.customName}
        userName={data.settings.userName}
        locale={locale}
        theme={temperamentTheme}
        onComplete={() => finishAscension()}
        onClose={() => setShowAscension(false)}
      />

      <StarFragmentToast message={ui.starFragmentToast} visible={toastVisible} />

      <WeeklyConstellation
        open={showWeeklyConstellation}
        dailyMoodLogs={data.dailyMoodLogs}
        locale={locale}
        theme={temperamentTheme}
        onClose={() => setShowWeeklyConstellation(false)}
      />

      {devTools}
    </div>
  );
}
