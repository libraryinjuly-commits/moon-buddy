"use client";

import { useState } from "react";

import { FortuneCookieSheet } from "@/components/FortuneCookieSheet";
import type { LocaleUI } from "@/lib/i18n/types";
import type { BuddyIdentity, TemperamentTheme } from "@/types";

interface FortuneCookieFloatingProps {
  isOpenedToday: boolean;
  todayMessage: string | null;
  onOpen: () => string;
  buddyIdentity: BuddyIdentity;
  theme: TemperamentTheme;
  ui: LocaleUI;
}

export function FortuneCookieFloating({
  isOpenedToday,
  todayMessage,
  onOpen,
  buddyIdentity,
  theme,
  ui,
}: FortuneCookieFloatingProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);
  const [isReopen, setIsReopen] = useState(false);

  function handleClick() {
    const alreadyOpen = isOpenedToday && todayMessage !== null;
    const message = alreadyOpen ? todayMessage : onOpen();
    setDisplayMessage(message);
    setIsReopen(alreadyOpen);
    setSheetOpen(true);
  }

  function handleClose() {
    setSheetOpen(false);
  }

  const icon = isOpenedToday ? "📭" : "🥠";
  const label = isOpenedToday
    ? ui.fortuneCookieOpenedLabel
    : ui.fortuneCookieLabel;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        className={`group absolute -right-1 top-2 z-10 flex flex-col items-center gap-0.5 transition active:scale-95 ${
          isOpenedToday ? "animate-none opacity-90" : "animate-fortune-float"
        }`}
      >
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 bg-white/90 text-xl shadow-lg ring-2 ${theme.accentBorder} ${theme.glowClass}`}
        >
          {icon}
        </span>
        <span
          className={`max-w-[4.5rem] rounded-full px-1.5 py-0.5 text-[8px] font-semibold leading-tight text-white shadow-sm ${theme.badgeBg}`}
        >
          {label}
        </span>
      </button>

      {displayMessage && (
        <FortuneCookieSheet
          open={sheetOpen}
          message={displayMessage}
          isOpenedToday={isReopen}
          buddyIdentity={buddyIdentity}
          theme={theme}
          title={ui.fortuneCookieTitle}
          subtitle={ui.fortuneCookieSubtitle}
          openedHint={ui.fortuneCookieOpenedHint}
          closeLabel={ui.fortuneCookieClose}
          onClose={handleClose}
        />
      )}
    </>
  );
}
