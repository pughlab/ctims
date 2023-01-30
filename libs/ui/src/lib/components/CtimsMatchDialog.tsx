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

const Form = withTheme(PrimeTheme)

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  onDialogHide: () => void;
}

interface IFormProps {
  formDataChanged: (formData: any) => void;
  formD: any;
}

interface IMarchMenuAndFormProps {
  onMenuNodeClick: (componentType: EComponentType, node: TreeNode) => void;
  formDataChanged: (formData: any) => void
  onComponentTypeChange: (componentType: EComponentType) => void;
}

const CtimsMatchDialog = (props: CtimsMatchDialogProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(props.isDialogVisible);
  const [isEmpty, setIsEmpty] = useState(true);
  const [rootNodes, setRootNodes] = useState<TreeNode[]>([]);
  const [componentType, setComponentType] = useState<EComponentType>(EComponentType.None);
  const [formData, setFormData] = useState<any>({});


  const ClinicalForm = memo((props: IFormProps) => {
    const {formDataChanged, formD} = props
    // console.log('ClinicalForm rootNodes: ', rootNodes)
    console.log('ClinicalForm formD: ', formD)

    const widgets: RegistryWidgetsType = {
      TextWidget: CtimsInput,
      SelectWidget: CtimsDropdown
    }

    const clinicalFormSchema = {
      'type': 'object',
      'required': ['age', 'oncotreePrimaryDiagnosis'],
      'properties': {
        'age': {
          'type': 'string',
          'title': 'Age',
        },
        oncotreePrimaryDiagnosis: {
          'type': 'string',
          'title': 'Oncotree Primary Diagnosis',
        }
      }
    }
    const clinicalUiSchema = {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate
    }

    const onFormChange = (data: any) => {
      formDataChanged(data.formData);
    }

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <OperatorDropdown />
        <div>
          <TitleContainer title="Clinical" />
        </div>
        <div>
          <Form schema={clinicalFormSchema as JSONSchema7}
                formData={formD}
                uiSchema={clinicalUiSchema}
                widgets={widgets}
                onChange={onFormChange}
                validator={localValidator}/>
        </div>
      </div>
    )
  }, (prevProps, nextProps) => {
    return prevProps.formD === nextProps.formD;
  });

  const GenomicForm = (props: IFormProps) => {
    console.log('GenomicForm rootNodes: ', rootNodes)
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <OperatorDropdown />
        <div>
          <TitleContainer title="Genomic" />
        </div>
      </div>
    )
  }

  let ComponentToRender: FunctionComponent<IFormProps>;
  switch (componentType) {
    case EComponentType.ClinicalForm:
      ComponentToRender = ClinicalForm;
      break;
    case EComponentType.GenomicForm:
      ComponentToRender = GenomicForm;
      break;
    default:
      ComponentToRender = () => null;
  }

  const menuItems = [
    {
      label: 'Clinical',
      command: () => {
        const rootNodes = buildRootNodes('And', 'Clinical');
        setRootNodes(rootNodes);
        setIsEmpty(false);
      }
    },
    {
      label: 'Genomic',
      command: () => {
        const rootNodes = buildRootNodes('And', 'Genomic');
        setRootNodes(rootNodes);
        // setSelectedKeys('0-0')
        // console.log('selectedKeys', selectedKeys);
      }
    }
  ];

  const menu = useRef(null);
  const tieredMenu = useRef(null);

  useEffect(() => {
    setIsDialogVisible(props.isDialogVisible);
  }, [props.isDialogVisible])


  const menuClick = (e: any) => {
    // @ts-ignore
    menu.current.show(e);
  }

  const AddCriteriaButton = () => {
    return (
      <div className={styles.addCriteriaBtn} onClick={(e) => {menuClick(e)}}>
        <i className="pi pi-plus-circle"></i>
        <span>Add criteria</span>
      </div>
    )
  }

  const EmptyForm = () => {
    return (
      <div className={styles.matchingCriteriaFormContainerEmpty}>
        <div className={styles.matchingCriteriaFormContainerEmptyText}>
          Matching criteria inputs will be shown here.
        </div>
        <AddCriteriaButton />
      </div>
    )
  }

  const OperatorDropdown = () => {
    const [operator, setOperator] = useState({ name: 'AND (if all criteria are met)', code: 'AND' });

    // TODO: make it a template to reflect different font for AND and description
    const dropDownItems = [
      { name: 'AND (if all criteria are met)', code: 'AND' },
      { name: 'OR (if any criteria are met)', code: 'OR' },
    ];

    const onOperatorChange = (e: any) => {
      console.log('onOperatorChange', e.value);
      setOperator(e.value);
    }

    const dropDownStyle: CSSProperties = {
      width: '600px',
      marginLeft: '20px',
      marginRight: '20px',
    }

    const labelStyle: CSSProperties = {
      marginBottom: '7px',
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '20px',
    }

    return (
      <>
        <div style={labelStyle}>Operator</div>
        <Dropdown value={operator}
                  style={dropDownStyle}
                  options={dropDownItems}
                  onChange={onOperatorChange}
                  optionLabel="name" />
      </>
    )
  }

  const TitleContainer = (props: {title: string}) => {
    const {title} = props;

    const deleteButtonClasses = `p-button-text p-button-plain p-button-danger ${styles.deleteButton}`;
    const addCriteriaButtonClasses = `p-button-text p-button-plain ${styles.addCriteriaToSameListButton}`;

    return (
      <div className={styles.titleContainer}>
        <div className={styles.titleContainerText}>
          {title}
        </div>
        <Button icon="pi pi-trash" label="Delete" iconPos="left" className={deleteButtonClasses} />
        <Button icon="pi pi-plus-circle" label="Add criteria to the same list" iconPos="left" className={addCriteriaButtonClasses} />
      </div>
    )
  }

  const MatchingMenuAndForm = (props: IMarchMenuAndFormProps) => {
    const {onMenuNodeClick, formDataChanged, onComponentTypeChange} = props;
    const [isMouseOverNode, setIsMouseOverNode] = useState(false);

    return (
      <>
        <Menu model={menuItems} ref={menu} popup id="criteria_popup_menu"/>
        <div className={styles.matchingMenuAndFormContainer}>
          <LeftMenuComponent emitComponentType={(type) => {
            onComponentTypeChange(type);
          }} rootNodesProp={rootNodes} />
          <div className={styles.matchingCriteriaFormContainer}>
            {isEmpty ? <EmptyForm /> : <ComponentToRender formDataChanged={formDataChanged} formD={formData}/>}
          </div>
        </div>
      </>
    )
  }

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
        <MatchingMenuAndForm onMenuNodeClick={setNewComponentType}
                             formDataChanged={updateFormDataForSelectedNode}
                             onComponentTypeChange={(type) => {setComponentType(type)}}
        />
        <MatchingCriteriaPreview/>
      </div>
    </Dialog>
  )
}
export default CtimsMatchDialog;
