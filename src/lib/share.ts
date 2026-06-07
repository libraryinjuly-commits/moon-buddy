export const SHARE_TITLE =
  "내 성격에 딱 맞는 생리 주기 공감 메이트, 문버디!";

export const SHARE_TEXT =
  "호르몬 때문에 힘들 때, 나만의 캐릭터에게 위로받아 보세요 🤍";

export function getAppShareUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL ?? "";
}

export type ShareResult = "shared" | "copied" | "cancelled";

export async function shareMoonBuddy(): Promise<ShareResult> {
  const url = getAppShareUrl();
  const payload = { title: SHARE_TITLE, text: SHARE_TEXT, url };

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(payload);
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "cancelled";
      }
    }
  }

  const copyText = `${SHARE_TEXT}\n${url}`;
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(copyText);
    return "copied";
  }

  const textarea = document.createElement("textarea");
  textarea.value = copyText;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  return "copied";
}
