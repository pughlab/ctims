import styles from './EditorTopBar.module.scss';
import {useRouter} from "next/router";
import { Button } from 'primereact/button';
import {store} from "../../store/store";
import {ValidationData} from "@rjsf/utils";
import {useEffect, useState} from "react";
import ExportCtmlDialog from "./ExportCtmlDialog";
import useAxios from "../../hooks/useAxios";
import {signOut} from "next-auth/react";


const EditorTopBar = () => {

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const {response, error, loading, operation} = useAxios();
  const router = useRouter();


  useEffect(() => {
    if (response) {
      console.log('response', response);

    }
    if(error) {
      console.log('error', error);
      if (error.statusCode === 401) {
        signOut({callbackUrl: '/#/login', redirect: false});
      }
    }
  }, [error, response]);

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
  }

  const getValidationErrors = () => {
    const state = store.getState();
    const formErrors: ValidationData<any> = state.finalModelAndErrors.errorSchema;
    return formErrors;
  }

  const onSaveClick = () => {
    operation({
      method: 'post',
      url: 'http://localhost:3333/api/trials',
      data: {
        nct_id: 'NCT00000000',
        nickname: 'test',
        principal_investigator: 'test',
        status: 'DRAFT',
      }
    })
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
          <Button label="Save" className={styles.saveBtn} onClick={onSaveClick} />
        </div>

      </div>
    </div>
    </>
  )
}
export default EditorTopBar;
