"use client";

import { isDevelopmentEnvironment } from "@/lib/isQA";

interface FloatingDebugButtonProps {
  onClick: () => void;
}

export function FloatingDebugButton({ onClick }: FloatingDebugButtonProps) {
  const label = isDevelopmentEnvironment() ? "DEV" : "QA";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open QA panel"
      className="absolute bottom-[4.25rem] right-2.5 z-[100] rounded-full border-2 border-violet-300/80 bg-violet-700 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-600 active:scale-95"
    >
      {label}
    </button>
  );
}
