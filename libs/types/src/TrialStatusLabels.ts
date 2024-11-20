import {TrialStatusEnum} from "./trial-status.enum";

export const TrialStatusLabels: Record<TrialStatusEnum, string> = {
  [TrialStatusEnum.PENDING]: "Pending",
  [TrialStatusEnum.MATCHED]: "Matched",
  [TrialStatusEnum.ERROR]: "Error",
};

/**
 * Retrieves the label associated with the given value from the TrialStatusLabels mapping.
 * @param {string} value - The value for which to retrieve the label.
 * @returns {string | undefined} The label associated with the value, or undefined if not found.
 */
export function getTrialStatusLabel(enumVal: TrialStatusEnum): string | undefined {
  const label = TrialStatusLabels[enumVal];
  return label;
}
