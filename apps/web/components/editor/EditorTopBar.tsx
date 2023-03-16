import styles from './EditorTopBar.module.scss';
import {useRouter} from "next/router";
import { Button } from 'primereact/button';
import {store} from "../../store/store";
import {ValidationData} from "@rjsf/utils";
import {useState} from "react";
import ExportCtmlDialog from "./ExportCtmlDialog";


const EditorTopBar = () => {

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const router = useRouter();

  const backClick = (e) => {
    e.preventDefault();
    router.back();
  }

  const onExportClick = () => {
    const state = store.getState();
    const ctmlModel = state.finalModelAndErrors.ctmlModel;
    const formErrors: ValidationData<any> = state.finalModelAndErrors.errorSchema;
    const ctmlModelString = JSON.stringify(ctmlModel, null, 2);
    // setErrorViewModel(viewModelErrors)
    setIsDialogVisible(true);
    console.log('onExportClick', formErrors);

    // const blob = new Blob([ctmlModelString], {type: 'application/json'});
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.setAttribute('href', url);
    // link.setAttribute('download', 'ctml-model.json');
    // link.style.display = 'none';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }

  const getValidationErrors = () => {
    const state = store.getState();
    const formErrors: ValidationData<any> = state.finalModelAndErrors.errorSchema;
    return formErrors;
  }

  return (
    <>
      <ExportCtmlDialog
        isDialogVisible={isDialogVisible}
        exportCtmlClicked={onExportClick}
        onDialogHide={() => setIsDialogVisible(false)}
      />
    <div className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img src={'/assets/ctims-logo.svg'} alt={'logo'} className={styles.logo}/>
      </div>
      <div className={styles.nav}>
        <div className={styles.btnTitleContainer}>
          <div className={styles.backBtn} onClick={(e) => backClick(e)}>
            <i className="pi pi-arrow-left"></i>
          </div>
          <div className={styles.title}>New CTML</div>
        </div>
        <div className={styles.menuBtnGroup}>
          <Button label="Discard" className="p-button-text p-button-plain" />
          <Button label="Export"
                  onClick={onExportClick}
                  className="p-button-text p-button-plain" />
          <Button label="Save" className={styles.saveBtn} />
        </div>

      </div>
    </div>
    </>
  )
}
export default EditorTopBar;
