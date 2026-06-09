"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BuddyTitle } from "@/components/BuddyTitle";
import { GrowthBadge } from "@/components/companion/GrowthBadge";
import { MascotSvg } from "@/components/MascotSvg";
import { getEvolutionTier, TIER_RING } from "@/lib/evolution";
import { triggerHapticTap } from "@/lib/haptics";
import { getSpeciesIdleClass } from "@/lib/companionSpecies";
import {
  getMoodInteractionMotion,
  getMoodInteractionMotionClass,
  MOOD_INTERACTION_DURATION_MS,
  type MoodInteractionState,
} from "@/lib/moodInteraction";
import { getTemperamentTheme } from "@/lib/mbti";
import type { BuddyIdentity, CompanionStage, MascotConfig } from "@/types";

interface MascotCharacterProps {
  mascot: MascotConfig;
  level: number;
  companionStage?: CompanionStage;
  growthProgress?: number;
  stageLabel?: string;
  speech: string;
  thankSpeech: string;
  buddyIdentity: BuddyIdentity;
  thankTrigger?: number;
  compact?: boolean;
  showTitle?: boolean;
  onMascotTap?: () => void;
  mascotTapHint?: string;
  canCycleSpeech?: boolean;
  moodInteraction?: MoodInteractionState | null;
}

const TIER_GLOW: Record<number, string> = {
  1: "",
  2: "shadow-lg",
  3: "shadow-xl",
  4: "shadow-2xl",
};

const THANK_ANIMATION_MS = 700;
const JELLY_BOUNCE_MS = 480;

export function MascotCharacter({
  mascot,
  level,
  companionStage,
  growthProgress = 0,
  stageLabel,
  speech,
  thankSpeech,
  buddyIdentity,
  thankTrigger = 0,
  compact = false,
  showTitle = true,
  onMascotTap,
  mascotTapHint,
  canCycleSpeech = false,
  moodInteraction = null,
}: MascotCharacterProps) {
  const tier = getEvolutionTier(level);
  const ringClass = TIER_RING[tier];
  const theme = getTemperamentTheme(mascot.temperament);
  const glowClass = TIER_GLOW[tier] || theme.glowClass;

  const [isThanking, setIsThanking] = useState(false);
  const [isJellyBouncing, setIsJellyBouncing] = useState(false);
  const [moodMotionClass, setMoodMotionClass] = useState<string | null>(null);
  const [bubblePopKey, setBubblePopKey] = useState(0);
  const prevThankTrigger = useRef(0);
  const prevSpeech = useRef(speech);
  const jellyTimer = useRef<number | undefined>(undefined);
  const moodMotionTimer = useRef<number | undefined>(undefined);

  const canTapMascot =
    canCycleSpeech && Boolean(onMascotTap) && !isThanking && !isJellyBouncing;

  useEffect(() => {
    return () => {
      window.clearTimeout(jellyTimer.current);
      window.clearTimeout(moodMotionTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!moodInteraction) return;

    const motion = getMoodInteractionMotion(moodInteraction.mood);
    setMoodMotionClass(getMoodInteractionMotionClass(motion));

    window.clearTimeout(moodMotionTimer.current);
    moodMotionTimer.current = window.setTimeout(() => {
      setMoodMotionClass(null);
    }, MOOD_INTERACTION_DURATION_MS);
  }, [moodInteraction?.triggerId, moodInteraction?.mood]);

  useEffect(() => {
    if (thankTrigger > 0 && thankTrigger !== prevThankTrigger.current) {
      prevThankTrigger.current = thankTrigger;
      setIsThanking(true);

      const timer = setTimeout(() => setIsThanking(false), THANK_ANIMATION_MS);
      return () => clearTimeout(timer);
    }
  }, [thankTrigger]);

  useEffect(() => {
    if (!isThanking && speech !== prevSpeech.current) {
      prevSpeech.current = speech;
      setBubblePopKey((key) => key + 1);
    }
  }, [speech, isThanking]);

  const handleMascotTap = useCallback(() => {
    if (!canCycleSpeech || !onMascotTap || isThanking || isJellyBouncing) return;

    triggerHapticTap(40);
    setIsJellyBouncing(true);
    window.clearTimeout(jellyTimer.current);
    jellyTimer.current = window.setTimeout(
      () => setIsJellyBouncing(false),
      JELLY_BOUNCE_MS,
    );
    onMascotTap();
  }, [
    canCycleSpeech,
    onMascotTap,
    isThanking,
    isJellyBouncing,
  ]);

  const idleClass = getSpeciesIdleClass(mascot.temperament);
  const mascotMotionClass = isThanking
    ? "animate-mascot-thank mascot-motion-layer"
    : moodMotionClass
      ? `${moodMotionClass} mascot-motion-layer`
      : isJellyBouncing
        ? "animate-mascot-jelly-bounce mascot-motion-layer"
        : `${idleClass} mascot-motion-layer`;

  const avatarSize = compact ? "h-24 w-24" : "h-36 w-36";
  const gapClass = compact ? "gap-2" : "gap-4";

  return (
    <div className={`flex w-full flex-col items-center text-center ${gapClass}`}>
      {showTitle && (
        <p
          className={`text-2xl font-extrabold leading-tight tracking-tight ${theme.accentText}`}
        >
          {buddyIdentity.customName}
        </p>
      )}

      <div className={mascotMotionClass}>
        <button
          type="button"
          onClick={handleMascotTap}
          disabled={!canTapMascot}
          aria-label={canTapMascot ? mascotTapHint : undefined}
          className={`relative flex ${avatarSize} items-center justify-center rounded-full border-0 p-0 transition duration-300 ${ringClass} ${mascot.bgColor} ${mascot.ringColor} ${glowClass} bg-transparent ${
            canTapMascot
              ? "cursor-pointer hover:brightness-[1.03] active:brightness-[0.98]"
              : "cursor-default"
          }`}
        >
          <MascotSvg
            phase={mascot.phase}
            level={level}
            temperament={mascot.temperament}
          />
          <GrowthBadge progress={growthProgress} />
          <span
            className={`pointer-events-none absolute -bottom-2 max-w-[5.5rem] truncate rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${theme.badgeBg}`}
          >
            {stageLabel ?? `Lv.${level}`}
          </span>
          {isThanking && (
            <span className="pointer-events-none absolute -right-1 -top-1 animate-bounce text-sm">
              {theme.thankEmoji}
            </span>
          )}
        </button>
      </div>

      {showTitle && (
        <p className={`text-[11px] font-medium ${theme.accentMuted}`}>
          {buddyIdentity.speciesEmoji} {buddyIdentity.speciesName}
        </p>
      )}

      <div
        key={isThanking ? "thank-bubble" : `bubble-${bubblePopKey}`}
        className={`relative w-full rounded-2xl text-left shadow-sm ring-1 ring-black/[0.03] ${theme.bubbleBg} ${
          compact ? "min-h-[4.5rem] px-2.5 py-2" : "max-w-xs px-4 py-3"
        } ${!isThanking ? "animate-bubble-pop" : ""}`}
      >
        <div
          className={`pointer-events-none absolute -top-2 left-8 h-4 w-4 rotate-45 ${theme.bubbleBg}`}
        />
        {!compact && (
          <BuddyTitle
            epithet={buddyIdentity.personaRole}
            customName={buddyIdentity.customName}
            epithetClassName={`text-left text-[10px] font-medium leading-snug ${theme.bubbleLabel}`}
            nameClassName={`text-left text-sm font-bold leading-tight ${theme.bubbleText}`}
            layout="stacked"
          />
        )}
        <p
          className={`leading-snug ${theme.bubbleText} ${
            compact
              ? "text-[11px] leading-relaxed break-keep whitespace-normal"
              : "mt-2 text-sm leading-relaxed"
          }`}
        >
          {isThanking ? thankSpeech : speech}
        </p>
        {canTapMascot && compact && mascotTapHint && (
          <p className={`mt-1 text-[8px] ${theme.bubbleLabel}`}>{mascotTapHint}</p>
        )}
      </div>
    </div>
  );
}
