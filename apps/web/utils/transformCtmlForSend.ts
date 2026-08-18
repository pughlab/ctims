import { flattenGenericObject } from 'libs/ui/src/lib/components/helpers';

/**
 * Transforms a CTML model object using the single-send logic
 * (used when sending a single CTML with normalized structure)
 */
export const transformCtmlForSend = (ctmlModel: any) => {
  let ctmlModelCopy;
  const age_group = ctmlModel.age_group;
  const trialInformation = ctmlModel.trialInformation;
  const treatmentListFlatted = flattenGenericObject(ctmlModel.treatment_list);
  ctmlModelCopy = {'trial_list' : [{...ctmlModel, ...trialInformation, ...age_group, treatment_list: treatmentListFlatted}]};
  delete ctmlModelCopy.age_group;
  delete ctmlModelCopy.trialInformation;
  delete ctmlModelCopy.ctml_status;
  return ctmlModelCopy;
}
