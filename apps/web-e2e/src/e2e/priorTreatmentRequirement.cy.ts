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
  getClinicalAge,
  getClinicalDropdown,
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
  getManagementGroupName,
  getMatchingCriteriaTableHeader,
  getMatchModalFooterButtons,
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon,
  getPrincipalInvestigator,
  getPriorTreatmentRequirementPlusIcon,
  getPriorTreatmentRequirementRegularExpression,
  getProteinChange,
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
  getVariantClassification,
  selectDraftCtmlStatus,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons
} from '../support/app.po';
//import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';

describe('CTIMS Trial Editor', () => {
  before(() => cy.visit('/'));
  //deleteDownloadsFolderBeforeAll()
  /*it.skip('should Validate the Trial Editor Page with valid test data', () => {
    // Prior treatment requirements
    cy.priorTreatmentRequirement(NCT02503722_Osimertinib.prior_treatment_requirements[0])
    getPriorTreatmentRequirementPlusIcon().click()
    cy.priorTreatmentRequirementRepeatingGroup(NCT02503722_Osimertinib.prior_treatment_requirements[1])
    cy.get('.ctimsPanelHeaderOther>div>button').click({multiple: true})
    getPriorTreatmentRequirementPlusIcon().click()
    cy.priorTreatmentRequirementRepeatingGroup(NCT02503722_Osimertinib.prior_treatment_requirements[2])
    cy.get('.ctimsPanelHeaderOther>div>button').click({multiple: true})
  })*/

  it('should Validate the Trial Editor Page with valid test data', () => {
    // Prior treatment requirements
    //getPriorTreatmentRequirementPlusIcon().click()
    let isFirstValueEntered = false;
    NCT02503722_Osimertinib.prior_treatment_requirements.forEach((requirement) => {
      if (isFirstValueEntered) {
        return;
      }
      cy.log('Test Data Requirement:', requirement)
      // getPriorTreatmentRequirementRegularExpression.
      cy.priorTreatmentRequirementRepeatingGroup(requirement)

    })

    /*cy.priorTreatmentRequirement(NCT02503722_Osimertinib.prior_treatment_requirements[0])
    getPriorTreatmentRequirementPlusIcon().click()
    cy.priorTreatmentRequirementRepeatingGroup(NCT02503722_Osimertinib.prior_treatment_requirements[1])
    cy.get('.ctimsPanelHeaderOther>div>button').click({multiple: true})
    getPriorTreatmentRequirementPlusIcon().click()
    cy.priorTreatmentRequirementRepeatingGroup(NCT02503722_Osimertinib.prior_treatment_requirements[2])
    cy.get('.ctimsPanelHeaderOther>div>button').click({multiple: true})*/
  })
  it.skip('should ', () => {
    let isFirstValueEntered = false;
    NCT02503722_Osimertinib.prior_treatment_requirements.forEach((priorRequirement) => {
      if (isFirstValueEntered) {
        return;
      }
      getPriorTreatmentRequirementPlusIcon().click()

      cy.get('[id^="root_prior_treatment_requirements_"]').each(($el,index) => {
        const val = $el.attr('id');
       // if (val.includes('root_prior_treatment_requirements_0')) {
        if(index === 0) {
          cy.wait(1000);
          cy.log('are we at index 0?');
          getPriorTreatmentRequirementRegularExpression().contains('root_prior_treatment_requirements_0').click().type(priorRequirement);
          cy.log('text box1 contains', priorRequirement);
          isFirstValueEntered = true;
          return false;
        }
        //else if (val.includes('root_prior_treatment_requirements_1')) {
        if(index === 1) {
          cy.wait(1000);
          getPriorTreatmentRequirementRegularExpression().contains('#root_prior_treatment_requirements_1').click().type(priorRequirement);
          cy.log('text box2 contains', priorRequirement);
          isFirstValueEntered = true;
          return false;
        }
       // else if (val.includes('root_prior_treatment_requirements_2')) {
        if(index === 2) {
          cy.wait(1000);
          getPriorTreatmentRequirementRegularExpression().contains('root_prior_treatment_requirements_2').click().type(priorRequirement);
          cy.log('text box3 contains', priorRequirement);
          isFirstValueEntered = true;
          return false;
        }
      });
      if (isFirstValueEntered) {
        // @ts-ignore
        //break;
        return
      }
    });
  })

  it.skip('should validate the match of the "Prior treatment requirement" values',  () => {
    cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf8').then((downloadData) => {
      const exportData= downloadData.prior_treatment_requirements
      let testData = NCT02503722_Osimertinib.prior_treatment_requirements
      cy.compareArrays(exportData,testData)
    })
  });
})


