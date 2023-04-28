const getVisitUrl = () => cy.visit(Cypress.env('baseUrl'),{timeout: 10000})
const signInButton = () => cy.get('.p-button')
const createCTMLButton = () => cy.get('.p-button')

//TrialEditor Header
export const trialEditorHeader = () => cy.get('.EditorTopBar_title__kDE8R')

//TrialEditor Buttons (Discard, Export, Save)
export const trialEditorHeaderButtons = () => cy.get('.EditorTopBar_menuBtnGroup__dBNyO>button') //3 elements
export const trialEditorRadioButtons = () => cy.get('.field-radiobutton>.p-radiobutton') //json and yamlradio buttons
export const trialEditorExportCtml = () => cy.get('.p-dialog-footer>div>button') //2 buttons Cancel and Export CTML

//LeftPanel Trial Editor
export const trialEditorLeftPanelList = () => cy.get('.LeftMenuEditorComponent_ctims-nav__sI_UW>ul>li') //8 elements

//Trial Information
export const getTrialId = () => cy.get('#root_trialInformation_trial_id');
export const getTrialNickname = () => cy.get('#root_trialInformation_nickname');
export const getPrincipalInvestigator = () => cy.get('#root_trialInformation_principal_investigator')
export const getLongTitle = () => cy.get('#root_trialInformation_long_title')
export const getShortTitle = () => cy.get('#root_trialInformation_short_title')
export const getProtocolNumber = () => cy.get('#root_trialInformation_protocol_no')
export const getNCTPurpose = () => cy.get('#root_trialInformation_nct_purpose')
export const getTrialInformationStatus = () => cy.get('#root_trialInformation_status')


//Dropdown button for Ctml Status
const clickCtmlStatusDropdown = () => cy.get('#root_trialInformation_ctml_status > .p-dropdown-trigger').click();
export const getCtmlStatusDropdown = () => cy.get('#root_trialInformation_ctml_status > .p-dropdown-trigger');
export const getCtmlStatusDropdownList = () => cy.get('.p-dropdown-items-wrapper>ul>li');
const selectCtmlStatus = () => cy.get('[aria-label="Draft"]').click();

//Dropdown for Phase
export const getClickPhase = () => cy.get('#root_trialInformation_phase')
export const getPhaseDropdownList = () => cy.get('.p-dropdown-items-wrapper>ul>li') //list all the 4 phases
//default drop down for Trial Editor page
export const getDefaultTrialEditorDropDown = () => cy.get('.p-dropdown-item')

export const selectDraftCtmlStatus = () => {
  clickCtmlStatusDropdown();
  selectCtmlStatus();
}

//default icon list
export const getAllPanelHeaderTop = () => cy.get('.ctimsPanelHeaderTop') //contains 6 header starts with "Drug1"
//default plus icon in drug list-1, management group list-1, site list-1, sponsor list-1, staff list-1, treatment list-3
export const getPlusIcon = () => cy.get('.pi.pi-plus-circle') //contains 8 elements
export const getTrashIcon = () => cy.get('.pi.pi-trash') //contains 8 elements
export const getTogglerButton = () => cy.get('.pi.pi-trash') //contains 9 elements(up/down)
//Default checkbox in management group-1, site list--2, sponsor-1,arm-1, dose level -1
export const getCheckBoxIcon = () => cy.get('.p-checkbox') //contains 6 elements as default
export const getCheckBoxPrimaryManagementGroup = () => cy.get('#object-field-template-root_management_group_list_management_group_0>div:nth-child(2)>div>div>.p-checkbox')
export const getCheckBoxCoordinateCenter = () => cy.get('#object-field-template-root_site_list_site_0>div:nth-child(3)>div>div>.p-checkbox')
export const getCheckBoxCancerCenterIRB = () => cy.get('#object-field-template-root_site_list_site_0>div:nth-child(4)>div>div>.p-checkbox')
export const getCheckBoxPrincipalSponsor = () => cy.get('#object-field-template-root_sponsor_list_sponsor_0>div:nth-child(2)>div>div>.p-checkbox')
export const getCheckBoxArmIsSuspended = () => cy.get('#object-field-template-root_treatment_list_step_0_arm_0>div:nth-child(4)>div>div>.p-checkbox')
export const getCheckBoxLevelIsSuspended = () => cy.get('#object-field-template-root_treatment_list_step_0_arm_0_dose_level_0>div:nth-child(4)>div>div>.p-checkbox')

//Prior treatment requirements
export const getPriorTreatmentRequirement = () => cy.get('#root_prior_treatment_requirements_0')
export const getPriorTreatmentRequirementRegularExpression = () => cy.get('[id^="root_prior_treatment_requirements_"]')
export const getPriorTreatmentRequirementPlusIcon = () => cy.get('#array-item-list-root_prior_treatment_requirements>div>i:nth-child(1)')
export const getPriorTreatmentRequirementPlusIconMultiple = () => cy.get('#array-item-list-root_prior_treatment_requirements>div>.pi-plus-circle')
export const getPriorTreatmentRequirementMultiple = () => cy.get('[id^=root_prior_treatment_requirements]')

//Age
export const getAgeGroup = () => cy.get('#root_age_group_age')

//Drug List
export const getDrugName = () => cy.get('#root_drug_list_drug_0_drug_name')
export const getDrugNamePlusIcon = () => cy.get('#array-item-list-root_drug_list_drug>div>.pi-plus-circle')
export const getDrugNameTextBoxMultiple = () => cy.get('[id^=root_drug_list_drug]')

//Management Group List
export const getManagementGroupName = () => cy.get('#root_management_group_list_management_group_0_management_group_name')
export const getPrimaryManagementGroup = () => cy.get('#root_management_group_list_management_group_0_is_primary')
export const getPrimaryManagementGroupPlusIcon = () => cy.get('#array-item-list-root_management_group_list_management_group>div>.pi-plus-circle')
export const getManagementGroupNameTextBoxMultiple = () => cy.get('[id^=object-field-template-root_management_group_list_management_group')
//Site List
export const getSiteName = () => cy.get('#root_site_list_site_0_site_name')
export const getSiteStatus = () => cy.get('#root_site_list_site_0_site_status')
export const getCoordinatingCenter = () => cy.get('#root_site_list_site_0_coordinating_center')
export const getCancerCenterIRB = () => cy.get('#root_site_list_site_0_uses_cancer_center_irb')
export const getSiteNamePlusIcon = () => cy.get('#array-item-list-root_site_list_site>div>.pi-plus-circle')
export const getSiteNameMultiple = () =>  cy.get('[id^=object-field-template-root_site_list_site]')

//Sponsor List
export const getSponsorName = () => cy.get('#root_sponsor_list_sponsor_0_sponsor_name')
export const getPrincipalSponsor = () => cy.get('#root_sponsor_list_sponsor_0_is_principal_sponsor')
export const getSponsorNamePlusIcon = () => cy.get('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle')
export const getSponsorNameMultiple = () => cy.get('[id^=object-field-template-root_sponsor_list_sponsor_]')

//Staff List
export const getProtocolStaffFirstName = () => cy.get('#root_staff_list_protocol_staff_0_first_name')
export const getProtocolStaffLastName = () => cy.get('#root_staff_list_protocol_staff_0_last_name')
export const getProtocolStaffEmail = () => cy.get('#root_staff_list_protocol_staff_0_email_address')
export const getProtocolStaffInstitutionalName = () => cy.get('#root_staff_list_protocol_staff_0_institution_name')
export const getProtocolStaffRole = () => cy.get('#root_staff_list_protocol_staff_0_staff_role')
export const getProtocolStaffStatus = () => cy.get('#root_staff_list_protocol_staff_0_status')
export const getProtocolStaffPlusIcon = () => cy.get('#array-item-list-root_staff_list_protocol_staff>div>.pi-plus-circle')
export const getProtocolStaffMultiple = () => cy.get('[id^=object-field-template-root_staff_list_protocol_staff]')

//Treatment List
//Step1
//Arm1
export const getArmCode = () => cy.get('#root_treatment_list_step_0_arm_0_arm_code')
export const getArmDescription = () => cy.get('#root_treatment_list_step_0_arm_0_arm_description')
export const getArmInternalId = () => cy.get('#root_treatment_list_step_0_arm_0_arm_internal_id')
export const getArmSuspended = () => cy.get('#root_treatment_list_step_0_arm_0_arm_suspended')
export const getMultipleArm =() => cy.get('#array-item-list-root_treatment_list_step_0_arm>div>div>div>div>div')
export const getAddArmPlusIcon =() => cy.get('#array-item-list-root_treatment_list_step_0_arm>div>.pi-plus-circle')
//DOSE_LEVEL 1
export const getLevelCode = () => cy.get('#root_treatment_list_step_0_arm_0_dose_level_0_level_code')
export const getLevelDescription = () => cy.get('#root_treatment_list_step_0_arm_0_dose_level_0_level_description')
export const getLevelInternalId = () => cy.get('#root_treatment_list_step_0_arm_0_dose_level_0_level_internal_id')
export const getLevelSuspended = () => cy.get('#root_treatment_list_step_0_arm_0_dose_level_0_level_suspended')

//preview window
export const getPreviewWindow = () => cy.get('.p-tabview.p-component')

//Matching Criteria Table View Content has"YAML" and "JSON"
export const getMatchingCriteriaTableHeader = () => cy.get('.p-tabview-title')

//Edit Matching Criteria
export const getEditMatchingCriteria = () => cy.get('.CtimsMatchingCriteriaWidget_edit-matching-criteria-title__qEaKg')

//Edit matching criteria multiple
export const getEditMatchingCriteriaMultiple = () => cy.get('.CtimsMatchingCriteriaWidget_edit-matching-criteria-container__MFwrC')

//Save Matching Criteria
export const getSaveMatchingCriteria = () => cy.get('.p-dialog-footer>div>button:nth-child(2)')

//******************* Match Modal Criteria ********************************************************//

//Footer Buttons("Discard", "Save matching criteria")
export const getMatchModalFooterButtons = () => cy.get('.p-dialog-footer>div>button') //2 elements

//Match Criteria Default Text
export const getDefaultTextMatchingCriteria = () => cy.get('.MatchingMenuAndForm_matchingCriteriaFormContainerEmptyText__6I4Dm')

//Match criteria Header
export const getMatchCriteriaHeader = () => cy.get('.p-dialog-header>div')

//Add criteria group component
export const getAddCriteriaGroup = () => cy.get('.MatchingMenuAndForm_addCriteriaBtn___mgY1')

//LeftMenuComponent(span-->.p-treenode-label and button--> p-button(click on button to add criteria)
export const getLeftMenuComponent = () => cy.get('.LeftMenuComponent_treeNodeContainer__K7jg6')

//Truncate button
export const getTruncateButton = () => cy.get('.p-button.p-component.LeftMenuComponent_treeMenuBtn__zRCgR.p-button-icon-only')

//Add criteria list of options
export const getAddCriteriaList = () => cy.get('.p-tieredmenu>ul>li')

//Add criteria to same group
export const getAddCriteriaToSameGroup = () => cy.get('.p-tieredmenu>ul>li:nth-child(1)')

//Switch group operator
export const getSwitchGroupOperator = () => cy.get('.p-tieredmenu>ul>li:nth-child(2)')

//Match criteria sub children
export const getSubGroup = () => cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li')

//Delete
export const getDelete = () => cy.get('.p-tieredmenu>ul>li:nth-child(3)')

//Add criteria to Subgroup
export const getAddCriteriaToSubGroup = () => cy.get('.p-tieredmenu>ul>li:nth-child(5)')

//Add criteria to same list
export const getAddCriteriaToSameList = () => cy.get('.MatchingMenuAndForm_addCriteriaToSameListButton__jdH_U')

//Clinical at child(1) and genomic at child(2)
export const getMenuItemClinicalGenomic = () => cy.get('.p-tieredmenu>ul>li:nth-child(1)>ul>li') //2 elements
export const getMenuItemClinical = () => cy.get('.p-menuitem-link>.clinical-icon') //2 elements
export const getMenuItemGenomic = () => cy.get('.p-menuitem-link>.genomic-icon') //2 elements

//Clinical at child(3) and genomic at child(4)
export const getMenuItemAnd = () => cy.get('.p-menuitem-active > .p-submenu-list > :nth-child(1) > .p-menuitem-link')
export const getMenuItemOr = () => cy.get('.p-menuitem-active > .p-submenu-list > :nth-child(2) > .p-menuitem-link')

//Left Menu Tree Node Children, has index always
export const getTreeNodeChildren = () => cy.get('.p-treenode-children')

//Operator
export const getOperator = () => cy.get('.p-inputwrapper-filled') //do a click action

//Operator dropdown
export const getOperatorDropDown = () => cy.get('.p-dropdown-panel>div>ul>li') //2 elements

//Clinical dropdown
export const getClinicalDropdown = () => cy.get('.p-dropdown-panel>div>ul>li') //all have 2 drop downs

//******************* Genomic ********************************************************//

//Hugo Symbol
export const getHugoSymbol = () => cy.get('#root_hugo_symbol')

//Variant Category
export const getVariantCategory = () => cy.get('#root_variant_category')

//Protein Change
export const getProteinChange = () => cy.get('#root_protein_change')

//Variant Classification
export const getVariantClassification = () => cy.get('#root_variant_classification')

//CNV Call
export const getCNVCall = () => cy.get('#root_cnv_call')

//Fusion Partner Hugo Symbol
export const getFusionPartnerHugoSymbol = () => cy.get('#root_fusion_partner_hugo_symbol')

//True Transcript Exon
export const getTrueTranscriptExon = () => cy.get('#root_true_transcript_exon')

//Wildtype
export const getWildType = () => cy.get('#root_wildtype')

//POLE Status
export const getPoleStatus = () => cy.get('#root_pole_status')

//UVA Status
export const getUVAStatus = () => cy.get('#root_uva_status')

//Tobacco Status
export const getTobaccoStatus = () => cy.get('#root_tobacco_status')

//APOBEC Status
export const getApobecStatus = () => cy.get('#root_apobec_status')

//Temozolomide Status
export const getTemozolomideStatus = () => cy.get('#root_temozolomide_status')

//MMR Status
export const getMMRStatus = () => cy.get('#root_mmr_status')

//MS Status
export const getMSStatus = () => cy.get('#root_ms_status')

//genericDropdownList
export const getGenomicDropDown = () => cy.get('.p-dropdown-panel>div>ul>li')


//******************* Clinical ********************************************************//

//Age
export const getClinicalAge = () => cy.get('#root_age_numerical')

//Oncotree Primary Diagnosis
export const getClinicalOncotreePrimaryDiagnosis = () => cy.get('#root_oncotree_primary_diagnosis')

//TMB
export const getClinicalTMB = () => cy.get('#root_tmb')

//HER2 Status
export const getClinicalHER2Status = () => cy.get('#root_her2_status')

//ER Status
export const getClinicalERStatus = () => cy.get('#root_er_status')

//PR Status
export const getClinicalPRStatus = () => cy.get('#root_pr_status')










