import { RjsfGridFieldTemplate } from "./RjsfGridFieldTemplate"
import CtimsItemObjectFieldTemplate from "./CtimsItemObjectFieldTemplate";
import CtimsArrayFieldSingleTemplate from "./CtimsArrayFieldSingleTemplate";
import CtimsObjectFieldTemplate from "./CtimsObjectFieldTemplate";

export const schema = {
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
}

}
export const uiSchema = {
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
  }
}
