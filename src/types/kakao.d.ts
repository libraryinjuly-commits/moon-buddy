export interface KakaoLinkObject {
  mobileWebUrl: string;
  webUrl: string;
}

export interface KakaoFeedContent {
  title: string;
  description: string;
  imageUrl: string;
  link: KakaoLinkObject;
}

export interface KakaoFeedButton {
  title: string;
  link: KakaoLinkObject;
}

export interface KakaoShareFeedSettings {
  objectType: "feed";
  content: KakaoFeedContent;
  buttons: KakaoFeedButton[];
}

export interface KakaoShareAPI {
  sendDefault: (settings: KakaoShareFeedSettings) => void;
}

export interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: KakaoShareAPI;
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

export {};
