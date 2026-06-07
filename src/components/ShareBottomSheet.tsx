"use client";

import { Link2, Share2, X } from "lucide-react";
import { useState } from "react";

import { isKakaoShareAvailable, shareViaKakao } from "@/lib/kakaoShare";
import {
  copyShareUrl,
  isSystemShareAvailable,
  shareViaSystem,
} from "@/lib/share";
import type { LocaleUI } from "@/lib/i18n/types";

interface ShareBottomSheetProps {
  open: boolean;
  onClose: () => void;
  ui: LocaleUI;
  onCopied: () => void;
  onError?: (message: string) => void;
}

function KakaoIcon() {
  return (
    <span
      className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3C1E1E] text-[10px] font-black text-[#FEE500]"
      aria-hidden
    >
      TALK
    </span>
  );
}

export function ShareBottomSheet({
  open,
  onClose,
  ui,
  onCopied,
  onError,
}: ShareBottomSheetProps) {
  const [busy, setBusy] = useState<string | null>(null);

  if (!open) return null;

  async function handleKakao() {
    if (!isKakaoShareAvailable()) {
      onError?.(ui.shareKakaoUnavailable);
      return;
    }
    setBusy("kakao");
    try {
      await shareViaKakao();
      onClose();
    } catch {
      onError?.(ui.shareKakaoFailed);
    } finally {
      setBusy(null);
    }
  }

  async function handleCopyLink() {
    setBusy("copy");
    try {
      await copyShareUrl();
      onCopied();
      onClose();
    } catch {
      onError?.(ui.shareCopyFailed);
    } finally {
      setBusy(null);
    }
  }

  async function handleSystemShare() {
    if (!isSystemShareAvailable()) {
      onError?.(ui.shareSystemUnavailable);
      return;
    }
    setBusy("system");
    try {
      const result = await shareViaSystem();
      if (result !== "cancelled") onClose();
    } catch {
      onError?.(ui.shareSystemFailed);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label={ui.shareSheetClose}
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-sheet-title"
        className="relative w-full max-w-[450px] animate-[sheet-rise_0.35s_ease-out] rounded-t-3xl border-t border-white/15 bg-gradient-to-b from-slate-900/96 via-indigo-950/96 to-slate-950/98 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="share-sheet-title"
            className="text-sm font-bold tracking-tight text-white/95"
          >
            {ui.shareSheetTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.shareSheetClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
          >
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleKakao}
            disabled={busy !== null}
            className="flex w-full items-center gap-3 rounded-2xl bg-[#FEE500] px-4 py-3.5 text-left font-bold text-[#191919] shadow-lg transition active:scale-[0.99] disabled:opacity-60"
          >
            <KakaoIcon />
            <span className="text-sm">{ui.shareKakao}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            disabled={busy !== null}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/12 bg-white/10 px-4 py-3.5 text-left text-white/95 backdrop-blur-md transition active:scale-[0.99] disabled:opacity-60"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Link2 className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <span className="text-sm font-semibold">{ui.shareCopyLink}</span>
          </button>

          <button
            type="button"
            onClick={handleSystemShare}
            disabled={busy !== null}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3.5 text-left text-white/90 backdrop-blur-md transition active:scale-[0.99] disabled:opacity-60"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Share2 className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <span className="text-sm font-semibold">{ui.shareSystem}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
