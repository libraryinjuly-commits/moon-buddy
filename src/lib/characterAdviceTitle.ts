import type { LocaleUI } from "@/lib/i18n/types";

export function getCustomAdviceTitle(
  buddyCustomName: string,
  ui: LocaleUI,
): string {
  const name = buddyCustomName.trim();
  if (!name) return ui.buddyAdviceFallback;
  return ui.customAdviceTitle.replace("{name}", name);
}
