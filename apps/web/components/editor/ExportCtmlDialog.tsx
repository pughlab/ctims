import React, {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import styles from './ExportCtmlDialog.module.scss';
import {Message} from "primereact/message";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {RJSFValidationError, ValidationData} from "@rjsf/utils";
import {extractErrors, isObjectEmpty} from "../../../../libs/ui/src/lib/components/helpers";
import {stringify} from 'yaml'
import axios from "axios";
import { RadioButton } from 'primereact/radiobutton';

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
  const [isImportedCTML, setIsImportedCTML] = useState<boolean>(false);

  const errorSchema: ValidationData<any> = useSelector((state: RootState) => state.finalModelAndErrors.errorSchema);
  const ctmlModel = useSelector((state: RootState) => state.finalModelAndErrors.ctmlModel);
  const trialId = useSelector((state: RootState) => state.context.trialId);
  const isGroupAdmin = useSelector((state: RootState) => state.context.isTrialGroupAdmin);
  const isFormChanged = useSelector((state: RootState) => state.context.isFormChanged);

  useEffect(() => {
    setExportButtonDisabled(shouldDisableExportButton());
  }, [ctmlModel, isFormChanged, errors, isImportedCTML])

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  useEffect(() => {
    let errorObjList: RJSFValidationError[] = errorSchema.errors;
    const filteredErrorObjList = errorObjList.filter((errorObj: RJSFValidationError) => {
      return errorObj.message !== 'must be object';
    }).filter((err_two: RJSFValidationError) => {
      return err_two.property !== '.trialInformation.phase';
    }).filter((err_two: RJSFValidationError) => {
      return err_two.property !== '.age_group.age';
    });
    if (!isObjectEmpty(errorSchema)) {
      const viewModelErrors = extractErrors(filteredErrorObjList);
      setErrors(viewModelErrors)
    }
    else {
      setErrors([]);
    }
    setIsImportedCTML(sessionStorage.getItem('imported_ctml') !== null);

  }, [errorSchema])

  const onDialogHide = () => {
    props.onDialogHide();
  }

  // disable export OK button if there are errors of if form is changed and not saved
  const shouldDisableExportButton = () => {
    const currentURL = window.location.href;
    return errors.length > 0 || isFormChanged || ctmlModel === null || currentURL.includes('/trials/import');
  }

  const footer = (props: {exportCtmlClicked: () => void}) => {
    const {exportCtmlClicked} = props;
    const cancelBtn = `p-button-text ${styles['cancel-btn']}`
    const exportBtn = `${styles['export-btn']}`
    return (
      <div>
        {isGroupAdmin ? <Button label="Cancel" className={cancelBtn} onClick={onDialogHide} /> : null}
        <Button
          label="OK"
          disabled={exportButtonDisabled}
          onClick={isGroupAdmin ? exportCtmlClicked : onDialogHide}
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

  const notSavedErrorContent = () => {
    return (
      <>
        <div>You must save the CTML before you can export it.</div>
      </>
    )
  }

  const importedTrialErrorContent = () => {
    return (
        <>
          <div>Unable to export/validate imported CTMLs.</div>
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
      delete ctmlModelCopy.ctml_status;
      delete ctmlModelCopy.nickname;
      delete ctmlModelCopy.trial_internal_id;
      return ctmlModelCopy;
    }

    const recordExportEvent = () => {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }
      axios.request({
        method: 'post',
        url: `/trials/${trialId}/export/${format}`,
        headers
      });
    }

    const ctmlModelCopy = move();

    let ctmlModelString = JSON.stringify(ctmlModelCopy, null, 2);
    let fileName = 'ctml-model';
    if (ctmlModel.trialInformation.trial_id !== undefined) {
      fileName = ctmlModel.trialInformation.trial_id;
    }
    fileName += '_' + new Date().toISOString().slice(0, 10)
    if (format === 'YAML') {
      ctmlModelString = stringify(ctmlModelCopy);
      fileName += '.yaml';
    } else {
      fileName += '.json';
    }
    const blob = new Blob([ctmlModelString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    recordExportEvent()
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDialogHide();
  }

  return (
    <Dialog header="Validate CTML"
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
        {isFormChanged && (<Message
          severity="error"
          style={{
            whiteSpace: "pre-line",
            marginLeft: '18px',
            marginBottom: '10px'
          }}
          content={notSavedErrorContent}
        />)}
        {isImportedCTML && (<Message
          severity="error"
          style={{
            whiteSpace: "pre-line",
            marginLeft: '18px',
            marginBottom: '10px'
          }}
          content={importedTrialErrorContent}
      />)}
      </div>
      {isGroupAdmin ? <div style={{marginLeft: '30px'}}>
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
      </div> :
        <>
        {errors.length === 0 && (<div style={{marginLeft: '30px'}}>
          All mandatory fields are complete!
        </div>)}
        </>
      }
    </Dialog>
  )
}

export default ExportCtmlDialog
