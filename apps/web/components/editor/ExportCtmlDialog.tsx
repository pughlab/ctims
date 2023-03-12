import {CSSProperties, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {ValidationData} from "@rjsf/utils";
import { RadioButton } from 'primereact/radiobutton'
import styles from './ExportCtmlDialog.module.scss';

interface ExportCtmlDialogProps {
  isDialogVisible: boolean;
  exportCtmlClicked: () => void;
  validationErrors: ValidationData<any>;
  onDialogHide: () => void;
}

const ExportCtmlDialog = (props: ExportCtmlDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isDialogVisible);
  const [validationData] = useState<ValidationData<any>>(props.validationErrors);
  const [format, setFormat] = useState<string>('JSON');

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  const onDialogHide = () => {
    props.onDialogHide();
  }

  const footer = (props: {exportCtmlClicked: () => void}) => {
    const {exportCtmlClicked} = props;
    const cancelBtn = `p-button-text ${styles['cancel-btn']}`
    const exportBtn = `${styles['export-btn']}`
    return (
      <div>
        <Button label="Cancel" className={cancelBtn} onClick={onDialogHide} />
        <Button label="Export CTML" onClick={exportCtmlClicked} className={exportBtn} />
      </div>
    )
  }

  return (
    <Dialog header="Export CTML"
            footer={() => footer({exportCtmlClicked: props.exportCtmlClicked})}
            visible={isDialogVisible}
            style={{width: '700px', minHeight: '200px'}}
            onHide={onDialogHide}>
      <div style={{marginLeft: '30px'}}>
        <h2>Export As</h2>
        <div className="field-radiobutton">
          <RadioButton inputId="json" name="json" value="JSON" onChange={(e) => setFormat(e.value)} checked={format === 'JSON'} />
          <label htmlFor="json" className={styles['radio-btn']}>JSON</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            inputId="yaml"
            name="json"
            value="YAML"
            onChange={(e) => setFormat(e.value)}
            checked={format === 'YAML'}
            style={{marginTop: '8px'}}
          />
          <label htmlFor="yaml" className={styles['radio-btn']}>YAML</label>
        </div>
      </div>
    </Dialog>
  )
}

export default ExportCtmlDialog
