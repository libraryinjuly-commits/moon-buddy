import type { KakaoSDK } from "@/types/kakao";

import {
  KAKAO_SHARE_BUTTON,
  KAKAO_SHARE_DESCRIPTION,
  SHARE_TITLE,
} from "@/lib/share";

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

const KAKAO_JS_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ??
  "2393598511beea589329761a77b68022";

const DEFAULT_SHARE_IMAGE =
  "https://images.unsplash.com/photo-1506318137071-a8e63d0e0f53?w=800&h=400&fit=crop";

let sdkLoadPromise: Promise<KakaoSDK> | null = null;

function resolveShareImageUrl(currentUrl: string): string {
  const custom = process.env.NEXT_PUBLIC_SHARE_IMAGE_URL;
  if (custom) return custom;

  try {
    const origin = new URL(currentUrl).origin;
    return `${origin}/og-share.png`;
  } catch {
    return DEFAULT_SHARE_IMAGE;
  }
}

function loadKakaoSdk(): Promise<KakaoSDK> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Kakao SDK is only available in the browser."));
  }

  if (window.Kakao?.isInitialized()) {
    return Promise.resolve(window.Kakao);
  }

  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-sdk="true"]',
    );

    const onReady = () => {
      const kakao = window.Kakao;
      if (!kakao) {
        reject(new Error("Kakao SDK failed to initialize."));
        return;
      }
      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_JS_KEY);
      }
      resolve(kakao);
    };

    if (existing) {
      if (window.Kakao) {
        onReady();
      } else {
        existing.addEventListener("load", onReady, { once: true });
        existing.addEventListener(
          "error",
          () => reject(new Error("Kakao SDK load failed.")),
          { once: true },
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.dataset.kakaoSdk = "true";
    script.onload = onReady;
    script.onerror = () => reject(new Error("Kakao SDK load failed."));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

/**
 * @param currentUrl - Must be captured in the click handler via window.location.href
 */
export async function shareViaKakao(currentUrl: string): Promise<void> {
  if (!currentUrl.trim()) {
    throw new Error("Share URL is unavailable.");
  }

  if (!/^https?:\/\//.test(currentUrl)) {
    throw new Error("Share URL must be an absolute HTTP(S) address.");
  }

  const kakao = await loadKakaoSdk();
  const imageUrl = resolveShareImageUrl(currentUrl);

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: SHARE_TITLE,
      description: KAKAO_SHARE_DESCRIPTION,
      imageUrl,
      link: {
        webUrl: currentUrl,
        mobileWebUrl: currentUrl,
      },
    },
    buttons: [
      {
        title: KAKAO_SHARE_BUTTON,
        link: {
          webUrl: currentUrl,
          mobileWebUrl: currentUrl,
        },
      },
    ],
  });
}

export function isKakaoShareAvailable(): boolean {
  return typeof window !== "undefined";
}
