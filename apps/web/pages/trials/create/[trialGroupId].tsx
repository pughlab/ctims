import { useRouter } from 'next/router';
import useGetCtmlSchema from '../../../hooks/useGetCtmlSchema';
import {signOut, useSession} from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import EditorTopBar from '../../../components/editor/EditorTopBar';
import LeftMenuEditorComponent from '../../../components/editor/LeftMenuEditorComponent';
import { Ui } from '@ctims-mono-repo/ui';
import IdleComponent from "../../../components/IdleComponent";
import FooterComponent from 'apps/web/components/FooterComponent';
import { useSelector } from 'react-redux';
import { RootState } from 'apps/web/store/store';
import process from "process";

const EditorCreateCtmlForGroup = () => {
  const router = useRouter()
  const { trialGroupId } = router.query
  const { error, response, loading, operation} = useGetCtmlSchema();
  const [lastSaved, setLastSaved] = useState<string>("Unsaved");
  const nctId = useSelector((state: RootState) => state.context.nctId);
  const [formData, setFormData] = useState(null);

  const {data} = useSession()

  useEffect(() => {
    operation();
    let createTrialObject = {
      trialInformation: {
        trial_id: nctId,
      }
    }
    setFormData(createTrialObject)
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
      <EditorTopBar lastSaved={lastSaved} setLastSaved={setLastSaved}/>
      <IdleComponent />
      <div style={containerStyle}>
        <LeftMenuEditorComponent />
        {response && <Ui ctml_schema={response} formData={formData} setLastSaved={setLastSaved}></Ui>}
      </div>
      <FooterComponent/>
    </>
  )
}
export default EditorCreateCtmlForGroup;
