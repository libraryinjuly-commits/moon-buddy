import { EvolutionDecorations } from "@/components/EvolutionDecorations";
import { getEvolutionTier, TIER_SCALE } from "@/lib/evolution";
import { getMascotSkin, type MascotSkinColors } from "@/lib/mascotSkins";
import type { MascotPhase, TemperamentGroup } from "@/types";

interface CompanionPortraitProps {
  phase: MascotPhase;
  level: number;
  temperament: TemperamentGroup;
}

export function CompanionPortrait({
  phase,
  level,
  temperament,
}: CompanionPortraitProps) {
  const tier = getEvolutionTier(level);
  const scale = TIER_SCALE[tier];
  const skin = getMascotSkin(temperament, phase);

  const species = (() => {
    switch (temperament) {
      case "NF":
        return <MoonRabbitPortrait skin={skin} phase={phase} />;
      case "NT":
        return <StarFoxPortrait skin={skin} phase={phase} />;
      case "SJ":
        return <CloudBearPortrait skin={skin} phase={phase} />;
      case "SP":
        return <DreamSquirrelPortrait skin={skin} phase={phase} />;
    }
  })();

  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
      <g transform={`translate(60 60) scale(${scale}) translate(-60 -60)`}>
        {species}
        <EvolutionDecorations tier={tier} />
      </g>
    </svg>
  );
}

function MoonRabbitPortrait({
  skin,
  phase,
}: {
  skin: MascotSkinColors;
  phase: MascotPhase;
}) {
  return (
    <>
      <ellipse cx="42" cy="28" rx="9" ry="22" fill={skin.body} />
      <ellipse cx="78" cy="28" rx="9" ry="22" fill={skin.body} />
      <ellipse cx="42" cy="30" rx="5" ry="14" fill={skin.highlight} opacity="0.55" />
      <ellipse cx="78" cy="30" rx="5" ry="14" fill={skin.highlight} opacity="0.55" />
      <circle cx="60" cy="68" r="34" fill={skin.body} />
      <circle cx="50" cy="62" r="4.5" fill={skin.eye} />
      <circle cx="70" cy="62" r="4.5" fill={skin.eye} />
      <circle cx="51" cy="61" r="1.2" fill="#fff" opacity="0.8" />
      <circle cx="71" cy="61" r="1.2" fill="#fff" opacity="0.8" />
      <ellipse cx="44" cy="70" rx="4" ry="2.5" fill={skin.accentSoft} opacity="0.7" />
      <ellipse cx="76" cy="70" rx="4" ry="2.5" fill={skin.accentSoft} opacity="0.7" />
      <path
        d="M52 78 Q60 84 68 78"
        stroke={skin.mouth}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 42 Q68 34 76 38 Q70 46 60 44 Z"
        fill={skin.accentSoft}
        opacity="0.9"
      />
      {phase === "menstrual" && (
        <ellipse cx="60" cy="88" rx="24" ry="8" fill={skin.accentSoft} opacity="0.55" />
      )}
      {phase === "ovulation" && (
        <circle cx="60" cy="58" r="40" fill={skin.highlight} opacity="0.25" />
      )}
    </>
  );
}

function StarFoxPortrait({
  skin,
  phase,
}: {
  skin: MascotSkinColors;
  phase: MascotPhase;
}) {
  return (
    <>
      <path d="M34 36 L42 18 L48 34 Z" fill={skin.body} />
      <path d="M86 36 L78 18 L72 34 Z" fill={skin.body} />
      <ellipse cx="60" cy="68" rx="32" ry="30" fill={skin.body} />
      <path d="M88 62 Q108 58 112 72 Q100 78 90 70 Z" fill={skin.accent} />
      <polygon
        points="108,66 112,60 114,68"
        fill={skin.accentSoft}
      />
      <circle cx="50" cy="64" r="4" fill={skin.eye} />
      <circle cx="70" cy="64" r="4" fill={skin.eye} />
      <path
        d="M52 76 Q60 80 68 76"
        stroke={skin.mouth}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="46" y="60" width="28" height="2" rx="1" fill={skin.accent} opacity="0.45" />
      {phase === "ovulation" && (
        <>
          <circle cx="28" cy="40" r="3" fill={skin.accentSoft} />
          <circle cx="94" cy="36" r="2.5" fill={skin.accentSoft} />
        </>
      )}
      {phase === "luteal" && (
        <path
          d="M70 64 Q76 66 76 70"
          stroke={skin.mouth}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </>
  );
}

function CloudBearPortrait({
  skin,
  phase,
}: {
  skin: MascotSkinColors;
  phase: MascotPhase;
}) {
  return (
    <>
      <circle cx="38" cy="36" r="12" fill={skin.body} />
      <circle cx="82" cy="36" r="12" fill={skin.body} />
      <circle cx="60" cy="70" r="36" fill={skin.body} />
      <ellipse cx="60" cy="28" rx="18" ry="10" fill={skin.highlight} opacity="0.65" />
      <circle cx="50" cy="66" r="4.5" fill={skin.eye} />
      <circle cx="70" cy="66" r="4.5" fill={skin.eye} />
      <ellipse cx="60" cy="74" rx="8" ry="5" fill={skin.accentSoft} />
      <circle cx="60" cy="72" r="3" fill={skin.mouth} />
      <path
        d="M52 80 Q60 84 68 80"
        stroke={skin.mouth}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {phase === "menstrual" && (
        <rect x="34" y="90" width="52" height="12" rx="6" fill={skin.accentSoft} />
      )}
      {phase === "follicular" && (
        <circle cx="24" cy="52" r="4" fill={skin.accentSoft} opacity="0.8" />
      )}
    </>
  );
}

function DreamSquirrelPortrait({
  skin,
  phase,
}: {
  skin: MascotSkinColors;
  phase: MascotPhase;
}) {
  return (
    <>
      <path
        d="M88 50 Q108 30 104 70 Q96 82 84 68 Q90 58 88 50 Z"
        fill={skin.accent}
      />
      <path
        d="M92 54 Q100 44 98 62"
        stroke={skin.highlight}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="36" cy="40" r="10" fill={skin.body} />
      <circle cx="84" cy="40" r="10" fill={skin.body} />
      <ellipse cx="58" cy="68" rx="28" ry="26" fill={skin.body} />
      <path
        d="M48 58 Q50 54 52 58"
        stroke={skin.eye}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M68 58 Q70 54 72 58"
        stroke={skin.eye}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="49" cy="57" r="1.5" fill={skin.eye} />
      <circle cx="71" cy="57" r="1.5" fill={skin.eye} />
      <path
        d="M52 76 Q60 82 68 76"
        stroke={skin.mouth}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="60" cy="48" r="5" fill={skin.accentSoft} opacity="0.75" />
      {phase === "ovulation" && (
        <path
          d="M18 44 Q24 36 30 44"
          stroke={skin.accentSoft}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {phase === "menstrual" && (
        <ellipse cx="58" cy="86" rx="16" ry="5" fill={skin.accentSoft} opacity="0.5" />
      )}
    </>
  );
}
