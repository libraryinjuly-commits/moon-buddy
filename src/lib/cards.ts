export type CardRarity = "Common" | "Rare" | "Super Rare";

export interface MoonCardDefinition {
  id: string;
  name: string;
  rarity: CardRarity;
  description: string;
  secretMessage: string;
  emoji: string;
}

export const CARD_DATABASE: MoonCardDefinition[] = [
  {
    id: "card_01",
    name: "이불 속 굼벵이 달 친구",
    rarity: "Common",
    description:
      "피곤함에 지쳐 이불과 물아일체가 된 상태입니다. 건드리면 굴러가요.",
    secretMessage: "주인님, 오늘 우리 같이 이불 밖으로 나가지 말까요? 🛌",
    emoji: "🥱",
  },
  {
    id: "card_02",
    name: "초콜릿 도둑 달 친구",
    rarity: "Rare",
    description:
      "당이 떨어져 주인님의 비상 초콜릿을 몰래 훔쳐 먹다 들켰습니다.",
    secretMessage: "입가에 묻은 거 초콜릿 아니에요! 진짜예요! 🍫",
    emoji: "🐹",
  },
  {
    id: "card_03",
    name: "인간 샌드백 달 친구",
    rarity: "Super Rare",
    description:
      "주인님의 생리 전 짜증과 분노를 다 받아내기 위해 비장하게 무장했습니다.",
    secretMessage: "오늘 짜증 나는 일 있었죠? 저를 마구 꼬집으셔도 괜찮아요! 🥊",
    emoji: "🦖",
  },
];

const RARITY_WEIGHTS: Record<CardRarity, number> = {
  Common: 60,
  Rare: 30,
  "Super Rare": 10,
};

export interface RarityStyle {
  frontClass: string;
  borderClass: string;
  badgeClass: string;
  textClass: string;
  descClass: string;
}

export const RARITY_STYLES: Record<CardRarity, RarityStyle> = {
  Common: {
    frontClass: "card-rarity-common",
    borderClass: "border-slate-300",
    badgeClass: "bg-slate-500/90 text-white",
    textClass: "text-slate-800",
    descClass: "text-slate-700/90",
  },
  Rare: {
    frontClass: "card-rarity-rare",
    borderClass: "border-violet-400",
    badgeClass: "bg-violet-600/90 text-white",
    textClass: "text-violet-950",
    descClass: "text-violet-900/90",
  },
  "Super Rare": {
    frontClass: "card-rarity-super-rare",
    borderClass: "border-amber-300",
    badgeClass: "bg-amber-500/95 text-amber-950",
    textClass: "text-amber-950",
    descClass: "text-amber-900/90",
  },
};

export function getCardById(cardId: string): MoonCardDefinition | undefined {
  return CARD_DATABASE.find((card) => card.id === cardId);
}

export function getRarityStyle(rarity: CardRarity): RarityStyle {
  return RARITY_STYLES[rarity];
}

export function getRarityLabels(ui: {
  cardRarityCommon: string;
  cardRarityRare: string;
  cardRaritySuperRare: string;
}): Record<CardRarity, string> {
  return {
    Common: ui.cardRarityCommon,
    Rare: ui.cardRarityRare,
    "Super Rare": ui.cardRaritySuperRare,
  };
}

function pickRarity(): CardRarity {
  const roll = Math.random() * 100;
  if (roll < RARITY_WEIGHTS.Common) return "Common";
  if (roll < RARITY_WEIGHTS.Common + RARITY_WEIGHTS.Rare) return "Rare";
  return "Super Rare";
}

export function drawRandomCard(): MoonCardDefinition {
  const rarity = pickRarity();
  const pool = CARD_DATABASE.filter((card) => card.rarity === rarity);
  const source = pool.length > 0 ? pool : CARD_DATABASE;
  return source[Math.floor(Math.random() * source.length)];
}
