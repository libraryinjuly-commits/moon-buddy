"use client";

import { LANGUAGES } from "@/lib/i18n";
import type { Language } from "@/types";

interface LanguageSelectorProps {
  language: Language;
  label: string;
  onChange: (language: Language) => void;
  accentBorder: string;
  accentText: string;
  accentButton: string;
  accentMuted?: string;
  compact?: boolean;
  showNativeLabels?: boolean;
}

export function LanguageSelector({
  language,
  label,
  onChange,
  accentBorder,
  accentText,
  accentButton,
  accentMuted,
  compact = false,
  showNativeLabels = false,
}: LanguageSelectorProps) {
  return (
    <div
      className={`flex flex-col gap-2 border ${accentBorder} bg-white/80 shadow-sm ${
        compact ? "rounded-xl px-2.5 py-1.5" : "rounded-2xl px-4 py-3"
      } ${showNativeLabels ? "" : "flex-row items-center justify-between"}`}
    >
      <span
        className={`font-medium ${accentText} ${
          compact ? "text-[10px]" : "text-sm"
        }`}
      >
        {label}
      </span>
      <div className={`flex gap-1.5 ${showNativeLabels ? "w-full" : ""}`}>
        {LANGUAGES.map((item) => {
          const isSelected = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => onChange(item.code)}
              className={`rounded-xl font-semibold transition active:scale-95 ${
                showNativeLabels
                  ? "flex-1 px-2 py-2.5 text-xs"
                  : compact
                    ? "px-2 py-1 text-[10px]"
                    : "px-3 py-1.5 text-xs"
              } ${
                isSelected
                  ? `${accentButton} text-white shadow-sm`
                  : `border ${accentBorder} bg-white ${accentText} hover:opacity-80`
              }`}
            >
              {showNativeLabels ? item.label : item.code}
            </button>
          );
        })}
      </div>
    </div>
  );
}
