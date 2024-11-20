import { useRouter } from 'next/router';
import useGetCtmlSchema from '../../../hooks/useGetCtmlSchema';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditorTopBar from '../../../components/editor/EditorTopBar';
import LeftMenuEditorComponent from '../../../components/editor/LeftMenuEditorComponent';
import { Ui } from '@ctims-mono-repo/ui';
import IdleComponent from "../../../components/IdleComponent";
import FooterComponent from 'apps/web/components/FooterComponent';
import {useSelector} from 'react-redux';
import {RootState} from 'apps/web/store/store';

const EditorCreateCtmlForGroup = () => {
  const { error, response, loading, operation} = useGetCtmlSchema();
  const [lastSaved, setLastSaved] = useState<string>("Unsaved");
  const trialId = useSelector((state: RootState) => state.context.trialNctId);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    operation();
    let createTrialObject = {
      trialInformation: {
        trial_id: trialId,
        trial_internal_id: uuidv4(),
      },
      drug_list: {
        drug: [
          {}
        ]
      },
      management_group_list: {
        management_group: [
          {}
        ]
      },
      site_list: {
        site: [
          {}
        ]
      },
      sponsor_list: {
        sponsor: [
          {}
        ]
      },
      staff_list: {
        protocol_staff: [
          {}
        ]
      },
      treatment_list: {
        step: [
            {
                arm: [
                    {
                        dose_level: [
                            {}
                        ],
                        match: {}
                    }
                ]
            }
        ]
      },
    }
    setFormData(createTrialObject)
  }, [])

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
