"use client";

import { Share } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ShareBottomSheet } from "@/components/ShareBottomSheet";
import type { LocaleUI } from "@/lib/i18n/types";

const TOAST_DURATION_MS = 2400;

interface AppHeaderProps {
  logoColorClass?: string;
  ui: LocaleUI;
}

export function AppHeader({
  logoColorClass = "text-[#709BBF]",
  ui,
}: AppHeaderProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(ui.shareCopiedToast);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(
      () => setToastVisible(false),
      TOAST_DURATION_MS,
    );
  }, []);

  return (
    <>
      <header
        className="flex-shrink-0 px-4 pb-2"
        style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))" }}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className={`font-[family-name:var(--font-dm-sans)] text-[15px] font-semibold tracking-tight ${logoColorClass}`}
            aria-label="Moon Buddy"
          >
            Moon Buddy
          </p>

          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-label={ui.shareSheetTitle}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition active:scale-95 ${logoColorClass} hover:bg-black/5`}
          >
            <Share className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </header>

      <ShareBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        ui={ui}
        onCopied={() => showToast(ui.shareCopiedToast)}
        onError={(message) => showToast(message)}
      />

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-violet-900/90 px-4 py-2 text-xs font-medium text-white shadow-lg transition-all duration-300 ${
          toastVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0"
        }`}
      >
        {toastMessage}
      </div>
    </>
  );
}
