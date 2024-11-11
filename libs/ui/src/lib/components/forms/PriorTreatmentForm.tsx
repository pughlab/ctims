import Form, {withTheme} from "@rjsf/core";
import {Theme as PrimeTheme} from "../../primereact";
import CtimsFieldTemplate from "../../custom-rjsf-templates/CtimsFieldTemplate";
import CtimsErrorListTemplate from "../../custom-rjsf-templates/CtimsErrorListTemplate";
import {RegistryWidgetsType, ValidationData} from "@rjsf/utils";
import CtimsInput from "../../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../../custom-rjsf-templates/CtimsDropdown";
import React, {CSSProperties, useContext, useEffect, useRef} from "react";
import {IFormProps} from "../MatchingMenuAndForm";
import {CtimsDialogContext, CtimsDialogContextType} from "../CtimsMatchDialog";
import {useDispatch} from "react-redux";
import CtimsMatchDialogObjectFieldTemplate from "../../custom-rjsf-templates/CtimsMatchDialogObjectFieldTemplate";
import {
  deleteMatchDialogError,
  formChange, operatorChange,
  setMatchDialogErrors
} from "../../../../../../apps/web/store/slices/modalActionsSlice";
import {getCurrentOperator} from "../helpers";
import {OperatorDropdown} from "./OperatorDropdown";
import {TitleContainer} from "./TitleContainer";
import {JSONSchema7} from "json-schema";
import localValidator from "@rjsf/validator-ajv8";


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

const hideScrollbarStyle = `
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PriorTreatmentForm = (props: IFormProps) => {
  const {node, rootNodes} = props
  const nk = node.key as string;

  const {setSaveBtnState} = useContext(CtimsDialogContext) as CtimsDialogContextType;

  const priorTreatmentFormRef = useRef<any>(null);

  useEffect(() => {
    node.data.formValid = false;
  }, [node]);

  const dispatch = useDispatch();

  const priorTreatmentFormSchema = {
    'definitions': {
      "treatment_category": {
        "enumNames": [
          "Medical Therapy",
          "Surgery",
          "Radiation Therapy"
        ],
        "enum": [
          "MedicalTherapy",
          "Surgery",
          "RadiationTherapy"
        ]
      },
    },
    "type": "object",
    "required": [],
    'properties': {
      "treatmentCategoryContainerObject": {
        'title': '',
        'type': 'object',
        'properties': {
          "treatment_category": {
            "$ref": "#/definitions/treatment_category",
            'title': 'Treatment Category',
            "description": "Type of treatment",
          },
        },
        "dependencies": {
          "treatment_category": {
            "allOf": [
              {
                "if": {
                  "properties": {
                    "treatment_category": {
                      "const": "MedicalTherapy"
                    }
                  }
                },
                "then": {
                  "properties": {
                    'prior_treatment_agent': {
                      'type': 'string',
                      'title': 'Agent',
                      "description": "Gene symbol as determined by https://www.genenames.org/",
                    }
                  },
                  "required": []
                }
              },
              {
                "if": {
                  "properties": {
                    "treatment_category": {
                      "const": "Surgery"
                    }
                  }
                },
                "then": {
                  "properties": {
                    'surgery_type': {
                      'type': 'string',
                      'title': 'Surgery type',
                      "description": "Gene symbol as determined by https://www.genenames.org/",
                    }
                  },
                  "required": []
                }
              },
              {
                "if": {
                  "properties": {
                    "treatment_category": {
                      "const": "RadiationTherapy"
                    }
                  }
                },
                "then": {
                  "properties": {
                    'radiation_site': {
                      'type': 'string',
                      'title': 'Site',
                      "description": "Gene symbol as determined by https://www.genenames.org/",
                    }
                  },
                  "required": []
                }
              }
            ]
          }
        }
      }
    }
  }
  const priorTreatmentFormUiSchema = {
    "ui:ObjectFieldTemplate": CtimsMatchDialogObjectFieldTemplate,
    "ui:submitButtonOptions": {
      "norender": true,
    }
  }

  const onFormChange = (data: any) => {
    const form: Form = priorTreatmentFormRef.current;
    form?.validateForm();
    const errorDetails: ValidationData<any> = form?.validate(data.formData);
    if (typeof errorDetails === 'undefined' || errorDetails?.errors.length > 0) {
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
    console.log('onFormChange node: ', node)
  }

  const onOperatorChange = (code: string) => {
    // or/and
    const codeLowerCase = code.toLowerCase();
    dispatch(operatorChange({operator: codeLowerCase, nodeKey: node.key as string, location: 'form'}));
  }

  /**
   * This function is used to get the current operator for the node.
   */
  const useCurrentOperator = () => {
    return getCurrentOperator(rootNodes, node);
  }

  const customValidate = (formData: any, errors: any, uiSchema: any) => {
    if (typeof formData.prior_treatment_agent === 'undefined') {
      //errors.prior_treatment_agent.addError('Must have at least one field filled.');
    }
    return errors;
  }

  return (
    <div style={formContainerStyle}>
      <style>{hideScrollbarStyle}</style>
      <OperatorDropdown
        onOperatorChange={onOperatorChange}
        getCurrentOperator={useCurrentOperator}
        selectedNode={node} />
      <div>
        <TitleContainer title="Prior Treatment" node={node} isAddEnabled />
      </div>
      <div>
        <RjsfForm ref={priorTreatmentFormRef}
                  schema={priorTreatmentFormSchema as JSONSchema7}
                  templates={formTemplates}
                  formData={node.data.formData}
                  uiSchema={priorTreatmentFormUiSchema}
                  widgets={widgets}
                  onChange={onFormChange}
                  onError={() => {console.log('onError')}}
                  customValidate={customValidate}
                  validator={localValidator}/>
      </div>
    </div>
  )
}
