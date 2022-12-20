import './ui.module.scss';
import { Theme as PrimeTheme} from '../lib/primereact'
import { Dialog } from 'primereact/dialog';
import localValidator from "@rjsf/validator-ajv8";
import {withTheme} from "@rjsf/core";
// import {schema, uiSchema} from "./custom-rjsf-templates/generatedSchema";
import {RegistryWidgetsType} from "@rjsf/utils";
import CtimsArrayFieldItemTemplate from "./custom-rjsf-templates/CtimsArrayFieldItemTemplate";
import CtimsArrayFieldTemplate from "./custom-rjsf-templates/CtimsArrayFieldTemplate";
import {JSONSchema7} from "json-schema";
import CtimsInput from "./custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "./custom-rjsf-templates/CtimsDropdown";
import {Component, CSSProperties, memo, useEffect, useState} from "react";
import {RjsfGridFieldTemplate} from "./custom-rjsf-templates/RjsfGridFieldTemplate";
import CtimsObjectFieldTemplate from "./custom-rjsf-templates/CtimsObjectFieldTemplate";
import CtimsItemObjectFieldTemplate from "./custom-rjsf-templates/CtimsItemObjectFieldTemplate";
import CtimsArrayFieldSingleTemplate from "./custom-rjsf-templates/CtimsArrayFieldSingleTemplate";
import CtimsButtonWidget from "./custom-rjsf-templates/CtimsButtonWidget";
import * as jsonpath from "jsonpath";

interface CtimsMatchDialogProps {
  isDialogVisible: boolean;
  dialogSchema: JSONSchema7;
  uiSchema: any;
  onRjsfFormChange: (data: any) => void;
}

interface CtimsMatchDialogState {
  isDialogVisible: boolean;
}

interface CtimsFormComponentProps {
  onSpecialButtonClick: (data: any) => void;
  onRjsfFormChange: (data: any) => void;
}

const schema = {
  type: "object",
  properties: {
    // define the fields and their schema here
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    phone: { type: "string" },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      }
    }
  }
};

const sampleUiShcema = {
  "address": {
    "ui:options": {
      "key": "address",
    }
  }
}

const MyFormGpt = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({});

  const onFormChange = (data: any, id?: any) => {
    console.log('onFormChange', data)
    console.log('onFormChange id', id)
    const { formData: rjsfFormData } = data;
    console.log('formData from state ', formData)
    console.log('formData from rjsf ', rjsfFormData)
    // console.log('formData', formData)
    // console.log('onFormChange', data);
    // // append to previous state
    // setFormData({ ...rjsfFormData, ...formData });
    setFormData(rjsfFormData);
  };

  const onSubmit = ({ formData }: any) => {
    // do something with the form data here
    console.log(formData);
  };

  return (
    <>
      {/* First part of the form */}
      <Form schema={schema as JSONSchema7}
            formData={formData}
            onChange={(data) => onFormChange(data)} onSubmit={onSubmit} validator={localValidator}>
        <button type="button" onClick={() => setShowDialog(true)}>
          Show Dialog
        </button>
      </Form>

      {/* Second part of the form in a PrimeReact dialog */}
      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        header="Second part of the form"
      >
        <Form schema={schema.properties.address as JSONSchema7}
              uiSchema={sampleUiShcema}
              validator={localValidator}
              formData={formData} onChange={(data, id) => onFormChange(data)} onSubmit={onSubmit}>
          <button type="submit">Submit</button>
        </Form>
      </Dialog>
    </>
  );
}


// class MyFormGpt extends Component {
//   // @ts-ignore
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       showDialog: false,
//       formData: {}
//     };
//   }
//
//   // @ts-ignore
//   onFormChange = (data) => {
//     // @ts-ignore
//     const previousFromData = this.state.formData;
//     const {formData} = data;
//     console.log('onFormChange', data);
//     // append to previous state
//     this.setState({ formData: { ...previousFromData, ...formData } });
//     console.log('new state: ', this.state)
//   };
//
//   // @ts-ignore
//   onSubmit = ({ formData }) => {
//     // do something with the form data here
//     console.log(formData);
//   };
//
//   override render() {
//     // @ts-ignore
//     const { showDialog, formData } = this.state;
//
//     return (
//       <>
//         {/* First part of the form */}
//         <Form schema={schema as JSONSchema7}
//               formData={formData}
//               onChange={(data) => this.onFormChange(data)} onSubmit={this.onSubmit} validator={localValidator}>
//           <button type="button" onClick={() => this.setState({ showDialog: true })}>
//             Show Dialog
//           </button>
//         </Form>
//
//         {/* Second part of the form in a PrimeReact dialog */}
//         <Dialog
//           visible={showDialog}
//           onHide={() => this.setState({ showDialog: false })}
//           header="Second part of the form"
//         >
//           <Form schema={schema.properties.address as JSONSchema7}
//                 validator={localValidator}
//                 formData={formData} onChange={this.onFormChange} onSubmit={this.onSubmit}>
//             <button type="submit">Submit</button>
//           </Form>
//         </Dialog>
//       </>
//     );
//   }
// }


class CtimMatchDialog extends Component<CtimsMatchDialogProps, CtimsMatchDialogState> {
  constructor(props: CtimsMatchDialogProps) {
    super(props);
    this.state = {
      isDialogVisible: this.props.isDialogVisible,
    };
    console.log('CtimMatchDialog constructor', this.state)
  }

  override componentDidUpdate(prevProps: Readonly<CtimsMatchDialogProps>, prevState: Readonly<CtimsMatchDialogState>, snapshot?: any) {
    if (prevProps.isDialogVisible !== this.props.isDialogVisible) {
      this.setState({isDialogVisible: this.props.isDialogVisible})
    }
  }

  override shouldComponentUpdate(nextProps: Readonly<CtimsMatchDialogProps>, nextState: Readonly<CtimsMatchDialogState>, nextContext: any): boolean {
    return true;
  }

  handleSubmit = (data: any) => {
    console.log(data);
  }

  setIsDialogVisible = (isDialogVisible: boolean) => {
    console.log('setIsDialogVisible', isDialogVisible)
    this.setState({isDialogVisible});
  }

  override render() {
    return (
      <Dialog header="Dialog" visible={this.state.isDialogVisible} style={{width: '50vw'}} onHide={() => this.setIsDialogVisible(false)}>
        <Form schema={this.props.dialogSchema as JSONSchema7}
              templates={{
                ArrayFieldItemTemplate: CtimsArrayFieldItemTemplate,
                ArrayFieldTemplate: CtimsArrayFieldTemplate,
              }}
              onChange={(data) => {this.props.onRjsfFormChange(data)}}
              uiSchema={this.props.uiSchema}
              widgets={widgets}
              onSubmit={(data) => {this.handleSubmit(data.formData)}} validator={localValidator}/>
      </Dialog>
    )
  }
}

class CtimsFormComponent extends Component<CtimsFormComponentProps> {

  constructor(props: CtimsFormComponentProps) {
    super(props);
  }

  override state = {
    isDialogVisible: false,
  }

  schema = {
    "type": "object",
    "properties": {
      "clinicalMetadata": {
        "type": "object",
        "properties": {
          "nct_id": {
            "type": "string",
            "title": "NCT ID"
          },
          "long_title": {
            "type": "string",
            "title": "Long Title"
          },
          "short_title": {
            "type": "string",
            "title": "Short Title"
          },
          "age": {
            "type": "string",
            "title": "Age"
          },
          "nct_purpose": {
            "type": "string",
            "title": "NCT Purpose"
          },
          "phase": {
            "type": "string",
            "title": "Phase"
          },
          "protocol_no": {
            "type": "string",
            "title": "Protocol Number"
          },
          "status": {
            "type": "string",
            "title": "Status"
          }
        },
        "title": "Clinical Metadata"
      },
      "drugList": {
        "type": "object",
        "properties": {
          "drug": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "drug_name": {
                  "type": "string",
                  "title": "Drug Name"
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
          "managementGroup": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "is_primary": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "Is Primary"
                },
                "management_group_name": {
                  "type": "string",
                  "title": "Management Group Name"
                }
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
              "properties": {
                "coordinating_center": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "Coordinating Center"
                },
                "uses_cancer_center_irb": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "User Cancer Center IRB"
                },
                "site_name": {
                  "type": "string",
                  "title": "Site Name"
                },
                "site_status": {
                  "type": "string",
                  "title": "Site Status"
                }
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
              "properties": {
                "is_principal_sponsor": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "Is Principal Sponsor"
                },
                "sponsor_name": {
                  "type": "string",
                  "title": "Sponsor Name"
                }
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
              "properties": {
                "first_name": {
                  "type": "string",
                  "title": "First Name"
                },
                "last_name": {
                  "type": "string",
                  "title": "Last Name"
                },
                "email": {
                  "type": "string",
                  "title": "Email"
                },
                "institution_name": {
                  "type": "string",
                  "title": "Institution Name"
                },
                "staff_role": {
                  "type": "string",
                  "title": "Staff Role"
                }
              },
              'title': 'Protocol Staff'
            },
            "title": "Protocol Staff"
          }
        },
        "title": "Staff List"
      },
      "prior_treatment_requirements": {
        "type": "array",
        "title": "Prior treatment requirements",
        "items": {
          "type": "string",
          'title': 'Prior treatment requirements'
        }
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
                    "properties": {
                      "arm_code": { "type": "string" },
                      "arm_description": { "type": "string" },
                      "arm_internal_id": { "type": "integer" },
                      "arm_suspended": { "type": "string" },
                      "dose_level": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "level_code": { "type": "string" },
                            "level_description": { "type": "string" },
                            "level_internal_id": { "type": "integer" },
                            "level_suspended": { "type": "string" }
                          }
                        }
                      },
                      "match": {
                        type: 'object',
                        properties: {
                          // fields in the form
                          "ctimsButton": { type: 'string', title: 'Ctims Button' },
                          "fieldShouldBeInDialog": { type: 'string', title: 'Field Should Be In Dialog' },

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
  uiSchema = {
    "ui:spacing": 16,
    "ui:layout": [
      {
        "clinicalMetadata": {
          "span": 24
        }
      },
      {
        "drugList": {
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
      {
        "prior_treatment_requirements": {
          "span": 24
        }
      }
    ],
    "clinicalMetadata": {
      "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "nct_id": {
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
          "age": {
            "span": 24
          }
        },
        {
          "nct_purpose": {
            "span": 24
          }
        },
        {
          "phase": {
            "span": 24
          }
        },
        {
          "protocol_no": {
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
    "drugList": {
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
          "managementGroup": {
            "span": 24
          },
          "ui:order": [
            "managementGroup"
          ]
        }
      ],
      "managementGroup": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "ui:spacing": 16,
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
          ]
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
          ]
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
              "email": {
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
    "prior_treatment_requirements": {
      "ui:ArrayFieldTemplate": CtimsArrayFieldSingleTemplate,
    },
    "treatment_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "step": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "arm": {
            "items": {
              "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
              "match": {
                "ctimsButton": {
                  "ui:widget": CtimsButtonWidget,
                  onClick: (e: any, id?: string) => {
                    e.preventDefault();
                    console.log("clicked", id);
                    this.props.onSpecialButtonClick(id);
                  },
                },
                "fieldShouldBeInDialog": {
                  "ui:options": {
                    "dialog": true
                  },
                }
              }
            }
          }
        }
      }
    },

  }
  dialogSchema = {};

  override componentDidMount() {
    this.setDialogSchema();
  }

  handleSubmit = (e: any) => {
    console.log(e);
  }

  setIsDialogVisible = (visible: boolean) => {
    this.setState({
      isDialogVisible: visible
    })
  }

  private setDialogSchema() {
    const results = jsonpath.query(this.schema, '$..fieldShouldBeInDialog');
    console.log('jsonpath', results);

    const dialogSchema = {
      "title": "Dialog",
      "type": "object",
      "properties": {
        fieldShouldBeInDialog: results[0]
      }
    };
    this.dialogSchema = dialogSchema;
  }

  override shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log('shouldComponentUpdate state', nextState);
    console.log('shouldComponentUpdat props', nextProps);
    // if (nextState.isDialogVisible) {
    //   return true;
    // }
    return false;
  }

  // @ts-ignore
  override render() {
    // The component's rendering code goes here
    return (
      <div style={containerStyle}>
        <Form schema={this.schema as JSONSchema7}
              templates={{
                ArrayFieldItemTemplate: CtimsArrayFieldItemTemplate,
                ArrayFieldTemplate: CtimsArrayFieldTemplate,
              }}
              onChange={(data) => {this.props.onRjsfFormChange(data)}} // @ts-ignore
              uiSchema={this.uiSchema}
              widgets={widgets}
              onSubmit={(data) => {this.handleSubmit(data.formData)}} validator={localValidator}/>
      </div>
    );
  }
}

const Form = withTheme(PrimeTheme)

const widgets: RegistryWidgetsType = {
  TextWidget: CtimsInput,
  SelectWidget: CtimsDropdown
}

const containerStyle: CSSProperties = {
  width: '100%',
}

/* eslint-disable-next-line */
export interface UiProps {}

export const Ui = memo((props: UiProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const schema = {
    "type": "object",
    "properties": {
      "clinicalMetadata": {
        "type": "object",
        "properties": {
          "nct_id": {
            "type": "string",
            "title": "NCT ID"
          },
          "long_title": {
            "type": "string",
            "title": "Long Title"
          },
          "short_title": {
            "type": "string",
            "title": "Short Title"
          },
          "age": {
            "type": "string",
            "title": "Age"
          },
          "nct_purpose": {
            "type": "string",
            "title": "NCT Purpose"
          },
          "phase": {
            "type": "string",
            "title": "Phase"
          },
          "protocol_no": {
            "type": "string",
            "title": "Protocol Number"
          },
          "status": {
            "type": "string",
            "title": "Status"
          }
        },
        "title": "Clinical Metadata"
      },
      "drugList": {
        "type": "object",
        "properties": {
          "drug": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "drug_name": {
                  "type": "string",
                  "title": "Drug Name"
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
          "managementGroup": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "is_primary": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "Is Primary"
                },
                "management_group_name": {
                  "type": "string",
                  "title": "Management Group Name"
                }
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
              "properties": {
                "coordinating_center": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "Coordinating Center"
                },
                "uses_cancer_center_irb": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "User Cancer Center IRB"
                },
                "site_name": {
                  "type": "string",
                  "title": "Site Name"
                },
                "site_status": {
                  "type": "string",
                  "title": "Site Status"
                }
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
              "properties": {
                "is_principal_sponsor": {
                  "type": "string",
                  "enum": [
                    "Y",
                    "N"
                  ],
                  "title": "Is Principal Sponsor"
                },
                "sponsor_name": {
                  "type": "string",
                  "title": "Sponsor Name"
                }
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
              "properties": {
                "first_name": {
                  "type": "string",
                  "title": "First Name"
                },
                "last_name": {
                  "type": "string",
                  "title": "Last Name"
                },
                "email": {
                  "type": "string",
                  "title": "Email"
                },
                "institution_name": {
                  "type": "string",
                  "title": "Institution Name"
                },
                "staff_role": {
                  "type": "string",
                  "title": "Staff Role"
                }
              },
              'title': 'Protocol Staff'
            },
            "title": "Protocol Staff"
          }
        },
        "title": "Staff List"
      },
      "prior_treatment_requirements": {
        "type": "array",
        "title": "Prior treatment requirements",
        "items": {
          "type": "string",
          'title': 'Prior treatment requirements'
        }
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
                    "properties": {
                      "arm_code": { "type": "string" },
                      "arm_description": { "type": "string" },
                      "arm_internal_id": { "type": "integer" },
                      "arm_suspended": { "type": "string" },
                      "dose_level": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "level_code": { "type": "string" },
                            "level_description": { "type": "string" },
                            "level_internal_id": { "type": "integer" },
                            "level_suspended": { "type": "string" }
                          }
                        }
                      },
                      "match": {
                        type: 'object',
                        properties: {
                          // fields in the form
                          "ctimsButton": { type: 'string', title: 'Ctims Button' },
                          "fieldShouldBeInDialog": { type: 'string', title: 'Field Should Be In Dialog' },

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
    "ui:layout": [
      {
        "clinicalMetadata": {
          "span": 24
        }
      },
      {
        "drugList": {
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
      {
        "prior_treatment_requirements": {
          "span": 24
        }
      }
    ],
    "clinicalMetadata": {
      "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
      "ui:spacing": 16,
      "ui:layout": [
        {
          "nct_id": {
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
          "age": {
            "span": 24
          }
        },
        {
          "nct_purpose": {
            "span": 24
          }
        },
        {
          "phase": {
            "span": 24
          }
        },
        {
          "protocol_no": {
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
    "drugList": {
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
          "managementGroup": {
            "span": 24
          },
          "ui:order": [
            "managementGroup"
          ]
        }
      ],
      "managementGroup": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "ui:spacing": 16,
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
          ]
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
          ]
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
              "email": {
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
    "prior_treatment_requirements": {
      "ui:ArrayFieldTemplate": CtimsArrayFieldSingleTemplate,
    },
    "treatment_list": {
      "ui:ObjectFieldTemplate": CtimsObjectFieldTemplate,
      "step": {
        "items": {
          "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
          "arm": {
            "items": {
              "ui:ObjectFieldTemplate": CtimsItemObjectFieldTemplate,
              "match": {
                "ctimsButton": {
                  "ui:widget": CtimsButtonWidget,
                  onClick: (e: any) => {
                    e.preventDefault();
                    console.log("clicked");
                    setIsOpen(true)
                  },
                },
                "fieldShouldBeInDialog": {
                  "ui:options": {
                    "dialog": true
                  },
                }
              }
            }
          }
        }
      }
    },

  }

  const results = jsonpath.query(schema, '$..fieldShouldBeInDialog');
  console.log('jsonpath', results);

  const dialogSchema = {
    "title": "Dialog",
    "type": "object",
    "properties": {
      fieldShouldBeInDialog: results[0]
    }
  };

  useEffect(() => {
    console.log('My component was re-rendered');
  });

  const handleSpecialClick = (data: any) => {
    console.log('handleSpecialClick', data);
    setIsOpen(true);
  }

  const handleSubmit = (e: any) => {
    console.log(e);
  }

  const onFormChange = (data: any) => {
    console.log('onChange event', data)
  }

  // @ts-ignore
  return (
    <div style={containerStyle}>
      {/*<MyFormGpt />*/}
      <CtimsFormComponent onSpecialButtonClick={handleSpecialClick}
                          onRjsfFormChange={onFormChange}
      />
      <CtimMatchDialog onRjsfFormChange={onFormChange}
                       isDialogVisible={isOpen}
                       dialogSchema={dialogSchema as JSONSchema7}
                       uiSchema={uiSchema}
      />
    </div>
  );
});

export default Ui;
