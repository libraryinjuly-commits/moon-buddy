import { CompanionPortrait } from "@/components/CompanionPortrait";
import type { MascotPhase, TemperamentGroup } from "@/types";

interface MascotSvgProps {
  phase: MascotPhase;
  level: number;
  temperament: TemperamentGroup;
}

/** MBTI temperament family portrait (Moon Rabbit, Star Fox, Cloud Bear, Dream Squirrel). */
export function MascotSvg({ phase, level, temperament }: MascotSvgProps) {
  return (
    <CompanionPortrait phase={phase} level={level} temperament={temperament} />
  );
}
