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
//import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT03297606_CAPTUR} from "../fixtures/NCT03297606_CAPTUR"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import {doc} from "prettier";
import breakParent = doc.builders.breakParent;

describe('CTIMS Trial Editor', () => {
  before(() => cy.visit('/'));
  //deleteDownloadsFolderBeforeAll()
  it('should Validate the Trial Editor Page with valid test data', () => {
    /*cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
    cy.trialInformation(NCT03297606_CAPTUR.nct_id,
      "My Trial",
      "John Doe",
      "Draft",
      NCT03297606_CAPTUR.long_title,
      NCT03297606_CAPTUR.short_title,
      NCT03297606_CAPTUR.phase,
      NCT03297606_CAPTUR.protocol_no,
      NCT03297606_CAPTUR.nct_purpose,
      NCT03297606_CAPTUR.status)

    // Prior treatment requirements
    cy.priorTreatmentRequirement(NCT03297606_CAPTUR.prior_treatment_requirements[0])
*/
    //Age
    //cy.age(NCT03297606_CAPTUR.age)
    /*NCT03297606_CAPTUR.drug_list.drug.forEach((el)=> {
      if(el.drug_name.length !== null) {
        cy.get('#array-item-list-root_drug_list_drug>div>.pi-plus-circle').click()
        return false
}*/
    function clickMultiple(selector, times) {
      for (let i = 0; i < times; i++) {
        cy.get(selector).click();
      }
    }
    clickMultiple('#array-item-list-root_drug_list_drug>div>.pi-plus-circle', NCT03297606_CAPTUR.drug_list.drug.length-1);

      cy.get('[id^=root_drug_list_drug]').each((input, index) => {

        // check if there is a corresponding value in the array
        if (NCT03297606_CAPTUR.drug_list.drug[index]) {
          // enter the value into the text box
          cy.wrap(input).type(NCT03297606_CAPTUR.drug_list.drug[index].drug_name);
          cy.wait(1000)
          // cy.get('#array-item-list-root_drug_list_drug>div>.pi-plus-circle').click()

        }

     // })
    })

    //cy.drugList(NCT03297606_CAPTUR.drug_list.drug[0].drug_name)

    //Management Group List has 1-text field and 1-Checkbox
    /* cy.managementGroupList(NCT03297606_CAPTUR.management_group_list.management_group[0].management_group_name,
       NCT03297606_CAPTUR.management_group_list.management_group[0].is_primary)

     //Site List has 2-Text field and 2-checkbox
     cy.siteList(NCT03297606_CAPTUR.site_list.site[0].site_name,
       NCT03297606_CAPTUR.site_list.site[0].site_status,
       NCT03297606_CAPTUR.site_list.site[0].coordinating_center,
       NCT03297606_CAPTUR.site_list.site[0].uses_cancer_center_irb)

     //Sponsor List
     cy.sponsorList(NCT03297606_CAPTUR.sponsor_list.sponsor[0].sponsor_name,
       NCT03297606_CAPTUR.sponsor_list.sponsor[0].is_principal_sponsor)
     //Staff List
     cy.staffList(NCT03297606_CAPTUR.staff_list.protocol_staff[0].first_name,
       NCT03297606_CAPTUR.staff_list.protocol_staff[0].last_name,
       NCT03297606_CAPTUR.staff_list.protocol_staff[0].email_address,
       NCT03297606_CAPTUR.staff_list.protocol_staff[0].institution_name,
       NCT03297606_CAPTUR.staff_list.protocol_staff[0].staff_role)

     //Arm code
     cy.arm(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_code,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_description,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_internal_id,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_suspended)

     //Level code
     cy.doseLevel(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_code,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_description,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_internal_id.toString(),
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_suspended)
     //Click on Plus Icon to add another Dose Level
   })*/

  })

})
