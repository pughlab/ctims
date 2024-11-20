import EditorTopBar from "../../../components/editor/EditorTopBar";
import {Ui} from "@ctims-mono-repo/ui";

import React, {useEffect, useState} from "react";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import useGetCtmlSchema from "../../../hooks/useGetCtmlSchema";
import IdleComponent from "../../../components/IdleComponent";
import FooterComponent from "apps/web/components/FooterComponent";
import useHandleSignOut from "../../../hooks/useHandleSignOut";


const EditorCreateCtml = () => {

  const { error, response, loading, operation} = useGetCtmlSchema();
  const {handleSignOut} = useHandleSignOut();

  const [lastSaved, setLastSaved] = useState<string>("Unsaved");

  const router = useRouter();

  const {data} = useSession()

  useEffect(() => {
    operation();
  }, [])

  useEffect(() => {
    if(!data) {
      handleSignOut();
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
      <EditorTopBar lastSaved={lastSaved} setLastSaved={setLastSaved}/>
      <IdleComponent />
      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {response && <Ui ctml_schema={response}></Ui>}
      </div>
      <FooterComponent/>
    </>
  )
}
export default EditorCreateCtml;

