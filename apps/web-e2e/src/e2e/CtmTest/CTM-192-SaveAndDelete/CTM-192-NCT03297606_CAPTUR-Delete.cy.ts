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
  getClinicalTMB,
  getCNVCall,
  getCtmlStatusDropdown,
  getDefaultTextMatchingCriteria,
  getDefaultTrialEditorDropDown,
  getDrugName, getDrugNamePlusIcon, getDrugNameTextBoxMultiple,
  getEditMatchingCriteria,
  getEditMatchingCriteriaMultiple,
  getGenomicDropDown,
  getHugoSymbol,
  getLeftMenuComponent,
  getLevelCode,
  getLevelDescription,
  getLevelInternalId,
  getLongTitle,
  getManagementGroupName, getManagementGroupNameTextBoxMultiple, getMatchCriteriaHeader,
  getMatchingCriteriaTableHeader,
  getMatchModalFooterButtons,
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr, getMultipleArm,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon, getPreviewTextWindow,
  getPreviewWindow, getPrimaryManagementGroupPlusIcon,
  getPrincipalInvestigator,
  getPriorTreatmentRequirementMultiple,
  getPriorTreatmentRequirementPlusIconMultiple,
  getProteinChange,
  getProtocolNumber,
  getProtocolStaffEmail,
  getProtocolStaffFirstName,
  getProtocolStaffInstitutionalName,
  getProtocolStaffLastName, getProtocolStaffMultiple, getProtocolStaffPlusIcon,
  getProtocolStaffRole,
  getProtocolStaffStatus,
  getSaveMatchingCriteria,
  getShortTitle,
  getSiteName, getSiteNameMultiple, getSiteNamePlusIcon,
  getSiteStatus,
  getSponsorName, getSponsorNameMultiple, getSponsorNamePlusIcon,
  getSubGroup,
  getSwitchGroupOperator,
  getTrialId,
  getTrialNickname,
  getTruncateButton,
  getVariantCategory,
  getVariantClassification,
  selectDraftCtmlStatus,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons
} from '../../../support/app.po';
import {NCT03297606_CAPTUR} from "../../../fixtures/NCT03297606_CAPTUR"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import baseClass from "../../Base/baseClass.cy";
import dateClass from "../../Base/dateClass.cy";
let exportJsonFile = 'NCT03297606_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');

describe('CTIMS Trial Editor "NCT03297606_CAPTUR',{ testIsolation: false },() => {
  baseClass.beforeClass()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT03297606_CAPTUR
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`

  it('should enter the Trial Editor form with valid test data', () => {
    createCTMLButton().click()
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
   /* cy.trialInformation(ctmlTestData.nct_id,
      "My Trial",
      "John Doe",
      "Draft",
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no,
      ctmlTestData.nct_purpose,
      ctmlTestData.status)*/

    // Prior treatment requirements
    cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
    getPriorTreatmentRequirementMultiple().each((input, index) => {
      if (ctmlTestData.prior_treatment_requirements[index]) {
        cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
      }
    })
    //Age
    cy.age(ctmlTestData.age)

    //Drug List
    cy.clickMultipleFunction(getDrugNamePlusIcon(),ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
      }
    })

    //Management Group List
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(),ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
    });

    //Site List - done
    cy.clickMultipleFunction(getSiteNamePlusIcon(),ctmlTestData.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(ctmlTestData.site_list.site[index].site_name).click();
      cy.wrap($input).find('.p-dropdown').eq(1).click().contains(ctmlTestData.site_list.site[index].site_status).click();
      cy.wrap($input).find('.p-selectbutton').eq(0).click().contains(ctmlTestData.site_list.site[index].coordinating_center).click();
      cy.wrap($input).find('.p-selectbutton').eq(1).click().contains(ctmlTestData.site_list.site[index].uses_cancer_center_irb).click();
    });

    //Sponsor List array of 5 values - done
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });

    //Staff List - Done
    cy.clickMultipleFunction(getProtocolStaffPlusIcon,
      ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      cy.log($input.attr('id'));
      cy.wrap($input).find('.p-inputtext').eq(0).type(ctmlTestData.staff_list.protocol_staff[index].first_name);
      cy.wrap($input).find('.p-inputtext').eq(1).type(ctmlTestData.staff_list.protocol_staff[index].last_name);
      cy.wrap($input).find('.p-inputtext').eq(2).type(ctmlTestData.staff_list.protocol_staff[index].email_address);
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(ctmlTestData.staff_list.protocol_staff[index].institution_name).click();
      cy.wrap($input).find('.p-dropdown').eq(1).click().contains(ctmlTestData.staff_list.protocol_staff[index].staff_role).click();
    });
  })

//!************ Arm 1  *****************
  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1', () => {
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    cy.clickMultipleFunction(getAddArmPlusIcon(), ctmlTestData.treatment_list.step[0].arm.length - 1)
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[0].dose_level;

    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if(index === 0) {
        //cy.wrap($input).each(($armInput, armIndex) => {
        cy.wrap($input).find('.p-inputtext').eq(0).type(arm.arm_code);
        cy.wrap($input).find('.p-inputtext').eq(1).type(arm.arm_description);
        cy.wrap($input).find('.p-inputtext').eq(2).type(arm.arm_internal_id.toString());
        cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click();

        cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]`).each(($input, doseIndex) => {
          cy.log($input.attr('id'));
          const dose = doseLevels[doseIndex];
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).type(dose.level_code);
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).type(dose.level_description);
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).type(dose.level_internal_id.toString());
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click();
        });
        //click first matching criteria link of each arm
        getEditMatchingCriteriaMultiple().eq(index).click()
        //Validate the header
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        //}
        // });
        getAddCriteriaGroup().click()
        //})

        //******** OR ********************
        cy.clickParentAnd()
        cy.clickOr()
        //Click Or Parent at index 1
        cy.clickParentNode(1).click()
        let orConditions = ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].or
        cy.log(JSON.stringify(orConditions))
        cy.log(orConditions.length.toString())
        cy.clickGenomic()
        cy.clickChildToggleArrowButton(1)
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
        getSubGroup().find('.p-treenode-children>li')
          .each((childElement, index) => {
            cy.log(index.toString())
            if (Cypress.$(childElement).length > 0) {
              cy.wrap(childElement).click() // click on each child element
              let condition = orConditions[index % orConditions.length]; // get the corresponding and condition
              cy.log(orConditions.length.toString())
              Object.entries(condition.genomic).map(([key, value]) => {
                if (key === 'cnv_call') {
                  getCNVCall().type(value)
                }
                if (key === 'hugo_symbol') {
                  getHugoSymbol().type(value)
                }
                if (key === 'variant_category') {
                  getVariantCategory().click()
                  getGenomicDropDown().contains(value).click()
                }
              })
            } else {
              return false;
            }
          })

        //!******** Add clinical at Parent AND ********************
        cy.clickParentNode(0).click()
        //cy.clickAnd()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[1].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[1].clinical.oncotree_primary_diagnosis)
        getSaveMatchingCriteria().click()
      }
    })
  })
  //!************ Arm 7  *****************

  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 7', () => {

    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[1].dose_level;

    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if(index === 1) {
        cy.wrap($input).find('.p-inputtext').eq(0).type(arm.arm_code);
        cy.wrap($input).find('.p-inputtext').eq(1).type(arm.arm_description);
        cy.wrap($input).find('.p-inputtext').eq(2).type(arm.arm_internal_id.toString());
        cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click();
        cy.get(`#array-item-list-root_treatment_list_step_0_arm_${index}_dose_level`).contains('Add Dose Level').click()

        cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]`).each(($input, doseIndex) => {
          const dose = arm.dose_level[doseIndex]
        cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).type(dose.level_code);
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).type(dose.level_description);
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).type(dose.level_internal_id.toString());
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click();
        });

        //click first matching criteria link of each arm
        getEditMatchingCriteriaMultiple().eq(index).click()
        //Validate the header
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);

        // });
        getAddCriteriaGroup().click()
        //******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        //Click Or Parent at index 1
        cy.clickParentNode(1).click()
        //let orConditions = ctmlTestData.treatment_list.step[0].arm[1].match[0].and[0].or
        let orConditions = treatmentList[index].match[0].and[0].or

        cy.log(JSON.stringify(orConditions))
        cy.log(orConditions.length.toString())
        cy.clickGenomic()
        cy.clickChildToggleArrowButton(1)
        // cy.clickParentNode(2).click()
        // getLeftMenuComponent().eq(2).click()
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
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
              })
            } else {
              return false;
            }
          })
        //!******** AND ********************
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(4)
        cy.clickClinical()
//        cy.clickChildToggleArrowButton(2)
        // cy.wait(1000)
        let clinicalLength = treatmentList[index].match[0].and[1].and.length - 1
        cy.clickMultipleFunction(getAddCriteriaToSameList(), clinicalLength)
        cy.clickChildToggleArrowButton(2)

        let andConditions = treatmentList[index].match[0].and[1].and
        cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li:nth-child(2)').find('.p-treenode-children>li')
          .each((childElement, index) => {
            cy.log(index.toString())
            if (Cypress.$(childElement).length > 0) {
              cy.wrap(childElement).click() // click on each child element
              let condition = andConditions[index % andConditions.length]; // get the corresponding and condition
              //andConditions.forEach(condition => { // get the corresponding and condition
              cy.log(andConditions.length.toString())
              Object.entries(condition.clinical).map(([key, value]) => {
                if (key === 'age_numerical') {
                  getClinicalAge().type(value)
                }
                if (key === 'oncotree_primary_diagnosis') {
                  getClinicalOncotreePrimaryDiagnosis().type(value)
                }
                if (key === 'tmb') {
                  getClinicalTMB().type(value)
                }
              })
            } else {
              return false;
            }
          })
        getSaveMatchingCriteria().click()
      }
    })
  })

  it('should Delete the existing ctml file', () => {
    cy.saveAndDelete()
  });
  baseClass.afterClass()
})
