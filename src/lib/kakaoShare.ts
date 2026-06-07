import type { KakaoSDK } from "@/types/kakao";

import {
  getAppOrigin,
  getLiveShareUrl,
  KAKAO_SHARE_BUTTON,
  KAKAO_SHARE_DESCRIPTION,
  SHARE_TITLE,
} from "@/lib/share";
import type { KakaoLinkObject } from "@/types/kakao";

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

const KAKAO_JS_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ??
  "2393598511beea589329761a77b68022";

const DEFAULT_SHARE_IMAGE =
  "https://images.unsplash.com/photo-1506318137071-a8e63d0e0f53?w=800&h=400&fit=crop";

let sdkLoadPromise: Promise<KakaoSDK> | null = null;

function getShareImageUrl(): string {
  const custom = process.env.NEXT_PUBLIC_SHARE_IMAGE_URL;
  if (custom) return custom;
  const origin = getAppOrigin();
  return origin ? `${origin}/og-share.png` : DEFAULT_SHARE_IMAGE;
}

/** Fresh link object — Kakao SDK may mutate link props; never reuse one instance. */
function createKakaoLink(url: string): KakaoLinkObject {
  return {
    webUrl: url,
    mobileWebUrl: url,
  };
}

function resolveKakaoShareUrl(): string {
  const url = getLiveShareUrl();
  if (!url) {
    throw new Error("Share URL is unavailable.");
  }
  return url;
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

export async function shareViaKakao(): Promise<void> {
  const kakao = await loadKakaoSdk();

  // Read the live URL immediately before sendDefault — never use build-time env vars.
  const shareUrl = resolveKakaoShareUrl();

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: SHARE_TITLE,
      description: KAKAO_SHARE_DESCRIPTION,
      imageUrl: getShareImageUrl(),
      link: createKakaoLink(shareUrl),
    },
    buttons: [
      {
        title: KAKAO_SHARE_BUTTON,
        link: createKakaoLink(shareUrl),
      },
    ],
  });
}

export function isKakaoShareAvailable(): boolean {
  return typeof window !== "undefined";
}
