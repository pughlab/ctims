import {
  getAddCriteriaGroup,
  getAddCriteriaList,
  getAddCriteriaToSameGroup,
  getAddCriteriaToSubGroup,
  getAgeGroup,
  getArmCode,
  getArmDescription,
  getArmInternalId, getArmSuspended,
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
  getClinicalPRStatus, getCNVCall,
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
} from '../../support/app.po';
//import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT03297606_CAPTUR} from "../../fixtures/NCT03297606_CAPTUR"
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
    /* cy.clickMultiple('#array-item-list-root_management_group_list_management_group>div>.pi-plus-circle',
       NCT03297606_CAPTUR.management_group_list.management_group.length-1);
     cy.get('[id^=object-field-template-root_management_group_list_management_group').each(($input, index) => {
       cy.wrap($input).find('.p-dropdown').click().contains(NCT03297606_CAPTUR.management_group_list.management_group[index].management_group_name).click();
       cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.management_group_list.management_group[index].is_primary).click();
       });*/

    //Site List - done
    /* cy.clickMultiple('#array-item-list-root_site_list_site>div>.pi-plus-circle',
     NCT03297606_CAPTUR.site_list.site.length-1);
   cy.get('[id^=object-field-template-root_site_list_site]').each(($input, index) => {
     cy.wrap($input).find('.p-dropdown').eq(0).click().contains(NCT03297606_CAPTUR.site_list.site[index].site_name).click();
     cy.wrap($input).find('.p-dropdown').eq(1).click().contains(NCT03297606_CAPTUR.site_list.site[index].site_status).click();
     cy.wrap($input).find('.p-selectbutton').eq(0).click().contains(NCT03297606_CAPTUR.site_list.site[index].coordinating_center).click();
     cy.wrap($input).find('.p-selectbutton').eq(1).click().contains(NCT03297606_CAPTUR.site_list.site[index].uses_cancer_center_irb).click();
     });*/

    //Sponsor List array of 5 values - done
    /*cy.clickMultiple('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle',NCT03297606_CAPTUR.sponsor_list.sponsor.length-1)
     cy.get('[id^=object-field-template-root_sponsor_list_sponsor_]').each(($input, index) => {
       cy.wrap($input).find('.p-inputtext').type(NCT03297606_CAPTUR.sponsor_list.sponsor[index].sponsor_name)
       cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.sponsor_list.sponsor[index].is_principal_sponsor).click();
     });*/

    //Staff List - Done
    /* cy.clickMultiple('#array-item-list-root_staff_list_protocol_staff>div>.pi-plus-circle',
       NCT03297606_CAPTUR.staff_list.protocol_staff.length-1);
     cy.get('[id^=object-field-template-root_staff_list_protocol_staff]').each(($input, index) => {
       cy.log($input.attr('id'));
       cy.wrap($input).find('.p-inputtext').eq(0).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].first_name);
       cy.wrap($input).find('.p-inputtext').eq(1).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].last_name);
       cy.wrap($input).find('.p-inputtext').eq(2).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].email_address);
       cy.wrap($input).find('.p-dropdown').eq(0).click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].institution_name).click();
       cy.wrap($input).find('.p-dropdown').eq(1).click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].staff_role).click();
     });
 */
    //Click multiple arms based on test data
    let multipleArms = cy.get("[id^=array-item-list-root_treatment_list_step_0_arm]>div>div")
    let arms = NCT03297606_CAPTUR.treatment_list.step[0].arm
    cy.clickMultipleArm(multipleArms,arms.length)
    //click delete first Dose Level
    cy.get('#array-item-list-root_treatment_list_step_0_arm_0_dose_level').find('.pi-trash').click()
    // Click multiple dose based on test data for each arm
    arms.forEach((arm,index) => {
      //cy.log(JSON.stringify(arm))
     // cy.log(JSON.stringify(arm.dose_level))
      let dose = NCT03297606_CAPTUR.treatment_list.step[0].arm[index].dose_level
      cy.log("Arm index",index.toString())
      cy.log("Dose Length",dose.length.toString())
      cy.clickMultipleDose(index,dose.length)
    })


/*
// Get all the arm elements
   let multiple = cy.get("[id^=object-field-template-root_treatment_list_step_0_arm]>div>div");

// Loop over each arm element and enter the corresponding data
    multiple.find('.p-inputtext').each((armElem, index) => {
      let armData = NCT03297606_CAPTUR.treatment_list.step[0].arm[index];
      if (Cypress.$(armElem).length > 0) {

        // Enter the arm code
        cy.wrap(armElem).find("[id$=_arm_code]").type(armData.arm_code);

        // Enter the arm description
        cy.wrap(armElem).find("[id$=_arm_description]").type(armData.arm_description);

        // Enter the arm internal ID
        cy.wrap(armElem).find("[id$=_arm_internal_id]").type(armData.arm_internal_id.toString());
       } else {
      return false;
    }
      // Select the arm suspended option
     /!* cy.wrap(armElem).find("[id$=_arm_suspended]")
        .contains(armData.arm_suspended).click();
*!/
      // Loop over each dose level and enter the corresponding data
    /!*  armData.dose_level.forEach((doseData, doseIndex) => {
        let doseElem = cy.wrap(armElem).find("[id$=_dose_level_" + doseIndex + "]");

        // Enter the dose level code
        doseElem.find("[id$=_level_code]").type(doseData.level_code);

        // Enter the dose level description
        doseElem.find("[id$=_level_description]").type(doseData.level_description);

        // Enter the dose level internal ID
        doseElem.find("[id$=_level_internal_id]").type(doseData.level_internal_id.toString());

        // Select the dose level suspended option
        doseElem.find("[id$=_level_suspended]")
          .contains(doseData.level_suspended).click();
      });*!/
    });

*/


// Iterate over each arm object and click on the corresponding dose level elements
    //[id^=array-item-list-root_treatment_list_step_0_arm]>div>div>div>div>div>div>div>div>div>div>div
    //.find("[id$=arm_internal_id]")
    //[id$=arm]>div:nth-child(1)>div>div:nth-child(2)>div>div>div>div>div>div>div
    //find('[id$=arm]>div:nth-child(1)>div>div:nth-child(2)>div>div>div>div>div>div>div')
    //.find("[id$=arm_internal_id]")
    /*multipleArms = cy.get("[id^=array-item-list-root_treatment_list_step_0_arm]>div>div")
     arms = NCT03297606_CAPTUR.treatment_list.step[0].arm

    multipleArms.find('.CtimsInput_container__iLcC1>input')
      .each((childElement, index) => {
          cy.log(index.toString())
          if (Cypress.$(childElement).length > 0) {
            cy.wrap(childElement).click() // click on each child element
            let condition = arms[index % arms.length]; // get the corresponding and condition
            cy.log(arms.length.toString())
            Object.entries(condition).map(([key, value]) => {
              if (key === 'arm_code') {
                getArmCode().type(value)
              }/!*if (key === 'arm_description') {
                getArmDescription().type(value)
              }if (key === 'arm_internal_id') {
                getArmInternalId().type(value)
              }
              if (key === 'arm_suspended') {
                getArmSuspended().contains(value).click()
              }
*!/
            })
          } else {
            return false;
          }
        })
  */   /* if(index === 0) {
        cy.wrap(arm).find(`[id$=_arm_internal_id]`)
          .type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_internal_id.toString())
      }*/
     /* dose_level.forEach((dose) => {
        const { level_internal_id } = dose;
        const doseElement = armElement.find(`[id$=_level_internal_id]`);

        // Click on the dose level element
        cy.wrap(doseElement).click();*/
     // });
  //  });


    //let multipleDose = cy.get("div[id$='dose_level']>div>i:nth-child(1)")

   /* multipleDose.each((childElement, index) => {
      let dose = NCT03297606_CAPTUR.treatment_list.step[0].arm
      cy.log(index.toString())
      if (Cypress.$(childElement).length > 0) {
        cy.wrap(childElement).click() // click on each child element
        let condition = dose[index % dose.length]; // get the corresponding and condition
        cy.log(dose.length.toString())
        Object.entries(condition).map(([key, value]) => {
          if (key === 'level_code') {
            getLevelCode().type(value)
          }

        })
      } else {
        return false;
      }
    })*/
  })
})
