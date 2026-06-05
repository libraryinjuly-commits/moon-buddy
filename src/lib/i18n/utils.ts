import type { CyclePhase, Mood, TemperamentGroup } from "@/types";
import type { PhaseDialogues, TemperamentDialogueSet } from "@/lib/i18n/types";

type MoodKey = Mood | "default";

export function mergeDialogues(
  guides: Record<CyclePhase, PhaseDialogues>,
  speeches: Record<TemperamentGroup, Record<CyclePhase, Record<MoodKey, string>>>,
): Record<TemperamentGroup, TemperamentDialogueSet> {
  const temperaments: TemperamentGroup[] = ["NT", "NF", "SJ", "SP"];
  const result = {} as Record<TemperamentGroup, TemperamentDialogueSet>;

  for (const temperament of temperaments) {
    const phases = {} as TemperamentDialogueSet;
    const phaseKeys: CyclePhase[] = [
      "menstrual",
      "follicular",
      "ovulation",
      "luteal",
    ];

    for (const phase of phaseKeys) {
      const moodKeys: MoodKey[] = [
        "great",
        "good",
        "okay",
        "low",
        "bad",
        "default",
      ];
      const phaseDialogues = {} as PhaseDialogues;

      for (const mood of moodKeys) {
        phaseDialogues[mood] = {
          guide: guides[phase][mood].guide,
          speech: speeches[temperament][phase][mood],
        };
      }

      phases[phase] = phaseDialogues;
    }

    result[temperament] = phases;
  }

  return result;
}
