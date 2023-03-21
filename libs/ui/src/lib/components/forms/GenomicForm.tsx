import React, {CSSProperties, useEffect, useRef} from "react";
import Form, {withTheme} from "@rjsf/core";
import {RegistryWidgetsType, ValidationData} from "@rjsf/utils";
import {useDispatch} from "react-redux";
import CtimsMatchDialogObjectFieldTemplate from "../../custom-rjsf-templates/CtimsMatchDialogObjectFieldTemplate";
import {formChange, operatorChange} from "../../../../../../apps/web/store/slices/modalActionsSlice";
import {OperatorDropdown} from "./OperatorDropdown";
import {TitleContainer} from "./TitleContainer";
import {JSONSchema7} from "json-schema";
import localValidator from "@rjsf/validator-ajv8";
import {IFormProps} from "../MatchingMenuAndForm";
import {Theme as PrimeTheme} from "../../primereact";
import CtimsFieldTemplate from "../../custom-rjsf-templates/CtimsFieldTemplate";
import CtimsErrorListTemplate from "../../custom-rjsf-templates/CtimsErrorListTemplate";
import CtimsInput from "../../custom-rjsf-templates/CtimsInput";
import CtimsDropdown from "../../custom-rjsf-templates/CtimsDropdown";

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

export const GenomicForm = (props: IFormProps) => {
  const {node} = props
  console.log('GenomicForm node: ', node)

  const genomicFormRef = useRef<any>(null);

  useEffect(() => {
    if (genomicFormRef) {
      const form: Form = genomicFormRef.current;
      const errorDetails: ValidationData<any> = form?.validate({});
      if (errorDetails?.errors.length > 0) {
        node.data.formValid = false;
      }
      console.log('genomicFormRef.current: ', errorDetails);
    }
  }, [genomicFormRef]);

  const dispatch = useDispatch()

  const genomicFormSchema = {
    'definitions': {
      "variant_category": {
        "enumNames": [
          "Mutation",
          "CNV",
          "SV",
          "WT",
          "Signature"
        ],
        "enum": [
          "Mutation",
          "CNV",
          "SV",
          "WT",
          "Signature"
        ]
      },
      'variant_classification': {
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
      },
      "ms_status": {
        "enumNames": [
          "MSI-H",
          "MSI-L",
          "MSS"
        ],
        "enum": [
          "msi_h",
          "msi_l",
          "mss",
        ]
      }
    },
    'type': 'object',
    'required': ['hugo_symbol', "variant_category"],
    'properties': {
      'hugo_symbol': {
        'type': 'string',
        'title': 'Hugo Symbol',
        "description": "Gene symbol as determined by https://www.genenames.org/",
      },
      "variant_category": {
        "$ref": "#/definitions/variant_category",
        'title': 'Variant Category',
        "description": "Type of alteration",
      },
      'protein_change': {
        'type': 'string',
        'title': 'Protein Change',
        "description": "Curate a specific protein change (must be in the correct format ex. p.T70M)",
      },
      'variant_classification': {
        "$ref": "#/definitions/variant_classification",
        'title': 'Variant Classification',
        "description": "Curate a particular type of mutation",
      },
      'cnv_call': {
        'title': 'CNV Call',
        '$ref': '#/definitions/cnv_call',
        "description": "Specify the type of copy number variation",
      },
      'fusion_partner_hugo_symbol': {
        'type': 'string',
        'title': 'Fusion Partner Hugo Symbol',
        "description": "Curate the partner gene in a fusion",
      },
      'true_transcript_exon': {
        'type': 'string',
        'title': 'True Transcript Exon',
        "description": "Curate mutations in a specific exon",
      },
      'wildtype': {
        'title': 'Wildtype',
        '$ref': '#/definitions/wildtype',
        "description": "An indication of whether an eligibility criteria requires a gene to be wildtype.",
      },
      'pole_status': {
        'title': 'POLE Status',
        '$ref': '#/definitions/pole_status',
        "description": "Curate for trials requiring a specific POLE signature status",
      },
      'uva_status': {
        'title': 'UVA Status',
        '$ref': '#/definitions/uva_status',
        "description": "Curate for trials requiring a specific UVA signature status",
      },
      'tobacco_status': {
        'title': 'Tobacco Status',
        '$ref': '#/definitions/tobacco_status',
        "description": "Curate for trials requiring a specific tobacco signature status",
      },
      'apobec_status': {
        'title': 'APOBEC Status',
        '$ref': '#/definitions/apobec_status',
        "description": "Curate for trials requiring a specific APOBEC signature status",
      },
      'temozolomide_status': {
        'title': 'Temozolomide Status',
        '$ref': '#/definitions/temozolomide_status',
        "description": "Curate for trials requiring a specific temozolomide signature status",
      },
      'mmr_status': {
        'title': 'MMR Status',
        '$ref': '#/definitions/mmr_status',
        "description": "Curate a specific mismatch repair status",
      },
      'ms_status': {
        'title': 'MS Status',
        '$ref': '#/definitions/ms_status',
        "description": "Curate a specific microsatellite stability status",
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
    const form: Form = genomicFormRef.current;
    form?.validateForm();
    const errorDetails: ValidationData<any> = form?.validate(data.formData);
    console.log('onFormChange errorDetails: ', errorDetails);
    if (errorDetails?.errors.length > 0) {
      node.data.formValid = false;
    }
    if (errorDetails?.errors.length === 0) {
      node.data.formValid = true;
    }
    node.data.formData = data.formData;
    dispatch(formChange());
    console.log('onFormChange node: ', node)
  }

  const onOperatorChange = (code: string) => {
    const codeLowerCase = code.toLowerCase();
    dispatch(operatorChange({operator: codeLowerCase, nodeKey: node.key as string, location: 'form'}));
  }

  return (
    <div style={formContainerStyle}>
      <OperatorDropdown onOperatorChange={onOperatorChange} />
      <div>
        <TitleContainer title="Genomic" node={node} />
      </div>
      <div>
        <RjsfForm ref={genomicFormRef}
                  schema={genomicFormSchema as JSONSchema7}
                  templates={formTemplates}
                  formData={node.data.formData}
                  uiSchema={genomicUiSchema}
                  widgets={widgets}
                  onChange={onFormChange}
                  onError={() => {console.log('onError')}}
                  validator={localValidator}/>
      </div>
    </div>
  )
}
