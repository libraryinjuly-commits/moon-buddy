/**
 * 별의 기억 아카이브 (Star Memory Archive)
 *
 * 현재 저장소: `MoonBuddyData.starCollection.stars` → localStorage (`moon-buddy-data`)
 * 타입 별칭: `StarMemory` = ascended star / star_memories row
 *
 * --- Supabase 연동 가이드 (향후) ---
 * 1. 테이블 `star_memories` 생성:
 *    - id (uuid, PK)
 *    - user_id (uuid, FK → auth.users)
 *    - companion_name (text)
 *    - birth_date (date)
 *    - ascension_date (date)
 *    - dominant_emotion (text) — great|good|okay|low|bad
 *    - star_type (text)
 *    - mood_statistics (jsonb)
 *    - temperament (text)
 *    - cycle_summary (text)
 *    - created_at (timestamptz)
 *
 * 2. 승천 시:
 *    - `completeAscension()` 결과의 `star`를 `star_memories`에 INSERT
 *    - `companions` 테이블의 현재 행을 growth_progress=0, stage=seed 로 UPDATE
 *      (또는 새 companion row INSERT)
 *
 * 3. 앱 로드 시:
 *    - `select * from star_memories where user_id = ? order by ascension_date desc`
 *    - 결과를 `starCollection.stars`에 hydrate
 *
 * 4. RLS: user_id = auth.uid() 정책 적용
 */

import { completeAscension } from "@/lib/starMemory";
import type { CompanionState, StarMemory } from "@/types/companion";
import type { Language, MoonBuddyData, TemperamentGroup } from "@/types/moonBuddy";

/** @alias StarMemory — 승천 아카이브에 저장되는 한 개의 별 */
export type AscendedStar = StarMemory;

/** @alias starCollection.stars — 영구 보관되는 승천 별 목록 (ascended_stars) */
export type StarMemoriesArchive = StarMemory[];

export function getAscendedStars(data: MoonBuddyData): StarMemoriesArchive {
  return data.starCollection.stars;
}

export interface ArchiveAscensionParams {
  companion: CompanionState;
  companionName: string;
  ascensionDate: string;
  language: Language;
  cycleId: string | null;
  temperament: TemperamentGroup;
  ascendedCompanionCount: number;
}

export interface ArchiveAscensionResult {
  star: AscendedStar;
  newCompanion: CompanionState;
  /** localStorage에 쓸 starCollection.stars (최신 별이 앞) */
  updatedStars: AscendedStar[];
}

/**
 * 승천 완료: 별 아카이브에 저장 + 새싹 버디(0%)로 리셋.
 * Supabase 전환 시 이 함수 내부에서 INSERT/UPDATE 호출로 교체.
 */
export function archiveAscendedStar(
  params: ArchiveAscensionParams,
  existingStars: AscendedStar[],
): ArchiveAscensionResult {
  const { star, newCompanion } = completeAscension(
    params.companion,
    params.companionName,
    params.ascensionDate,
    params.language,
    params.cycleId,
    params.temperament,
    params.ascendedCompanionCount,
  );

  const updatedStars = [star, ...existingStars];

  return { star, newCompanion, updatedStars };
}

export function applyArchiveToMoonBuddyData(
  prev: MoonBuddyData,
  result: ArchiveAscensionResult,
): MoonBuddyData {
  return {
    ...prev,
    companion: result.newCompanion,
    starCollection: {
      ...prev.starCollection,
      stars: result.updatedStars,
    },
    character: { level: 1, exp: 0, totalMoodLogs: 0 },
  };
}
