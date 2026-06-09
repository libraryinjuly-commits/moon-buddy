"use client";

interface StarFragmentToastProps {
  message: string;
  visible: boolean;
}

export function StarFragmentToast({ message, visible }: StarFragmentToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-24 left-1/2 z-[60] max-w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0"
      }`}
    >
      <div className="animate-star-fragment-toast flex items-center gap-2 rounded-2xl border border-amber-200/40 bg-gradient-to-r from-violet-900/95 via-indigo-900/95 to-violet-900/95 px-4 py-3 shadow-xl shadow-violet-900/25">
        <span className="animate-star-fragment-sparkle text-lg" aria-hidden>
          ✦
        </span>
        <p className="text-left text-xs font-medium leading-snug text-white">
          {message}
        </p>
      </div>
    </div>
  );
}
