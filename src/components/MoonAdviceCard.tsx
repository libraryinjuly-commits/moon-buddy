import type { AdviceItem } from "@/types";

interface MoonAdviceCardProps {
  title: string;
  adviceItems: AdviceItem[];
  closing: string;
}

export function MoonAdviceCard({ title, adviceItems, closing }: MoonAdviceCardProps) {
  return (
    <section className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/60 p-4 shadow-sm">
      <h2 className="mb-3 text-base font-bold text-violet-900">{title}</h2>

      <ul className="flex flex-col gap-3">
        {adviceItems.map((item) => (
          <li
            key={item.label}
            className="rounded-xl bg-white/80 px-3 py-3 shadow-sm"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-xs font-bold text-indigo-600">{item.label}</span>
            </div>
            <p className="text-sm leading-relaxed text-violet-800">{item.text}</p>
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-xl bg-violet-50 px-3 py-3 text-sm leading-relaxed text-violet-800">
        {closing}
      </p>
    </section>
  );
}
