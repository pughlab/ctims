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
  getManagementGroupName, getMatchingCriteriaTableHeader, getMatchModalFooterButtons,
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon,
  getPrincipalInvestigator, getProteinChange,
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
  getVariantCategory, getVariantClassification,
  selectDraftCtmlStatus, trialEditorExportCtml, trialEditorHeaderButtons,
  trialEditorLeftPanelList, trialEditorRadioButtons
} from '../support/app.po';
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');

describe('CTIMS Trial Editor', () => {
  beforeEach(() => cy.visit('/'));
  deleteDownloadsFolderBeforeAll()
  it.skip('should Validate the Trial Editor Page', () => {
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '8')
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
    cy.age(NCT02503722_Osimertinib.age)

    //Drug List
    cy.drugList(NCT02503722_Osimertinib.drug_list.drug[0].drug_name)

    //Management Group List has 1-text field and 1-Checkbox
    cy.managementGroupList(NCT02503722_Osimertinib.management_group_list.management_group[0].management_group_name,
      NCT02503722_Osimertinib.management_group_list.management_group[0].is_primary)

    //Site List has 2-Text field and 2-checkbox
    cy.siteList(NCT02503722_Osimertinib.site_list.site[0].site_name,
      NCT02503722_Osimertinib.site_list.site[0].site_status,
      NCT02503722_Osimertinib.site_list.site[0].coordinating_center,
      NCT02503722_Osimertinib.site_list.site[0].uses_cancer_center_irb)

    //Sponsor List
    cy.sponsorList(NCT02503722_Osimertinib.sponsor_list.sponsor[0].sponsor_name,
      NCT02503722_Osimertinib.sponsor_list.sponsor[0].is_principal_sponsor)

    //Staff List
    cy.staffList(NCT02503722_Osimertinib.staff_list.protocol_staff[0].first_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].last_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].email_address,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].institution_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].staff_role)

    //Arm code
    cy.arm(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_code,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_description,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_internal_id,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_suspended)

    //Level code
    cy.doseLevel(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_code,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_description,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_internal_id.toString(),
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_suspended)

    //Click on Plus Icon to add another Dose Level
    //click Match criteria
    getEditMatchingCriteria().click()

    getDefaultTextMatchingCriteria().should('contain', 'Matching criteria inputs will be shown here.')
    getAddCriteriaGroup().click()
    //cy.clickParentAnd()
    cy.clickParentNode(0)
    // cy.wait(1000)
    //getTruncateButton().should('be.visible').click()
    getAddCriteriaList().should('contain', 'Add criteria to same group')
      .and('contain', 'Switch group operator')
      .and('contain', 'Delete')
      .and('contain', 'Add criteria subgroup')
    cy.clickClinical()
    //click child component Clinical to update the fields
    getLeftMenuComponent().eq(1).click()
    getClinicalAge().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.age_numerical)
    getClinicalOncotreePrimaryDiagnosis().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.oncotree_primary_diagnosis)
    cy.clickParentNode(0)
    cy.clickOr()
    cy.clickParentNode(2)//click on Parent "Or" to create 1st genomic child
    cy.clickGenomic()
    cy.clickChildToggleArrowButton(2)
    getLeftMenuComponent().eq(3).click()
    getHugoSymbol().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.hugo_symbol)
    getProteinChange().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.protein_change)
    //Dropdown
    getVariantCategory().click()
    getGenomicDropDown().contains(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.variant_category).click()
    //Dropdown
    getVariantClassification().click()
    getGenomicDropDown().contains(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.variant_classification.replace(/_/g, " ")).click()
    cy.clickParentNode(2) //click on Parent "Or" to create 2nd genomic child
    cy.clickGenomic() //create a Genomic child in "Or"
    //click on the 2nd child Genomic to enter values
    getLeftMenuComponent().eq(4).click()
    getHugoSymbol().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[1].genomic.hugo_symbol)
    getProteinChange().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[1].genomic.protein_change)
    //Dropdown
    getVariantCategory().click()
    getGenomicDropDown().contains(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[1].genomic.variant_category).click()

    getMatchModalFooterButtons().eq(1).should('be.enabled').contains('Save matching criteria').click()
    getMatchingCriteriaTableHeader().contains('JSON').click()
    // let jsonMatchCriteria =
    cy.get('.CtimsMatchingCriteriaWidget_pre-tag__gyYSW').invoke("text").then((text) => {
      const jsonArray = JSON.parse(text);
      const jsonMatchCriteria = JSON.stringify(jsonArray)
      cy.log(jsonMatchCriteria);

      //test data Match criteria Values
      let jsonVal = NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match
      const testDataMatchingCriteria = JSON.stringify(jsonVal)
      cy.log(testDataMatchingCriteria)
      //expect(jsonMatchCriteria).to.deep.equal(testDataMatchingCriteria)
    })
  })

  it('should click on the Export button and then Export as "JSON" file ',  () => {
    trialEditorHeaderButtons().eq(1).should('contain','Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html','json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    trialEditorExportCtml().eq(1).should('contain','Export CTML').and('be.disabled')
  });

});


