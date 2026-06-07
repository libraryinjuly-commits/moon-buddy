"use client";

import { useEffect, useState } from "react";

import { IS_DEV } from "@/lib/devEnv";

function isLocalhostHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  );
}

export function useIsDev(): boolean {
  const [isDev, setIsDev] = useState(IS_DEV);

  useEffect(() => {
    if (IS_DEV) return;
    setIsDev(isLocalhostHost(window.location.hostname));
  }, []);

  return isDev;
}
