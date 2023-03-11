import {CSSProperties, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {ValidationData} from "@rjsf/utils";
import { RadioButton } from 'primereact/radiobutton'

interface ExportCtmlDialogProps {
  isDialogVisible: boolean;
  exportCtmlClicked: () => void;
  validationErrors: ValidationData<any>;
  onDialogHide: () => void;
}

const dismissBtnStyle: CSSProperties = {
  height: '36px',
  fontFamily: "'Inter', sans-serif",
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '16px',
  color: '#2E72D2'
}

const saveBtnStyle: CSSProperties = {
  marginLeft: '8px',
  backgroundColor: '#2E72D2',
  fontFamily: "'Inter', sans-serif",
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '16px',
  height: '36px'
}

const ExportCtmlDialog = (props: ExportCtmlDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isDialogVisible);
  const [format, setFormat] = useState<string>('JSON');

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  const onDialogHide = () => {
    props.onDialogHide();
  }

  const footer = (props: {exportCtmlClicked: () => void}) => {
    const {exportCtmlClicked} = props;
    return (
      <div>
        <Button label="Save Matching Criteria" onClick={exportCtmlClicked} style={saveBtnStyle} />
        <Button label="Dismiss" onClick={onDialogHide} style={dismissBtnStyle} />
      </div>
    )
  }

  return (
    <Dialog header="Export CTML"
            footer={() => footer({exportCtmlClicked: props.exportCtmlClicked})}
            visible={isDialogVisible}
            style={{width: '960px', minHeight: '300px'}}
            onHide={onDialogHide}>
      <div style={{marginLeft: '30px'}}>
        <h2>Export As</h2>
        <div className="field-radiobutton">
          <RadioButton inputId="json" name="json" value="JSON" onChange={(e) => setFormat(e.value)} checked={format === 'JSON'} />
          <label htmlFor="city1">Chicago</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton inputId="yaml" name="json" value="YAML" onChange={(e) => setFormat(e.value)} checked={format === 'YAML'} />
          <label htmlFor="city2">Los Angeles</label>
        </div>
      </div>
    </Dialog>
  )
}

export default ExportCtmlDialog
