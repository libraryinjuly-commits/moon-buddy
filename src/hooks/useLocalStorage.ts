"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        setStoredValue(
          typeof initialValue === "object" && initialValue !== null
            ? { ...initialValue, ...parsed }
            : parsed,
        );
      }
    } catch {
      // Keep initial value on parse errors
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Ignore quota errors
        }
        return next;
      });
    },
    [key],
  );

  return [storedValue, setValue, isLoaded];
}
