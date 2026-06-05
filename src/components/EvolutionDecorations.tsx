import type { EvolutionTier } from "@/lib/evolution";

interface EvolutionDecorationsProps {
  tier: EvolutionTier;
}

export function EvolutionDecorations({ tier }: EvolutionDecorationsProps) {
  if (tier === 1) return null;

  return (
    <g>
      {tier >= 2 && <Tier2Decorations />}
      {tier >= 3 && <Tier3Decorations />}
      {tier >= 4 && <Tier4Decorations />}
    </g>
  );
}

function Tier2Decorations() {
  return (
    <>
      <circle cx="22" cy="22" r="4" fill="#fde68a" opacity="0.9" />
      <path
        d="M20 20 L22 16 L24 20 L28 22 L24 24 L22 28 L20 24 L16 22 Z"
        fill="#fbbf24"
        opacity="0.8"
      />
      <ellipse cx="42" cy="68" rx="5" ry="3" fill="#fda4af" opacity="0.35" />
      <ellipse cx="78" cy="68" rx="5" ry="3" fill="#fda4af" opacity="0.35" />
    </>
  );
}

function Tier3Decorations() {
  return (
    <>
      <path
        d="M18 68 Q8 58 14 48 Q20 56 18 68"
        fill="#c4b5fd"
        opacity="0.85"
      />
      <path
        d="M102 68 Q112 58 106 48 Q100 56 102 68"
        fill="#c4b5fd"
        opacity="0.85"
      />
      <circle cx="96" cy="20" r="3" fill="#fff" opacity="0.9" />
      <circle cx="14" cy="44" r="2.5" fill="#fff" opacity="0.7" />
    </>
  );
}

function Tier4Decorations() {
  return (
    <>
      <ellipse cx="60" cy="60" rx="52" ry="52" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.5" />
      <ellipse cx="60" cy="60" rx="46" ry="46" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.35" />
      <path
        d="M48 14 L52 6 L56 14 L64 14 L58 20 L60 28 L52 22 L44 28 L46 20 L40 14 Z"
        fill="#fbbf24"
      />
      <circle cx="30" cy="16" r="2" fill="#fff" />
      <circle cx="88" cy="24" r="2.5" fill="#fff" />
      <circle cx="18" cy="78" r="2" fill="#fde68a" />
      <circle cx="100" cy="80" r="2" fill="#fde68a" />
    </>
  );
}
