import EditorTopBar from "../../../components/editor/EditorTopBar";
import IdleComponent from "../../../components/IdleComponent";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {Ui} from "@ctims-mono-repo/ui";
import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import {setCtmlModel} from "../../../store/slices/ctmlModelSlice";
import {useDispatch} from "react-redux";
import FooterComponent from "apps/web/components/FooterComponent";
import {resetTrialId} from "../../../store/slices/contextSlice";


const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '80px',
  paddingRight: '80px',
  paddingTop: '20px',
}

const transformPriorTreatmentRequirements = (requirements) => {
  return {
    prior_treatment_requirement: requirements.map(requirement => ({
      prior_treatment_requirement_name: requirement
    }))
  };
};

const EditorImportTrialPage = () => {

  const dispatch = useDispatch();

  const [lastSaved, setLastSaved] = useState<string>("Unsaved");

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(resetTrialId());
    getCtmlSchemaOperation();
    const formData = sessionStorage.getItem('imported_ctml');
    if (formData) {
      const trial = JSON.parse(formData);

      const transformedPriorTreatmentRequirements = trial.prior_treatment_requirements && trial.prior_treatment_requirements.length>0
      ? transformPriorTreatmentRequirements(trial.prior_treatment_requirements)
      : {};

      let editTrialObject = {
        trialInformation: {
          trial_id: trial.trial_id,
          trial_internal_id: uuidv4(),
          nickname: trial.nickname,
          principal_investigator: trial.principal_investigator,
          ctml_status: 'DRAFT',
          long_title: trial.long_title,
          short_title: trial.short_title,
          phase: trial.phase,
          protocol_no: trial.protocol_no,
          protocol_version_no: trial.protocol_version_no,
          protocol_version_date: trial.protocol_version_date,
          reb_no: trial.reb_no,
          nct_purpose: trial.nct_purpose,
          status: trial.status,
        },
        age_group: {
          age: trial.age,
        }
      }

      delete trial.trial_id
      delete trial.nickname
      delete trial.principal_investigator
      delete trial.ctml_status
      delete trial.status
      delete trial.age
      delete trial.last_updated
      delete trial.nct_id
      delete trial.nct_purpose
      delete trial.phase
      delete trial.protocol_no
      delete trial.short_title
      delete trial.long_title


      editTrialObject = {...editTrialObject, ...trial}
      let priordata = {
        prior_treatment_requirements : transformedPriorTreatmentRequirements
      }
      editTrialObject = {...editTrialObject, ...priordata}
      setFormData(editTrialObject);

      dispatch(setCtmlModel(editTrialObject))
    }
  }, []);

  const {
    error: getCtmlSchemaError,
    response: getCtmlSchemaResponse,
    loading: getCtmlSchemaLoading,
    operation: getCtmlSchemaOperation
  } = useGetCtmlSchema();

  return (
    <>
      <EditorTopBar isEditMode={true} lastSaved={lastSaved} setLastSaved={setLastSaved} title={"Import CTML"}/>
      <IdleComponent />
      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {(getCtmlSchemaResponse && formData) && <Ui ctml_schema={getCtmlSchemaResponse} formData={formData} setLastSaved={setLastSaved}></Ui>}
      </div>
      <FooterComponent/>
    </>
  )
}
export default EditorImportTrialPage
