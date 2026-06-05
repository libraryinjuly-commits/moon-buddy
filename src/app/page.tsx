"use client";

import { useMemo, useRef, useState } from "react";

import { BuddyTitle } from "@/components/BuddyTitle";
import { CardCollection } from "@/components/CardCollection";
import { CardRevealModal } from "@/components/CardRevealModal";
import { CharacterRoom } from "@/components/CharacterRoom";
import { CharacterStats } from "@/components/CharacterStats";
import { ConditionGuide } from "@/components/ConditionGuide";
import { CyclePhaseBadge } from "@/components/CyclePhaseBadge";
import { CycleSettings } from "@/components/CycleSettings";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LivePeriodSwitch } from "@/components/LivePeriodSwitch";
import { LunaGachaSection } from "@/components/LunaGachaSection";
import { MoonAdviceCard } from "@/components/MoonAdviceCard";
import { MoodLogger } from "@/components/MoodLogger";
import { PeriodForm } from "@/components/PeriodForm";
import { PeriodRecordList } from "@/components/PeriodRecordList";
import { ProfileSetup } from "@/components/ProfileSetup";
import { RecordCalendar } from "@/components/RecordCalendar";
import { RecordEditModal } from "@/components/RecordEditModal";
import { TabBar } from "@/components/TabBar";
import { TodayStatusCard } from "@/components/TodayStatusCard";
import { useMoonBuddy } from "@/hooks/useMoonBuddy";
import { getCycleInsight } from "@/lib/cycleInsights";
import { getDisplayName } from "@/lib/nameParticle";
import { getTodayDateString } from "@/lib/storage";
import type { MoonCardDefinition } from "@/lib/cards";
import type { AppTab, LiveMood, Mood } from "@/types";

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
    temperamentTheme,
    todayMood,
    todayLiveEntries,
    menstruationStatus,
    periodDay,
    characterMessage,
    toggleMenstruation,
    addPeriod,
    deletePeriod,
    logMood,
    logLiveMood,
    updateSettings,
    updateProfile,
    updateLanguage,
    drawCard,
    updateDayRecord,
    deleteDayRecord,
  } = useMoonBuddy();

  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [thankTrigger, setThankTrigger] = useState(0);
  const [revealedCard, setRevealedCard] = useState<MoonCardDefinition | null>(
    null,
  );
  const [editDate, setEditDate] = useState<string | null>(null);
  const [liveSpeech, setLiveSpeech] = useState<string | null>(null);
  const liveSpeechTimer = useRef<number | undefined>(undefined);
  const { ui } = locale;

  const moodOptions = useMemo(
    () =>
      (["great", "good", "okay", "low", "bad"] as Mood[]).map((mood) => ({
        value: mood,
        label: locale.moodLabels[mood],
        emoji: locale.moodEmojis[mood],
      })),
    [locale],
  );

  const tabs = useMemo(
    () => [
      { id: "home" as const, emoji: "🏠", label: ui.tabHome },
      { id: "calendar" as const, emoji: "📅", label: ui.tabCalendar },
      { id: "gacha" as const, emoji: "🃏", label: ui.tabGacha },
      { id: "report" as const, emoji: "📊", label: ui.tabReport },
    ],
    [ui],
  );

  if (!isLoaded) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[450px] items-center justify-center overflow-hidden rounded-none bg-white/40 shadow-xl ring-1 ring-black/5 md:my-auto md:h-[calc(100dvh-1.5rem)] md:max-h-[900px] md:rounded-[2rem]">
        <p className="text-violet-600">{ui.loading}</p>
      </div>
    );
  }

  function handleLogMood(mood: Mood) {
    logMood(mood);
    setThankTrigger((count) => count + 1);
  }

  function handleDrawCard() {
    const card = drawCard();
    if (card) setRevealedCard(card);
  }

  function handleLiveMood(mood: LiveMood) {
    const speech = logLiveMood(mood);
    setLiveSpeech(speech);
    window.clearTimeout(liveSpeechTimer.current);
    liveSpeechTimer.current = window.setTimeout(() => setLiveSpeech(null), 5000);
  }

  function handleSaveDayRecord(
    date: string,
    mood: Mood | null,
    isPeriod: boolean,
  ) {
    updateDayRecord(date, mood, isPeriod);
    if (date === getTodayDateString() && mood) {
      setThankTrigger((count) => count + 1);
    }
  }

  const cycleInsight = getCycleInsight(
    cycleInfo?.phase ?? null,
    data.settings.userName,
    data.settings.mbti,
    data.settings.language,
  );

  const pageBg = PAGE_BG[temperamentTheme.group] ?? PAGE_BG.NF;
  const vocative = getDisplayName(data.settings.userName, data.settings.language);
  const phaseLabel = cycleInfo ? locale.phaseLabels[cycleInfo.phase] : null;
  const moodLabel = todayMood ? locale.moodLabels[todayMood] : null;
  const homeSpeech = liveSpeech ?? characterMessage ?? dialogue.speech;

  return (
    <div
      className={`mx-auto flex h-full w-full max-w-[450px] flex-col overflow-hidden bg-gradient-to-b shadow-xl ring-1 ring-black/5 md:my-auto md:h-[calc(100dvh-1.5rem)] md:max-h-[900px] md:rounded-[2rem] ${pageBg}`}
    >
      <header
        className="flex-shrink-0 space-y-0.5 px-2.5 pb-0.5"
        style={{ paddingTop: "max(0.375rem, env(safe-area-inset-top, 0px))" }}
      >
        <LanguageSelector
          language={data.settings.language}
          label={ui.languageLabel}
          onChange={updateLanguage}
          accentBorder={temperamentTheme.accentBorder}
          accentText={temperamentTheme.accentText}
          accentButton={temperamentTheme.accentButton}
          compact
        />

        <div className="text-center">
          <p
            className={`text-[9px] font-semibold tracking-wide ${temperamentTheme.accentMuted}`}
          >
            {ui.buddyPersona}
          </p>
          <BuddyTitle
            epithet={buddyIdentity.epithet}
            customName={buddyIdentity.customName}
            epithetClassName={`text-[9px] font-medium leading-snug ${temperamentTheme.accentMuted}`}
            nameClassName={`text-sm font-bold leading-tight ${temperamentTheme.accentText}`}
          />
          {data.settings.userName.trim() && (
            <p className={`mt-0.5 text-[9px] ${temperamentTheme.accentMuted}`}>
              {vocative} {ui.withBuddy}{" "}
              <strong className={temperamentTheme.accentText}>
                {buddyIdentity.customName}
              </strong>
            </p>
          )}
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-2.5">
        {activeTab === "home" && (
          <div className="flex h-full min-h-0 flex-col gap-1 overflow-hidden pb-0.5">
            <TodayStatusCard
              compact
              title={ui.todayStatus}
              dayUnit={ui.dayUnit}
              daysUntilLabel={ui.daysUntilPeriod}
              daysCountUnit={ui.daysCountUnit}
              daysUntilCount={cycleInfo?.daysUntilNextPeriod ?? null}
              status={cycleInsight.status}
              phase={
                menstruationStatus === "ON_PERIOD"
                  ? "menstrual"
                  : (cycleInfo?.phase ?? null)
              }
              phaseLabel={
                menstruationStatus === "ON_PERIOD"
                  ? locale.phaseLabels.menstrual
                  : phaseLabel
              }
              dayOfCycle={
                menstruationStatus === "ON_PERIOD"
                  ? periodDay
                  : (cycleInfo?.dayOfCycle ?? null)
              }
            />

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
              speech={homeSpeech}
              liveSpeech={null}
              thankSpeech={thankSpeech}
              buddyIdentity={buddyIdentity}
              thankTrigger={thankTrigger}
              todayLiveEntries={todayLiveEntries}
              locale={locale}
              theme={temperamentTheme}
              onLiveMood={handleLiveMood}
            />
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-1.5">
            <RecordCalendar
              moodLogs={data.moodLogs}
              periods={data.periods}
              moodEmojis={locale.moodEmojis}
              language={data.settings.language}
              ui={ui}
              theme={temperamentTheme}
              onSelectRecordedDay={setEditDate}
            />

            <MoodLogger
              title={ui.todayMood}
              description={ui.todayMoodDesc}
              moodOptions={moodOptions}
              todayMood={todayMood}
              onLogMood={handleLogMood}
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

            <PeriodRecordList
              periods={data.periods}
              language={data.settings.language}
              ui={ui}
              theme={temperamentTheme}
              onDelete={deletePeriod}
            />

            <CycleSettings
              settings={data.settings}
              ui={ui}
              onSave={updateSettings}
            />
          </div>
        )}

        {activeTab === "gacha" && (
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-1.5">
            <LunaGachaSection
              lunaPoints={data.luna.lunaPoints}
              ui={ui}
              theme={temperamentTheme}
              onDraw={handleDrawCard}
            />

            <CardCollection
              collection={data.luna.collection}
              ui={ui}
              theme={temperamentTheme}
            />
          </div>
        )}

        {activeTab === "report" && (
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-1.5">
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
          </div>
        )}
      </main>

      <TabBar
        activeTab={activeTab}
        tabs={tabs}
        theme={temperamentTheme}
        onChange={setActiveTab}
      />

      <CardRevealModal
        card={revealedCard}
        ui={ui}
        onClose={() => setRevealedCard(null)}
      />

      <RecordEditModal
        date={editDate}
        moodLogs={data.moodLogs}
        periods={data.periods}
        moodOptions={moodOptions}
        language={data.settings.language}
        ui={ui}
        theme={temperamentTheme}
        onSave={handleSaveDayRecord}
        onDelete={deleteDayRecord}
        onClose={() => setEditDate(null)}
      />
    </div>
  );
}
