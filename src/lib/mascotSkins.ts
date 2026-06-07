import type { MascotPhase, TemperamentGroup } from "@/types";

export interface MascotSkinColors {
  body: string;
  eye: string;
  mouth: string;
  accent: string;
  accentSoft: string;
  highlight: string;
}

type SkinMatrix = Record<MascotPhase, MascotSkinColors>;

const NF_SKINS: SkinMatrix = {
  default: {
    body: "#c4b5fd",
    eye: "#4c1d95",
    mouth: "#4c1d95",
    accent: "#a78bfa",
    accentSoft: "#fde68a",
    highlight: "#e9d5ff",
  },
  menstrual: {
    body: "#fda4af",
    eye: "#881337",
    mouth: "#881337",
    accent: "#fb7185",
    accentSoft: "#fecdd3",
    highlight: "#ffe4e6",
  },
  follicular: {
    body: "#ddd6fe",
    eye: "#5b21b6",
    mouth: "#5b21b6",
    accent: "#c4b5fd",
    accentSoft: "#fde68a",
    highlight: "#f5f3ff",
  },
  ovulation: {
    body: "#f0abfc",
    eye: "#86198f",
    mouth: "#86198f",
    accent: "#e879f9",
    accentSoft: "#fef08a",
    highlight: "#fdf4ff",
  },
  luteal: {
    body: "#c4b5fd",
    eye: "#4c1d95",
    mouth: "#4c1d95",
    accent: "#ddd6fe",
    accentSoft: "#e9d5ff",
    highlight: "#f5f3ff",
  },
};

const NT_SKINS: SkinMatrix = {
  default: {
    body: "#94a3b8",
    eye: "#1e293b",
    mouth: "#1e293b",
    accent: "#64748b",
    accentSoft: "#cbd5e1",
    highlight: "#e2e8f0",
  },
  menstrual: {
    body: "#78909c",
    eye: "#263238",
    mouth: "#263238",
    accent: "#546e7a",
    accentSoft: "#b0bec5",
    highlight: "#cfd8dc",
  },
  follicular: {
    body: "#90a4ae",
    eye: "#37474f",
    mouth: "#37474f",
    accent: "#607d8b",
    accentSoft: "#b0bec5",
    highlight: "#eceff1",
  },
  ovulation: {
    body: "#78909c",
    eye: "#263238",
    mouth: "#263238",
    accent: "#455a64",
    accentSoft: "#cfd8dc",
    highlight: "#eceff1",
  },
  luteal: {
    body: "#8195a5",
    eye: "#334155",
    mouth: "#334155",
    accent: "#94a3b8",
    accentSoft: "#cbd5e1",
    highlight: "#f1f5f9",
  },
};

const SJ_SKINS: SkinMatrix = {
  default: {
    body: "#5eead4",
    eye: "#134e4a",
    mouth: "#134e4a",
    accent: "#14b8a6",
    accentSoft: "#99f6e4",
    highlight: "#ccfbf1",
  },
  menstrual: {
    body: "#2dd4bf",
    eye: "#115e59",
    mouth: "#115e59",
    accent: "#0d9488",
    accentSoft: "#a7f3d0",
    highlight: "#d1fae5",
  },
  follicular: {
    body: "#6ee7b7",
    eye: "#065f46",
    mouth: "#065f46",
    accent: "#34d399",
    accentSoft: "#a7f3d0",
    highlight: "#ecfdf5",
  },
  ovulation: {
    body: "#34d399",
    eye: "#064e3b",
    mouth: "#064e3b",
    accent: "#10b981",
    accentSoft: "#6ee7b7",
    highlight: "#d1fae5",
  },
  luteal: {
    body: "#5eead4",
    eye: "#134e4a",
    mouth: "#134e4a",
    accent: "#2dd4bf",
    accentSoft: "#99f6e4",
    highlight: "#ccfbf1",
  },
};

const SP_SKINS: SkinMatrix = {
  default: {
    body: "#fdba74",
    eye: "#9a3412",
    mouth: "#9a3412",
    accent: "#fb923c",
    accentSoft: "#fde68a",
    highlight: "#ffedd5",
  },
  menstrual: {
    body: "#fb923c",
    eye: "#7c2d12",
    mouth: "#7c2d12",
    accent: "#f97316",
    accentSoft: "#fed7aa",
    highlight: "#fff7ed",
  },
  follicular: {
    body: "#fcd34d",
    eye: "#92400e",
    mouth: "#92400e",
    accent: "#fbbf24",
    accentSoft: "#fde68a",
    highlight: "#fef9c3",
  },
  ovulation: {
    body: "#fbbf24",
    eye: "#78350f",
    mouth: "#78350f",
    accent: "#f59e0b",
    accentSoft: "#fef08a",
    highlight: "#fffbeb",
  },
  luteal: {
    body: "#fdba74",
    eye: "#9a3412",
    mouth: "#9a3412",
    accent: "#fb923c",
    accentSoft: "#fed7aa",
    highlight: "#ffedd5",
  },
};

const SKINS_BY_TEMPERAMENT: Record<TemperamentGroup, SkinMatrix> = {
  NF: NF_SKINS,
  NT: NT_SKINS,
  SJ: SJ_SKINS,
  SP: SP_SKINS,
};

export function getMascotSkin(
  temperament: TemperamentGroup,
  phase: MascotPhase,
): MascotSkinColors {
  return SKINS_BY_TEMPERAMENT[temperament][phase];
}
