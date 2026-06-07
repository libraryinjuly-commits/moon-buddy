import type { ReactNode } from "react";

import type { AppTab, TemperamentTheme } from "@/types";

interface TabItem {
  id: AppTab;
  label: string;
  emoji?: string;
  icon?: ReactNode;
}

interface TabBarProps {
  activeTab: AppTab;
  tabs: TabItem[];
  theme: TemperamentTheme;
  onChange: (tab: AppTab) => void;
}

export function TabBar({ activeTab, tabs, theme, onChange }: TabBarProps) {
  return (
    <nav
      className={`flex-shrink-0 border-t ${theme.accentBorder} bg-white/92 backdrop-blur-md`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-12 items-stretch">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 transition active:scale-95 ${
                isActive ? theme.accentText : theme.accentMuted
              }`}
            >
              {tab.icon ? (
                <span className="flex h-[18px] w-[18px] items-center justify-center [&>svg]:h-[18px] [&>svg]:w-[18px]">
                  {tab.icon}
                </span>
              ) : (
                <span className="text-lg leading-none">{tab.emoji}</span>
              )}
              <span
                className={`text-[9px] font-bold leading-none ${
                  isActive ? theme.accentText : ""
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className={`mt-0.5 h-0.5 w-5 rounded-full ${theme.accentButton}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
