const DEFAULT_TAP_PATTERN = 40;

export function triggerHapticTap(
  pattern: number | number[] = DEFAULT_TAP_PATTERN,
): void {
  if (typeof navigator === "undefined") return;
  if (typeof navigator.vibrate !== "function") return;

  try {
    navigator.vibrate(pattern);
  } catch {
    // iOS Safari and some browsers throw or ignore vibration — safe no-op
  }
}
