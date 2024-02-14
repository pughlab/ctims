import {useRouter} from "next/router";
import EditorTopBar from "../../../components/editor/EditorTopBar";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {Ui} from "@ctims-mono-repo/ui";
import React, {useEffect, useState} from "react";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import useEditTrial from "../../../hooks/useEditTrial";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import {setTrialId} from "../../../store/slices/contextSlice";
import {useDispatch} from "react-redux";
import IdleComponent from "../../../components/IdleComponent";
import { setCtmlModel } from '../../../store/slices/ctmlModelSlice';

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
  const { id } = router.query

  dispatch(setTrialId(+id));

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
    if (getCtmlSchemaError) {
      // Redirect to the home page if the user is unauthenticated
      getCtmlSchemaError.statusCode === 401 ? router.push('/') : null
    }
  }, [getCtmlSchemaError]);

  useEffect(() => {
    if (editTrialError) {
      // Redirect to the home page if the user is unauthenticated
      editTrialError.statusCode === 401 ? router.push('/') : null
    }
  }, [editTrialError]);


  useEffect(() => {
    if (editTrialResponse) {
      const trial = structuredClone(editTrialResponse)
      const ctml_json = trial.ctml_jsons[0].data;
      let editTrialObject = {
        trialInformation: {
          trial_id: trial.nct_id,
          nickname: trial.nickname ? trial.nickname : '',
          // This is a fix to get the principal investigator to show up in the form
          // Without checking for null, the field will be marked as invalid on export, even when empty. See CTM-296.
          principal_investigator: trial.principal_investigator ? trial.principal_investigator : '',
          ctml_status: trial.status,
          long_title: ctml_json.long_title,
          short_title: ctml_json.short_title,
          phase: ctml_json.phase,
          protocol_no: ctml_json.protocol_no,
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

      editTrialObject = {...editTrialObject, ...ctml_json}
      setFormData(editTrialObject)
      dispatch(setCtmlModel(editTrialObject))
      console.log('editTrialObject', editTrialObject)
    }


  }, [editTrialResponse])

  // return <div>Editing trial {id}</div>
  return (
    <>
      <EditorTopBar isEditMode={true} title={"Edit CTML"}/>
      <IdleComponent />
      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {(getCtmlSchemaResponse && formData) && <Ui ctml_schema={getCtmlSchemaResponse} formData={formData}></Ui>}
      </div>

    </>
  )
}
export default EditorEditTrialPage
