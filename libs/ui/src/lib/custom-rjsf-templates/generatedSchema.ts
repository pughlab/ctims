import CtimsItemObjectFieldTemplate from "./CtimsItemObjectFieldTemplate";
import {RjsfGridFieldTemplate} from "./RjsfGridFieldTemplate";
import CtimsObjectFieldTemplate from "./CtimsObjectFieldTemplate";

export const schema = {
  "type": "object",
  "properties": {
    "clinicalMetadata": {
      "type": "object",
      "properties": {
        "disease_status": {
          "type": "string",
          "title": "Disease Status"
        },
        "nct_purpose": {
          "type": "string",
          "title": "NCT Purpose"
        },
        "phase": {
          "type": "string",
          "title": "Phase"
        },
        "prior_treatment_requirements": {
          "type": "string",
          "title": "Prior treatment requirements"
        },
        "protocol_number": {
          "type": "string",
          "title": "Protocol Number"
        },
        "short_title": {
          "type": "string",
          "title": "Short Title"
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
    }
  }
}
export const uiSchema = {
  // "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
  "ui:spacing": 16,
  "ui:layout": [
    {
      "clinicalMetadata": {
        "span": 24
      },
      "drugList": {
        "span": 24
      }
    }
  ],
  "clinicalMetadata": {
    "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
    "ui:spacing": 16,
    "ui:layout": [
      {
        "disease_status": {
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
        "prior_treatment_requirements": {
          "span": 24
        }
      },
      {
        "protocol_number": {
          "span": 12
        },
        "short_title": {
          "span": 12
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
  }
}
