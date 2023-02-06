import './ui.module.scss';
// import {schema, uiSchema} from "./custom-rjsf-templates/generatedSchema";
import {CSSProperties, useEffect, useState} from "react";
import CtimsFormComponentMemo from './components/CtimsFormComponent';
import CtimsMatchDialog from './components/CtimsMatchDialog';


const containerStyle: CSSProperties = {
  width: '100%',
}


/* eslint-disable-next-line */
export interface UiProps {}

export const Ui = (props: UiProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [armCode, setArmCode] = useState('');

  useEffect(() => {
    console.log('My component was re-rendered');
  });

  const handleSpecialClick = (armCode: string, id: string) => {
    console.log('handleSpecialClick armCode: ', armCode);
    console.log('handleSpecialClick id: ', id);
    setArmCode(armCode)
    setIsOpen(true);
  }

  const handleSubmit = (e: any) => {
    console.log(e);
  }

  const onFormChange = (data: any) => {
    console.log('onChange event', data)
  }

  // @ts-ignore
  return (
    <div style={containerStyle}>
      <CtimsFormComponentMemo
        onSpecialButtonClick={handleSpecialClick}
        onRjsfFormChange={onFormChange}
      />
      <CtimsMatchDialog
                      onDialogHide={() => setIsOpen(false)}
                      isDialogVisible={isOpen}
                      armCode={armCode}
      />
    </div>
  );
};

export default Ui;
