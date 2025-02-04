import Form, {withTheme} from "@rjsf/core";
import {Theme as PrimeTheme} from "../../primereact";
import CtimsFieldTemplate from "../../custom-rjsf-templates/CtimsFieldTemplate";
import CtimsErrorListTemplate from "../../custom-rjsf-templates/CtimsErrorListTemplate";
import {RegistryWidgetsType, ValidationData} from "@rjsf/utils";
import CtimsInput from "../../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../../custom-rjsf-templates/CtimsDropdown";
import React, {CSSProperties, useContext, useEffect, useRef, useState} from "react";
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

  // tie the form data to the component, so we can manually reset the values, see onFormChange
  const [myFormData, setMyFormData] = useState(node.data.formData);


  useEffect(() => {
    node.data.formValid = false;
    const formData = node.data.formData;
    if (formData && !formData.hasOwnProperty('treatmentCategoryContainerObject')) {
      setMyFormData({'treatmentCategoryContainerObject': formData});
    } else {
      setMyFormData(formData);
    }
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
          "Medical Therapy",
          "Surgery",
          "Radiation Therapy"
        ]
      },
      'medical_treatment_subtype': {
        "enumNames": [
          " ",
          "Immunotherapy",
          "Targeted Therapy",
          "Hormone Therapy",
          "Chemotherapy",
        ],
        "enum": [
          "",
          "Immunotherapy",
          "Targeted Therapy",
          "Hormone Therapy",
          "Chemotherapy",
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
            'title': 'Prior Treatment Type',
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
                      "const": "Medical Therapy"
                    }
                  }
                },
                "then": {
                  "properties": {
                    'subtype': {
                      'title': 'Medical Therapy Subtype',
                      '$ref': '#/definitions/medical_treatment_subtype',
                      "description": "Medical Therapy Subtype",
                    },
                    'agent_class': {
                      'type': 'string',
                      'title': 'Agent Class',
                      "description": "Prior Treatment Agent Class",
                    },
                    'agent': {
                      'type': 'string',
                      'title': 'Agent',
                      "description": "Prior Treatment Agent",
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
                      "description": "Surgery type",
                    }
                  },
                  "required": []
                }
              },
              {
                "if": {
                  "properties": {
                    "treatment_category": {
                      "const": "Radiation Therapy"
                    }
                  }
                },
                "then": {
                  "properties": {
                    'radiation_type': {
                      'type': 'string',
                      'title': 'Radiation Type',
                      "description": "Radiation Type",
                    },
                    'radiation_site': {
                      'type': 'string',
                      'title': 'Radiation Site',
                      "description": "Radiation Site",
                    }
                  },
                  "required": []
                }
              }
            ]
          }
        },
        "required": ['treatment_category']
      }
    }
  }
  const priorTreatmentFormUiSchema = {
    "ui:ObjectFieldTemplate": CtimsMatchDialogObjectFieldTemplate,
    "ui:submitButtonOptions": {
      "norender": true,
    }
  }

  const validateFormFromRef = (data?: any) => {
    const form: Form = priorTreatmentFormRef.current;
    form?.validateForm();
    let errorDetails: ValidationData<any>;
    if (data) {
      errorDetails = form?.validate(data.formData);
    } else {
      errorDetails = form?.validate(form.state.formData);
    }
    // console.log('onFormChange errorDetails: ', errorDetails);
    if (errorDetails?.errors.length > 0) {
      errorsInFormDispatch();
    }
    if (errorDetails?.errors.length === 0) {
      noErrorsInFormDispatch();
    }
  }

  const noErrorsInFormDispatch = () => {
    node.data.formValid = true;
    dispatch(deleteMatchDialogError(nk));
    setSaveBtnState(false)
  }

  const errorsInFormDispatch = () => {
    node.data.formValid = false;
    const payload = {[nk]: true};
    dispatch(setMatchDialogErrors(payload));
  }

  const onFormChange = (data: any) => {
    // reset form if variant category changed
    const oldTreatmentCategory = myFormData?.treatmentCategoryContainerObject?.treatment_category;
    const newTreatmentCategory = data.formData.treatmentCategoryContainerObject?.treatment_category;
    // if oldTreatmentCategory is defined and category is now different, reset the form in with the variantCategoryContainer format
    if ((oldTreatmentCategory && newTreatmentCategory && (oldTreatmentCategory !== newTreatmentCategory))
      // or the if form is new so oldTreatmentCategory is undefined, and newTreatmentCategoryContainer exists
    || (!oldTreatmentCategory && data.formData.treatmentCategoryContainerObject)) {
      const myFormData = {
        treatmentCategoryContainerObject: {
          treatment_category: newTreatmentCategory
        }
      }
      setMyFormData(myFormData);
      node.data.formData = myFormData;
      data.formData = myFormData;
    }
    const flattenedFormData = {
      ...data,
      // formData: data.formData.variantCategoryContainerObject, /*can't change this, otherwise form won't render*/
      errorSchema: data.errorSchema.treatmentCategoryContainerObject,
    }
    validateFormFromRef(flattenedFormData);
    node.data.formData = data.formData;
    setMyFormData(flattenedFormData.formData);
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
    let myFormData = formData;
    let myErrors = errors;
    if (formData.treatmentCategoryContainerObject) {
      myFormData = formData.treatmentCategoryContainerObject;
      myErrors = errors.treatmentCategoryContainerObject;
    }
    if (typeof myFormData.treatment_category === 'undefined' &&
        typeof myFormData.subtype === 'undefined' &&
        typeof myFormData.agent_class === 'undefined' &&
        typeof myFormData.agent === 'undefined' &&
        typeof myFormData.surgery_type === 'undefined' &&
        typeof myFormData.radiation_type === 'undefined' &&
        typeof myFormData.radiation_site === 'undefined') {
      myErrors.treatment_category.addError('Must have at least one field filled.');
    }

    return myErrors;
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
                  formData={myFormData}
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
