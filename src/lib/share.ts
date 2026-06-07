export const SHARE_TITLE =
  "내 성격에 딱 맞는 생리 주기 공감 메이트, 문버디!";

export const SHARE_TEXT =
  "호르몬 때문에 힘들 때, 나만의 캐릭터에게 위로받아 보세요 🤍";

export const KAKAO_SHARE_DESCRIPTION =
  "호르몬 때문에 힘들 때, 나만의 달달이에게 위로받아 보세요 🤍";

export const KAKAO_SHARE_BUTTON = "문버디 만나러 가기";

export const SYSTEM_SHARE_TEXT =
  "호르몬 때문에 힘들 때, 나만의 달달이에게 위로받아 보세요";

export function getAppShareUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_APP_URL ?? window.location.href;
  }
  return process.env.NEXT_PUBLIC_APP_URL ?? "";
}

export type ShareResult = "shared" | "copied" | "cancelled";

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
  const url = getAppShareUrl();
  if (!url) throw new Error("Share URL is unavailable.");
  await copyTextToClipboard(url);
}

export async function shareViaSystem(): Promise<ShareResult> {
  const url = getAppShareUrl();
  if (!url) throw new Error("Share URL is unavailable.");

  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    throw new Error("System share is not supported.");
  }

  try {
    await navigator.share({
      title: SHARE_TITLE,
      text: SYSTEM_SHARE_TEXT,
      url,
    });
    return "shared";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return "cancelled";
    }
    throw error;
  }
}

export function isSystemShareAvailable(): boolean {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}
