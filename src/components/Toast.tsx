"use client";

interface ToastProps {
  message: string;
  visible: boolean;
  className?: string;
}

export function Toast({ message, visible, className = "" }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-24 left-1/2 z-[60] max-w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl bg-violet-900/92 px-4 py-2.5 text-center text-xs font-medium leading-snug text-white shadow-lg transition-all duration-300 ${className} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
