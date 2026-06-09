import {
  getMoodReactionAsset,
  getMoodReactionVisual,
} from "@/lib/moodFeedReaction";
import type { LiveMood } from "@/types/moonBuddy";

interface CompanionMoodReactionPortraitProps {
  mood: LiveMood;
  className?: string;
}

export function CompanionMoodReactionPortrait({
  mood,
  className = "h-24 w-24",
}: CompanionMoodReactionPortraitProps) {
  const visual = getMoodReactionVisual(mood);
  const asset = getMoodReactionAsset(mood);

  if (visual === "joyful_sparkle") {
    return (
      <div
        className={`flex animate-mood-sparkle items-center justify-center ${className}`}
        aria-hidden
      >
        {/* TODO: 실제 이미지 에셋 매핑 — {asset.imagePath} (기쁨 · 반짝이는 표정) */}
        <span className="text-5xl">{asset.placeholderEmoji}</span>
      </div>
    );
  }

  if (visual === "cozy_blanket") {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-hidden
      >
        {/* TODO: 실제 이미지 에셋 매핑 — {asset.imagePath} (우울 · 담요를 덮은 표정) */}
        <span className="text-5xl">{asset.placeholderEmoji}</span>
      </div>
    );
  }

  if (visual === "peaceful_calm") {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-hidden
      >
        {/* TODO: 실제 이미지 에셋 매핑 — {asset.imagePath} (평온) */}
        <span className="text-5xl">{asset.placeholderEmoji}</span>
      </div>
    );
  }

  if (visual === "sensitive_guard") {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-hidden
      >
        {/* TODO: 실제 이미지 에셋 매핑 — {asset.imagePath} (예민) */}
        <span className="text-5xl">{asset.placeholderEmoji}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-hidden
    >
      {/* TODO: 실제 이미지 에셋 매핑 — {asset.imagePath} */}
      <span className="text-5xl">{asset.placeholderEmoji}</span>
    </div>
  );
}
