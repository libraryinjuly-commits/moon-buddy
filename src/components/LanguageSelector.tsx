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
  compact?: boolean;
}

export function LanguageSelector({
  language,
  label,
  onChange,
  accentBorder,
  accentText,
  accentButton,
  compact = false,
}: LanguageSelectorProps) {
  return (
    <div
      className={`flex items-center justify-between border ${accentBorder} bg-white/80 shadow-sm ${
        compact ? "rounded-xl px-2.5 py-1.5" : "rounded-2xl px-4 py-3"
      }`}
    >
      <span className={`font-medium ${accentText} ${compact ? "text-[10px]" : "text-sm"}`}>
        {label}
      </span>
      <div className="flex gap-1">
        {LANGUAGES.map((item) => {
          const isSelected = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => onChange(item.code)}
              className={`rounded-lg font-semibold transition active:scale-95 ${
                compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
              } ${
                isSelected
                  ? `${accentButton} text-white`
                  : `border ${accentBorder} bg-white ${accentText} hover:opacity-80`
              }`}
            >
              {item.code}
            </button>
          );
        })}
      </div>
    </div>
  );
}
