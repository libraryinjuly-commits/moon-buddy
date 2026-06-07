"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { DevPanel } from "@/components/dev/DevPanel";
import { FloatingDebugButton } from "@/components/dev/FloatingDebugButton";
import { useDevTools } from "@/hooks/useDevTools";
import { useIsQA } from "@/hooks/useIsQA";
import type { SetMoonBuddyData } from "@/hooks/types";
import type { CompanionState } from "@/types/companion";
import type { Language } from "@/types/moonBuddy";

interface DevToolsProps {
  companion: CompanionState;
  starCount: number;
  language: Language;
  setData: SetMoonBuddyData;
  onTriggerAscension: () => void;
}

export function DevTools({
  companion,
  starCount,
  language,
  setData,
  onTriggerAscension,
}: DevToolsProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isQA = useIsQA();
  const qa = useDevTools(setData, language);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isQA || !mounted) return null;

  const panel = (
    <DevPanel
      open={open}
      companion={companion}
      starCount={starCount}
      onClose={() => setOpen(false)}
      onAddGrowth={qa.addGrowth}
      onSetStage={qa.setStage}
      onTriggerAscension={() => {
        qa.triggerAscension(onTriggerAscension);
        setOpen(false);
      }}
      onGenerateSampleStars={qa.generateSampleStars}
      onCreateNewCompanion={qa.createNewCompanion}
      onResetCompanion={qa.resetCompanion}
      onResetAllData={() => {
        qa.resetAllData();
        setOpen(false);
      }}
    />
  );

  return (
    <>
      <FloatingDebugButton onClick={() => setOpen(true)} />
      {open && typeof document !== "undefined"
        ? createPortal(panel, document.body)
        : null}
    </>
  );
}
