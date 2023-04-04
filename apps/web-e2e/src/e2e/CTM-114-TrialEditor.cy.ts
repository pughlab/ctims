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

   /* //Management Group List - not done
    cy.clickMultiple('#array-item-list-root_management_group_list_management_group>div>.pi-plus-circle',
      NCT03297606_CAPTUR.management_group_list.management_group.length-1);
    cy.get('[id^=root_management_group_list_management_group]').each((input, index) => {
      // check if there is a corresponding value in the array
      if (NCT03297606_CAPTUR.management_group_list.management_group[index]) {
        // enter the value into the text box
        cy.wrap(input).click()
          getDefaultTrialEditorDropDown().contains(NCT03297606_CAPTUR.management_group_list.management_group[index].management_group_name).click();
      }
    })*/
    /* cy.managementGroupList(NCT03297606_CAPTUR.management_group_list.management_group[0].management_group_name,
       NCT03297606_CAPTUR.management_group_list.management_group[0].is_primary)

     //Site List - not done
     cy.siteList(NCT03297606_CAPTUR.site_list.site[0].site_name,
       NCT03297606_CAPTUR.site_list.site[0].site_status,
       NCT03297606_CAPTUR.site_list.site[0].coordinating_center,
       NCT03297606_CAPTUR.site_list.site[0].uses_cancer_center_irb)

     //Sponsor List - done
    cy.clickMultiple('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle',
      NCT03297606_CAPTUR.sponsor_list.sponsor.length-1)
    cy.get('[id^=root_sponsor_list_sponsor]').each((input) => {
      NCT03297606_CAPTUR.staff_list.protocol_staff.map((element, index) => {
        if (input.attr('id').includes('sponsor_name')) {
          // enter the value into the text box
          cy.wrap(input).type(NCT03297606_CAPTUR.sponsor_list.sponsor[index].sponsor_name);
        }
        if (input.attr('class').includes('p-button')) {
          //click the button
          cy.wrap(input).contains(NCT03297606_CAPTUR.sponsor_list.sponsor[index].is_principal_sponsor).click();
        }
      })
    })

     */
/*

    //Staff List - Done
    cy.clickMultiple('#array-item-list-root_drug_list_drug>div>.pi-plus-circle',
      NCT03297606_CAPTUR.staff_list.protocol_staff.length-1);
       cy.get('[id^=root_staff_list_protocol_staff_0_]').each(($input) => {
         // check if there is a corresponding value in the array
         NCT03297606_CAPTUR.staff_list.protocol_staff.map((element,index) => {

           if ($input.attr('id').includes('first_name')) {
             cy.log('first_name found', $input.attr('id'));
             cy.wrap($input).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].first_name);
           }
           if ($input.attr('id').includes('last_name')) {
             cy.log('last_name found', $input.attr('id'));
             cy.log(NCT03297606_CAPTUR.staff_list.protocol_staff[index].last_name)
              cy.wrap($input).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].last_name);
           }
           if ($input.attr('id').includes('email_address')) {
             cy.log('last_name found', $input.attr('id'));
             cy.wrap($input).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].email_address);
           }
           if ($input.attr('id').includes('institution_name')) {
             cy.log('last_name found', $input.attr('id'));
             cy.wrap($input).click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].institution_name).click();
           }
           if ($input.attr('id').includes('staff_role')) {
             cy.log('last_name found', $input.attr('id'));
             cy.wrap($input).click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].staff_role).click();
           }
         })
       })
*/

     //Arm code
    cy.clickMultipleArm('[id^=array-item-list-root_treatment_list_step_0_arm]>div>div',
      NCT03297606_CAPTUR.treatment_list.step[0].arm.length-1);    /* cy.arm(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_code,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_description,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_internal_id,
       NCT03297606_CAPTUR.treatment_list.step[0].arm[0].arm_suspended)
*/
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
