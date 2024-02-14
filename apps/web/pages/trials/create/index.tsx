import EditorTopBar from "../../../components/editor/EditorTopBar";
import {Ui} from "@ctims-mono-repo/ui";

import React, {useEffect} from "react";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import IdleComponent from "../../../components/IdleComponent";
import useGetApiInfo from "apps/web/hooks/useGetApiInfo";

const EditorCreateCtml = () => {

  const { error, response, loading, operation} = useGetCtmlSchema();

  const router = useRouter();

  const {data} = useSession()

  const { 
    error: getApiInfoError,
    response: getApiInfoResponse,
    loading: getApiInfoLoading, 
    operation: getApiInfoOperation
  } = useGetApiInfo();

  useEffect(() => {
    getApiInfoOperation();
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

  const versionContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '16px',
  }

  return (
    <>
      <EditorTopBar />
      <IdleComponent />
      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {response && <Ui ctml_schema={response}></Ui>}
      </div>
      <div style={versionContainerStyle}>CTIMS version {getApiInfoResponse}</div>
    </>
  )
}
export default EditorCreateCtml;

