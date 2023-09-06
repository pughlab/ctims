export interface Amg650 {
  age: string
  drug_list: DrugList
  last_updated: string
  long_title: string
  management_group_list: ManagementGroupList
  match: Match[]
  nct_id: string
  nct_purpose: string
  phase: string
  prior_treatment_requirements: string[]
  protocol_no: number
  short_title: string
  site_list: SiteList
  sponsor_list: SponsorList
  staff_list: StaffList
  status: string
  treatment_list: TreatmentList
}

export interface DrugList {
  drug: Drug[]
}

export interface Drug {
  drug_name: string
}

export interface ManagementGroupList {
  management_group: ManagementGroup[]
}

export interface ManagementGroup {
  is_primary: string
  management_group_name: string
}

export interface Match {
  clinical: Clinical
}

export interface Clinical {
  disease_status: string[]
}

export interface SiteList {
  site: Site[]
}

export interface Site {
  coordinating_center: string
  site_name: string
  site_status: string
  uses_cancer_center_irb: string
}

export interface SponsorList {
  sponsor: Sponsor[]
}

export interface Sponsor {
  is_principal_sponsor: string
  sponsor_name: string
}

export interface StaffList {
  protocol_staff: ProtocolStaff[]
}

export interface ProtocolStaff {
  email_address: string
  first_name: string
  institution_name: string
  last_name: string
  staff_role: string
}

export interface TreatmentList {
  step: Step[]
}

export interface Step {
  arm: Arm[]
}

export interface Arm {
  arm_code: string
  arm_description: string
  arm_internal_id: number
  arm_suspended: string
  dose_level: DoseLevel[]
  match: Match2[]
}

export interface DoseLevel {
  level_code: string
  level_description: string
  level_internal_id: number
  level_suspended: string
}

export interface Match2 {
  or?: Or[]
  and?: And2[]
}

export interface Or {
  and: And[]
}

export interface And {
  genomic?: Genomic
  or?: Or2[]
  clinical?: Clinical3
}

export interface Genomic {
  match_all?: boolean
  hugo_symbol?: string
  variant_category?: string
}

export interface Or2 {
  clinical: Clinical2
}

export interface Clinical2 {
  age_numerical: string
  oncotree_primary_diagnosis: string
  her2_status?: string
  er_status?: string
  pr_status?: string
}

export interface Clinical3 {
  age_numerical: string
  oncotree_primary_diagnosis: string
}

export interface And2 {
  clinical?: Clinical4
  genomic?: Genomic2
}

export interface Clinical4 {
  age_numerical: string
  oncotree_primary_diagnosis: string
  her2_status?: string
  er_status?: string
  pr_status?: string
}

export interface Genomic2 {
  match_all: boolean
}
