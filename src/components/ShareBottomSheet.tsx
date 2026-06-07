"use client";

import { Link2, Share2, X } from "lucide-react";
import { useState } from "react";

import { copyShareUrl, shareMoonBuddy } from "@/lib/share";
import type { LocaleUI } from "@/lib/i18n/types";

interface ShareBottomSheetProps {
  open: boolean;
  onClose: () => void;
  ui: LocaleUI;
  onCopied: () => void;
  onError?: (message: string) => void;
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

  async function handleShare() {
    setBusy("share");
    try {
      const result = await shareMoonBuddy();
      if (result === "copied") {
        onCopied();
      }
      onClose();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      onError?.(ui.shareFailed);
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
        className="relative w-full max-w-[450px] animate-[sheet-rise_0.35s_ease-out] rounded-t-3xl border-t border-white/15 bg-gradient-to-b from-slate-900/96 via-indigo-950/96 to-slate-950/98 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="share-sheet-title"
            className="text-base font-bold tracking-tight text-white/95"
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

        <div className="flex min-h-[9.5rem] flex-col justify-center gap-3">
          <button
            type="button"
            disabled={busy !== null}
            onClick={handleShare}
            className="flex w-full min-h-[3.75rem] items-center gap-3.5 rounded-2xl bg-violet-500 px-4 py-4 text-left font-bold text-white shadow-lg shadow-violet-500/25 transition active:scale-[0.99] disabled:opacity-60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Share2 className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </span>
            <span className="text-[15px] leading-snug">{ui.shareApp}</span>
          </button>

          <button
            type="button"
            disabled={busy !== null}
            onClick={handleCopyLink}
            className="flex w-full min-h-[3.75rem] items-center gap-3.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-left text-white/95 backdrop-blur-md transition active:scale-[0.99] disabled:opacity-60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12">
              <Link2 className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <span className="text-[15px] font-semibold leading-snug">
              {ui.shareCopyLink}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
