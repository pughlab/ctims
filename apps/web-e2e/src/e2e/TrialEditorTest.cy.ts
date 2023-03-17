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

describe('CTIMS Trial Editor', () => {
  beforeEach(() => cy.visit('/'));

  it('should Validate the Trial Editor Page', () => {
    cy.title().should('contain','CTIMS')
    trialEditorLeftPanelList().should('have.length','8')
    // @ts-ignore
   /* cy.trialInformation(NCT04293094_testData.nct_id,
      "My Trial",
      "John Doe",
      "Draft",
      NCT04293094_testData.long_title,
      NCT04293094_testData.short_title,
      NCT04293094_testData.phase,
      NCT04293094_testData.protocol_no,
      NCT04293094_testData.nct_purpose,
      NCT04293094_testData.status)

    //Age
    // @ts-ignore
    cy.age(NCT04293094_testData.age)

    //Drug List
    // @ts-ignore
    cy.drugList(NCT04293094_testData.drug_list.drug[0].drug_name)

    //Management Group List has 1-text field and 1-Checkbox
    // @ts-ignore
    cy.managementGroupList(NCT04293094_testData.management_group_list.management_group[0].management_group_name,
      NCT04293094_testData.management_group_list.management_group[0].is_primary)
*/
    //Site List has 2-Text field and 2-checkbox
    cy.siteList(NCT04293094_testData.site_list.site[0].site_name,
      NCT04293094_testData.site_list.site[0].site_status,
      NCT04293094_testData.site_list.site[0].coordinating_center,
      NCT04293094_testData.site_list.site[0].uses_cancer_center_irb)

    //Sponsor List
    cy.sponsorList(NCT04293094_testData.sponsor_list.sponsor[0].sponsor_name,
      NCT04293094_testData.sponsor_list.sponsor[0].is_principal_sponsor)

    //Staff List
    cy.staffList(NCT04293094_testData.staff_list.protocol_staff[0].first_name,
      NCT04293094_testData.staff_list.protocol_staff[0].last_name,
      NCT04293094_testData.staff_list.protocol_staff[0].email_address,
      NCT04293094_testData.staff_list.protocol_staff[0].institution_name,
      NCT04293094_testData.staff_list.protocol_staff[0].staff_role)

    //Arm code
    cy.arm(NCT04293094_testData.treatment_list.step[0].arm[0].arm_code,
      NCT04293094_testData.treatment_list.step[0].arm[0].arm_description,
      NCT04293094_testData.treatment_list.step[0].arm[0].arm_internal_id,
      NCT04293094_testData.treatment_list.step[0].arm[0].arm_suspended)

    //Level code
    cy.doseLevel(NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_code,
      NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_description,
      NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_internal_id.toString(),
      NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_suspended)
    //click Match criteria
    getEditMatchingCriteria().click()

    getDefaultTextMatchingCriteria().should('contain','Matching criteria inputs will be shown here.')
    getAddCriteriaGroup().click()
    getLeftMenuComponent().find('span').contains('And')
    getLeftMenuComponent().trigger('mouseover')
    getTruncateButton().should('be.visible').click()
    getAddCriteriaList().should('contain','Add criteria to same group')
      .and('contain','Switch group operator')
      .and('contain','Delete')
      .and('contain','Add criteria subgroup')
    //getAddCriteriaToSameGroup().click()
    getSwitchGroupOperator().click()
    getLeftMenuComponent().should('contain','Or')
    getLeftMenuComponent().trigger('mouseover')
    getTruncateButton().should('be.visible').click()
    getAddCriteriaToSameGroup().trigger('mouseover')
    getMenuItemClinicalGenomic().eq(1).should('contain','Genomic').click()
    //Now Genomic subtree is created, click on the sub tree "Genomic" at index 1
    getLeftMenuComponent().eq(1).click()
    getHugoSymbol().type(NCT04293094_testData.treatment_list.step[0].arm[0].match[0].or[0].genomic.hugo_symbol)
    getVariantCategory().click() //has dropdown
    const variant_category = NCT04293094_testData.treatment_list.step[0].arm[0].match[0].or[0].genomic.variant_category
   cy.log(variant_category)
    if(variant_category === 'Mutation') {
      getGenomicDropDown().contains('Mutation').click()
      getVariantCategory().should('contain','Mutation')
    } else if(variant_category === 'CNV') {
      getGenomicDropDown().contains('CNV').click()
      getVariantCategory().should('contain','CNV')
    } else if(variant_category === 'SV') {
      getGenomicDropDown().contains('SV').click()
      getVariantCategory().should('contain','SV')
    }else if(variant_category === 'WT') {
      getGenomicDropDown().contains('WT').click()
      getVariantCategory().should('contain','WT')
    }else if(variant_category === 'Signature') {
      getGenomicDropDown().contains('Signature').click()
      getVariantCategory().should('contain','Signature')
    }
    //click on index 0 at first child to add a sub group
    getLeftMenuComponent().eq(0).trigger('mouseover').click()
    cy.wait(1000)
    getTruncateButton().should('be.visible').click()
    getAddCriteriaToSubGroup().should('contain','Add criteria subgroup').trigger('mouseover')
      cy.wait(1000)
      //.next().trigger('mouseover').click()
      //cy.get('.p-menuitem-active > .p-submenu-list > :nth-child(1) > .p-menuitem-link').click()
      //cy.wait(1000)
      getMenuItemAnd().trigger('mouseover').click({force: true})
      // getMenuItemAnd().trigger('mouseover').click({force: true})
      //getMenuItemAnd().invoke('addClass', 'p-menuitem-active').click({force: true})
    getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
    getMenuItemAnd().click()
    //click on the second child component "And" to add clinical data
    getLeftMenuComponent().eq(2).trigger('mouseover').click() //.invoke('addClass','p-button-icon-only')
    //cy.wait(1000)
    getTruncateButton().should('be.visible').click()
    getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
    getMenuItemClinical().click()
    //expand the tree at index 2
    cy.get(':nth-child(2) > .p-treenode-content > .p-tree-toggler').click()
    //click the 3rd child component Clinical
    getLeftMenuComponent().eq(3).click()
    //Enter Age and OncoTree input value
    getClinicalAge().type(NCT04293094_testData.treatment_list.step[0].arm[0].match[0].or[1].and[0].clinical.age_numerical)
    getClinicalOncotreePrimaryDiagnosis().type(NCT04293094_testData.treatment_list.step[0].arm[0].match[0].or[1].and[0].clinical.oncotree_primary_diagnosis)

    //Second Add
    getLeftMenuComponent().eq(2).trigger('mouseover').click() //.invoke('addClass','p-button-icon-only')
    getTruncateButton().should('be.visible').click()
    getAddCriteriaToSubGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
    getMenuItemAnd().click()

    //Add "or" child of the above "And at index 4"
    getLeftMenuComponent().eq(4).trigger('mouseover').click() //.invoke('addClass','p-button-icon-only')
    getTruncateButton().should('be.visible').click()
    getAddCriteriaToSubGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
    getMenuItemOr().click()

    //click on the "or" toggle arrow button to add three clinical data
    cy.get(':nth-child(2) > .p-treenode-children > :nth-child(2) > .p-treenode-content > .p-tree-toggler > .p-tree-toggler-icon').click()
    getLeftMenuComponent().eq(5).trigger('mouseover').click()
    getTruncateButton().should('be.visible').click()
    getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
    getMenuItemClinical().click()
    //click on toggle arrow button to expand tree
    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(2) > .p-treenode-children > .p-treenode > .p-treenode-content' +
      ' > .p-tree-toggler').click()
    //click clinical item to add data
    getLeftMenuComponent().eq(6).click()
    getClinicalAge().type(NCT04293094_testData.treatment_list.step[0].arm[0].match[1].and[0].or[0].clinical.age_numerical)
    getClinicalOncotreePrimaryDiagnosis().type(NCT04293094_testData.treatment_list.step[0].arm[0].match[1].and[0].or[0].clinical.oncotree_primary_diagnosis)
    // @ts-ignore
   /* let her2_status = NCT04293094_testData.treatment_list.step[0].arm[0].match[1].and[0].or[0].her2_status
    if( her2_status.boolean === true) {
      getClinicalHER2Status().should('not.be.selected')
    } else if(her2_status.boolean === false) {
      getClinicalHER2Status().click()
        //.should('not.be.selected')
      getClinicalDropdown().eq(1).click()
    }*/
    /*getClinicalHER2Status()
    getClinicalERStatus()
    getClinicalPRStatus()
*/
  });
});
