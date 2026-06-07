import { EvolutionDecorations } from "@/components/EvolutionDecorations";
import { getEvolutionTier, TIER_SCALE } from "@/lib/evolution";
import { getMascotSkin, type MascotSkinColors } from "@/lib/mascotSkins";
import type { MascotPhase, TemperamentGroup } from "@/types";

interface MascotSvgProps {
  phase: MascotPhase;
  level: number;
  temperament: TemperamentGroup;
}

export function MascotSvg({ phase, level, temperament }: MascotSvgProps) {
  const tier = getEvolutionTier(level);
  const scale = TIER_SCALE[tier];
  const skin = getMascotSkin(temperament, phase);

  const mascot = (() => {
    switch (phase) {
      case "menstrual":
        return <MenstrualMascot skin={skin} temperament={temperament} />;
      case "follicular":
        return <FollicularMascot skin={skin} />;
      case "ovulation":
        return <OvulationMascot skin={skin} />;
      case "luteal":
        return <LutealMascot skin={skin} temperament={temperament} />;
      default:
        return <DefaultMascot skin={skin} temperament={temperament} />;
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

function DefaultMascot({
  skin,
  temperament,
}: {
  skin: MascotSkinColors;
  temperament: TemperamentGroup;
}) {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill={skin.body} />
      <circle cx="48" cy="54" r="5" fill={skin.eye} />
      <circle cx="72" cy="54" r="5" fill={skin.eye} />
      <path
        d="M46 72 Q60 82 74 72"
        stroke={skin.mouth}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {temperament === "NT" && (
        <rect x="44" y="48" width="32" height="3" rx="1" fill={skin.accent} opacity="0.6" />
      )}
      {temperament === "SJ" && (
        <path d="M52 38 h16 v8 h-16 z" fill={skin.accent} rx="2" />
      )}
      {temperament === "SP" && (
        <>
          <circle cx="28" cy="38" r="3" fill={skin.accentSoft} />
          <circle cx="92" cy="32" r="4" fill={skin.accentSoft} />
        </>
      )}
      {temperament === "NF" && (
        <>
          <path d="M82 28 Q95 40 88 55" fill={skin.accent} />
          <circle cx="92" cy="32" r="4" fill={skin.highlight} opacity="0.8" />
        </>
      )}
    </>
  );
}

function MenstrualMascot({
  skin,
  temperament,
}: {
  skin: MascotSkinColors;
  temperament: TemperamentGroup;
}) {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill={skin.body} />
      <ellipse cx="60" cy="78" rx="28" ry="10" fill={skin.accent} opacity="0.5" />
      <circle cx="48" cy="56" r="5" fill={skin.eye} />
      <circle cx="72" cy="56" r="5" fill={skin.eye} />
      <path
        d="M50 70 Q60 74 70 70"
        stroke={skin.mouth}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="30" y="88" width="60" height="14" rx="7" fill={skin.accentSoft} />
      <path
        d="M35 95 h50"
        stroke={skin.accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {temperament === "SJ" && (
        <rect x="54" y="34" width="12" height="6" rx="2" fill={skin.highlight} />
      )}
      {temperament === "SP" && (
        <circle cx="60" cy="28" r="4" fill={skin.accentSoft} />
      )}
    </>
  );
}

function FollicularMascot({ skin }: { skin: MascotSkinColors }) {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill={skin.body} />
      <circle cx="48" cy="54" r="5" fill={skin.eye} />
      <circle cx="72" cy="54" r="5" fill={skin.eye} />
      <path
        d="M44 70 Q60 84 76 70"
        stroke={skin.mouth}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="28" cy="30" r="5" fill={skin.accentSoft} />
      <circle cx="92" cy="28" r="4" fill={skin.accentSoft} />
      <path
        d="M24 42 l6 6 M90 38 l-6 6"
        stroke={skin.highlight}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="60" cy="100" rx="18" ry="4" fill={skin.accent} opacity="0.4" />
    </>
  );
}

function OvulationMascot({ skin }: { skin: MascotSkinColors }) {
  return (
    <>
      <circle cx="60" cy="60" r="44" fill={skin.highlight} opacity="0.35" />
      <circle cx="60" cy="62" r="38" fill={skin.body} />
      <circle cx="48" cy="54" r="5" fill={skin.eye} />
      <circle cx="72" cy="54" r="5" fill={skin.eye} />
      <circle cx="49" cy="53" r="1.5" fill="white" />
      <circle cx="73" cy="53" r="1.5" fill="white" />
      <path
        d="M42 72 Q60 88 78 72"
        stroke={skin.mouth}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 18 l0 -8 M60 18 l-6 -4 M60 18 l6 -4"
        stroke={skin.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="22" cy="40" r="3" fill="#fff" opacity="0.9" />
      <circle cx="98" cy="44" r="3" fill="#fff" opacity="0.9" />
      <circle cx="30" cy="88" r="2.5" fill="#fff" opacity="0.7" />
    </>
  );
}

function LutealMascot({
  skin,
  temperament,
}: {
  skin: MascotSkinColors;
  temperament: TemperamentGroup;
}) {
  return (
    <>
      <circle cx="60" cy="62" r="38" fill={skin.body} />
      <circle cx="48" cy="56" r="5" fill={skin.eye} />
      <circle cx="72" cy="56" r="4" fill={skin.eye} />
      {temperament === "NT" ? (
        <path
          d="M72 56 L78 58 L78 62"
          stroke={skin.mouth}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M72 56 Q78 58 78 62"
          stroke={skin.mouth}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
      <path
        d="M50 72 Q60 76 68 72"
        stroke={skin.mouth}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="88" cy="70" rx="14" ry="18" fill={skin.accentSoft} />
      <path
        d="M82 58 Q88 52 94 58"
        stroke={skin.accent}
        strokeWidth="2"
        fill="none"
      />
      <circle cx="26" cy="34" r="3" fill={skin.highlight} opacity="0.8" />
      <circle cx="94" cy="30" r="2" fill={skin.highlight} opacity="0.6" />
    </>
  );
}
