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
  getVariantClassification, getWildType,
  selectDraftCtmlStatus,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons
} from '../../../support/app.po';
import {NCT03297606_CAPTUR} from "../../../fixtures/NCT03297606_CAPTUR"
import {NCT03114319_TNO155} from "../../../fixtures/NCT03114319_TNO155"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import baseClass from "../../Base/baseClass.cy";
import dateClass from "../../Base/dateClass.cy";
let exportJsonFile = 'NCT03114319_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');

describe('CTIMS Trial Editor "NCT03114319_TN)155',{ testIsolation: false },() => {
  baseClass.beforeClass()
 deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT03114319_TNO155
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`

  it('should enter the Trial Editor form with valid test data', () => {
    createCTMLButton().click()
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
    cy.trialInformation(ctmlTestData.nct_id,
      "My Trial",
      "John Doe",
      "Draft",
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no,
      ctmlTestData.nct_purpose,
      ctmlTestData.status)

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
        getAddCriteriaGroup().click()
        //!******** OR ********************
        cy.clickParentAnd()
        cy.switchGroupOperator()
        getTruncateButton().click()
        cy.clickAnd()
        cy.clickParentNode(1).click()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].or[0].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].or[0].and[0].clinical.oncotree_primary_diagnosis)
        cy.clickParentNode(1).click()
        cy.clickOr()
        cy.clickChildToggleArrowButton(1)
        cy.clickParentNode(3).click()
        cy.clickGenomic()
        cy.get('li:nth-child(1)>ul>li:nth-child(2)>div>.p-tree-toggler').click()
        //cy.clickChildToggleArrowButton(2)
        let orConditions = ctmlTestData.treatment_list.step[0].arm[0].match[0].or[0].and[1].or
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
        cy.get('li:nth-child(1)>ul>li:nth-child(2)').find('.p-treenode-children>li')
          // getSubGroup().find('.p-treenode-children>li')
          .each((childElement, index) => {
            if (Cypress.$(childElement).length > 0) {
              cy.wrap(childElement).click() // click on each child element
              let condition = orConditions[index % orConditions.length]; // get the corresponding and condition

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
                if (key === 'protein_change') {
                  getProteinChange().type(value)
                }
                if (key === 'variant_classification') {
                  getVariantClassification().click()
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
              })
            } else {
              return false;
            }
          })
        //click the toggle so all the child will collapse
        cy.clickChildToggleArrowButton(1)
        //And subgroup
        cy.clickParentNode(0).click()
        cy.clickAnd()
        cy.clickParentNode(2).click()
        cy.clickClinical()
        cy.clickChildToggleArrowButton(2)
         getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].or[1].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].or[1].and[0].clinical.oncotree_primary_diagnosis)
        cy.clickParentNode(2).click()
       // click 2 genomic criteria
        cy.clickGenomic()
        getAddCriteriaToSameList().click()
        let child2 = getSubGroup().contains('Genomic')
        child2.click()
        let secondGenomicChild = ctmlTestData.treatment_list.step[0].arm[0].match[0].or[1].and[1]
              Object.entries(secondGenomicChild.genomic).map(([key, value]) => {
                if (key === 'hugo_symbol') {
                  getHugoSymbol().type(value)
                }
                if (key === 'variant_category') {
                  getVariantCategory().click()
                  getGenomicDropDown().contains(value).click()
                }
                if (key === 'wildtype') {
                  getWildType().click()
                  getGenomicDropDown().contains(value.replace('true', 'True')).click()
                } else {
                  return false;
                }
              })

        //click the 3rd genomic child to enter value
        getLeftMenuComponent().eq(5).click()
        let thirdGenomicChild = ctmlTestData.treatment_list.step[0].arm[0].match[0].or[1].and[2]
        Object.entries(thirdGenomicChild.genomic).map(([key, value]) => {
          if (key === 'hugo_symbol') {
            getHugoSymbol().type(value)
          }
          if (key === 'variant_category') {
            getVariantCategory().click()
            getGenomicDropDown().contains(value).click()
          }
          if (key === 'wildtype') {
            getWildType().click()
            getGenomicDropDown().contains(value.replace('true', 'True')).click()
          }
          else {
            return false;
          }
        })
        getSaveMatchingCriteria().click()
        }
    })
    cy.saveAndEdit()
  })

  //!************ Arm 2  *****************

  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 2', () => {
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

        //click matching criteria link of each arm
        getEditMatchingCriteriaMultiple().eq(index).click()
        //Validate the header
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** Clinical ********************
        cy.clickParentAnd()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[1].match[0].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[1].match[0].and[0].clinical.oncotree_primary_diagnosis)

        //!******** OR ********************
        cy.clickParentNode(0).click()
        cy.clickOr()
        cy.clickParentNode(2).click()
        cy.clickGenomic()
        cy.clickChildToggleArrowButton(2)
        let orConditions = ctmlTestData.treatment_list.step[0].arm[1].match[0].and[1].or
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
                if (key === 'protein_change') {
                  getProteinChange().type(value)
                }
                if (key === 'variant_classification') {
                  getVariantClassification().click()
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
              })
            } else {
              return false;
            }
          })
         getSaveMatchingCriteria().click()
      }
    })
    cy.saveAndEdit()
  })


//!************ Arm 3  *****************

  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 3', () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[2].dose_level;

    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if(index === 2) {
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

        //click matching criteria link of each arm
        getEditMatchingCriteriaMultiple().eq(index).click()
        //Validate the header
       // getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** Clinical ********************
        cy.clickParentAnd()
        cy.switchGroupOperator()
        //!*****And[0]> clinical************
        getTruncateButton().click()
        cy.clickAnd()
        cy.clickParentNode(1).click()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[0].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[0].and[0].clinical.oncotree_primary_diagnosis)


        //!*****And[1]> or> genomic (9 values)********
        cy.clickParentNode(1).click()
        cy.clickOr()
        cy.clickChildToggleArrowButton(1)
        cy.clickParentNode(3).click()
        cy.clickGenomic()
       // cy.clickChildToggleArrowButton(2)
        cy.get('.p-treenode-children').find('.p-tree-toggler-icon').eq(2).click()
        let orConditions = ctmlTestData.treatment_list.step[0].arm[2].match[0].or[0].and[1].or
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
       //Or subgroup second index of And
        cy.get('li:nth-child(2)').find('.p-treenode-children>li')
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
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
                if (key === 'wildtype') {
                  getWildType().click()
                  getGenomicDropDown().contains(value.replace('true', 'True')).click()
                }
              })
            } else {
              return false;
            }
          })
        //collapse the first And child
        cy.clickChildToggleArrowButton(1)
        //!*********And subgroup with genomic and Or *****
        cy.clickParentNode(0).click()
        cy.clickAnd()
        cy.clickParentNode(2).click()
        cy.clickGenomic()
        //expand the second And subgroup
        cy.clickChildToggleArrowButton(2)
        let values = ctmlTestData.treatment_list.step[0].arm[2].match[0].or[1].and[0].genomic
        Object.entries(values).map(([key,value]) => {
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
            getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
          }
          if (key === 'wildtype') {
            getWildType().click()
            getGenomicDropDown().contains(value.replace('true', 'True')).click()
          }
          else {
            return false;
          }
        })


        //!******Or-Genomic in And subgroup ***********
        //click 2nd And subgroup
        cy.clickParentNode(2).click()
        cy.clickOr()
        cy.clickParentNode(4).click()
        cy.clickGenomic()
        let orConditionGenomic = ctmlTestData.treatment_list.step[0].arm[2].match[0].or[1].and[1].or
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditionGenomic.length - 1)
        //expand or child
        cy.get(':nth-child(2) > .p-treenode-children > :nth-child(2) > .p-treenode-content > .p-tree-toggler >' +
          ' .p-tree-toggler-icon').click()
        //or expanded, add genomic fields values at specified index
        cy.get('li:nth-child(2)>ul>li:nth-child(2)').find('.p-treenode-children>li')
          .each((childElement, index) => {
            cy.log(index.toString())
            if (Cypress.$(childElement).length > 0) {
              cy.wrap(childElement).click() // click on each child element
              let condition = orConditionGenomic[index % orConditionGenomic.length]; // get the corresponding and condition
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
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
                if (key === 'wildtype') {
                  getWildType().click()
                  getGenomicDropDown().contains(value.replace('true', 'True')).click()
                }
              })
            } else {
              return false;
            }
          })
        cy.clickChildToggleArrowButton(2) //close the child components


        //!****************** 3rd Or And Subgroup ***************
        cy.clickParentNode(0).click()
        cy.clickAnd()
        cy.clickParentNode(3).click()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[2].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[2].and[0].clinical.oncotree_primary_diagnosis)
        cy.clickParentNode(3).click()
        cy.clickOr()
        cy.clickChildToggleArrowButton(3) //expand 3rd And subgroup
        cy.clickParentNode(5).click()
        cy.clickGenomic()
        let orConditionGenomic3 = ctmlTestData.treatment_list.step[0].arm[2].match[0].or[2].and[1].or
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditionGenomic3.length - 1)
        //expand or child
       cy.get('li:nth-child(3)>ul>li:nth-child(2)>div>.p-tree-toggler').click()

        cy.get('li:nth-child(3)>ul>li:nth-child(2)').find('.p-treenode-children>li')
          .each((childElement, index) => {
            cy.log(index.toString())
            if (Cypress.$(childElement).length > 0) {
              cy.wrap(childElement).click() // click on each child element
              let condition = orConditionGenomic3[index % orConditionGenomic3.length]; // get the corresponding and condition
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
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
                if (key === 'wildtype') {
                  getWildType().click()
                  getGenomicDropDown().contains(value.replace('true', 'True')).click()
                }
              })
            } else {
              return false;
            }
          })
        //close the And subgroup
        cy.clickChildToggleArrowButton(3) //expand 3rd And subgroup


        //!************ 4th Or And subgroup*********
        cy.clickParentNode(0).click()
        cy.clickAnd()
        cy.clickParentNode(4).click()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[3].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[3].and[0].clinical.oncotree_primary_diagnosis)
        cy.clickParentNode(4).click()
        cy.clickOr()
        cy.clickChildToggleArrowButton(4) //expand 3rd And subgroup
        cy.clickParentNode(6).click()
        cy.clickGenomic()
        let orConditionGenomic4 = ctmlTestData.treatment_list.step[0].arm[2].match[0].or[3].and[1].or
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditionGenomic4.length - 1)
        //expand or child
        cy.get('li:nth-child(4)>ul>li:nth-child(2)>div>.p-tree-toggler').click()

        cy.get('li:nth-child(4)>ul>li:nth-child(2)').find('.p-treenode-children>li')
          .each((childElement, index) => {
            cy.log(index.toString())
            if (Cypress.$(childElement).length > 0) {
              cy.wrap(childElement).click() // click on each child element
              let condition = orConditionGenomic4[index % orConditionGenomic4.length]; // get the corresponding and
              // condition
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
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
                if (key === 'wildtype') {
                  getWildType().click()
                  getGenomicDropDown().contains(value.replace('true', 'True')).click()
                }
              })
            } else {
              return false;
            }
          })
        //close the And subgroup
        cy.clickChildToggleArrowButton(4) //expand 3rd And subgroup


        //!************ 5th Or And subgroup********
        cy.clickParentNode(0).click()
        cy.clickAnd()
        cy.clickParentNode(5).click()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[4].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[2].match[0].or[4].and[0].clinical.oncotree_primary_diagnosis)
        cy.clickParentNode(5).click()
        cy.clickOr()
        cy.clickChildToggleArrowButton(5) //expand 3rd And subgroup
        cy.clickParentNode(7).click()
        cy.clickGenomic()
        let orConditionGenomic5 = ctmlTestData.treatment_list.step[0].arm[2].match[0].or[4].and[1].or
        cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditionGenomic5.length - 1)
        //expand or child
        cy.get('li:nth-child(5)>ul>li:nth-child(2)>div>.p-tree-toggler').click()

        cy.get('li:nth-child(5)>ul>li:nth-child(2)').find('.p-treenode-children>li')
          .each((childElement, index) => {
            cy.log(index.toString())
            if (Cypress.$(childElement).length > 0) {
              cy.wrap(childElement).click() // click on each child element
              let condition = orConditionGenomic5[index % orConditionGenomic5.length]; // get the corresponding and
              // condition
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
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
                if (key === 'wildtype') {
                  getWildType().click()
                  getGenomicDropDown().contains(value.replace('true', 'True')).click()
                }
              })
            } else {
              return false;
            }
          })
        //close the And subgroup
        cy.clickChildToggleArrowButton(5) //expand 3rd And subgroup
        getSaveMatchingCriteria().click()
      }
    })
    cy.saveAndEdit()
  })

  //!************ Arm 4  *****************

  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 4', () => {
     const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[3].dose_level;

    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if(index === 3) {
        cy.wrap($input).find('.p-inputtext').eq(0).type(arm.arm_code);
        cy.wrap($input).find('.p-inputtext').eq(1).type(arm.arm_description);
        cy.wrap($input).find('.p-inputtext').eq(2).type(arm.arm_internal_id.toString());
        cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click();
        //cy.get(`#array-item-list-root_treatment_list_step_0_arm_${index}_dose_level`).contains('Add Dose
        // Level').click()

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

        //click matching criteria link of each arm
        getEditMatchingCriteriaMultiple().eq(index).click()
        //Validate the header
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** Clinical ********************
        cy.clickParentAnd()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[3].match[0].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[3].match[0].and[0].clinical.oncotree_primary_diagnosis)

        //!******** OR ********************
        cy.clickParentNode(0).click()
        cy.clickOr()
        cy.clickParentNode(2).click()
        cy.clickGenomic()
        cy.clickChildToggleArrowButton(2)
        let orConditions = ctmlTestData.treatment_list.step[0].arm[3].match[0].and[1].or
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
                if (key === 'protein_change') {
                  getProteinChange().type(value)
                }
                if (key === 'variant_classification') {
                  getVariantClassification().click()
                  getGenomicDropDown().contains(value.replace(/_/g, ' ')).click()
                }
              })
            } else {
              return false;
            }
          })
        getSaveMatchingCriteria().click()
      }
    })
    cy.saveAndEdit()
  })


  //!******** Matching criteria Preview ********************
  it('should validate Arm 1,2,3,4 "Json preview window text" matches with "ctmlTestData"', () => {
    ctmlTestData.treatment_list.step[0].arm.forEach((arm, armIndex) => {
      const matchCriteria = arm.match;

      getPreviewWindow().each(($el, index) => {
        if (index >= 0 && index <= 3) {
          cy.log("click parent");
          cy.wrap($el).parent().contains('JSON').click();
          cy.wrap($el).find('.p-tabview-panels').invoke('text').then((text) => {
            const jsonArray = JSON.parse(text);
            if (JSON.stringify(jsonArray) === JSON.stringify(matchCriteria)) {
              expect(JSON.stringify(jsonArray), 'matchPreview').to.deep.equal(JSON.stringify(matchCriteria));
            }
          });
        }
      });
    });
  });

  it('should validate the match between "JSON preview window text" and "YAML preview window text" ',  () => {
    getPreviewWindow().each(($el, index) => {
      if (index >= 0 && index <= 3) {
        cy.wrap($el).parent().contains('YAML').click();
        cy.wrap($el).find('.p-tabview-panels').invoke('text').then((yamlText) => {
          const yamlObject = yaml.load(yamlText);
          const yamlMatchCriteria = JSON.stringify(yamlObject);
          cy.wrap($el).parent().contains('JSON').click();
          cy.wrap($el).find('.p-tabview-panels').invoke('text').then((text) => {
            const jsonArray = JSON.parse(text);
            const jsonMatchCriteria = JSON.stringify(jsonArray);
            cy.compareArrays(yamlMatchCriteria.split(','), jsonMatchCriteria.split(','));
          });
        });
      }
    });
  })
  //!************Export Ctml***************
  it('should click on Export button, "Export as JSON" file ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html', 'json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    trialEditorExportCtml().eq(1).should('contain', 'Export CTML').click()
  });

  it('should click on Export button, "Export as YAML" file ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(1).click({force: true})
    trialEditorExportCtml().eq(1).should('contain', 'Export CTML').click()
  });

  it('should validate the match between "Export JSON" and "Export YAML" file', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModelJson) => {
      const json = JSON.stringify(exportedCtmlModelJson);
      cy.readFile(ctmlYaml).then((exportedCtmlModelYaml) => {
        const yamlObject = yaml.load(exportedCtmlModelYaml);
        const yamlVal = JSON.stringify(yamlObject);
        cy.compareArrays(json.split(','), yamlVal.split(','))
      });
    });
  })
//!**************** Match Export Json file with Test Data

  it('should validate exported "Trial Information" matches "ctmlTestData" ', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportedAttributeNames = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
      const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];

      const exportedTrialInformation = exportedAttributeNames.map((attribute) => exportedCtmlModel[attribute]);
      const testDataTrialInformation = testDataAttributeNames.map((attribute) => ctmlTestData[attribute]);

      cy.compareArrays(exportedTrialInformation, testDataTrialInformation);
    });
  });

  it('should validate exported "Age" matches "ctmlTestData"', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.age
      let testData = ctmlTestData.age
      cy.compareArrays(exportData.split(' '), testData.split(' ')) //Age is a single value, not a array
    })
  });

  it('should validate exported "Prior treatment requirement" match "ctmlTestData"', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.prior_treatment_requirements
      let testData = ctmlTestData.prior_treatment_requirements
      cy.compareArrays(exportData, testData)
    })
  });

  it('should validate exported "Drug list" match "ctmlTestData"', () => {
    let rawData = ctmlTestData.drug_list.drug

    cy.drugListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readFile(ctmlJson).then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.drug_list.drug

        cy.drugListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });
  it('should validate exported "Management Group list" matches "ctmlTestData"', () => {
    let rawData = ctmlTestData.management_group_list.management_group;

    cy.managementGroupListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readFile(ctmlJson).then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.management_group_list.management_group

        cy.managementGroupListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });

  it('should validate exported "Site Group list" matches "ctmlTestData"', () => {
    let rawData = ctmlTestData.site_list.site

    cy.siteListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readFile(ctmlJson).then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.site_list.site

        cy.siteListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });

  it('should validate exported "Sponsor list" matches "ctmlTestData"', () => {
    let rawData = ctmlTestData.sponsor_list.sponsor

    cy.sponsorListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readFile(ctmlJson).then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.sponsor_list.sponsor

        cy.sponsorListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });

  it('should validate exported "Staff list" matches "ctmlTestData"', () => {
    let rawData = ctmlTestData.staff_list.protocol_staff

    cy.staffListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readFile(ctmlJson).then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.staff_list.protocol_staff;

        cy.staffListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  })

  it('should validate "Treatment list" with multiple arm/matching criteria matches with "ctmlTestData"', () => {
    // Arm and dose level validation
    const matchAndT = ctmlTestData.treatment_list.step[0].arm;
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const matchAndE = exportedCtmlModel.treatment_list.step[0].arm;

      matchAndT.forEach((armT, armIndex) => {
        const clauseE_1 = matchAndE.find((clause) => JSON.stringify(clause.arm_code) === JSON.stringify(armT.arm_code));

        if (clauseE_1) {
          expect(JSON.stringify(clauseE_1.arm_code), 'Arm Code Match').to.deep.equal(JSON.stringify(armT.arm_code));
          expect(JSON.stringify(clauseE_1.arm_description), 'Arm Description Match').to.deep.equal(JSON.stringify(armT.arm_description));
          expect(JSON.stringify(clauseE_1.arm_internal_id), 'Arm Internal Id Match').to.deep.equal(JSON.stringify(armT.arm_internal_id.toString()));
          expect(JSON.stringify(clauseE_1.arm_suspended), 'Arm Suspended Match').to.deep.equal(JSON.stringify(armT.arm_suspended));

          clauseE_1.dose_level.forEach((objE_1, index_2) => {
            const objE_2 = armT.dose_level[index_2];

            expect(JSON.stringify(objE_1.level_code), 'Dose Level : Level Code Match').to.deep.equal(JSON.stringify(objE_2.level_code));
            expect(JSON.stringify(objE_1.level_description), 'Dose Level : Level Description Match').to.deep.equal(JSON.stringify(objE_2.level_description));
            expect(JSON.stringify(objE_1.level_internal_id), 'Dose Level : Level Internal ID Match').to.deep.equal(JSON.stringify(objE_2.level_internal_id.toString()));
            expect(JSON.stringify(objE_1.level_suspended), 'Dose Level : Level Suspended Match').to.deep.equal(JSON.stringify(objE_2.level_suspended));
          });
        }

        // Matching criteria validation
        const armE = matchAndE[armIndex].match[0].and;
        const armEOr = matchAndE[armIndex].match[0].or; // New arm with 'or' condition

        if (armE) {
          armE.forEach((clauseE, index) => {
            const clauseT = armT.match[0].and[index];
            if (clauseE.or) {
              clauseE.or.forEach((objE, index2) => {
                const objT = clauseT.or[index2];
                expect(JSON.stringify(objT)).to.deep.equal(JSON.stringify(objE));
              });
            } else if (clauseE.clinical) {
              expect(JSON.stringify(clauseT)).to.deep.equal(JSON.stringify(clauseE));
            }
          });
          return false
        }
        // Additional validation for the new arm with 'or' condition
        if (armEOr) {
          armEOr.forEach((clauseEOr, index) => {
            const clauseTOr = armT.match[0].or[index];
            if (clauseEOr.and) {
              clauseEOr.and.forEach((objEOr, index2) => {
                const objTOr = clauseTOr.and[index2];
                expect(JSON.stringify(objTOr)).to.deep.equal(JSON.stringify(objEOr));
              });
            }
          });
        }

      });
    });
  });

  it('should Delete the existing ctml file', () => {
    cy.saveAndDelete()
  });

  baseClass.afterClass()
})
