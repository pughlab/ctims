import EditorTopBar from "../../../components/editor/EditorTopBar";
import {Ui} from "@ctims-mono-repo/ui";
import { Tree } from 'primereact/tree';

import React, {useEffect, useState} from "react";

const EditorCreateCtml = () => {

  const [nodes, setNodes] = useState(null);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '80px',
    paddingRight: '80px',
    paddingTop: '20px',
  }

  useEffect(() => {
    const nodes = [
      {
        label: 'Trial information',
      },
      {
        label: 'Clinical Metadata',
      },
      {
        label: 'Drug List',
      }
    ];
    setNodes(nodes);
  }, []);

  return (
    <>
      <EditorTopBar />
      <div style={containerStyle}>
        {/*<Tree value={nodes} />*/}
        <Ui></Ui>
      </div>

    </>
  )
}
export default EditorCreateCtml;

