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
import {stringify} from 'yaml'
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";

interface ExportCtmlDialogProps {
  isDialogVisible: boolean;
  exportCtmlClicked: () => void;
  onDialogHide: () => void;
}

const ExportCtmlDialog = (props: ExportCtmlDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(props.isDialogVisible);
  const [errors, setErrors] = useState<string[]>([]);
  const [format, setFormat] = useState<string>('JSON');
  const [exportButtonDisabled, setExportButtonDisabled] = useState<boolean>(true);

  const errorSchema: ValidationData<any> = useSelector((state: RootState) => state.finalModelAndErrors.errorSchema);
  const ctmlModel = useSelector((state: RootState) => state.finalModelAndErrors.ctmlModel);

  useEffect(() => {
    if(ctmlModel === null) {
    console.log('ctmlModel', ctmlModel);
      setExportButtonDisabled(true);
    }
  }, [ctmlModel])

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  useEffect(() => {
    console.log('errors', errorSchema);
    if (!isObjectEmpty(errorSchema)) {
      const viewModelErrors = extractErrors(errorSchema.errors);
      setErrors(viewModelErrors)
    } else if (errorSchema.errors.length === 1 && errorSchema.errors[0].message === 'must be object') {
      setErrors([]);
    }
    else {
      setErrors([]);
    }

  }, [errorSchema])

  useEffect(() => {

    if (errors.length > 0) {
      setExportButtonDisabled(true);
    }
    if (errors.length === 0) {
      if (ctmlModel !== null) {
        setExportButtonDisabled(false);
      }
    }

  }, [errors])

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
          disabled={exportButtonDisabled}
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


  const doExport = () => {

    const move = () => {
      let ctmlModelCopy;
      const age_group = ctmlModel.age_group;
      const trialInformation = ctmlModel.trialInformation;
      ctmlModelCopy = {...ctmlModel, ...trialInformation, ...age_group};
      delete ctmlModelCopy.age_group;
      delete ctmlModelCopy.trialInformation;
      return ctmlModelCopy;
    }

    const ctmlModelCopy = move();

    let ctmlModelString = JSON.stringify(ctmlModelCopy, null, 2);
    let fileName = 'ctml-model.json';
    if (format === 'YAML') {
      ctmlModelString = stringify(ctmlModel);
      fileName = 'ctml-model.yaml';
    }
    const blob = new Blob([ctmlModelString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Dialog header="Export CTML"
            footer={() => footer({exportCtmlClicked: doExport})}
            visible={isDialogVisible}
            style={{width: '700px', minHeight: '200px'}}
            onHide={onDialogHide}>
      <div>
        {errors.length > 0 && (<Message
          severity="error"
          style={{
            whiteSpace: "pre-line",
            marginLeft: '18px',
            marginBottom: '10px'
          }}
          content={errorContent}
        />)}

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
