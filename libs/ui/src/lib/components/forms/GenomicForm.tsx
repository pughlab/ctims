import React, {CSSProperties, useContext, useEffect, useRef, useState} from "react";
import Form, {withTheme} from "@rjsf/core";
import {RegistryWidgetsType, ValidationData} from "@rjsf/utils";
import {useDispatch} from "react-redux";
import CtimsMatchDialogObjectFieldTemplate from "../../custom-rjsf-templates/CtimsMatchDialogObjectFieldTemplate";
import {
  deleteMatchDialogError,
  formChange,
  operatorChange,
  setMatchDialogErrors
} from "../../../../../../apps/web/store/slices/modalActionsSlice";
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
import {CtimsDialogContext, CtimsDialogContextType} from "../CtimsMatchDialog";
import { Checkbox } from 'primereact/checkbox';
import {endsWithANumber, getCurrentOperator} from "../helpers";


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

const matchAllContainerStyle: CSSProperties = {
  marginLeft: '20px',
  marginTop: '16px',
  marginBottom: '16px'
}

export const GenomicForm = (props: IFormProps) => {
  const {node, rootNodes} = props
  const nk = node.key as string;
  // console.log('GenomicForm node: ', node)

  const [matchAllChecked, setMatchAllChecked] = useState<boolean>(false);

  const {setSaveBtnState} = useContext(CtimsDialogContext) as CtimsDialogContextType;

  const genomicFormRef = useRef<any>(null);

  useEffect(() => {
    node.data.formValid = false;

    if (node.data.formData.match_all) {
      setMatchAllChecked(true);
    }

    return () => {
      setMatchAllChecked(false);
    }

  }, [node]);

  useEffect(() => {
    if (matchAllChecked) {
      noErrorsInFormDispatch();
      node.data.formData = {
        match_all: true
      }
      dispatch(formChange());
    } else {
      validateFormFromRef();
      dispatch(formChange());
    }
  }, [matchAllChecked]);

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
          "Structural Variation",
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
          "5'UTR Mutation",
          "5 Prime UTR",
          "Splice Region",
          "Splice Site",
          "Nonsense Mutation"
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
          "Splice_Region",
          "Splice_Site",
          "Nonsense_Mutation"
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
          "Heterozygous deletion",
          "Homozygous deletion",
          "Gain",
          "High level amplification",
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
      },
      "molecular_function": {
        "enumNames": [
          "Activating",
          "Inactivating"
          ],
        "enum": [
          "Activating",
          "Inactivating"
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
      'wildcard_protein_change': {
        'type': 'string',
        'title': 'Wildcard Protein Change',
        "description": "Curate variations of a protein change (must be in the correct format ex. p.T70). This allows matching of any mutation at this site. ",
      },
      "molecular_function": {
        "$ref": "#/definitions/molecular_function",
        'title': 'Molecular Function',
        "description": "Refers to tasks or activities characteristic of gene",
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

  const validateFormFromRef = (data?: any) => {
    const form: Form = genomicFormRef.current;
    form?.validateForm();
    let errorDetails: ValidationData<any>;
    if (data) {
      errorDetails = form?.validate(data.formData);
    } else {
      errorDetails = form?.validate(form.state.formData);
    }
    console.log('onFormChange errorDetails: ', errorDetails);
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
    validateFormFromRef(data);

    if (!matchAllChecked) {
      delete data.formData.match_all;
    }
    node.data.formData = data.formData;
    dispatch(formChange());
    console.log('onFormChange node: ', node)
  }

  const onOperatorChange = (code: string) => {
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
    if (!endsWithANumber(formData.wildcard_protein_change)) {
      errors.wildcard_protein_change.addError('Must end with a number');
    }
    return errors;
  }

  return (
    <div style={formContainerStyle}>
      <OperatorDropdown
        onOperatorChange={onOperatorChange}
        getCurrentOperator={useCurrentOperator}
        selectedNode={node} />
      <div>
        <TitleContainer title="Genomic" isAddEnabled={!matchAllChecked} node={node} />
      </div>
      <div>
        <div style={matchAllContainerStyle}>
          <Checkbox inputId="matchAllChkb" onChange={e => setMatchAllChecked(e.checked)} checked={matchAllChecked}></Checkbox>
          <label htmlFor="matchAllChkb" style={{marginLeft: '10px'}}>Match with all available genomic criteria</label>
        </div>
        <RjsfForm ref={genomicFormRef}
                  disabled={matchAllChecked}
                  schema={genomicFormSchema as JSONSchema7}
                  templates={formTemplates}
                  formData={node.data.formData}
                  uiSchema={genomicUiSchema}
                  widgets={widgets}
                  onChange={onFormChange}
                  onError={() => {console.log('onError')}}
                  customValidate={customValidate}
                  validator={localValidator}/>
      </div>
    </div>
  )
}
