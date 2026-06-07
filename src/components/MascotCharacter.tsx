"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BuddyTitle } from "@/components/BuddyTitle";
import { MascotSvg } from "@/components/MascotSvg";
import { getEvolutionTier, TIER_RING } from "@/lib/evolution";
import { triggerHapticTap } from "@/lib/haptics";
import { getTemperamentTheme } from "@/lib/mbti";
import type { BuddyIdentity, CompanionStage, MascotConfig } from "@/types";

interface MascotCharacterProps {
  mascot: MascotConfig;
  level: number;
  companionStage?: CompanionStage;
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
}: MascotCharacterProps) {
  const tier = getEvolutionTier(level);
  const ringClass = TIER_RING[tier];
  const theme = getTemperamentTheme(mascot.temperament);
  const glowClass = TIER_GLOW[tier] || theme.glowClass;

  const [isThanking, setIsThanking] = useState(false);
  const [isJellyBouncing, setIsJellyBouncing] = useState(false);
  const [bubblePopKey, setBubblePopKey] = useState(0);
  const prevThankTrigger = useRef(0);
  const prevSpeech = useRef(speech);
  const jellyTimer = useRef<number | undefined>(undefined);

  const canTapMascot =
    canCycleSpeech && Boolean(onMascotTap) && !isThanking && !isJellyBouncing;

  useEffect(() => {
    return () => window.clearTimeout(jellyTimer.current);
  }, []);

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

  const mascotMotionClass = isThanking
    ? "animate-mascot-thank"
    : isJellyBouncing
      ? "animate-mascot-jelly-bounce"
      : "animate-mascot-breathe";

  const avatarSize = compact ? "h-24 w-24" : "h-36 w-36";
  const gapClass = compact ? "gap-2" : "gap-4";

  return (
    <div className={`flex w-full flex-col items-center text-center ${gapClass}`}>
      {showTitle && (
        <BuddyTitle
          epithet={buddyIdentity.personaRole}
          customName={buddyIdentity.customName}
          epithetClassName={`text-[11px] font-medium leading-snug ${theme.accentMuted}`}
          nameClassName={`text-xl font-bold leading-tight ${theme.accentText}`}
        />
      )}

      <div className={mascotMotionClass}>
        <button
          type="button"
          onClick={handleMascotTap}
          disabled={!canTapMascot}
          aria-label={canTapMascot ? mascotTapHint : undefined}
          className={`relative flex ${avatarSize} items-center justify-center rounded-full ${ringClass} ${mascot.bgColor} ${mascot.ringColor} ${glowClass} border-0 bg-transparent p-0 transition ${
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
          <span
            className={`pointer-events-none absolute -bottom-2 max-w-[5.5rem] truncate rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${theme.badgeBg}`}
          >
            {stageLabel ?? `Lv.${level}`}
          </span>
          {companionStage === "star_spirit" && (
            <span className="pointer-events-none absolute -top-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-900">
              ✦
            </span>
          )}
          {isThanking && (
            <span className="pointer-events-none absolute -right-1 -top-1 animate-bounce text-sm">
              {theme.thankEmoji}
            </span>
          )}
        </button>
      </div>

      <div
        key={isThanking ? "thank-bubble" : `bubble-${bubblePopKey}`}
        className={`relative w-full rounded-2xl text-left shadow-md ${theme.bubbleBg} ${
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
