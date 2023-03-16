import {
  getAddCriteriaGroup,
  getAddCriteriaList,
  getAddCriteriaToSameGroup,
  getAddCriteriaToSubGroup,
  getAgeGroup,
  getArmCode,
  getArmDescription,
  getArmInternalId,
  getCheckBoxArmIsSuspended,
  getCheckBoxCancerCenterIRB,
  getCheckBoxCoordinateCenter,
  getCheckBoxIcon,
  getCheckBoxLevelIsSuspended,
  getCheckBoxPrimaryManagementGroup,
  getCheckBoxPrincipalSponsor,
  getClickPhase,
  getClinicalAge, getClinicalDropdown,
  getClinicalERStatus,
  getClinicalHER2Status,
  getClinicalOncotreePrimaryDiagnosis,
  getClinicalPRStatus,
  getCtmlStatusDropdown,
  getDefaultTextMatchingCriteria,
  getDrugName,
  getEditMatchingCriteria,
  getGenomicDropDown,
  getHugoSymbol,
  getLeftMenuComponent,
  getLevelCode,
  getLevelDescription,
  getLevelInternalId,
  getLongTitle,
  getManagementGroupName,
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon,
  getPrincipalInvestigator,
  getProtocolNumber,
  getProtocolStaffEmail,
  getProtocolStaffFirstName,
  getProtocolStaffInstitutionalName,
  getProtocolStaffLastName,
  getProtocolStaffRole,
  getProtocolStaffStatus,
  getShortTitle,
  getSiteName,
  getSiteStatus,
  getSponsorName,
  getSwitchGroupOperator,
  getTrialId,
  getTrialNickname,
  getTruncateButton,
  getVariantCategory,
  selectDraftCtmlStatus,
  trialEditorLeftPanelList
} from '../support/app.po';
import {NCT04293094_testData} from "../fixtures/NCT04293094_testData";
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";

describe('CTIMS Trial Editor', () => {
  beforeEach(() => cy.visit('/'));

  it('should Validate the Trial Editor Page', () => {
   /* cy.title().should('contain','CTIMS')
    trialEditorLeftPanelList().should('have.length','8')
    // @ts-ignore
    cy.trialInformation(NCT02503722_Osimertinib.nct_id,
      "My Trial",
      "John Doe",
      "Draft",
      NCT02503722_Osimertinib.long_title,
      NCT02503722_Osimertinib.short_title,
      NCT02503722_Osimertinib.phase,
      NCT02503722_Osimertinib.protocol_no,
      NCT02503722_Osimertinib.nct_purpose,
      NCT02503722_Osimertinib.status)

    //Age
    // @ts-ignore
    cy.age(NCT02503722_Osimertinib.age)

    //Drug List
    // @ts-ignore
    cy.drugList(NCT02503722_Osimertinib.drug_list.drug[0].drug_name)

    //Management Group List has 1-text field and 1-Checkbox
    // @ts-ignore
    cy.managementGroupList(NCT02503722_Osimertinib.management_group_list.management_group[0].management_group_name,
      NCT02503722_Osimertinib.management_group_list.management_group[0].is_primary)

    //Site List has 2-Text field and 2-checkbox
    // @ts-ignore
    cy.siteList(NCT02503722_Osimertinib.site_list.site[0].site_name,
      NCT02503722_Osimertinib.site_list.site[0].site_status,
      NCT02503722_Osimertinib.site_list.site[0].coordinating_center,
      NCT02503722_Osimertinib.site_list.site[0].uses_cancer_center_irb)

    //Sponsor List
    // @ts-ignore
    cy.sponsorList(NCT02503722_Osimertinib.sponsor_list.sponsor[0].sponsor_name,
      NCT02503722_Osimertinib.sponsor_list.sponsor[0].is_principal_sponsor)

    //Staff List
    // @ts-ignore
    cy.staffList(NCT02503722_Osimertinib.staff_list.protocol_staff[0].first_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].last_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].email_address,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].institution_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].staff_role)

    //Arm code
    // @ts-ignore
    cy.arm(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_code,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_description,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_internal_id,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_suspended)

    //Level code
    // @ts-ignore
    cy.doseLevel(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_code,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_description,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_internal_id,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_suspended)*/
    //click Match criteria
    getEditMatchingCriteria().click()

    getDefaultTextMatchingCriteria().should('contain','Matching criteria inputs will be shown here.')
    getAddCriteriaGroup().click()
    // @ts-ignore
    cy.clickParentNode(0)
    getTruncateButton().should('be.visible').click()
    getAddCriteriaList().should('contain','Add criteria to same group')
      .and('contain','Switch group operator')
      .and('contain','Delete')
      .and('contain','Add criteria subgroup')
    // @ts-ignore
    cy.clickClinical()
    //click child component Clinical to update the fields
    getLeftMenuComponent().eq(1).click()
    getClinicalAge().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.age_numerical)
    getClinicalOncotreePrimaryDiagnosis().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.oncotree_primary_diagnosis)
    // @ts-ignore
    cy.clickParentNode(0)
    // @ts-ignore
    cy.clickOr()
    // @ts-ignore
    cy.clickParentNode(2)
    // @ts-ignore
    cy.clickGenomic()
    // @ts-ignore
    cy.clickChildToggleArrowButton(2)
    // @ts-ignore
    cy.clickParentNode(3) //

  });
});
