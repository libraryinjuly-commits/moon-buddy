import type { KakaoSDK } from "@/types/kakao";
import type { KakaoShareFeedSettings } from "@/types/kakao";

import {
  KAKAO_SHARE_BUTTON,
  KAKAO_SHARE_DESCRIPTION,
  SHARE_TITLE,
} from "@/lib/share";

export const KAKAO_LOG_PREFIX = "[MoonBuddy:Kakao]";

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

const KAKAO_JS_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ??
  "2393598511beea589329761a77b68022";

const KAKAO_SHARE_WEB_URL = "https://moon-buddy-6zxk.vercel.app";
const KAKAO_SHARE_IMAGE_URL = "https://moon-buddy-6zxk.vercel.app/og-share.png";
const KAKAO_PRODUCTION_HOST = "moon-buddy-6zxk.vercel.app";

let sdkLoadPromise: Promise<KakaoSDK> | null = null;

function maskJavaScriptKey(key: string): string {
  if (key.length <= 8) return "(masked)";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

function logDeploymentDomainValidation(): void {
  const currentHost =
    typeof window !== "undefined" ? window.location.hostname : "(server)";
  const currentOrigin =
    typeof window !== "undefined" ? window.location.origin : "(server)";

  console.log(KAKAO_LOG_PREFIX, "Deployment domain validation", {
    hardcodedShareUrl: KAKAO_SHARE_WEB_URL,
    hardcodedImageUrl: KAKAO_SHARE_IMAGE_URL,
    expectedProductionHost: KAKAO_PRODUCTION_HOST,
    currentPageHost: currentHost,
    currentPageOrigin: currentOrigin,
    pageHostMatchesProduction: currentHost === KAKAO_PRODUCTION_HOST,
    jsKeySource: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
      ? "NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY"
      : "hardcoded fallback in kakaoShare.ts",
    jsKeyMasked: maskJavaScriptKey(KAKAO_JS_KEY),
    kakaoConsoleChecklist: [
      "Kakao Developers → App → Platform → Web: register https://moon-buddy-6zxk.vercel.app",
      "Kakao Developers → App → Product settings → Kakao Login / JavaScript key domain must include current page origin",
      "Ensure og-share.png exists at public/og-share.png (served at /og-share.png)",
    ],
  });
}

function logSdkLoaded(source: "script-injected" | "script-existing" | "already-ready"): void {
  console.log(KAKAO_LOG_PREFIX, "SDK loaded", {
    source,
    sdkUrl: KAKAO_SDK_URL,
    kakaoGlobalPresent: typeof window !== "undefined" && Boolean(window.Kakao),
  });
}

function logKakaoInitialized(alreadyInitialized: boolean): void {
  console.log(KAKAO_LOG_PREFIX, "Kakao initialized", {
    alreadyInitialized,
    isInitialized:
      typeof window !== "undefined" ? window.Kakao?.isInitialized() : false,
    jsKeySource: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
      ? "NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY"
      : "hardcoded fallback in kakaoShare.ts",
    jsKeyMasked: maskJavaScriptKey(KAKAO_JS_KEY),
  });
}

function buildSharePayload(): KakaoShareFeedSettings {
  return {
    objectType: "feed",
    content: {
      title: SHARE_TITLE,
      description: KAKAO_SHARE_DESCRIPTION,
      imageUrl: KAKAO_SHARE_IMAGE_URL,
      link: {
        webUrl: KAKAO_SHARE_WEB_URL,
        mobileWebUrl: KAKAO_SHARE_WEB_URL,
      },
    },
    buttons: [
      {
        title: KAKAO_SHARE_BUTTON,
        link: {
          webUrl: KAKAO_SHARE_WEB_URL,
          mobileWebUrl: KAKAO_SHARE_WEB_URL,
        },
      },
    ],
  };
}

function loadKakaoSdk(): Promise<KakaoSDK> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Kakao SDK is only available in the browser."));
  }

  if (window.Kakao?.isInitialized()) {
    logSdkLoaded("already-ready");
    logKakaoInitialized(true);
    return Promise.resolve(window.Kakao);
  }

  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-sdk="true"]',
    );

    const onReady = (source: "script-injected" | "script-existing") => {
      const kakao = window.Kakao;
      if (!kakao) {
        console.error(KAKAO_LOG_PREFIX, "SDK load failed: window.Kakao is undefined");
        reject(new Error("Kakao SDK failed to initialize."));
        return;
      }

      logSdkLoaded(source);

      const alreadyInitialized = kakao.isInitialized();
      if (!alreadyInitialized) {
        kakao.init(KAKAO_JS_KEY);
      }

      logKakaoInitialized(alreadyInitialized);
      resolve(kakao);
    };

    if (existing) {
      if (window.Kakao) {
        onReady("script-existing");
      } else {
        existing.addEventListener("load", () => onReady("script-existing"), {
          once: true,
        });
        existing.addEventListener(
          "error",
          () => {
            console.error(KAKAO_LOG_PREFIX, "SDK load failed: existing script error");
            reject(new Error("Kakao SDK load failed."));
          },
          { once: true },
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.dataset.kakaoSdk = "true";
    script.onload = () => onReady("script-injected");
    script.onerror = () => {
      console.error(KAKAO_LOG_PREFIX, "SDK load failed: script onerror");
      reject(new Error("Kakao SDK load failed."));
    };
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

export async function shareViaKakao(): Promise<void> {
  logDeploymentDomainValidation();

  const kakao = await loadKakaoSdk();
  const payload = buildSharePayload();

  console.log(KAKAO_LOG_PREFIX, "Share payload created", payload);
  console.log(KAKAO_LOG_PREFIX, "Share API called", {
    method: "Kakao.Share.sendDefault",
    objectType: payload.objectType,
    contentLink: payload.content.link,
    buttonLinks: payload.buttons.map((button) => button.link),
  });

  kakao.Share.sendDefault(payload);
}

export function isKakaoShareAvailable(): boolean {
  return typeof window !== "undefined";
}
