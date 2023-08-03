import React, {CSSProperties, useContext, useEffect, useRef} from "react";
import {
  deleteMatchDialogError,
  formChange, operatorChange,
  setMatchDialogErrors
} from "../../../../../../apps/web/store/slices/modalActionsSlice";
import {useDispatch} from "react-redux";
import CtimsMatchDialogObjectFieldTemplate from "../../custom-rjsf-templates/CtimsMatchDialogObjectFieldTemplate";
import {withTheme} from "@rjsf/core";
import {RegistryWidgetsType, ValidationData} from "@rjsf/utils";
import {JSONSchema7} from "json-schema";
import localValidator from "@rjsf/validator-ajv8";
import {IFormProps} from "../MatchingMenuAndForm";
import { OperatorDropdown, OperatorOptions } from "./OperatorDropdown";
import {TitleContainer} from "./TitleContainer";
import {Theme as PrimeTheme} from "../../primereact";
import type Form from "@rjsf/core";
import CtimsFieldTemplate from "../../custom-rjsf-templates/CtimsFieldTemplate";
import CtimsErrorListTemplate from "../../custom-rjsf-templates/CtimsErrorListTemplate";
import CtimsInput from "../../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../../custom-rjsf-templates/CtimsDropdown";
import {CtimsDialogContext, CtimsDialogContextType} from "../CtimsMatchDialog";
import CtimsInputWithExcludeToggle from '../../custom-rjsf-templates/CtimsInputWithExcludeToggle';
import TreeNode from "primereact/treenode";
import { findArrayContainingKeyInsideATree, getCurrentOperator } from "../helpers";

const RjsfForm = withTheme(PrimeTheme)

const formTemplates = {
  FieldTemplate: CtimsFieldTemplate,
  ErrorListTemplate: CtimsErrorListTemplate,
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

export const ClinicalForm = (props: IFormProps) => {
  const {node, rootNodes} = props
  const nk = node.key as string;
  console.log('ClinicalForm node: ', node)

  const {setSaveBtnState} = useContext(CtimsDialogContext) as CtimsDialogContextType;

  const clinicalFormRef = useRef<any>(null);

  useEffect(() => {
    node.data.formValid = false;
  }, [node]);

  const dispatch = useDispatch();

  const clinicalFormSchema = {
    "definitions": {
      "her2_status": {
        "enumNames": [
          "Positive",
          "Negative"
        ],
        "enum": [
          "True",
          "False"
        ]
      },
      "er_status": {
        "enumNames": [
          "Positive",
          "Negative"
        ],
        "enum": [
          "True",
          "False"
        ]
      },
      "pr_status": {
        "enumNames": [
          "Positive",
          "Negative"
        ],
        "enum": [
          "True",
          "False"
        ]
      }
    },
    "type": "object",
    "required": ["age_numerical", "oncotree_primary_diagnosis"],
    "properties": {
      "age_numerical": {
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
        "description": "Tumor Mutational Burden/Megabase",
      },
      'her2_status': {
        "type": "string",
        'title': 'HER2 Status',
        "$ref": "#/definitions/her2_status"
      },
      'er_status': {
        'type': 'string',
        'title': 'ER Status',
        "$ref": "#/definitions/er_status"
      },
      'pr_status': {
        'type': 'string',
        'title': 'PR Status',
        "$ref": "#/definitions/pr_status"
      }
    }
  }
  const clinicalUiSchema = {
    "ui:ObjectFieldTemplate": CtimsMatchDialogObjectFieldTemplate,
    "ui:submitButtonOptions": {
      "norender": true,
    },
    "oncotree_primary_diagnosis": {
      "ui:widget": CtimsInputWithExcludeToggle,
    }
  }

  const onFormChange = (data: any) => {
    const form: Form = clinicalFormRef.current;
    form?.validateForm();
    const errorDetails: ValidationData<any> = form?.validate(data.formData);
    if (errorDetails?.errors.length > 0) {
      node.data.formValid = false;
      const payload = {[nk]: true};
      dispatch(setMatchDialogErrors(payload));
    }
    if (errorDetails?.errors.length === 0) {
      node.data.formValid = true;
      dispatch(deleteMatchDialogError(nk));
      setSaveBtnState(false)
    }
    console.log('onFormChange errorDetails: ', errorDetails);
    node.data.formData = data.formData;
    dispatch(formChange());
    // console.log('onFormChange node: ', node)
  }

  const onOperatorChange = (code: string) => {
    // or/and
    const codeLowerCase = code.toLowerCase();
    dispatch(operatorChange({operator: codeLowerCase, nodeKey: node.key as string, location: 'form'}));
  }


  const getCurrentOperatorHook = () => {
    return getCurrentOperator(rootNodes, node);
  }


  return (
    <div style={formContainerStyle}>
      <OperatorDropdown onOperatorChange={onOperatorChange} getCurrentOperator={getCurrentOperatorHook} selectedNode={node} />
      <div>
        <TitleContainer title="Clinical" node={node} />
      </div>
      <div>
        <RjsfForm ref={clinicalFormRef}
                  schema={clinicalFormSchema as JSONSchema7}
                  templates={formTemplates}
                  formData={node.data.formData}
                  uiSchema={clinicalUiSchema}
                  widgets={widgets}
                  onChange={onFormChange}
                  onError={() => {console.log('onError')}}
                  validator={localValidator}/>
      </div>
    </div>
  )
}
