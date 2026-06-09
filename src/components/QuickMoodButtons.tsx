import type { LiveMood, TemperamentTheme } from "@/types";

interface QuickMoodOption {
  value: LiveMood;
  emoji: string;
  label: string;
}

interface QuickMoodButtonsProps {
  options: QuickMoodOption[];
  theme: TemperamentTheme;
  selectedMood?: LiveMood | null;
  onSelect: (mood: LiveMood) => void;
}

export function QuickMoodButtons({
  options,
  theme,
  selectedMood = null,
  onSelect,
}: QuickMoodButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          aria-pressed={selectedMood === option.value}
          className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border px-0.5 py-1.5 text-center shadow-sm transition active:scale-95 hover:opacity-90 ${theme.accentBorder} ${
            selectedMood === option.value
              ? `${theme.accentSoft} ring-2 ring-violet-300 ring-offset-1`
              : "bg-white/90"
          } ${theme.accentText}`}
        >
          <span className="text-base leading-none">{option.emoji}</span>
          <span className="text-[8px] font-bold leading-tight">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
