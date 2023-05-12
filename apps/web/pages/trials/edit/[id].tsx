import {useRouter} from "next/router";
import EditorTopBar from "../../../components/editor/EditorTopBar";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {Ui} from "@ctims-mono-repo/ui";
import React, {useEffect} from "react";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import useEditTrial from "../../../hooks/useEditTrial";

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
      console.log('editTrialResponse', editTrialResponse)
    }
  }, [editTrialResponse])

  return <div>Editing trial {id}</div>
  // return (
  //   <>
  //     <EditorTopBar />
  //
  //     <div style={containerStyle}>
  //       <LeftMenuEditorComponent />
  //       {getCtmlSchemaResponse && <Ui ctml_schema={getCtmlSchemaResponse}></Ui>}
  //     </div>
  //
  //   </>
  // )
}
export default EditorEditTrialPage
