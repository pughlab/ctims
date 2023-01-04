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

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])

  const handleSubmit = (data: any) => {
    console.log(data);
  }

  const onDialogHide = () => {
    props.onDialogHide();
  }

  return (
    <Dialog header="Dialog" visible={isDialogVisible} style={{width: '960px', height: '800px'}} onHide={onDialogHide}>
      <div>
        <div className={styles.matchingCriteriaContainer}>
          <div className={styles.matchingCriteriaTextContainer}>
            <div className={styles.matchingCriteriaText}>Matching Criteria</div>
            <i className="pi pi-plus-circle"></i>
          </div>

        </div>
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
