export type SpeechVariants = string | string[];

export function pickVariant(options: SpeechVariants): string {
  if (typeof options === "string") return options;
  if (options.length === 0) return "";
  return options[Math.floor(Math.random() * options.length)];
}
