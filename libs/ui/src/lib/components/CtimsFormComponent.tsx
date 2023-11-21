import {CtimsFormComponentProps} from "../interface/CtimsFormComponentProps";
import {RjsfGridFieldTemplate} from "../custom-rjsf-templates/RjsfGridFieldTemplate";
import CtimsObjectFieldTemplate from "../custom-rjsf-templates/CtimsObjectFieldTemplate";
import CtimsItemObjectFieldTemplate from "../custom-rjsf-templates/CtimsItemObjectFieldTemplate";
import {JSONSchema7} from "json-schema";
import CtimsArrayFieldItemTemplate from "../custom-rjsf-templates/CtimsArrayFieldItemTemplate";
import CtimsArrayFieldTemplate from "../custom-rjsf-templates/CtimsArrayFieldTemplate";
import localValidator, {customizeValidator} from "@rjsf/validator-ajv8";
import {CSSProperties, ForwardedRef, forwardRef, memo, useState} from "react";
import {withTheme} from "@rjsf/core";
import {Theme as PrimeTheme} from "../primereact";
import {RegistryWidgetsType, RJSFValidationError} from "@rjsf/utils";
import CtimsInput from "../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../custom-rjsf-templates/CtimsDropdown";
import CtimsMatchingCriteriaWidget from "../custom-rjsf-templates/CtimsMatchingCriteriaWidget";
import CtimsFieldTemplate from "../custom-rjsf-templates/CtimsFieldTemplate";
import CtimsErrorListTemplate from "../custom-rjsf-templates/CtimsErrorListTemplate";
import DoseLevelObjectFieldTemplate from "../custom-rjsf-templates/DoseLevelObjectFieldTemplate";
import CtimsArrayFieldSingleTemplate from "../custom-rjsf-templates/CtimsArrayFieldSingleTemplate";
import CtimsArmItemObjectFieldTemplate from "../custom-rjsf-templates/CtimsArmItemObjectFieldTemplate";
import CtimsSelectButton from "../custom-rjsf-templates/CtimsSelectButton";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../apps/web/store/store';

const Form = withTheme(PrimeTheme)

const widgets: RegistryWidgetsType = {
  TextWidget: CtimsInput,
  SelectWidget: CtimsDropdown
}

const containerStyle: CSSProperties = {
  width: '100%',
}

const ajvOptionsOverrides = {
  verbose: true,
};

export const ctims_validator = customizeValidator({ ajvOptionsOverrides });

const CtimsFormComponent = forwardRef((props: CtimsFormComponentProps, ref: ForwardedRef<any>) => {
  const uiSchema = {
    "ui:spacing": 16,
    "ui:submitButtonOptions": {
      "norender": true,
    },
    "ui:layout": [
      {
        "trialInformation": {
          "span": 24
        }
      },
      {
        "prior_treatment_requirements": {
          "span": 24
        }
      },
      {
        "age_group": {
          "span": 24
        }
      },
      {
        "drug_list": {
          "span": 24
        }
      },
      {
        "management_group_list": {
          "span": 24
        }
      },
      {
        "site_list": {
          "span": 24
        }
      },
      {
        "sponsor_list": {
          "span": 24
        }
      },
      {
        "staff_list": {
          "span": 24
        }
      },
    ],
    "trialInformation": {
      "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "trial_id": {
            "span": 24
          }
        },
        {
          "nickname": {
            "span": 24
          }
        },
        {
          "principal_investigator": {
            "span": 24
          }
        },
        {
          "ctml_status": {
            "span": 24
          }
        },
        {
          "long_title": {
            "span": 24
          }
        },
        {
          "short_title": {
            "span": 24
          }
        },
        {
          "phase": {
            "span": 24
          }
        },
        // {
        //   "disease_status": {
        //     "span": 24
        //   }
        // },
        {
          "protocol_no": {
            "span": 24
          }
        },
        {
          "nct_purpose": {
            "span": 24
          }
        },
        {
          "status": {
            "span": 24
          }
        }
      ],
      "phase": {
        multiple: true
      }
    },
    "prior_treatment_requirements": {
      "ui:ArrayFieldTemplate": CtimsArrayFieldSingleTemplate,
    },
    "age_group": {
      "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "age": {
            "span": 24
          }
        }
      ]
    },
    "drug_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "drug": {
            "span": 24
          },
          "ui:order": [
            "drug"
          ]
        }
      ],
      "drug": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "ui:spacing": 16,
          "ui:layout": [
            {
              "drug_name": {
                "span": 24
              },
              "ui:order": [
                "drug_name"
              ]
            }
          ]
        }
      }
    },
    "management_group_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "management_group": {
            "span": 24
          },
          "ui:order": [
            "management_group"
          ]
        }
      ],
      "management_group": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "ui:spacing": 16,
          "is_primary": {
            "ui:widget": CtimsSelectButton
          },
          "ui:layout": [
            {
              "is_primary": {
                "span": 12
              },
              "ui:order": [
                "is_primary",
                "management_group_name"
              ],
              "management_group_name": {
                "span": 12
              }
            }
          ]
        }
      }
    },
    "site_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "site": {
            "span": 24
          },
          "ui:order": [
            "site"
          ]
        }
      ],
      "site": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "ui:spacing": 16,
          "ui:layout": [
            {
              "coordinating_center": {
                "span": 12
              },
              "uses_cancer_center_irb": {
                "span": 12
              }
            },
            {
              "site_name": {
                "span": 12
              },
              "site_status": {
                "span": 12
              }
            }
          ],
          "coordinating_center": {
            "ui:widget": CtimsSelectButton
          },
          "uses_cancer_center_irb": {
            "ui:widget": CtimsSelectButton
          }
        }
      }
    },
    "sponsor_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "sponsor": {
            "span": 24
          }
        }
      ],
      "sponsor": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "ui:spacing": 16,
          "ui:layout": [
            {
              "is_principal_sponsor": {
                "span": 12
              },
              "sponsor_name": {
                "span": 12
              }
            }
          ],
          "is_principal_sponsor": {
            "ui:widget": CtimsSelectButton
          }
        }
      }
    },
    "staff_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "protocol_staff": {
            "span": 24
          }
        }
      ],
      "protocol_staff": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "ui:spacing": 16,
          "ui:layout": [
            {
              "first_name": {
                "span": 12
              },
              "last_name": {
                "span": 12
              }
            },
            {
              "email_address": {
                "span": 24
              }
            },
            {
              "institution_name": {
                "span": 24
              }
            },
            {
              "staff_role": {
                "span": 24
              }
            }
          ]
        }
      }
    },
    "treatment_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "step": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "arm": {
            "items": {
              "ui:ObjectFieldTemplate": CtimsArmItemObjectFieldTemplate,
              "arm_suspended": {
                "ui:widget": CtimsSelectButton
              },
              "arm_internal_id": {
                "ui:widget": CtimsInput,
              },
              "match": {
                matchingCriteriaWidget: {
                  "ui:widget": CtimsMatchingCriteriaWidget,
                  onClick: (e: any, formData: any, id: string) => {
                    e.preventDefault();
                    props.onSpecialButtonClick(formData, id);
                  },
                },
              },
              "dose_level": {
               "items": {
                  "ui:ObjectFieldTemplate": DoseLevelObjectFieldTemplate,
                 "key": "dose_level",
                 "level_suspended": {
                    "ui:widget": CtimsSelectButton
                 },
                 "level_internal_id": {
                    "ui:widget": CtimsInput,
                 }
               }
              }
            }
          }
        }
      }
    },

  }

  const initialFormData = {
    "trialInformation": {},
    "age_group": {},
    // "prior_treatment_requirements": [null],
    "drug_list": {
      "drug": [
        {}
      ]
    },
    "management_group_list": {
      "management_group": [
        {}
      ]
    },
    "site_list": {
      "site": [
        {}
      ]
    },
    "sponsor_list": {
      "sponsor": [
        {}
      ]
    },
    "staff_list": {
      "protocol_staff": [
        {}
      ]
    },
    "treatment_list": {
      "step": [
        {
          "arm": [
            {
              "dose_level": [
                {}
              ],
              "match": {}
            }
          ]
        }
      ]
    }
  }

  const [formData, setFormData] = useState<any>(props.formData ? props.formData : initialFormData);

  const isFormDisabled = useSelector((state: RootState) => state.context.isFormDisabled);

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  const onError = (e: RJSFValidationError) => {
    console.log('onError', e);
  }


  return (
    <div style={containerStyle}>
      <Form ref={ref} schema={props.schema as JSONSchema7}
            templates={{
              ArrayFieldItemTemplate: CtimsArrayFieldItemTemplate,
              ArrayFieldTemplate: CtimsArrayFieldTemplate,
              FieldTemplate: CtimsFieldTemplate,
              ErrorListTemplate: CtimsErrorListTemplate,
            }}
            disabled={isFormDisabled}
            // liveValidate
            onChange={(data) => {
              // onChangeTest(data)
              props.onRjsfFormChange(data)
            }} // @ts-ignore
            onError={(data) => {onError(data)}}
            // formData={props.formData ? props.formData : initialFormData}
            formData={formData}
            uiSchema={uiSchema}
            widgets={widgets}
            onSubmit={(data) => {
              handleSubmit(data.formData)
            }} validator={localValidator}/>
    </div>
  )
});

// prevent component from re-rendering
const CtimsFormComponentMemo = memo(CtimsFormComponent, (prevProps: any, nextProps: any) => true);
export default CtimsFormComponentMemo;
