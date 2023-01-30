import styles from './MatchingMenuAndForm.module.scss';
import {EComponentType} from "./EComponentType";
import React, {CSSProperties, FunctionComponent, memo, useRef, useState} from "react";
import {Menu} from "primereact/menu";
import LeftMenuComponent from "./LeftMenuComponent";
import {RegistryWidgetsType} from "@rjsf/utils";
import CtimsInput from "../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../custom-rjsf-templates/CtimsDropdown";
import CtimsObjectFieldTemplate from "../custom-rjsf-templates/CtimsObjectFieldTemplate";
import {JSONSchema7} from "json-schema";
import localValidator from "@rjsf/validator-ajv8";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {withTheme} from "@rjsf/core";
import {Theme as PrimeTheme} from "../primereact";

const Form = withTheme(PrimeTheme)

export interface IFormProps {
  formDataChanged: (formData: any) => void;
  formD: any;
}

export interface IRootNode {
  rootLabel: string;
  firstChildLabel: string;
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

const MatchingMenuAndForm = (props: any) => {

  const [componentType, setComponentType] = useState<EComponentType>(EComponentType.None);
  const [isEmpty, setIsEmpty] = useState(true);
  const [buildRootNodeParams, setBuildRootNodeParams] = useState<IRootNode>({rootLabel: '', firstChildLabel: ''});
  const [isMouseOverNode, setIsMouseOverNode] = useState(false);

  const menu = useRef(null);

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
    // console.log('GenomicForm rootNodes: ', rootNodes)
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <OperatorDropdown />
        <div>
          <TitleContainer title="Genomic" />
        </div>
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

  const menuItems = [
    {
      label: 'Clinical',
      command: () => {
        setIsEmpty(false);
        setBuildRootNodeParams({rootLabel: 'And', firstChildLabel: 'Clinical'})
      }
    },
    {
      label: 'Genomic',
      command: () => {
        setIsEmpty(false);
        setBuildRootNodeParams({rootLabel: 'And', firstChildLabel: 'Genomic'})
      }
    }
  ];

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

  const formDataChanged = (data: any) => {
    // updateFormDataInNodeByKey(rootNodes[0], '0-0', data);
    console.log('formDataChanged data: ', data)
  }

  return (
    <>
      <Menu model={menuItems} ref={menu} popup id="criteria_popup_menu"/>
      <div className={styles.matchingMenuAndFormContainer}>
        <LeftMenuComponent emitComponentType={(type) => {
          setComponentType(type);
        }} rootNodesProp={buildRootNodeParams} />
        <div className={styles.matchingCriteriaFormContainer}>
          {isEmpty ? <EmptyForm /> : <ComponentToRender formDataChanged={formDataChanged} formD={{}}/>}
        </div>
      </div>
    </>
  )
};
export default MatchingMenuAndForm;
