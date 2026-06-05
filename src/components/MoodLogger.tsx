import type { Mood } from "@/types";

interface MoodOption {
  value: Mood;
  label: string;
  emoji: string;
}

interface MoodLoggerProps {
  title: string;
  description: string;
  moodOptions: MoodOption[];
  todayMood: Mood | null;
  onLogMood: (mood: Mood) => void;
}

export function MoodLogger({
  title,
  description,
  moodOptions,
  todayMood,
  onLogMood,
}: MoodLoggerProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white/80 p-4 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-violet-900">{title}</h2>
      <p className="mb-4 text-sm text-violet-600">{description}</p>

      <div className="grid grid-cols-5 gap-2">
        {moodOptions.map((option) => {
          const isSelected = todayMood === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onLogMood(option.value)}
              className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition active:scale-95 ${
                isSelected
                  ? "border-violet-400 bg-violet-50 ring-2 ring-violet-300"
                  : "border-violet-100 bg-white hover:border-violet-200 hover:bg-violet-50"
              }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-[10px] font-medium text-violet-700">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
