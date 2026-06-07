export const SHARE_TITLE =
  "내 성격에 딱 맞는 생리 주기 공감 메이트, 문버디!";

export const SHARE_TEXT =
  "호르몬 때문에 힘들 때, 나만의 캐릭터에게 위로받아 보세요 🤍";

export const KAKAO_SHARE_DESCRIPTION =
  "호르몬 때문에 힘들 때, 나만의 달달이에게 위로받아 보세요 🤍";

export const KAKAO_SHARE_BUTTON = "문버디 만나러 가기";

/** Current page URL in the browser; build-time fallback on the server. */
export function getAppShareUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return process.env.NEXT_PUBLIC_APP_URL ?? "";
}

/** Origin of the current deployment (for absolute asset URLs). */
export function getAppOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const configured = process.env.NEXT_PUBLIC_APP_URL ?? "";
  if (!configured) return "";
  try {
    return new URL(configured).origin;
  } catch {
    return configured.replace(/\/$/, "");
  }
}

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
