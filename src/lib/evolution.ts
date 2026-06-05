export type EvolutionTier = 1 | 2 | 3 | 4;

export interface EvolutionStage {
  tier: EvolutionTier;
  minLevel: number;
  name: string;
  description: string;
}

export const EVOLUTION_STAGES: EvolutionStage[] = [
  {
    tier: 1,
    minLevel: 1,
    name: "달알",
    description: "막 부화한 작은 달 친구",
  },
  {
    tier: 2,
    minLevel: 3,
    name: "초승달",
    description: "빛나기 시작한 달",
  },
  {
    tier: 3,
    minLevel: 6,
    name: "성장달",
    description: "날개가 돋아난 달",
  },
  {
    tier: 4,
    minLevel: 10,
    name: "문 신",
    description: "전설의 달 수호자",
  },
];

export function getEvolutionTier(level: number): EvolutionTier {
  if (level >= 10) return 4;
  if (level >= 6) return 3;
  if (level >= 3) return 2;
  return 1;
}

export function getEvolutionStage(level: number): EvolutionStage {
  const tier = getEvolutionTier(level);
  return EVOLUTION_STAGES.find((stage) => stage.tier === tier) ?? EVOLUTION_STAGES[0];
}

export function getNextEvolution(level: number): EvolutionStage | null {
  const currentTier = getEvolutionTier(level);
  const next = EVOLUTION_STAGES.find((stage) => stage.tier === currentTier + 1);
  return next ?? null;
}

export const TIER_SCALE: Record<EvolutionTier, number> = {
  1: 0.88,
  2: 1,
  3: 1.08,
  4: 1.14,
};

export const TIER_RING: Record<EvolutionTier, string> = {
  1: "ring-2",
  2: "ring-4",
  3: "ring-4 ring-offset-2",
  4: "ring-4 ring-offset-4",
};
