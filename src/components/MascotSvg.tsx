import { EvolutionDecorations } from "@/components/EvolutionDecorations";
import { getEvolutionTier, TIER_SCALE } from "@/lib/evolution";
import type { MascotPhase } from "@/types";

interface MascotSvgProps {
  phase: MascotPhase;
  level: number;
}

export function MascotSvg({ phase, level }: MascotSvgProps) {
  const tier = getEvolutionTier(level);
  const scale = TIER_SCALE[tier];

  const mascot = (() => {
    switch (phase) {
      case "menstrual":
        return <MenstrualMascot />;
      case "follicular":
        return <FollicularMascot />;
      case "ovulation":
        return <OvulationMascot />;
      case "luteal":
        return <LutealMascot />;
      default:
        return <DefaultMascot />;
    }
  })();

  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
      <g transform={`translate(60 60) scale(${scale}) translate(-60 -60)`}>
        {mascot}
        <EvolutionDecorations tier={tier} />
      </g>
    </svg>
  );
}

function DefaultMascot() {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill="#c4b5fd" />
      <circle cx="48" cy="54" r="5" fill="#4c1d95" />
      <circle cx="72" cy="54" r="5" fill="#4c1d95" />
      <path d="M46 72 Q60 82 74 72" stroke="#4c1d95" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M82 28 Q95 40 88 55" fill="#a78bfa" />
      <circle cx="92" cy="32" r="4" fill="#fde68a" opacity="0.8" />
      <circle cx="28" cy="38" r="3" fill="#fde68a" opacity="0.6" />
    </>
  );
}

function MenstrualMascot() {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill="#fda4af" />
      <ellipse cx="60" cy="78" rx="28" ry="10" fill="#fb7185" opacity="0.5" />
      <circle cx="48" cy="56" r="5" fill="#881337" />
      <circle cx="72" cy="56" r="5" fill="#881337" />
      <path d="M50 70 Q60 74 70 70" stroke="#881337" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="30" y="88" width="60" height="14" rx="7" fill="#fecdd3" />
      <path d="M35 95 h50" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function FollicularMascot() {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill="#7dd3fc" />
      <circle cx="48" cy="54" r="5" fill="#0c4a6e" />
      <circle cx="72" cy="54" r="5" fill="#0c4a6e" />
      <path d="M44 70 Q60 84 76 70" stroke="#0c4a6e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="30" r="5" fill="#fde68a" />
      <circle cx="92" cy="28" r="4" fill="#fde68a" />
      <path d="M24 42 l6 6 M90 38 l-6 6" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="60" cy="100" rx="18" ry="4" fill="#38bdf8" opacity="0.4" />
    </>
  );
}

function OvulationMascot() {
  return (
    <>
      <circle cx="60" cy="60" r="44" fill="#fde68a" opacity="0.35" />
      <circle cx="60" cy="62" r="38" fill="#fcd34d" />
      <circle cx="48" cy="54" r="5" fill="#92400e" />
      <circle cx="72" cy="54" r="5" fill="#92400e" />
      <circle cx="49" cy="53" r="1.5" fill="white" />
      <circle cx="73" cy="53" r="1.5" fill="white" />
      <path d="M42 72 Q60 88 78 72" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 18 l0 -8 M60 18 l-6 -4 M60 18 l6 -4" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="40" r="3" fill="#fff" opacity="0.9" />
      <circle cx="98" cy="44" r="3" fill="#fff" opacity="0.9" />
      <circle cx="30" cy="88" r="2.5" fill="#fff" opacity="0.7" />
    </>
  );
}

function LutealMascot() {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill="#c4b5fd" />
      <circle cx="48" cy="56" r="5" fill="#4c1d95" />
      <circle cx="72" cy="56" r="4" fill="#4c1d95" />
      <path d="M72 56 Q78 58 78 62" stroke="#4c1d95" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 72 Q60 76 68 72" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="88" cy="70" rx="14" ry="18" fill="#ddd6fe" />
      <path d="M82 58 Q88 52 94 58" stroke="#a78bfa" strokeWidth="2" fill="none" />
      <circle cx="26" cy="34" r="3" fill="#e9d5ff" opacity="0.8" />
      <circle cx="94" cy="30" r="2" fill="#e9d5ff" opacity="0.6" />
    </>
  );
}
