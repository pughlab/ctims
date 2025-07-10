import {useRouter} from "next/router";
import EditorTopBar from "../../../components/editor/EditorTopBar";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {Ui} from "@ctims-mono-repo/ui";
import React, {useEffect, useState} from "react";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import useEditTrial from "../../../hooks/useEditTrial";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import {selectedTrialGroupId, setTrialId} from "../../../store/slices/contextSlice";
import {useDispatch} from "react-redux";
import IdleComponent from "../../../components/IdleComponent";
import {setCtmlModel} from '../../../store/slices/ctmlModelSlice';
import FooterComponent from "apps/web/components/FooterComponent";
import {transformPriorTreatmentRequirements} from "../../../../../libs/ui/src/lib/components/helpers";

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '80px',
  paddingRight: '80px',
  paddingTop: '20px',
}


const EditorEditTrialPage = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const {id} = router.query

  dispatch(setTrialId(+id));

  const [formData, setFormData] = useState(null);
  const [lastSaved, setLastSaved] = useState<string>("Unsaved");

  const {
    error: getCtmlSchemaError,
    response: getCtmlSchemaResponse,
    loading: getCtmlSchemaLoading,
    operation: getCtmlSchemaOperation
  } = useGetCtmlSchema();

  const {
    error: editTrialError,
    response: editTrialResponse,
    loading: editTrialLoading,
    editTrialOperation
  } = useEditTrial();

  useEffect(() => {
    if (id) {
      getCtmlSchemaOperation();
      editTrialOperation(id as string)
    }
  }, [id])

  useEffect(() => {
    if (editTrialResponse) {
      setLastSaved(editTrialResponse.updatedAt);
      const trial = structuredClone(editTrialResponse)
      const ctml_json = trial.ctml_jsons[0].data;

      // prior treatment requirements has been renamed to additional_criteria_requirement_names
      // This will keep backward compatibility with the old format, and transform it to the new format
      //Checking whether the prior_treatment_requirements exist and the data is in array format
      //If there's the old format, change to the new format
      if (ctml_json.prior_treatment_requirements && Array.isArray(ctml_json.prior_treatment_requirements)) {
        const transformPriorDataFromArrayToObject = transformPriorTreatmentRequirements(ctml_json.prior_treatment_requirements);
        ctml_json.additional_criteria_requirements = transformPriorDataFromArrayToObject
      }
      // Do the same for additional_criteria_requirement_names if it exists
      if (ctml_json.additional_criteria_requirements && Array.isArray(ctml_json.additional_criteria_requirements)) {
        const transformPriorDataFromArrayToObject = transformPriorTreatmentRequirements(ctml_json.additional_criteria_requirements);
        ctml_json.additional_criteria_requirements = transformPriorDataFromArrayToObject
      }

      let editTrialObject = {
        trialInformation: {
          trial_id: trial.nct_id,
          trial_internal_id: trial.trial_internal_id,
          nickname: trial.nickname ? trial.nickname : '',
          // This is a fix to get the principal investigator to show up in the form
          // Without checking for null, the field will be marked as invalid on export, even when empty. See CTM-296.
          principal_investigator: trial.principal_investigator ? trial.principal_investigator : '',
          ctml_status: trial.status,
          long_title: ctml_json.long_title,
          short_title: ctml_json.short_title,
          phase: ctml_json.phase,
          protocol_no: ctml_json.protocol_no,
          protocol_version_no: ctml_json.protocol_version_no,
          protocol_version_date: ctml_json.protocol_version_date,
          reb_no: ctml_json.reb_no,
          nct_purpose: ctml_json.nct_purpose,
          status: ctml_json.status,
        },
        age_group: {
          age: ctml_json.age,
        }
      }

      delete trial.trial_id
      delete trial.nickname
      delete trial.principal_investigator
      delete trial.ctml_status

      // re-establish the selected trial group id when editing a trial, after browser refresh it will re-established this as well
      const trialGroupName = editTrialResponse.trial_group.name;
      dispatch(selectedTrialGroupId(trialGroupName));

      editTrialObject = {...editTrialObject, ...ctml_json}
      setFormData(editTrialObject)

      //if prior_treatment_requirements exist in the ctml_json convert the data format from object to an array before storing the data in Store for maore details refers to Tccket CTM-482
      const transformAdditionalCriteriaDataFromObjectToArray = ctml_json.additional_criteria_requirements?.additional_criteria_requirements.map(item => item.additional_criteria_requirement_name);
      if (ctml_json.additional_criteria_requirements?.additional_criteria_requirements) {
        let priordata = {
          additional_criteria_requirements: transformAdditionalCriteriaDataFromObjectToArray
        }
        editTrialObject = {...editTrialObject, ...priordata}
      }
      dispatch(setCtmlModel(editTrialObject))
    }
  }, [editTrialResponse])

  return (
    <>

      <EditorTopBar title={"Edit CTML"} lastSaved={lastSaved} setLastSaved={setLastSaved}/>
      <IdleComponent/>

      <div style={containerStyle}>
        <LeftMenuEditorComponent/>
        {(getCtmlSchemaResponse && formData) &&
          <Ui ctml_schema={getCtmlSchemaResponse} formData={formData} setLastSaved={setLastSaved}></Ui>}
      </div>
      <FooterComponent/>
    </>
  )
}
export default EditorEditTrialPage
