"use client";

import { useEffect, useState } from "react";

import { LanguageSelector } from "@/components/LanguageSelector";
import type { LocaleUI } from "@/lib/i18n/types";
import { CompanionPortrait } from "@/components/CompanionPortrait";
import { getCompanionSpecies } from "@/lib/companionSpecies";
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
import type { MbtiTypeKey } from "@/lib/mbti";
import type { Language, TemperamentGroup } from "@/types";

interface ProfileSetupProps {
  userName: string;
  mbtiType: MbtiTypeKey;
  buddyCustomName: string;
  language: Language;
  ui: LocaleUI;
  mbtiTypeTitles: MbtiTypeTitles;
  onSave: (
    userName: string,
    mbtiType: MbtiTypeKey,
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
  mbtiType,
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
  const [mbtiTypeInput, setMbtiTypeInput] = useState<MbtiTypeKey>(mbtiType);
  const [buddyNameInput, setBuddyNameInput] = useState(buddyCustomName);
  const [languageInput, setLanguageInput] = useState<Language>(language);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNameInput(userName);
    setMbtiTypeInput(mbtiType);
    setBuddyNameInput(buddyCustomName);
    setLanguageInput(language);
  }, [userName, mbtiType, buddyCustomName, language]);

  const mbtiCode = mbtiTypeInput.toUpperCase();
  const temperament = getTemperamentFromMbti(mbtiCode);
  const theme = getTemperamentTheme(temperament);
  const species = getCompanionSpecies(temperament);
  const persona = getPersonaDefinition(temperament, languageInput);
  const vocative = getDisplayName(nameInput, languageInput);
  const resolvedBuddyName = resolveCharacterName(
    buddyNameInput,
    persona.defaultBuddyName,
  );
  const previewTitle = formatPersonaTitle(persona.personaRole, resolvedBuddyName);
  const selectedMbtiTitle = getMbtiTypeTitle(mbtiCode, mbtiTypeTitles);

  function handleSave() {
    onSave(
      nameInput.trim(),
      mbtiTypeInput,
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
                  const typeKey = type.toLowerCase() as MbtiTypeKey;
                  const isSelected = mbtiTypeInput === typeKey;
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
                        onClick={() => setMbtiTypeInput(typeKey)}
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

        {mbtiTypeInput && selectedMbtiTitle && (
          <div className={`rounded-xl ${accentSoft} px-3 py-2.5`}>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${theme.accentSoft}`}
              >
                <CompanionPortrait
                  phase="default"
                  level={1}
                  temperament={temperament}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-[10px] font-bold ${accentMuted}`}>
                  {mbtiCode} · {theme.groupLabel}
                </p>
                <p className={`mt-0.5 text-xs font-semibold ${accentText}`}>
                  {species.emoji} {species.name[languageInput]}
                </p>
                <p className={`mt-0.5 text-xs ${accentMuted}`}>
                  {species.tagline[languageInput]}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-xs font-medium ${accentText}`}>
              {persona.personaLabel} · {previewTitle}
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
