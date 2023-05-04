import EditorTopBar from "../../../components/editor/EditorTopBar";
import {Ui} from "@ctims-mono-repo/ui";

import React, {useEffect} from "react";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";

const EditorCreateCtml = () => {

  const { error, response, loading, operation} = useGetCtmlSchema();

  const router = useRouter();

  const {data} = useSession()

  useEffect(() => {
    operation();
  }, [])

  useEffect(() => {
    if(!data) {
      router.push('/');
    }
  }, [data])

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '80px',
    paddingRight: '80px',
    paddingTop: '20px',
  }



  return (
    <>
      <EditorTopBar />

      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {response && <Ui ctml_schema={response}></Ui>}
      </div>

    </>
  )
}
export default EditorCreateCtml;

