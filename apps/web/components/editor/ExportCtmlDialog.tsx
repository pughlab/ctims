import React, {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import { RadioButton } from 'primereact/radiobutton'
import styles from './ExportCtmlDialog.module.scss';
import {Message} from "primereact/message";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {ValidationData} from "@rjsf/utils";
import {extractErrors, isObjectEmpty} from "../../../../libs/ui/src/lib/components/helpers";

interface ExportCtmlDialogProps {
  isDialogVisible: boolean;
  exportCtmlClicked: () => void;
  onDialogHide: () => void;
}

const ExportCtmlDialog = (props: ExportCtmlDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isDialogVisible);
  const [errors, setErrors] = useState<string[]>([]);
  const [format, setFormat] = useState<string>('JSON');

  const errorSchema: ValidationData<any> = useSelector((state: RootState) => state.finalModelAndErrors.errorSchema);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  useEffect(() => {
    if (!isObjectEmpty(errorSchema)) {
      const viewModelErrors = extractErrors(errorSchema.errors);
      setErrors(viewModelErrors)
    }

  }, [errorSchema])

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
        <Button
          label="Export CTML"
          disabled={errors.length > 0}
          onClick={exportCtmlClicked}
          className={exportBtn}
        />
      </div>
    )
  }

  const errorContent = () => {
    return (
      <>
      <div>To export this trial, changes must be made to {errors.length} sections</div>
      <ul>
        {
          errors.map((error, index) => {
            return <li key={index}>{error}</li>
          })
        }
      </ul>
      </>
    )
  }

  return (
    <Dialog header="Export CTML"
            footer={() => footer({exportCtmlClicked: props.exportCtmlClicked})}
            visible={isDialogVisible}
            style={{width: '700px', minHeight: '200px'}}
            onHide={onDialogHide}>
      <div>
        <Message
          severity="error"
          style={{
            whiteSpace: "pre-line",
            marginLeft: '18px',
            marginBottom: '10px'
          }}
          content={errorContent}
        />
      </div>
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
