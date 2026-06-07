"use client";

import { X } from "lucide-react";

import type { BuddyIdentity, TemperamentTheme } from "@/types";

interface FortuneCookieSheetProps {
  open: boolean;
  message: string;
  isOpenedToday: boolean;
  buddyIdentity: BuddyIdentity;
  theme: TemperamentTheme;
  title: string;
  subtitle: string;
  openedHint: string;
  closeLabel: string;
  onClose: () => void;
}

export function FortuneCookieSheet({
  open,
  message,
  isOpenedToday,
  buddyIdentity,
  theme,
  title,
  subtitle,
  openedHint,
  closeLabel,
  onClose,
}: FortuneCookieSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-[450px] animate-[sheet-rise_0.35s_ease-out] rounded-t-3xl border-t ${theme.accentBorder} ${theme.bubbleBg} px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 shadow-2xl`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fortune-cookie-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full ${theme.accentSoft} ${theme.accentMuted}`}
        >
          <X className="h-4 w-4" strokeWidth={2.25} />
        </button>

        <div className="mb-4 text-center">
          <p className="text-3xl" aria-hidden>
            {isOpenedToday ? "🥠" : "✨"}
          </p>
          <h2
            id="fortune-cookie-title"
            className={`mt-2 text-base font-bold ${theme.accentText}`}
          >
            {title}
          </h2>
          <p className={`mt-1 text-xs ${theme.accentMuted}`}>
            {buddyIdentity.personaRole} {buddyIdentity.customName}
          </p>
          <p className={`mt-0.5 text-[10px] ${theme.accentMuted}`}>
            {subtitle}
          </p>
        </div>

        <div
          className={`rounded-2xl border ${theme.accentBorder} bg-white/70 px-4 py-4 shadow-inner`}
        >
          <p
            className={`text-center text-sm leading-relaxed ${theme.bubbleText} animate-speech-fade-in`}
          >
            {message}
          </p>
        </div>

        {isOpenedToday && (
          <p className={`mt-3 text-center text-[10px] ${theme.accentMuted}`}>
            {openedHint}
          </p>
        )}
      </div>
    </div>
  );
}
