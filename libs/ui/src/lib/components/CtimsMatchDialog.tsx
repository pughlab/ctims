import styles from './CtimsMatchDialog.module.scss';
import {CSSProperties, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {JSONSchema7} from "json-schema";

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  dialogSchema: JSONSchema7;
  uiSchema: any;
  onRjsfFormChange: (data: any) => void;
  onDialogHide: () => void;
}

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  const EmptyForm = () => {
    return (
      <div className={styles.matchingCriteriaFormContainerEmpty}>
        <div className={styles.matchingCriteriaFormContainerEmptyText}>
          Matching criteria inputs will be shown here.
        </div>
        <div className={styles.addCriteriaBtn}>
          <i className="pi pi-plus-circle"></i>
          <span>Add criteria</span>
        </div>
      </div>
    )
  }

  const MatchingMenuAndForm = () => {
    return (
      <div className={styles.matchingMenuAndFormContainer}>
        <div className={styles.matchingCriteriaMenuContainer}>
          <div className={styles.matchingCriteriaTextContainer}>
            <div className={styles.matchingCriteriaText}>Matching Criteria</div>
            <i className="pi pi-plus-circle"></i>
          </div>
        </div>
        <div className={styles.matchingCriteriaFormContainer}>
          {isEmpty ? <EmptyForm/> : null}
        </div>
      </div>
    )
  }

  const MatchingCriteriaPreview = () => {
    return (
      <div className={styles.matchingCriteriaPreview}>
        Matching criteria preview will be shown here.
      </div>
    )
  }

  const handleSubmit = (data: any) => {
    console.log(data);
  }

  const onDialogHide = () => {
    props.onDialogHide();
  }

  return (
    <Dialog header="<arm_code> matching criteria" visible={isDialogVisible} style={{width: '960px', height: '800px'}} onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <MatchingMenuAndForm/>
        <MatchingCriteriaPreview/>
      </div>
      {/*<Form schema={props.dialogSchema as JSONSchema7}*/}
      {/*      templates={{*/}
      {/*        ArrayFieldItemTemplate: CtimsArrayFieldItemTemplate,*/}
      {/*        ArrayFieldTemplate: CtimsArrayFieldTemplate,*/}
      {/*      }}*/}
      {/*      onChange={(data) => {props.onRjsfFormChange(data)}}*/}
      {/*      uiSchema={props.uiSchema}*/}
      {/*      widgets={widgets}*/}
      {/*      onSubmit={(data) => {handleSubmit(data.formData)}} validator={localValidator}/>*/}
    </Dialog>
  )
}
export default CtimsMatchDialog;
