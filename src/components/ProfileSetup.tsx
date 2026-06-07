"use client";

import { useEffect, useState } from "react";

import { LanguageSelector } from "@/components/LanguageSelector";
import type { LocaleUI } from "@/lib/i18n/types";
import {
  getMbtiTypeTitle,
  getTemperamentFromMbti,
  getTemperamentTheme,
  MBTI_BY_GROUP,
  TEMPERAMENT_GROUPS,
} from "@/lib/mbti";
import type { MbtiTypeTitles } from "@/lib/mbtiTitles";
import { getDisplayName } from "@/lib/nameParticle";
import {
  formatPersonaTitle,
  getPersonaDefinition,
  resolveCharacterName,
} from "@/lib/persona";
import type { Language, TemperamentGroup } from "@/types";

interface ProfileSetupProps {
  userName: string;
  mbti: string;
  buddyCustomName: string;
  language: Language;
  ui: LocaleUI;
  mbtiTypeTitles: MbtiTypeTitles;
  onSave: (
    userName: string,
    mbti: string,
    buddyCustomName: string,
    language: Language,
  ) => void;
  accentBorder: string;
  accentMuted: string;
  accentText: string;
  accentButton: string;
  accentSoft: string;
  variant?: "onboarding" | "edit";
}

export function ProfileSetup({
  userName,
  mbti,
  buddyCustomName,
  language,
  ui,
  mbtiTypeTitles,
  onSave,
  accentBorder,
  accentMuted,
  accentText,
  accentButton,
  accentSoft,
  variant = "onboarding",
}: ProfileSetupProps) {
  const [nameInput, setNameInput] = useState(userName);
  const [mbtiInput, setMbtiInput] = useState(mbti);
  const [buddyNameInput, setBuddyNameInput] = useState(buddyCustomName);
  const [languageInput, setLanguageInput] = useState<Language>(language);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNameInput(userName);
    setMbtiInput(mbti);
    setBuddyNameInput(buddyCustomName);
    setLanguageInput(language);
  }, [userName, mbti, buddyCustomName, language]);

  const temperament = getTemperamentFromMbti(mbtiInput || "INFP");
  const theme = getTemperamentTheme(temperament);
  const persona = getPersonaDefinition(temperament, languageInput);
  const vocative = getDisplayName(nameInput, languageInput);
  const resolvedBuddyName = resolveCharacterName(
    buddyNameInput,
    persona.defaultBuddyName,
  );
  const previewTitle = formatPersonaTitle(persona.personaRole, resolvedBuddyName);
  const selectedMbtiTitle = getMbtiTypeTitle(mbtiInput, mbtiTypeTitles);

  function handleSave() {
    onSave(
      nameInput.trim(),
      mbtiInput,
      buddyNameInput.trim(),
      languageInput,
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const languageSelector = (
    <LanguageSelector
      language={languageInput}
      label={ui.languageLabel}
      onChange={setLanguageInput}
      accentBorder={accentBorder}
      accentText={accentText}
      accentButton={accentButton}
      showNativeLabels
    />
  );

  return (
    <section
      className={`rounded-2xl border ${accentBorder} bg-white/80 p-4 shadow-sm`}
    >
      <h2 className={`mb-1 text-sm font-semibold ${accentText}`}>
        {variant === "edit" ? ui.profileEditTitle : ui.setupTitle}
      </h2>
      <p className={`mb-4 text-xs ${accentMuted}`}>
        {variant === "edit" ? ui.profileEditDesc : ui.setupDesc}
      </p>

      <div className="flex flex-col gap-4">
        {variant === "onboarding" && languageSelector}

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
            placeholder={`${ui.buddyNamePlaceholder} ${persona.defaultBuddyName}`}
            maxLength={12}
            className={`w-full rounded-xl border ${accentBorder} bg-white px-4 py-2.5 text-sm text-violet-950 outline-none transition focus:ring-2 focus:ring-violet-200`}
          />
          <span className={`text-xs ${accentMuted}`}>{ui.buddyNameHint}</span>
          <div className={`rounded-xl ${accentSoft} px-3 py-2`}>
            <p className={`text-xs ${accentMuted}`}>{persona.personaLabel}</p>
            <p className={`mt-0.5 text-xs ${accentMuted}`}>{ui.buddyPreviewLabel}</p>
            <p className={`mt-0.5 text-sm font-bold ${accentText}`}>
              {previewTitle}
            </p>
          </div>
        </label>

        <div className="flex flex-col gap-2">
          <span className={`text-sm font-medium ${accentText}`}>{ui.mbtiLabel}</span>
          <div className="flex flex-col gap-2.5">
            {TEMPERAMENT_GROUPS.map((group) => (
              <div key={group} className="grid grid-cols-4 gap-1.5">
                {MBTI_BY_GROUP[group as TemperamentGroup].map((type) => {
                  const isSelected = mbtiInput === type;
                  const typeTitle = mbtiTypeTitles[type];

                  return (
                    <div key={type} className="flex min-w-0 flex-col gap-0.5">
                      <p
                        className={`min-h-[2.4rem] text-center text-[8px] font-semibold leading-tight break-keep ${accentMuted}`}
                        title={typeTitle}
                      >
                        {typeTitle}
                      </p>
                      <button
                        type="button"
                        onClick={() => setMbtiInput(type)}
                        aria-label={`${type} ${typeTitle}`}
                        className={`rounded-lg border px-1 py-2 text-xs font-semibold transition active:scale-95 ${
                          isSelected
                            ? `${accentButton} border-transparent text-white`
                            : `border ${accentBorder} bg-white ${accentText} hover:opacity-80`
                        }`}
                      >
                        {type}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {mbtiInput && selectedMbtiTitle && (
          <div className={`rounded-xl ${accentSoft} px-3 py-2.5`}>
            <p className={`text-[10px] font-bold ${accentMuted}`}>{mbtiInput}</p>
            <p className={`mt-0.5 text-xs font-semibold ${accentText}`}>
              {selectedMbtiTitle}
            </p>
            <p className={`mt-0.5 text-xs ${accentMuted}`}>
              {theme.groupDescription}
            </p>
            <p className={`mt-1 text-xs font-medium ${accentText}`}>
              {persona.personaLabel}
            </p>
          </div>
        )}

        {variant === "edit" && languageSelector}

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
