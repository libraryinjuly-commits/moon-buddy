"use client";

import { useEffect, useRef, useState } from "react";

import { BuddyTitle } from "@/components/BuddyTitle";
import { MascotSvg } from "@/components/MascotSvg";
import { getEvolutionTier, TIER_RING } from "@/lib/evolution";
import { getTemperamentTheme } from "@/lib/mbti";
import type { BuddyIdentity, MascotConfig } from "@/types";

interface MascotCharacterProps {
  mascot: MascotConfig;
  level: number;
  speech: string;
  thankSpeech: string;
  buddyIdentity: BuddyIdentity;
  thankTrigger?: number;
  compact?: boolean;
  showTitle?: boolean;
  onSpeechClick?: () => void;
  speechTapHint?: string;
  canCycleSpeech?: boolean;
}

const TIER_GLOW: Record<number, string> = {
  1: "",
  2: "shadow-lg",
  3: "shadow-xl",
  4: "shadow-2xl",
};

const THANK_ANIMATION_MS = 700;

export function MascotCharacter({
  mascot,
  level,
  speech,
  thankSpeech,
  buddyIdentity,
  thankTrigger = 0,
  compact = false,
  showTitle = true,
  onSpeechClick,
  speechTapHint,
  canCycleSpeech = false,
}: MascotCharacterProps) {
  const tier = getEvolutionTier(level);
  const ringClass = TIER_RING[tier];
  const theme = getTemperamentTheme(mascot.temperament);
  const glowClass = TIER_GLOW[tier] || theme.glowClass;

  const [isThanking, setIsThanking] = useState(false);
  const [speechAnimKey, setSpeechAnimKey] = useState(0);
  const prevThankTrigger = useRef(0);
  const prevSpeech = useRef(speech);

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
      setSpeechAnimKey((key) => key + 1);
    }
  }, [speech, isThanking]);

  const motionClass = isThanking
    ? "animate-mascot-thank"
    : "animate-mascot-breathe";

  const avatarSize = compact ? "h-24 w-24" : "h-36 w-36";
  const gapClass = compact ? "gap-2" : "gap-4";
  const bubbleInteractive = canCycleSpeech && onSpeechClick && !isThanking;

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

      <div className={motionClass}>
        <div
          className={`relative flex ${avatarSize} items-center justify-center rounded-full ${ringClass} ${mascot.bgColor} ${mascot.ringColor} ${glowClass}`}
        >
          <MascotSvg
            phase={mascot.phase}
            level={level}
            temperament={mascot.temperament}
          />
          <span
            className={`absolute -bottom-2 rounded-full px-2 py-0.5 text-xs font-bold text-white ${theme.badgeBg}`}
          >
            Lv.{level}
          </span>
          {tier >= 4 && (
            <span className="absolute -top-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-900">
              MAX
            </span>
          )}
          {isThanking && (
            <span className="absolute -right-1 -top-1 animate-bounce text-sm">
              {theme.thankEmoji}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={bubbleInteractive ? onSpeechClick : undefined}
        disabled={!bubbleInteractive}
        aria-label={bubbleInteractive ? speechTapHint : undefined}
        className={`relative w-full rounded-2xl text-left shadow-md transition ${theme.bubbleBg} ${
          compact ? "min-h-[4.5rem] px-2.5 py-2" : "max-w-xs px-4 py-3"
        } ${
          bubbleInteractive
            ? "cursor-pointer active:scale-[0.99] hover:brightness-[0.98]"
            : "cursor-default"
        }`}
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
          key={isThanking ? "thank" : `speech-${speechAnimKey}`}
          className={`leading-snug ${theme.bubbleText} ${
            compact
              ? "text-[11px] leading-relaxed break-keep whitespace-normal"
              : "mt-2 text-sm leading-relaxed"
          } ${!isThanking ? "animate-speech-fade-in" : ""}`}
        >
          {isThanking ? thankSpeech : speech}
        </p>
        {bubbleInteractive && compact && speechTapHint && (
          <p className={`mt-1 text-[8px] ${theme.bubbleLabel}`}>{speechTapHint}</p>
        )}
      </button>
    </div>
  );
}
