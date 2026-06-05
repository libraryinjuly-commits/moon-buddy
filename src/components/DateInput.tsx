interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ id, label, value, onChange }: DateInputProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-violet-700">{label}</span>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-base text-violet-950 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
      />
    </label>
  );
}
