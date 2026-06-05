"use client";

import { useEffect, useState } from "react";

import type { LocaleUI } from "@/lib/i18n/types";
import {
  getTemperamentFromMbti,
  getTemperamentTheme,
  MBTI_BY_GROUP,
  TEMPERAMENT_GROUPS,
} from "@/lib/mbti";
import { getDisplayName } from "@/lib/nameParticle";
import type { Language, TemperamentGroup } from "@/types";

interface ProfileSetupProps {
  userName: string;
  mbti: string;
  buddyCustomName: string;
  language: Language;
  ui: LocaleUI;
  levelOneEpithet: string;
  onSave: (userName: string, mbti: string, buddyCustomName: string) => void;
  accentBorder: string;
  accentMuted: string;
  accentText: string;
  accentButton: string;
  accentSoft: string;
}

export function ProfileSetup({
  userName,
  mbti,
  buddyCustomName,
  language,
  ui,
  levelOneEpithet,
  onSave,
  accentBorder,
  accentMuted,
  accentText,
  accentButton,
  accentSoft,
}: ProfileSetupProps) {
  const [nameInput, setNameInput] = useState(userName);
  const [mbtiInput, setMbtiInput] = useState(mbti);
  const [buddyNameInput, setBuddyNameInput] = useState(buddyCustomName);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNameInput(userName);
    setMbtiInput(mbti);
    setBuddyNameInput(buddyCustomName);
  }, [userName, mbti, buddyCustomName]);

  const temperament = getTemperamentFromMbti(mbtiInput || "INFP");
  const theme = getTemperamentTheme(temperament);
  const vocative = getDisplayName(nameInput, language);
  const resolvedBuddyName = buddyNameInput.trim() || theme.buddyName;
  const previewEpithet = levelOneEpithet;

  function handleSave() {
    onSave(nameInput.trim(), mbtiInput, buddyNameInput.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section
      className={`rounded-2xl border ${accentBorder} bg-white/80 p-4 shadow-sm`}
    >
      <h2 className={`mb-1 text-sm font-semibold ${accentText}`}>
        {ui.setupTitle}
      </h2>
      <p className={`mb-4 text-xs ${accentMuted}`}>{ui.setupDesc}</p>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={`text-sm font-medium ${accentText}`}>{ui.myName}</span>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder={ui.myNamePlaceholder}
            maxLength={12}
            className={`w-full rounded-xl border ${accentBorder} bg-white px-4 py-2.5 text-sm text-violet-950 outline-none transition focus:ring-2 focus:ring-violet-200`}
          />
          {nameInput.trim() && (
            <span className={`text-xs ${accentMuted}`}>
              {ui.vocativePreview}: <strong>{vocative}</strong>
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={`text-sm font-medium ${accentText}`}>
            {ui.buddyNameLabel}
          </span>
          <input
            type="text"
            value={buddyNameInput}
            onChange={(e) => setBuddyNameInput(e.target.value)}
            placeholder={`${ui.buddyNamePlaceholder} ${theme.buddyName}`}
            maxLength={12}
            className={`w-full rounded-xl border ${accentBorder} bg-white px-4 py-2.5 text-sm text-violet-950 outline-none transition focus:ring-2 focus:ring-violet-200`}
          />
          <span className={`text-xs ${accentMuted}`}>{ui.buddyNameHint}</span>
          <div className={`rounded-xl ${accentSoft} px-3 py-2`}>
            <p className={`text-xs ${accentMuted}`}>{ui.buddyPreviewLabel}</p>
            <p className={`mt-0.5 text-sm font-bold ${accentText}`}>
              {previewEpithet} {resolvedBuddyName}
            </p>
          </div>
        </label>

        <div className="flex flex-col gap-2">
          <span className={`text-sm font-medium ${accentText}`}>{ui.mbtiLabel}</span>
          <div className="grid grid-cols-4 gap-1.5">
            {TEMPERAMENT_GROUPS.map((group) => (
              <div key={group} className="col-span-4">
                <p className={`mb-1 text-[10px] font-bold ${accentMuted}`}>
                  {getTemperamentTheme(group).groupLabel}
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {MBTI_BY_GROUP[group as TemperamentGroup].map((type) => {
                    const isSelected = mbtiInput === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMbtiInput(type)}
                        className={`rounded-lg border px-1 py-2 text-xs font-semibold transition active:scale-95 ${
                          isSelected
                            ? `${accentButton} border-transparent text-white`
                            : `border ${accentBorder} bg-white ${accentText} hover:opacity-80`
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {mbtiInput && (
          <div className={`rounded-xl ${accentSoft} px-3 py-2.5`}>
            <p className={`text-xs font-semibold ${accentText}`}>
              {theme.groupLabel}
            </p>
            <p className={`mt-0.5 text-xs ${accentMuted}`}>
              {theme.groupDescription}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98] ${accentButton}`}
        >
          {saved ? ui.profileSaved : ui.profileSave}
        </button>
      </div>
    </section>
  );
}
