import styles from './MatchingMenuAndForm.module.scss';
import {EComponentType} from "./EComponentType";
import React, {CSSProperties, FunctionComponent, memo, useRef, useState} from "react";
import {Menu} from "primereact/menu";
import LeftMenuComponent from "./LeftMenuComponent";
import {RegistryWidgetsType} from "@rjsf/utils";
import CtimsInput from "../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../custom-rjsf-templates/CtimsDropdown";
import {JSONSchema7} from "json-schema";
import localValidator from "@rjsf/validator-ajv8";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {withTheme} from "@rjsf/core";
import {Theme as PrimeTheme} from "../primereact";
import TreeNode from "primereact/treenode";
import CtimsMatchDialogObjectFieldTemplate from "../custom-rjsf-templates/CtimsMatchDialogObjectFieldTemplate";
import {useDispatch} from "react-redux";
import {addAdjacentNode, deleteNode} from "../../../../../apps/web/pages/store/slices/treeActionsSlice";

const Form = withTheme(PrimeTheme)

export interface IFormProps {
  node: TreeNode;
}

export interface ITitleContainerProps {
  title: string;
  node: TreeNode;
}

export interface IRootNode {
  rootLabel: string;
  firstChildLabel: string;
}

interface IComponentType {
  type: EComponentType;
  node: TreeNode;
}

const widgets: RegistryWidgetsType = {
  TextWidget: CtimsInput,
  SelectWidget: CtimsDropdown
}

const formContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'scroll'
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

const TitleContainer = (props: ITitleContainerProps) => {
  const {title, node} = props;

  const dispatch = useDispatch();

  const onAddCriteria = () => {
    dispatch(addAdjacentNode({nodeKey: node.key as string, type: title}));
  }

  const onDeleteCriteria = () => {
    console.log('onDeleteCriteria');
    dispatch(deleteNode({nodeKey: node.key as string}));
  }

  const deleteButtonClasses = `p-button-text p-button-plain p-button-danger ${styles.deleteButton}`;
  const addCriteriaButtonClasses = `p-button-text p-button-plain ${styles.addCriteriaToSameListButton}`;

  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleContainerText}>
        {title}
      </div>
      <Button icon="pi pi-trash"
              label="Delete"
              iconPos="left"
              className={deleteButtonClasses}
              onClick={onDeleteCriteria}
      />
      <Button icon="pi pi-plus-circle"
              label="Add criteria to the same list"
              iconPos="left"
              className={addCriteriaButtonClasses}
              onClick={onAddCriteria}
      />
    </div>
  )
}

const MatchingMenuAndForm = (props: any) => {

  const [componentType, setComponentType] = useState<IComponentType>({type: EComponentType.None, node: {}});
  const [isEmpty, setIsEmpty] = useState(true);
  const [buildRootNodeParams, setBuildRootNodeParams] = useState<IRootNode>({rootLabel: '', firstChildLabel: ''});

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

  const ClinicalForm = (props: IFormProps) => {
    const {node} = props
    console.log('ClinicalForm node: ', node)

    const clinicalFormSchema = {
      'type': 'object',
      'required': ['age_numerical', 'oncotree_primary_diagnosis'],
      'properties': {
        'age_numerical': {
          'type': 'string',
          'title': 'Age',
        },
        'oncotree_primary_diagnosis': {
          'type': 'string',
          'title': 'Oncotree Primary Diagnosis',
        },
        'tmb': {
          'type': 'string',
          'title': 'TMB',
        },
        'her2_status': {
          'type': 'string',
          'title': 'HER2 Status',
        },
        'er_status': {
          'type': 'string',
          'title': 'ER Status',
        },
        'pr_status': {
          'type': 'string',
          'title': 'PR Status',
        }
      }
    }
    const clinicalUiSchema = {
      "ui:ObjectFieldTemplate": CtimsMatchDialogObjectFieldTemplate,
      "ui:submitButtonOptions": {
        "norender": true,
      },
    }

    const onFormChange = (data: any) => {
      node.data.formData = data.formData;
      console.log('onFormChange node: ', node)
    }

    return (
      <div style={formContainerStyle}>
        <OperatorDropdown />
        <div>
          <TitleContainer title="Clinical" node={node} />
        </div>
        <div>
          <Form schema={clinicalFormSchema as JSONSchema7}
                formData={node.data.formData}
                uiSchema={clinicalUiSchema}
                widgets={widgets}
                onChange={onFormChange}
                validator={localValidator}/>
        </div>
      </div>
    )
  }

  const GenomicForm = (props: IFormProps) => {
    const {node} = props
    console.log('GenomicForm node: ', node)

  const genomicFormSchema = {
        'definitions': {
          'variant_category': {
            "enumNames": [
              "Missense Mutation",
              "Missense and Splice Region",
              "Del Ins",
              "Frame Shift Del",
              "Frame Shift Ins",
              "Frameshift",
              "Frameshift mutation",
              "In Frame Del",
              "In Frame Ins",
              "Initiator Codon",
              "Intron mutation",
              "Intron",
              "3'UTR",
              "3_prime_UTR",
              "5'Flank",
              "5'UTR",
              "5'UTR_mutation",
              "5_prime_UTR",
            ],
            "enum": [
              "Missense_Mutation",
              "Missense and Splice_Region",
              "Del_Ins",
              "Frame_Shift_Del",
              "Frame_Shift_Ins",
              "Frameshift",
              "Frameshift_mutation",
              "In_Frame_Del",
              "In_Frame_Ins",
              "Initiator_Codon",
              "Intron_mutation",
              "Intron",
              "3'UTR",
              "3_prime_UTR",
              "5'Flank",
              "5'UTR",
              "5'UTR_mutation",
              "5_prime_UTR",
            ]
          },
          'cnv_call': {
            "enumNames": [
              "Heterozygous deletion",
              "Homozygous deletion",
              "Gain",
              "High level amplification",
            ],
            "enum": [
              "Heterozygous_deletion",
              "Homozygous_deletion",
              "Gain",
              "High_level_amplification",
            ]
          },
          'wildtype': {
            "enumNames": [
              "True",
              "False",
            ],
            "enum": [
              "True",
              "False"
            ]
          },
          'pole_status': {
            "enumNames": [
              "Yes",
              "No",
              "Cannot Access",
              "Insufficient Variants",
            ],
            "enum": [
              "yes",
              "no",
              "cannot_access",
              "insufficient_variants",
            ],
          },
          'uva_status': {
            "enumNames": [
              "Yes",
              "No",
              "Cannot Access",
              "Insufficient Variants",
            ],
            "enum": [
              "yes",
              "no",
              "cannot_access",
              "insufficient_variants",
            ],
          },
          'tobacco_status': {
            "enumNames": [
              "Yes",
              "No",
              "Cannot Access",
              "Insufficient Variants",
            ],
            "enum": [
              "yes",
              "no",
              "cannot_access",
              "insufficient_variants",
            ],
          },
          'apobec_status': {
            "enumNames": [
              "Yes",
              "No",
              "Cannot Access",
              "Insufficient Variants",
            ],
            "enum": [
              "yes",
              "no",
              "cannot_access",
              "insufficient_variants",
            ],
          },
          'temozolomide_status': {
            "enumNames": [
              "Yes",
              "No",
              "Cannot Access",
              "Insufficient Variants",
            ],
            "enum": [
              "yes",
              "no",
              "cannot_access",
              "insufficient_variants",
            ],
          },
          'mmr_status': {
            "enumNames": [
              "MMR-Proficient",
              "MMR-Deficient"
            ],
            "enum": [
              "mmr_proficient",
              "mmr_deficient",
            ]
          }
        },
        'type': 'object',
        'required': ['hugo_symbol', 'variant_category'],
        'properties': {
          'hugo_symbol': {
            'type': 'string',
            'title': 'Hugo Symbol',
          },
          'variant_category': {
            "$ref": "#/definitions/variant_category",
            'title': 'Variant Category',
          },
          'protein_change': {
            'type': 'string',
            'title': 'Protein Change',
          },
          'variant_classification': {
            'type': 'string',
            'title': 'Variant Classification',
          },
          'cnv_call': {
            'title': 'CNV Call',
            '$ref': '#/definitions/cnv_call',
          },
          'fusion_partner_hugo_symbol': {
            'type': 'string',
            'title': 'Fusion Partner Hugo Symbol',
          },
          'true_transcript_exon': {
            'type': 'string',
            'title': 'True Transcript Exon',
          },
          'wildtype': {
            'title': 'Wildtype',
            '$ref': '#/definitions/wildtype',
          },
          'pole_status': {
            'title': 'POLE Status',
            '$ref': '#/definitions/pole_status',
          },
          'uva_status': {
            'title': 'UVA Status',
            '$ref': '#/definitions/uva_status',
          },
          'tobacco_status': {
            'title': 'Tobacco Status',
            '$ref': '#/definitions/tobacco_status',
          },
          'apobec_status': {
            'title': 'APOBEC Status',
            '$ref': '#/definitions/apobec_status',
          },
          'temozolomide_status': {
            'title': 'Temozolomide Status',
            '$ref': '#/definitions/temozolomide_status',
          },
          'mmr_status': {
            'title': 'MMR Status',
            '$ref': '#/definitions/mmr_status',
          }
        }
  };
  const genomicUiSchema = {
    "ui:ObjectFieldTemplate": CtimsMatchDialogObjectFieldTemplate,
    "ui:submitButtonOptions": {
      "norender": true,
    },
  }

  const onFormChange = (data: any) => {
    node.data.formData = data.formData;
    console.log('onFormChange node: ', node)
  }

  return (
    <div style={formContainerStyle}>
      <OperatorDropdown />
      <div>
        <TitleContainer title="Genomic" node={node} />
      </div>
      <div>
        <Form schema={genomicFormSchema as JSONSchema7}
              formData={node.data.formData}
              uiSchema={genomicUiSchema}
              widgets={widgets}
              onChange={onFormChange}
              validator={localValidator}/>
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
  switch (componentType.type) {
    case EComponentType.ClinicalForm:
      ComponentToRender = ClinicalForm;
      break;
    case EComponentType.GenomicForm:
      ComponentToRender = GenomicForm;
      break;
    default:
      ComponentToRender = () => null;
  }

  const treeNodeClicked = (type: EComponentType, node: TreeNode) => {
    setComponentType({type, node});
  }

  return (
    <>
      <Menu model={menuItems} ref={menu} popup id="criteria_popup_menu"/>
      <div className={styles.matchingMenuAndFormContainer}>
        <LeftMenuComponent onTreeNodeClick={treeNodeClicked} rootNodesProp={buildRootNodeParams} />
        <div className={styles.matchingCriteriaFormContainer}>
          {isEmpty ? <EmptyForm /> : <ComponentToRender node={componentType.node}/>}
        </div>
      </div>
    </>
  )
};
export default MatchingMenuAndForm;
