import EditorTopBar from "../../../components/editor/EditorTopBar";
import {Ui} from "@ctims-mono-repo/ui";

import React, {useEffect} from "react";
import LeftMenuEditorComponent from "../../../components/editor/LeftMenuEditorComponent";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const EditorCreateCtml = () => {

  const router = useRouter();

  const {data} = useSession()

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
        {/*<Tree value={nodes} />*/}
        <LeftMenuEditorComponent />
        <Ui></Ui>
      </div>

    </>
  )
}
export default EditorCreateCtml;

