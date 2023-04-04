import {CtimsFormComponentProps} from "../interface/CtimsFormComponentProps";
import {RjsfGridFieldTemplate} from "../custom-rjsf-templates/RjsfGridFieldTemplate";
import CtimsObjectFieldTemplate from "../custom-rjsf-templates/CtimsObjectFieldTemplate";
import CtimsItemObjectFieldTemplate from "../custom-rjsf-templates/CtimsItemObjectFieldTemplate";
import {JSONSchema7} from "json-schema";
import CtimsArrayFieldItemTemplate from "../custom-rjsf-templates/CtimsArrayFieldItemTemplate";
import CtimsArrayFieldTemplate from "../custom-rjsf-templates/CtimsArrayFieldTemplate";
import localValidator, {customizeValidator} from "@rjsf/validator-ajv8";
import {CSSProperties, ForwardedRef, forwardRef, memo, useEffect} from "react";
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
import CtimsNumberInput from "../custom-rjsf-templates/CtimsNumberInput";
import CtimsArmItemObjectFieldTemplate from "../custom-rjsf-templates/CtimsArmItemObjectFieldTemplate";
import CtimsSelectButton from "../custom-rjsf-templates/CtimsSelectButton";

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
// Comment just to rebase tutorial 2
  const schema = {
    "type": "object",
    "properties": {
      "trialInformation": {
        "required": [
          "trial_id",
          "long_title",
          "short_title",
          "phase",
          // "disease_status",
          "protocol_no",
          "nct_purpose",
          "status"
        ],
        "type": "object",
        "properties": {
          "trial_id": {
            "type": "string",
            "title": "Trial ID",
            "description": "The unique identifier for the study"
          },
          "nickname": {
            "type": "string",
            "title": "Nickname",
            "description": "A unique nickname to easily identify study"
          },
          "principal_investigator": {
            "type": "string",
            "title": "Principal Investigator",
            "description": "Enter details of the overall principal investigator"
          },
          "ctml_status": {
            "type": "string",
            "title": "Ctml Status",
            "description": "Categorize the status of your CTML",
            "enum": [
              "Draft",
              "In Review",
              "Complete"
            ]
          },
          "long_title": {
            "type": "string",
            "title": "Long Title",
            "description": "The official title of the trial"
          },
          "short_title": {
            "type": "string",
            "title": "Short Title",
            "description": "A short title for the trial"
          },
          "phase": {
            "type": "string",
            "title": "Phase",
            "description": "Phase/stage of the clinical trial studying a drug or biological product",
            "enum": [
              "I",
              "II",
              "III",
              "IV"
            ],
          },
          // "disease_status": {
          //   "type": "string",
          //   "title": "Disease Status",
          //   "description": "A list of conditions or diseases",
          // },
          "protocol_no": {
            "type": "string",
            "title": "Protocol Number",
            "description": "Protocol number associated with the trial; Unique identifier for the study other than the NCT_ID"
          },
          "nct_purpose": {
            "type": "string",
            "title": "NCT Purpose",
            "description": "The National Clinical Trial (NCT) purpose. The purpose of the clinical trial"
          },
          "status": {
            "type": "string",
            "title": "Status",
            "enum": [
              "Open to Accrual",
              "Closed to Accrual",
              "Not yet recruiting",
              "Recruiting",
              "Enrolling by invitation",
              "Active, not recruiting",
              "Suspended",
              "Terminated",
              "Completed",
              "Withdrawn",
              "Unknown status"
            ],
            "description": "Status of the trial"
          }
        },
        "title": "Trial Information"
      },
      "prior_treatment_requirements": {
        "type": "array",
        "title": "Prior treatment requirements",
        "items": {
          "type": "string",
          'title': 'Prior treatment requirements'
        }
      },
      "age_group": {
        "type": "object",
        "required": ["age"],
        "properties": {
          "age": {
            "type": "string",
            "title": "Age Group",
            "enum": [
              "Adult",
              "Older Adult",
              "Children"
            ],
            "description": "The age group the study is focused on",
          }
        },
        "title": "Age"
      },
      "drug_list": {
        "type": "object",
        "properties": {
          "drug": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["drug_name"],
              "properties": {
                "drug_name": {
                  "type": "string",
                  "title": "Drug Name",
                  "description": "A list of drug names in the trial. If there is a drug combination that are to be taken at the same time, include together. Example: Nivolumab plus Ipilimumab"
                }
              }
            },
            "title": "Drug"
          }
        },
        "title": "Drug List"
      },
      "management_group_list": {
        "type": "object",
        "properties": {
          "management_group": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["management_group_name"],
              "properties": {
                "management_group_name": {
                  "type": "string",
                  "title": "Management Group Name",
                  "enum": [
                    "BCCA - Vancouver Cancer Centre",
                    "Princess Margaret Cancer Centre",
                    "Cancer Centre of Southeastern Ontario at Kingston General Hospital",
                    "London Health Sciences Centre",
                    "The Ottawa Hospital Cancer Centre",
                    "Juravinski Cancer Centre at Hamilton Health Sciences",
                    "Odette Cancer Centre - Sunnybrook Health Sciences Centre",
                    "Mount Sinai Hospital"
                  ],
                  "description": "The hospital/clinic conducting the trial (study site(s)) in Canada. Please input the full name of the hospital/clinic site. If there is more than one site, please list each hospital/site"
                },
                "is_primary": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "This is a primary management group"
                },
              }
            },
            "title": "Management Group"
          }
        },
        "title": "Management Group List"
      },
      "site_list": {
        "type": "object",
        "properties": {
          "site": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["site_name", "site_status"],
              "properties": {
                "site_name": {
                  "type": "string",
                  "title": "Site Name",
                  "enum": [
                    "BCCA - Vancouver Cancer Centre",
                    "Princess Margaret Cancer Centre",
                    "Cancer Centre of Southeastern Ontario at Kingston General Hospital",
                    "London Health Sciences Centre",
                    "The Ottawa Hospital Cancer Centre",
                    "Juravinski Cancer Centre at Hamilton Health Sciences",
                    "Odette Cancer Centre - Sunnybrook Health Sciences Centre",
                    "Mount Sinai Hospital"
                  ],
                  "description": "The hospital/clinic managing this trial. Please input the full name of the hospital/clinic site."
                },
                "site_status": {
                  "type": "string",
                  "title": "Site Status",
                  "enum": [
                    "Open to Accrual",
                    "Closed to Accrual",
                    "Not yet recruiting",
                    "Recruiting",
                    "Enrolling by invitation",
                    "Active, not recruiting",
                    "Suspended",
                    "Terminated",
                    "Completed",
                    "Withdrawn",
                    "Unknown status"
                  ],
                  "description": "Trial accrual status",
                },
                "coordinating_center": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "This site is a coordinating center.",
                },
                "uses_cancer_center_irb": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "This site uses cancer center IRB.",
                },
              }
            },
            "title": "Site"
          }
        },
        "title": "Site List"
      },
      "sponsor_list": {
        "type": "object",
        "properties": {
          "sponsor": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["sponsor_name"],
              "properties": {
                "sponsor_name": {
                  "type": "string",
                  "title": "Sponsor Name",
                  "description": "The name of the sponsor and/or collaborators."
                },
                "is_principal_sponsor": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "This sponsor is a principal sponsor.",
                },
              }
            },
            "title": "Sponsor"
          }
        },
        "title": "Sponsor List"
      },
      "staff_list": {
        "type": "object",
        "properties": {
          "protocol_staff": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["first_name", "last_name", "email_address", "institution_name", "staff_role"],
              "properties": {
                "first_name": {
                  "type": "string",
                  "title": "First Name",
                  "description": "The first name of the overall principal investigator"
                },
                "last_name": {
                  "type": "string",
                  "title": "Last Name",
                  "description": "The last name of the overall principal investigator"
                },
                "email_address": {
                  "type": "string",
                  "title": "Email",
                  "description": "The email address of the overall principal investigator"
                },
                "institution_name": {
                  "type": "string",
                  "title": "Institution Name",
                  "enum": [
                    "Princess Margaret Cancer Centre",
                    "Cancer Centre of Southeastern Ontario at Kingston General Hospital",
                    "London Health Sciences Centre",
                    "The Ottawa Hospital Cancer Centre",
                    "Juravinski Cancer Centre at Hamilton Health Sciences",
                    "Odette Cancer Centre - Sunnybrook Health Sciences Centre",
                    "Mount Sinai Hospital"
                  ],
                  "description": "The institute the overall principal investigator is a part of"
                },
                "staff_role": {
                  "type": "string",
                  "enum": [
                    "Overall Principal Investigator"
                  ],
                  "title": "Staff Role",
                  "description": "The role of the listed staff"
                },
              },
              'title': 'Protocol Staff'
            },
            "title": "Protocol Staff"
          }
        },
        "title": "Staff List"
      },
      "treatment_list": {
        "type": "object",
        "properties": {
          "step": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "arm": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["arm_code", "arm_description", "arm_internal_id"],
                    "properties": {
                      "arm_code": {
                        "type": "string",
                        "title": "Arm Code",
                        "description": "A group/subgroup of participants in a trial that receives a specific treatment"
                      },
                      "arm_description": {
                        "type": "string",
                        "title": "Arm Description",
                        "description": "A description of an individual trial arm"
                      },
                      "arm_internal_id": {
                        "type": "string",
                        "title": 'Arm Internal Id',
                        "description": "Internal ID of arm"
                      },
                      "arm_suspended": {
                        "type": "string",
                        "enum": [
                          "Y",
                          "N"
                        ],
                        "title": "Arm is suspended",
                      },
                      "dose_level": {
                        "type": "array",
                        "title": 'Dose Level',
                        "items": {
                          "type": "object",
                          "required": ["level_code", "level_description", "level_internal_id", "level_suspended"],
                          "properties": {
                            "level_code": {
                              "type": "string",
                              "title": "Level Code",
                              "description": "Dose level code; the drug name"
                            },
                            "level_description": {
                              "type": "string",
                              "title": "Level Description",
                              "description": "Dose level description. The dosage details and frequency of administration"
                            },
                            "level_internal_id": {
                              "type": "string",
                              "title": "Level Internal Id",
                              "description": "Internal dose ID"
                            },
                            "level_suspended": {
                              "type": "string",
                              "enum": [
                                "Y",
                                "N"
                              ],
                              "title": "This level is suspended",
                            },
                          }
                        }
                      },
                      "match": {
                        "type": 'object',
                        "title": '',
                        "properties": {
                          "matchingCriteriaWidget": {type: 'string', title: 'Matching Criteria Widget'},
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "title": "Treatment List"
      }
    }
  }
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
      ]
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

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  const onError = (e: RJSFValidationError) => {
    console.log('onError', e);
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

  return (
    <div style={containerStyle}>
      <Form ref={ref} schema={schema as JSONSchema7}
            templates={{
              ArrayFieldItemTemplate: CtimsArrayFieldItemTemplate,
              ArrayFieldTemplate: CtimsArrayFieldTemplate,
              FieldTemplate: CtimsFieldTemplate,
              ErrorListTemplate: CtimsErrorListTemplate,
            }}
            // liveValidate
            onChange={(data) => {
              // onChangeTest(data)
              props.onRjsfFormChange(data)
            }} // @ts-ignore
            onError={(data) => {onError(data)}}
            formData={initialFormData}
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
