export interface Ctml3 {
  age:                          string;
  drug_list:                    DrugList;
  last_updated:                 string;
  long_title:                   string;
  management_group_list:        ManagementGroupList;
  match:                        Ctml3Match[];
  nct_id:                       string;
  nct_purpose:                  string;
  phase:                        string;
  prior_treatment_requirements: string[];
  protocol_no:                  string;
  short_title:                  string;
  site_list:                    SiteList;
  sponsor_list:                 SponsorList;
  staff_list:                   StaffList;
  status:                       string;
  treatment_list:               TreatmentList;
}

export interface DrugList {
  drug: Drug[];
}

export interface Drug {
  drug_name: string;
}

export interface ManagementGroupList {
  management_group: ManagementGroup[];
}

export interface ManagementGroup {
  is_primary:            string;
  management_group_name: string;
}

export interface Ctml3Match {
  clinical: MatchClinical;
}

export interface MatchClinical {
  disease_status: string[];
}

export interface SiteList {
  site: Site[];
}

export interface Site {
  coordinating_center:    string;
  site_name:              string;
  site_status:            string;
  uses_cancer_center_irb: string;
}

export interface SponsorList {
  sponsor: Sponsor[];
}

export interface Sponsor {
  is_principal_sponsor: string;
  sponsor_name:         string;
}

export interface StaffList {
  protocol_staff: ProtocolStaff[];
}

export interface ProtocolStaff {
  email_address:    string;
  first_name:       string;
  institution_name: string;
  last_name:        string;
  staff_role:       string;
}

export interface TreatmentList {
  step: Step[];
}

export interface Step {
  arm: Arm[];
}

export interface Arm {
  arm_code:        string;
  arm_description: string;
  arm_internal_id: number;
  arm_suspended:   string;
  dose_level:      DoseLevel[];
  match:           ArmMatch[];
}

export enum Suspended {
  N = "N",
}

export interface DoseLevel {
  level_code:        string;
  level_description: string;
  level_internal_id: number;
  level_suspended:   string;
}

export interface ArmMatch {
  and: MatchAnd[];
}

export interface MatchAnd {
  or?:       Or[];
  clinical?: FluffyClinical;
  and?:      AndAnd[];
  genomic?:  AndGenomic;
}

export interface AndAnd {
  clinical: PurpleClinical;
}

export interface PurpleClinical {
  age_numerical:               string;
  oncotree_primary_diagnosis?: string;
  ms_status?:                  string;
  tmb?:                        any;
}

export enum AgeNumerical {
  The18 = ">=18",
}

export interface FluffyClinical {
  age_numerical:              string;
  oncotree_primary_diagnosis: string;
  er_status?:                 string;
}

export interface AndGenomic {
  hugo_symbol:        string;
  molecular_function: string;
  variant_category:   string;
 // cnv_call: string
}

export enum MolecularFunction {
  Activating = "Activating",
  Inactivating = "Inactivating",
}

export enum VariantCategory {
  CopyNumberVariation = "Copy Number Variation",
  Mutation = "Mutation",
  StructuralVariation = "Structural Variation",
}

export interface Or {
  genomic: OrGenomic;
}
export interface And {
  genomic: AndGenomic;
  clinical: PurpleClinical
}

export interface OrGenomic {
  cnv_call?:                   string;
  hugo_symbol:                 string;
  variant_category:            string;
  display_name?:               string;
  fusion_partner_hugo_symbol?: string;
  molecular_function?:         string;
  protein_change?:             string;
  variant_classification?:     string;
  wildcard_protein_change?:    string;
}
/*export interface AndGenomic {
  //cnv_call?:                   string;
  hugo_symbol:                 string;
  variant_category:            string;
 // display_name?:               string;
  //fusion_partner_hugo_symbol?: string;
  //molecular_function?:         string;
 // protein_change?:             string;
  //variant_classification?:     string;
  //wildcard_protein_change?:    string;
  molecular_function:            string;
  age_numerical:                 string;
}*/


export enum CnvCall {
  HeterozygousDeletion = "Heterozygous Deletion",
  HighAmplication = "High Amplication",
  HighLevelAmplification = "High level amplification",
}

export enum VariantClassification {
  DelIns = "Del_Ins",
  InFrameDel = "In_Frame_Del",
  MissenseMutation = "Missense_Mutation",
}
