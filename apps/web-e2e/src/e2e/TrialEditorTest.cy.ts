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
  getCheckBoxIcon, getCheckBoxLevelIsSuspended,
  getCheckBoxPrimaryManagementGroup,
  getCheckBoxPrincipalSponsor,
  getClickPhase,
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
  getMenuItemClinicalGenomic,
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
    trialEditorLeftPanelList().eq(0).should('contain','Trial Information').click()
    getTrialId().clear().type(NCT04293094_testData.nct_id);
    getTrialNickname().clear().type('My Trial');
    getPrincipalInvestigator().clear().type('Dr. John Doe');
    //ctml status
    getCtmlStatusDropdown().click()
    cy.wait(1000)
    getPhaseDropdownList().contains('Draft').click()
    getLongTitle().clear().type(NCT04293094_testData.long_title)
    getShortTitle().clear().type(NCT04293094_testData.short_title)
    //Phase
    getClickPhase().click()
    getPhaseDropdownList().contains(NCT04293094_testData.phase).click()
    getProtocolNumber().clear().type(String(NCT04293094_testData.protocol_no))
    getNCTPurpose().clear().type(NCT04293094_testData.nct_purpose)
    //getPlusIcon().eq(0).click() //at index 0 "Add drug" plus icon is present
    //Age
    trialEditorLeftPanelList().eq(1).should('contain','Age').click()
    getAgeGroup().type(NCT04293094_testData.age)

    //Drug List
    trialEditorLeftPanelList().eq(2).should('contain','Drug List').click()
    getDrugName().type(NCT04293094_testData.drug_list.drug[0].drug_name)

    //Management Group List
    trialEditorLeftPanelList().eq(3).should('contain','Management Group List').click()
    getManagementGroupName().type(NCT04293094_testData.management_group_list.management_group[0].management_group_name)
    if(NCT04293094_testData.management_group_list.management_group[0].is_primary === 'Y') {
      getCheckBoxPrimaryManagementGroup().click().should('have.class','p-checkbox-checked') //This is a primary
      // management group
    } else {
      getCheckBoxPrimaryManagementGroup().should('have.class','p-checkbox') //This is a primary management group
    }
      //Site List
    trialEditorLeftPanelList().eq(4).should('contain','Site List').click()
    getSiteName().type(NCT04293094_testData.site_list.site[0].site_name)
    getSiteStatus().type(NCT04293094_testData.site_list.site[0].site_status)
    if(NCT04293094_testData.site_list.site[0].coordinating_center === 'Y') {
      getCheckBoxCoordinateCenter().click().should('have.class','p-checkbox-checked') //This site is a coordinating center.
    } else {
      getCheckBoxCoordinateCenter().eq(1).should('have.class','p-checkbox')
    }
    if(NCT04293094_testData.site_list.site[0].uses_cancer_center_irb === 'Y') {
      getCheckBoxCancerCenterIRB().click().should('have.class','p-checkbox-checked') //This site uses cancer center IRB.
    } else{
      getCheckBoxCancerCenterIRB().should('have.class','p-checkbox')
    }
    //Sponsor List
    trialEditorLeftPanelList().eq(5).should('contain','Sponsor List').click()
    getSponsorName().type(NCT04293094_testData.sponsor_list.sponsor[0].sponsor_name)
    if(NCT04293094_testData.sponsor_list.sponsor[0].is_principal_sponsor === 'Y') {
      getCheckBoxPrincipalSponsor().click().should('have.class','p-checkbox-checked') //This sponsor is a principal sponsor.
    } else {
      getCheckBoxPrincipalSponsor().should('have.class','p-checkbox')
    }
    //Staff List
    trialEditorLeftPanelList().eq(6).should('contain','Staff List').click()
    getProtocolStaffFirstName().type(NCT04293094_testData.staff_list.protocol_staff[0].first_name)
    getProtocolStaffLastName().type(NCT04293094_testData.staff_list.protocol_staff[0].last_name)
    getProtocolStaffEmail().type(NCT04293094_testData.staff_list.protocol_staff[0].email_address)
    getProtocolStaffInstitutionalName().type(NCT04293094_testData.staff_list.protocol_staff[0].institution_name)
    getProtocolStaffRole().type(NCT04293094_testData.staff_list.protocol_staff[0].staff_role)
    //status not given in json data
    //getProtocolStaffStatus().type(NCT04293094_testData.staff_list.protocol_staff[0].status)

    //Arm code
    getArmCode().type(String(NCT04293094_testData.treatment_list.step[0].arm[0].arm_code))
    getArmDescription().type(NCT04293094_testData.treatment_list.step[0].arm[0].arm_description)
    getArmInternalId().type(String(NCT04293094_testData.treatment_list.step[0].arm[0].arm_internal_id))
    const arm_suspended = NCT04293094_testData.treatment_list.step[0].arm[0].arm_suspended
    if(arm_suspended === 'Y') {
      getCheckBoxArmIsSuspended().click().should('have.class','p-checkbox-checked')
    } else if (arm_suspended === 'N'){
      getCheckBoxArmIsSuspended().should('have.class','p-checkbox')
    }
    //Level code
    getLevelCode().type(NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_code)
    const levelCode = NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_code;
    cy.log(levelCode);
    getLevelDescription().type(NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_description)
    getLevelInternalId().type(String(NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_internal_id))
    const level_suspended = NCT04293094_testData.treatment_list.step[0].arm[0].dose_level[0].level_code
    if( level_suspended === 'Y') {
      getCheckBoxLevelIsSuspended().click().should('have.class','p-checkbox-checked')
    }
    else if(level_suspended === 'N') {
      getCheckBoxLevelIsSuspended().should('have.class','p-checkbox')
    }
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
    // @ts-ignore
    getHugoSymbol().type(NCT04293094_testData.treatment_list.step[0].arm[0].match[0].or[0].genomic.hugo_symbol)
    getVariantCategory().click() //has dropdown
    // @ts-ignore //included this sine "or" is not recognized
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
    //click oon index 0 at first child to add a sub group
    getLeftMenuComponent().eq(0).trigger('mouseover').click()
    cy.wait(1000)
    getTruncateButton().should('be.visible').click()
    getAddCriteriaToSubGroup().should('contain','Add criteria subgroup').trigger('mouseover').then(() => {
      cy.wait(1000)
      //.next().trigger('mouseover').click()
      //cy.get('.p-menuitem-active > .p-submenu-list > :nth-child(1) > .p-menuitem-link').click()
      //cy.wait(1000)
      // getMenuItemAnd().trigger('mouseover').click({force: true})
      getMenuItemAnd().invoke('addClass', 'p-menuitem-active').click({force: true})
    })
    //cy.get('.p-submenu-list>li>a>.p-menuitem-text').contains('And (if all criteria are met)').click()
   // cy.wait(1000)
    //getMenuItemAnd().click()
    //.should('be.visible')
   // cy.wait(1000)

    //.click()


  });
});
