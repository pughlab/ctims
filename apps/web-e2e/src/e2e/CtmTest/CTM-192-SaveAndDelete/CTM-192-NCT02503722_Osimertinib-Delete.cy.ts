import {
  createCTMLButton,
  getAddArmPlusIcon,
  getAddCriteriaGroup,
  getAddCriteriaList,
  getAddCriteriaToSameGroup,
  getAddCriteriaToSameList,
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
  getClinicalAge,
  getClinicalDropdown,
  getClinicalERStatus,
  getClinicalHER2Status,
  getClinicalOncotreePrimaryDiagnosis,
  getClinicalPRStatus,
  getCNVCall,
  getCtmlStatusDropdown,
  getCtmlStatusDropdownList,
  getDefaultTextMatchingCriteria,
  getDefaultTrialEditorDropDown,
  getDrugName,
  getDrugNamePlusIcon,
  getDrugNameTextBoxMultiple,
  getEditMatchingCriteria,
  getEditMatchingCriteriaMultiple,
  getGenomicDropDown,
  getHugoSymbol,
  getLeftMenuComponent,
  getLevelCode,
  getLevelDescription,
  getLevelInternalId,
  getLongTitle,
  getManagementGroupName,
  getManagementGroupNameTextBoxMultiple,
  getMatchCriteriaHeader,
  getMatchingCriteriaTableHeader,
  getMatchModalFooterButtons,
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr,
  getMultipleArm,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon,
  getPreviewTextWindow,
  getPreviewWindow,
  getPrimaryManagementGroupPlusIcon,
  getPrincipalInvestigator,
  getPriorTreatmentRequirementMultiple,
  getPriorTreatmentRequirementPlusIconMultiple,
  getProteinChange,
  getProtocolNumber,
  getProtocolStaffEmail,
  getProtocolStaffFirstName,
  getProtocolStaffInstitutionalName,
  getProtocolStaffLastName,
  getProtocolStaffMultiple,
  getProtocolStaffPlusIcon,
  getProtocolStaffRole,
  getProtocolStaffStatus,
  getSaveMatchingCriteria,
  getShortTitle,
  getSiteName,
  getSiteNameMultiple,
  getSiteNamePlusIcon,
  getSiteStatus,
  getSponsorName,
  getSponsorNameMultiple,
  getSponsorNamePlusIcon,
  getSubGroup,
  getSwitchGroupOperator,
  getTrialId,
  getTrialInformationStatus,
  getTrialNickname,
  getTruncateButton,
  getVariantCategory,
  getVariantClassification,
  selectDraftCtmlStatus,
  trialEditorBackButton,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons,
  trialEditorSave,
  trialTableDelete,
  trialTableDialogueDeleteBtn,
  trialTableDots,
  trialTableEdit
} from '../../../support/app.po';
import {NCT02503722_Osimertinib} from "../../../fixtures/NCT02503722_Osimertinib"
import baseClass from "../../Base/baseClass.cy"
import dateClass from "../../Base/dateClass.cy";

const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
let exportJsonFile = 'NCT02503722_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');


describe('CTIMS Trial Editor NCT02503722_Osimertinib', { testIsolation: false }, () => {
  baseClass.beforeClass()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT02503722_Osimertinib
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`
  it('should enter values into the "Trial Editor Form"', () => {
    cy.get('tbody>tr>td').should('contain','No CTML files. Select the \'Create\' button to start.')
    createCTMLButton().click()
     cy.title().should('contain', 'CTIMS')
     trialEditorLeftPanelList().should('have.length', '9')
    getTrialId().type(ctmlTestData.nct_id)
    getTrialNickname().type('My Trial')
    getPrincipalInvestigator().clear().type('John Doe');
    //ctml status
    getCtmlStatusDropdown().click()
    // cy.wait(1000)
    getCtmlStatusDropdownList().contains('Draft').click()
    getLongTitle().clear().type(ctmlTestData.long_title)
    getShortTitle().clear().type(ctmlTestData.short_title)
    //Phase
    getClickPhase().click()
    getPhaseDropdownList().contains(ctmlTestData.phase).click()
    getProtocolNumber().clear().type(ctmlTestData.protocol_no)
    getNCTPurpose().clear().type(ctmlTestData.nct_purpose)
    //getTrialInformationStatus().click()
    //getDefaultTrialEditorDropDown().contains(status).click()
   // trialEditorSave().click()
    //trialEditorBackButton().click()
    //trialTableDots().trigger('mouseover').invoke('addClass', 'p-button').click()
    //trialTableEdit().click()
   //trialTableDelete().click()
    //trialTableDialogueDeleteBtn().click()
    //default message

    /* cy.trialInformation(ctmlTestData.nct_id,
       "My Trial",
       "John Doe",
       "Draft",
       ctmlTestData.long_title,
       ctmlTestData.short_title,
       ctmlTestData.phase,
       ctmlTestData.protocol_no,
       ctmlTestData.nct_purpose,
       ctmlTestData.status
     )*/

     // Prior treatment requirements
    /* cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
     getPriorTreatmentRequirementMultiple().each((input, index) => {
       // check if there is a corresponding value in the array
       if (ctmlTestData.prior_treatment_requirements[index]) {
         cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
       }
     })*/

    //Age
    cy.age(ctmlTestData.age)

    //Drug List
    cy.clickMultipleFunction(getDrugNamePlusIcon(), ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
      }
    })
    //Management Group List
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
    });

    //Site List
    cy.clickMultipleFunction(getSiteNamePlusIcon(), ctmlTestData.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      const site = ctmlTestData.site_list.site[index]
      cy.fillSiteDetails($input, site)
    })

    //Sponsor List
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });

    //Staff List
    cy.clickMultipleFunction(getProtocolStaffPlusIcon(), ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      const staff = ctmlTestData.staff_list.protocol_staff[index]
      cy.fillProtocolStaffDetails($input, staff)
    });
  })
//!************ Arm 1  *****************
   it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1', () => {
      trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
     //delete the dose level
      cy.wait(2000)
      cy.get('#array-item-list-root_treatment_list_step_0_arm_0_dose_level').children().find('.pi-trash').click()
      cy.wait(1000)

      cy.clickMultipleFunction(getAddArmPlusIcon(), ctmlTestData.treatment_list.step[0].arm.length - 1)
      const treatmentList = ctmlTestData.treatment_list.step[0].arm;
      const doseLevels = treatmentList[0].dose_level;
      cy.wait(1000)
      getMultipleArm().each(($input, index) => {
        cy.log($input.attr('id'));
        const arm = treatmentList[index];
        //At Arm 1
         if(index === 0) {
           cy.wrap($input).find('.p-inputtext').eq(0).type(arm.arm_code);
           cy.wrap($input).find('.p-inputtext').eq(1).type(arm.arm_description);
           cy.wrap($input).find('.p-inputtext').eq(2).type(arm.arm_internal_id.toString());
           cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click();
           //click multiple dose
           cy.clickMultiple(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]>div>.pi-plus-circle`, doseLevels.length)

           cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]>div>div>div>div>#panel-children`).each(($input, doseIndex) => {
             const dose = doseLevels[doseIndex];
             cy.log(doseIndex.toString())
             cy.log(JSON.stringify(doseLevels))
             cy.log(JSON.stringify(doseLevels[doseIndex]));
             cy.wait(1000)
                if(doseIndex === 0) {
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).type(dose.level_code);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).type(dose.level_description);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).type(dose.level_internal_id.toString());
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click();
                }
                if(doseIndex === 1) {
                  cy.log(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).type(dose.level_code);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).type(dose.level_description);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).type(dose.level_internal_id.toString());
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click();
                }
           });

           //click first matching criteria link of each arm
           getEditMatchingCriteriaMultiple().eq(index).click()
           //Validate the header
           getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
           // }
           getAddCriteriaGroup().click()
           //!******** Add clinical at Parent AND ********************
           cy.clickParentNode(0).click()
           cy.clickClinical()
           getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].clinical.age_numerical)
           getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].clinical.oncotree_primary_diagnosis)

           //!******** OR ********************
           cy.clickParentNode(0).click()
           cy.clickOr()
           let orConditions = ctmlTestData.treatment_list.step[0].arm[0].match[0].and[1].or
           cy.log(JSON.stringify(orConditions))
           cy.log(orConditions.length.toString())
           cy.clickParentNode(2).click()
           cy.clickGenomic()
          // Click Add criteria to same list to add two genomic criteria
           cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
           cy.clickChildToggleArrowButton(2)
           //Iterate through the 'Or' child elements to add the individual values
           getSubGroup().find('.p-treenode-children>li')
             .each((childElement, index) => {
               cy.log(index.toString())
               if (Cypress.$(childElement).length > 0) {
                 cy.wrap(childElement).click() // click on each child element
                 let condition = orConditions[index % orConditions.length]; // get the corresponding and condition
                 cy.log(orConditions.length.toString())
                 Object.entries(condition.genomic).map(([key, value]) => {
                   if (key === 'hugo_symbol') {
                     getHugoSymbol().type(value)
                   }
                   if (key === 'variant_category') {
                     getVariantCategory().click()
                     getGenomicDropDown().contains(value).click()
                   }
                   if (key === 'protein_change') {
                     getProteinChange().type(value)
                   }
                   if (key === 'variant_classification') {
                     getVariantClassification().click()
                     getGenomicDropDown().contains(value.replace(/_/g, " ")).click()
                   }
                   if (key === 'cnv_call') {
                     getCNVCall().click()
                     getGenomicDropDown().contains(value).click()
                   }
                 })
               } else {
                 return false;
               }
             })
         }
           });
      getSaveMatchingCriteria().click()
    })

  it('should Delete the existing ctml file', () => {
    cy.saveAndDelete()
  });
  baseClass.afterClass()
})


