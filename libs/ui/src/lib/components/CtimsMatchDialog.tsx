import styles from './CtimsMatchDialog.module.scss';
import React, {CSSProperties, FunctionComponent, memo, useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {JSONSchema7} from "json-schema";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import {Dropdown} from "primereact/dropdown";
import TreeNode from "primereact/treenode";
import {withTheme} from "@rjsf/core";
import {Theme as PrimeTheme} from "../primereact";
import localValidator from "@rjsf/validator-ajv8";
import CtimsObjectFieldTemplate from "../custom-rjsf-templates/CtimsObjectFieldTemplate";
import {RegistryWidgetsType} from "@rjsf/utils";
import CtimsInput from "../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../custom-rjsf-templates/CtimsDropdown";
import LeftMenuComponent from "./LeftMenuComponent";
import {EComponentType} from "./EComponentType";
import {buildRootNodes} from "./helpers";
import MatchingMenuAndForm from "./MatchingMenuAndForm";

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  onDialogHide: () => void;
}

export interface IFormProps {
  formDataChanged: (formData: any) => void;
  formD: any;
}

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);
  const [rootNodes, setRootNodes] = useState<TreeNode[]>([]);
  const [componentType, setComponentType] = useState<EComponentType>(EComponentType.None);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])


  const MatchingCriteriaPreview = () => {
    return (
      <div className={styles.matchingCriteriaPreview}>
        Matching criteria preview will be shown here.
      </div>
    )
  }

  const handleSubmit = () => {
    console.log('clicked submit');
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

  const footer = (
    <div style={{marginTop: '10px'}}>
      <Button style={dismissBtnStyle} label="Discard" className="p-button-text" onClick={handleSubmit} />
      <Button style={saveBtnStyle} label="Save matching criteria" onClick={handleSubmit} />
    </div>
  );



  const onDialogHide = () => {
    props.onDialogHide();
  }

  const setNewComponentType = (componentType: EComponentType, node: TreeNode) => {
    console.log('componentType', node)
    setComponentType(componentType);
    setFormData(node.data.formData)
    // setSelectedNode({...selectedNode, ...node});
  }

  const updateFormDataForSelectedNode = (formData: any) => {
    const rootNode = rootNodes[0];
    // updateFormDataInNodeByKey(rootNode, selectedNode.key, formData);
    // setFormData(formData)
    console.log('rootNode update', rootNodes);
  }

  return (
    <Dialog header="<arm_code> matching criteria" footer={footer} visible={isDialogVisible} style={{width: '960px', height: '800px'}} onHide={onDialogHide}>
      <div className={styles.mainContainer}>
        <MatchingMenuAndForm
                             formDataChanged={updateFormDataForSelectedNode}
        />
        <MatchingCriteriaPreview/>
      </div>
    </Dialog>
  )
}
export default CtimsMatchDialog;
