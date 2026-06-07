"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { triggerHapticTap } from "@/lib/haptics";
import type { LocaleContent } from "@/lib/i18n/types";
import { STAR_TYPE_EMOJI } from "@/lib/starVisuals";
import type { StarMemory, TemperamentTheme } from "@/types";

type AscensionPhase =
  | "darken"
  | "glow"
  | "float"
  | "dialogue"
  | "transform"
  | "fly"
  | "done";

interface AscensionModalProps {
  open: boolean;
  companionName: string;
  locale: LocaleContent;
  theme: TemperamentTheme;
  onComplete: () => StarMemory | void;
  onClose: () => void;
}

const PHASE_MS: Record<AscensionPhase, number> = {
  darken: 600,
  glow: 900,
  float: 1200,
  dialogue: 2800,
  transform: 1400,
  fly: 1600,
  done: 0,
};

export function AscensionModal({
  open,
  companionName,
  locale,
  theme,
  onComplete,
  onClose,
}: AscensionModalProps) {
  const { ui } = locale;
  const [phase, setPhase] = useState<AscensionPhase>("darken");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const hasPersistedStar = useRef(false);

  const dialogues = ui.ascensionDialogues.map((line) =>
    line.replace("{companionName}", companionName),
  );

  const advance = useCallback(() => {
    setPhase((current) => {
      const order: AscensionPhase[] = [
        "darken",
        "glow",
        "float",
        "dialogue",
        "transform",
        "fly",
        "done",
      ];
      const idx = order.indexOf(current);
      return order[Math.min(idx + 1, order.length - 1)] ?? "done";
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setPhase("darken");
      setDialogueIndex(0);
      hasPersistedStar.current = false;
      return;
    }

    if (phase === "darken") {
      triggerHapticTap(50);
    }

    if (phase === "transform" && !hasPersistedStar.current) {
      hasPersistedStar.current = true;
      onComplete();
    }

    if (phase === "done") return;

    const delay = PHASE_MS[phase];
    const timer = window.setTimeout(advance, delay);
    return () => window.clearTimeout(timer);
  }, [open, phase, advance, onComplete]);

  useEffect(() => {
    if (phase !== "dialogue" || !open) return;
    if (dialogueIndex >= dialogues.length - 1) return;
    const timer = window.setTimeout(
      () => setDialogueIndex((i) => i + 1),
      1400,
    );
    return () => window.clearTimeout(timer);
  }, [phase, dialogueIndex, dialogues.length, open]);

  if (!open) return null;

  const showGlow = ["glow", "float", "dialogue", "transform", "fly"].includes(
    phase,
  );
  const showFloat = ["float", "dialogue", "transform", "fly"].includes(phase);
  const showStar = ["transform", "fly", "done"].includes(phase);
  const showFly = phase === "fly" || phase === "done";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
      role="dialog"
      aria-modal
      aria-label={ui.ascensionTitle}
    >
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          phase === "darken" ? "bg-black/20" : "bg-indigo-950/75"
        }`}
      />

      {showGlow && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="animate-ascension-particle absolute h-1 w-1 rounded-full bg-amber-200/80"
              style={{
                left: `${8 + i * 7}%`,
                top: `${20 + (i % 4) * 15}%`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div
          className={`relative transition-all duration-1000 ease-out ${
            showFloat ? "-translate-y-8 scale-105" : ""
          } ${showFly ? "-translate-y-24 scale-50 opacity-0" : ""}`}
        >
          <div
            className={`flex h-28 w-28 items-center justify-center rounded-full shadow-2xl transition-all duration-700 ${
              showGlow
                ? "animate-ascension-glow bg-gradient-to-br from-violet-300 via-fuchsia-200 to-amber-200"
                : "bg-gradient-to-br from-violet-200 to-indigo-200"
            }`}
          >
            <span
              className={`text-5xl transition-all duration-700 ${
                showStar ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              🌙
            </span>
            <span
              className={`absolute text-5xl transition-all duration-700 ${
                showStar ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              {STAR_TYPE_EMOJI.golden}
            </span>
          </div>
        </div>

        {phase === "dialogue" && (
          <p
            className={`mt-6 max-w-xs animate-speech-fade-in text-base font-medium leading-relaxed text-white`}
          >
            {dialogues[dialogueIndex]}
          </p>
        )}

        {(phase === "transform" || phase === "fly") && (
          <p className="mt-6 animate-speech-fade-in text-sm font-semibold text-amber-100">
            {ui.ascensionBecomingStar}
          </p>
        )}

        {phase === "done" && (
          <p className="mt-4 text-sm text-white/90">{ui.ascensionComplete}</p>
        )}
      </div>

      {phase === "dialogue" && (
        <button
          type="button"
          onClick={advance}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg ${theme.accentButton}`}
        >
          {ui.ascensionContinue}
        </button>
      )}

      {phase === "done" && (
        <button
          type="button"
          onClick={onClose}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg ${theme.accentButton}`}
        >
          {ui.ascensionMeetNewSeed}
        </button>
      )}
    </div>
  );
}
