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
import { setCtmlModel } from '../../../store/slices/ctmlModelSlice';
import FooterComponent from "apps/web/components/FooterComponent";
import useGetTrialLock from "../../../hooks/useGetTrialLock";

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
  const [lastSaved, setLastSaved] = useState<string>("Unsaved");
  const [isEditMode, setIsEditMode] = useState(true);

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

  const {
    error: getTrialLockError,
    response: getTrialLockResponse,
    loading: getTrialLockLoading,
    getTrialLockOperation
  } = useGetTrialLock()

  useEffect(() => {
    if (id) {
      getTrialLockOperation(id as string)
      getCtmlSchemaOperation();
      editTrialOperation(id as string)
    }
  }, [id])

  useEffect(() => {
    if (editTrialResponse) {
      setLastSaved(editTrialResponse.updatedAt);
      const trial = structuredClone(editTrialResponse)
      const ctml_json = trial.ctml_jsons[0].data;
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
      dispatch(setCtmlModel(editTrialObject))
    }
  }, [editTrialResponse])

  useEffect(() => {
    if (getTrialLockResponse) {
      console.log('getTrialLockResponse', getTrialLockResponse)
      if (getTrialLockResponse.data) {
        setIsEditMode(false);
      } else {
        setIsEditMode(true);
      }
    }
  }, [getTrialLockResponse])

  return (
    <>

      <EditorTopBar isEditMode={isEditMode} title={"Edit CTML"} lastSaved={lastSaved} setLastSaved={setLastSaved}/>
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
