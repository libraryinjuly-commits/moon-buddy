"use client";

import { useMemo } from "react";

import { getLast7DaysConstellation } from "@/lib/weeklyConstellation";
import type { LocaleContent } from "@/lib/i18n/types";
import type { TemperamentTheme } from "@/types";
import type { DailyMoodLogEntry } from "@/types/moonBuddy";

interface WeeklyConstellationProps {
  open: boolean;
  dailyMoodLogs: DailyMoodLogEntry[];
  locale: LocaleContent;
  theme: TemperamentTheme;
  onClose: () => void;
}

const CARD_WIDTH = 280;
const CARD_HEIGHT = 200;

export function WeeklyConstellation({
  open,
  dailyMoodLogs,
  locale,
  theme,
  onClose,
}: WeeklyConstellationProps) {
  const { ui } = locale;
  const days = useMemo(
    () => getLast7DaysConstellation(dailyMoodLogs),
    [dailyMoodLogs],
  );

  const points = useMemo(() => {
    return days.map((day, index) => {
      const x = 24 + (index / Math.max(days.length - 1, 1)) * (CARD_WIDTH - 48);
      const y =
        day.hasLog
          ? 48 + ((index * 17) % 90)
          : CARD_HEIGHT / 2 + 12;
      return { ...day, x, y };
    });
  }, [days]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={ui.weeklyConstellationTitle}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-sm rounded-3xl border p-4 shadow-2xl ${theme.accentSoft} ${theme.accentBorder} bg-white/95`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 text-center">
          <p className={`text-[10px] font-semibold uppercase tracking-wide ${theme.accentMuted}`}>
            {ui.weeklyConstellationBadge}
          </p>
          <h2 className={`mt-0.5 text-base font-bold ${theme.accentText}`}>
            {ui.weeklyConstellationTitle}
          </h2>
          <p className={`mt-1 text-[11px] leading-relaxed ${theme.accentMuted}`}>
            {ui.weeklyConstellationDesc}
          </p>
        </div>

        <div
          className="relative mx-auto overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-950 via-violet-950 to-slate-950"
          style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        >
          {/* DUMMY: replace with illustrated constellation background asset */}
          <svg
            viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
            className="h-full w-full"
            aria-hidden
          >
            {points.map((point, index) => {
              if (index === 0) return null;
              const prev = points[index - 1];
              return (
                <line
                  key={`line-${point.date}`}
                  x1={prev.x}
                  y1={prev.y}
                  x2={point.x}
                  y2={point.y}
                  stroke={prev.hasLog && point.hasLog ? "#fde68a88" : "#ffffff22"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}
            {points.map((point) => (
              <g key={point.date}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={point.hasLog ? 7 : 4}
                  fill={point.color}
                  opacity={point.hasLog ? 1 : 0.35}
                />
                {point.hasLog && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={11}
                    fill="none"
                    stroke={point.color}
                    strokeWidth="1"
                    opacity="0.45"
                  />
                )}
              </g>
            ))}
          </svg>

          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-between px-3 text-[8px] text-white/50">
            <span>{ui.weeklyConstellationWeekStart}</span>
            <span>{ui.weeklyConstellationWeekEnd}</span>
          </div>
        </div>

        <ul className="mt-3 grid grid-cols-7 gap-1">
          {points.map((point) => (
            <li key={`legend-${point.date}`} className="flex flex-col items-center gap-0.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: point.color }}
              />
              <span className={`text-[7px] ${theme.accentMuted}`}>
                {point.date.slice(8)}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onClose}
          className={`mt-4 w-full rounded-xl py-2.5 text-xs font-bold text-white ${theme.accentButton}`}
        >
          {ui.weeklyConstellationClose}
        </button>
      </div>
    </div>
  );
}
