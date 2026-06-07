export const SHARE_TITLE = "Moon Buddy";

export const SHARE_TEXT = "Meet my Moon Buddy companion.";

export function getShareUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.origin;
}

export function canUseWebShare(): boolean {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}

export type ShareResult = "shared" | "copied";

async function copyTextToClipboard(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export async function copyShareUrl(): Promise<void> {
  const url = getShareUrl();
  if (!url) {
    throw new Error("Share URL is unavailable.");
  }
  await copyTextToClipboard(url);
}

export async function shareMoonBuddy(): Promise<ShareResult> {
  const url = getShareUrl();
  if (!url) {
    throw new Error("Share URL is unavailable.");
  }

  if (canUseWebShare()) {
    try {
      await navigator.share({
        title: SHARE_TITLE,
        text: SHARE_TEXT,
        url,
      });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
    }
  }

  await copyShareUrl();
  return "copied";
}
