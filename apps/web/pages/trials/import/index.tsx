import EditorTopBar from "../../../components/editor/EditorTopBar";
import IdleComponent from "../../../components/IdleComponent";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {Ui} from "@ctims-mono-repo/ui";
import React, {useEffect, useState} from "react";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import {setCtmlModel} from "../../../store/slices/ctmlModelSlice";
import {useDispatch} from "react-redux";


const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '80px',
  paddingRight: '80px',
  paddingTop: '20px',
}

const EditorImportTrialPage = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    getCtmlSchemaOperation();
    const formData = sessionStorage.getItem('imported_ctml');
    if (formData) {
      const trial = JSON.parse(formData);
      let editTrialObject = {
        trialInformation: {
          trial_id: trial.nct_id,
          nickname: trial.nickname,
          principal_investigator: trial.principal_investigator,
          ctml_status: trial.status,
          long_title: trial.long_title,
          short_title: trial.short_title,
          phase: trial.phase,
          protocol_no: trial.protocol_no,
          nct_purpose: trial.nct_purpose,
          status: trial.status,
        },
        age_group: {
          age: trial.age,
        }
      }

      editTrialObject = {...editTrialObject, ...trial}

      delete trial.trial_id
      delete trial.nickname
      delete trial.principal_investigator
      delete trial.ctml_status

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
      <EditorTopBar isEditMode={true} />
      <IdleComponent />
      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {(getCtmlSchemaResponse && formData) && <Ui ctml_schema={getCtmlSchemaResponse} formData={formData}></Ui>}
      </div>

    </>
  )
}
export default EditorImportTrialPage
