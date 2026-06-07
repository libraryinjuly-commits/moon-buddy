"use client";

import { useEffect, useState } from "react";

import {
  isDevelopmentEnvironment,
  shouldShowQAPanelFromSearch,
} from "@/lib/isQA";

function readQAModeFromLocation(): boolean {
  if (typeof window === "undefined") return isDevelopmentEnvironment();
  return shouldShowQAPanelFromSearch(
    new URLSearchParams(window.location.search),
  );
}

export function useIsQA(): boolean {
  const [isQA, setIsQA] = useState(readQAModeFromLocation);

  useEffect(() => {
    const sync = () => setIsQA(readQAModeFromLocation());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return isQA;
}
