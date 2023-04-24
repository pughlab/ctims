import {
  getAddCriteriaGroup,
  getAddCriteriaList,
  getAddCriteriaToSameGroup, getAddCriteriaToSameList,
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
  getClinicalPRStatus, getClinicalTMB, getCNVCall,
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
  getMenuItemOr, getMSStatus,
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
  getProtocolStaffStatus, getSaveMatchingCriteria,
  getShortTitle,
  getSiteName,
  getSiteStatus,
  getSponsorName,
  getSwitchGroupOperator, getTreeNodeChildren,
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
import {cli} from "cypress";

describe('CTIMS Match criteria Arm 1', () => {
  before(() => cy.visit('/'));
  //deleteDownloadsFolderBeforeAll()
  it('should Validate the match criteria for Arm 1', () => {
    cy.get('#array-item-list-root_treatment_list_step_0_arm>div>div>div>div>div').each(($input, index) => {
      cy.log($input.attr('id'));

      cy.wrap($input).find('.p-inputtext').eq(0).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_code);
      cy.wrap($input).find('.p-inputtext').eq(1).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_description);
      cy.wrap($input).find('.p-inputtext').eq(2).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_internal_id.toString());
      cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_suspended).click();
      //cy.wrap($input).find('.p-inputtext').eq(0).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].dose_level[index].level_code);
    })
   /* NCT03297606_CAPTUR.treatment_list.step[0].arm.forEach((arm,index) => {
      cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]>div>div`).contains('Add Dose' +
        ' Level').click()
*/
      cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_0_dose_level]`).each(($input, index) => {
        cy.log($input.attr('id'));
        cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_code').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_code);
        cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_description').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_description);
        cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_internal_id').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_internal_id.toString());
        cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_suspended').contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_suspended).click();

        // })
    });
      //click first matching criteria link of Arm 1
    cy.get('.CtimsMatchingCriteriaWidget_edit-matching-criteria-container__MFwrC').eq(0).click()

    getAddCriteriaGroup().click()

    //******** OR ********************
    cy.clickParentAnd()
    cy.clickOr()
    //Click Or Parent at index 1
    cy.clickParentNode(1).click()
    // cy.clickChildOr()
    let orConditions = NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[0].or
    cy.log(JSON.stringify(orConditions))
    cy.log(orConditions.length.toString())
    cy.clickGenomic()
    cy.clickChildToggleArrowButton(1)
    // cy.clickParentNode(2).click()
   // getLeftMenuComponent().eq(2).click()
    cy.clickMultipleFunction(getAddCriteriaToSameList(),orConditions.length-1)
    let subChildren = cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li')
    subChildren.find('.p-treenode-children>li')
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
   // getSaveMatchingCriteria().click()

  //******** Add clinical at Parent AND ********************
  cy.clickParentNode(0).click()
  //cy.clickAnd()
  cy.clickClinical()
    getClinicalAge().type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[1].clinical.age_numerical)
      getClinicalOncotreePrimaryDiagnosis().type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[1].clinical.oncotree_primary_diagnosis)
    getSaveMatchingCriteria().click()
  })
})
