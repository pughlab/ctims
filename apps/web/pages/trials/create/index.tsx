import EditorTopBar from "../../../components/editor/EditorTopBar";
import {Ui} from "@ctims-mono-repo/ui";
import React from "react";

const EditorCreateCtml = () => {

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
        <Ui></Ui>
      </div>

    </>
  )
}
export default EditorCreateCtml;

