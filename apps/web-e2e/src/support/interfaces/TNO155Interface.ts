export interface TNO155Interface {
  age:                          string;
  drug_list:                    DrugList;
  last_updated:                 string;
  long_title:                   string;
  management_group_list:        ManagementGroupList;
  match:                        TNO155InterfaceMatch[];
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

export interface TNO155InterfaceMatch {
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

export interface DoseLevel {
  level_code:        string;
  level_description: string;
  level_internal_id: number;
  level_suspended:   string;
}

export interface ArmMatch {
  or?:  MatchOr[];
  and?: MatchAnd[];
}

export interface MatchAnd {
  clinical?: AndClinical;
  or?:       AndOr[];
}

export interface AndClinical {
  age_numerical:              string;
  oncotree_primary_diagnosis: string;
}

export interface AndOr {
  genomic: OrGenomic;
}

export interface OrGenomic {
  hugo_symbol:             string;
  protein_change?:         string;
  variant_category:        string;
  variant_classification?: string;
  wildtype?:               string;
}

export enum HugoSymbol {
  Braf = "BRAF",
  Egfr = "EGFR",
  Kras = "KRAS",
  Nras = "NRAS",
}

export enum VariantCategory {
  Mutation = "Mutation",
  Wt = "WT",
}

export enum VariantClassification {
  InFrameDel = "In_Frame_Del",
  InFrameIns = "In_Frame_Ins",
  MissenseMutation = "Missense_Mutation",
}

export interface MatchOr {
  and: OrAnd[];
}

export interface OrAnd {
  clinical?: AndClinical;
  or?:       AndOr[];
  genomic?:  AndGenomic;
}

export interface AndGenomic {
  hugo_symbol:      string;
  variant_category: string;
  wildtype:         string;
}
