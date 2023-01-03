import {useEffect, useState} from "react";
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
    setIsDialogVisible(false);
    props.onDialogHide();
  }

  return (
    <Dialog header="Dialog" visible={isDialogVisible} style={{width: '50vw'}} onHide={onDialogHide}>
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
