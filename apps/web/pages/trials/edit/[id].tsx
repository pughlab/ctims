import {useRouter} from "next/router";
import EditorTopBar from "../../../components/editor/EditorTopBar";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {Ui} from "@ctims-mono-repo/ui";
import React, {useEffect, useState} from "react";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import useEditTrial from "../../../hooks/useEditTrial";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '80px',
  paddingRight: '80px',
  paddingTop: '20px',
}

const EditorEditTrialPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [formData, setFormData] = useState(null);

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
      const trial = structuredClone(editTrialResponse.data)
      let editTrialObject = {
        trialInformation: {
          trial_id: trial.trial_id,
          nickname: trial.nickname,
          principal_investigator: trial.principal_investigator,
          ctml_status: trial.ctml_status,
          long_title: trial.long_title,
          short_title: trial.short_title,
          phase: trial.phase,
          protocol_no: trial.protocol_no,
          nct_purpose: trial.nct_purpose,
          status: trial.status,
        },
      }

      delete trial.trial_id
      delete trial.nickname
      delete trial.principal_investigator
      delete trial.ctml_status
      delete trial.long_title
      delete trial.short_title
      delete trial.phase
      delete trial.protocol_no
      delete trial.nct_purpose
      delete trial.status

      editTrialObject = {...editTrialObject, ...trial}
      setFormData(editTrialObject)
      console.log('editTrialObject', editTrialObject)
    }


  }, [editTrialResponse])

  // return <div>Editing trial {id}</div>
  return (
    <>
      <EditorTopBar isEditMode={true} />

      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {(getCtmlSchemaResponse && formData) && <Ui ctml_schema={getCtmlSchemaResponse} formData={formData}></Ui>}
      </div>

    </>
  )
}
export default EditorEditTrialPage
