import { useRouter } from 'next/router';
import useGetCtmlSchema from '../../../hooks/useGetCtmlSchema';
import {signOut, useSession} from 'next-auth/react';
import React, { useEffect } from 'react';
import EditorTopBar from '../../../components/editor/EditorTopBar';
import LeftMenuEditorComponent from '../../../components/editor/LeftMenuEditorComponent';
import { Ui } from '@ctims-mono-repo/ui';
import IdleComponent from "../../../components/IdleComponent";
import FooterComponent from 'apps/web/components/FooterComponent';
import process from "process";

const EditorCreateCtmlForGroup = () => {
  const router = useRouter()
  const { trialGroupId } = router.query
  const { error, response, loading, operation} = useGetCtmlSchema();


  const {data} = useSession()

  useEffect(() => {
    operation();
  }, [])

  useEffect(() => {
    if(!data) {
      // router.push('/');
      signOut({redirect: false}).then(() => {
        router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      });
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
      <IdleComponent />
      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {response && <Ui ctml_schema={response}></Ui>}
      </div>
      <FooterComponent/>
    </>
  )
}
export default EditorCreateCtmlForGroup;
