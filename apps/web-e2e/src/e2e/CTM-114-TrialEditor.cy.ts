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
  getDefaultTextMatchingCriteria, getDefaultTrialEditorDropDown,
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
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

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

    // Prior treatment requirements - Done
    cy.clickMultiple('#array-item-list-root_prior_treatment_requirements>div>.pi-plus-circle',
    NCT03297606_CAPTUR.prior_treatment_requirements.length);
    cy.get('[id^=root_prior_treatment_requirements]').each((input, index) => {
      // check if there is a corresponding value in the array
      if (NCT03297606_CAPTUR.prior_treatment_requirements[index]) {
        // enter the value into the text box
        cy.wrap(input).type(NCT03297606_CAPTUR.prior_treatment_requirements[index]);
      }
    })
    */
    //Age - Done
    //cy.age(NCT03297606_CAPTUR.age)

    //Drug List - Done
    /* cy.clickMultiple('#array-item-list-root_drug_list_drug>div>.pi-plus-circle',
      NCT03297606_CAPTUR.drug_list.drug.length-1);

       cy.get('[id^=root_drug_list_drug]').each((input, index) => {
         // check if there is a corresponding value in the array
         if (NCT03297606_CAPTUR.drug_list.drug[index]) {
           // enter the value into the text box
           cy.wrap(input).type(NCT03297606_CAPTUR.drug_list.drug[index].drug_name);
         }
     })*/

    //Management Group List - Done
    /*cy.clickMultiple('#array-item-list-root_management_group_list_management_group>div>.pi-plus-circle',
      NCT03297606_CAPTUR.management_group_list.management_group.length-1);
    cy.get('[id^=object-field-template-root_management_group_list_management_group').each(($input, index) => {
      cy.get('#root_management_group_list_management_group_'+index+'_management_group_name').click().contains(NCT03297606_CAPTUR.management_group_list.management_group[index].management_group_name).click();
      cy.get('#root_management_group_list_management_group_'+index+'_is_primary').contains(NCT03297606_CAPTUR.management_group_list.management_group[index].is_primary).click();
     });*/

     //Site List - done
     /* cy.clickMultiple('#array-item-list-root_site_list_site>div>.pi-plus-circle',
      NCT03297606_CAPTUR.site_list.site.length-1);
    cy.get('[id^=object-field-template-root_site_list_site]').each(($input, index) => {
      cy.get('#root_site_list_site_'+index+'_site_name').click().contains(NCT03297606_CAPTUR.site_list.site[index].site_name).click();
      cy.get('#root_site_list_site_'+index+'_site_status').click().contains(NCT03297606_CAPTUR.site_list.site[index].site_status).click();
      cy.get('#root_site_list_site_'+index+'_coordinating_center').contains(NCT03297606_CAPTUR.site_list.site[index].coordinating_center).click();
      cy.get('#root_site_list_site_'+index+'_uses_cancer_center_irb').contains(NCT03297606_CAPTUR.site_list.site[index].uses_cancer_center_irb).click();
    });*/

     //Sponsor List array of 5 values - done
   /*cy.clickMultiple('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle',NCT03297606_CAPTUR.sponsor_list.sponsor.length-1)
    cy.get('[id^=object-field-template-root_sponsor_list_sponsor]').each(($input, index) => {
      cy.get('#root_sponsor_list_sponsor_'+index+'_sponsor_name').type(NCT03297606_CAPTUR.sponsor_list.sponsor[index].sponsor_name);
      cy.get('#root_sponsor_list_sponsor_'+index+'_is_principal_sponsor').contains(NCT03297606_CAPTUR.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });*/

   //Staff List - Done
   /* cy.clickMultiple('#array-item-list-root_staff_list_protocol_staff>div>.pi-plus-circle',
      NCT03297606_CAPTUR.staff_list.protocol_staff.length-1);
    cy.get('[id^=object-field-template-root_staff_list_protocol_staff]').each(($input, index) => {
      cy.log($input.attr('id'));
      cy.get('#root_staff_list_protocol_staff_'+index+'_first_name').type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].first_name);
      cy.get('#root_staff_list_protocol_staff_'+index+'_last_name').type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].last_name);
      cy.get('#root_staff_list_protocol_staff_'+index+'_email_address').type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].email_address);
      cy.get('#root_staff_list_protocol_staff_'+index+'_institution_name').click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].institution_name).click();
      cy.get('#root_staff_list_protocol_staff_'+index+'_staff_role').click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].staff_role).click();
    });
     */

     //Arm code
    cy.clickMultipleArm('[id^=array-item-list-root_treatment_list_step_0_arm]>div>div',
      NCT03297606_CAPTUR.treatment_list.step[0].arm.length-1);
   //close the dose level in first arm only
    cy.get('#array-item-list-root_treatment_list_step_0_arm_0_dose_level > .flex > .p-panel >' +
      ' .ctimsPanelHeaderTopArm > div > .p-panel-header-icon > .pi').click()
    cy.wait(1000)
    //root_treatment_list_step_0_arm_0_arm_code
    //object-field-template-root_treatment_list_step_0_arm_0
    //object-field-template-root_treatment_list_step_0_arm_0_dose_level_0 only dose level
    //root_treatment_list_step_0_arm_0_dose_level_0_level_code
   // cy.get('[id^=root_treatment_list_step_0_arm]')
    cy.get('[id^=object-field-template-root_treatment_list_step_0_arm]').each(($input, index) => {
      cy.log($input.attr('id'));
     cy.get('#root_treatment_list_step_0_arm_'+index+'_arm_code').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_code);
      cy.get('#root_treatment_list_step_0_arm_'+index+'_arm_description').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_description);
      cy.get('#root_treatment_list_step_0_arm_'+index+'_arm_internal_id').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_internal_id.toString());
     cy.get('#root_treatment_list_step_0_arm_'+index+'_arm_suspended').contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_suspended).click();
    });
    /*
     //Level code
     cy.doseLevel(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_code,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_description,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_internal_id.toString(),
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[0].level_suspended)
     //Click on Plus Icon to add another Dose Level
   })*/

  })

})
