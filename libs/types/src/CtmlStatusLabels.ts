import { CtmlStatusEnum } from "./ctml-status.enum";

export const CtmlStatusLabels: Record<CtmlStatusEnum, string> = {
  [CtmlStatusEnum.DRAFT]: "Draft",
  [CtmlStatusEnum.IN_REVIEW]: "In Review",
  [CtmlStatusEnum.COMPLETED]: "Completed",
};

/**
 * Retrieves the label associated with the given value from the CtmlStatusLabels mapping.
 * @param {string} value - The value for which to retrieve the label.
 * @returns {string | undefined} The label associated with the value, or undefined if not found.
 */
export function getCtmlStatusLabel(enumVal: CtmlStatusEnum): string | undefined {
  const label = CtmlStatusLabels[enumVal];
  return label;
}
