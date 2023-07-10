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
  getDefaultTextMatchingCriteria,
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
  getTrialNickname,
  getTruncateButton,
  getVariantCategory,
  getVariantClassification,
  selectDraftCtmlStatus, selectTrialGroupButton,
  trialEditorBackButton,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons,
  trialEditorSave, trialGroupxAdmin,
  trialTableDelete,
  trialTableDialogueDeleteBtn,
  trialTableDots,
  trialTableIdColumn, trialTableThreeDots
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
  baseClass.adminTrialGroupx()
 // deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT02503722_Osimertinib
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`
  it('should Delete the Ctml file as a Admin, if the trial exists already', () => {
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()
    let table = cy.get('table tr td')
    table.each(($el) => {
      let ee = $el.text()

      if (ee.includes('Automation')) {
        cy.wrap($el).prev().then(($prevEl) => {
          cy.wrap($prevEl).click();
        });
        trialTableThreeDots().click();
        trialTableDelete().click();
        trialTableDialogueDeleteBtn().click();
        return false;
      }
    })

  });

  //other way
  it.skip('should Delete the Ctml file as a Admin, if the trial exists already', () => {
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()
    //trialTableIdColumn().should('contain',ctmlTestData.nct_id)
    // Check if the ID exists in the table
    if (trialTableIdColumn().contains(ctmlTestData.nct_id)) {
      trialTableIdColumn()
        .contains(ctmlTestData.nct_id)
        .nextUntil('John')
        .then((test) => {
          trialTableIdColumn().contains(ctmlTestData.nct_id).click();
          trialTableThreeDots().click();
          trialTableDelete().click();
          trialTableDialogueDeleteBtn().click();
        });
    } else {
      // The ID is not found, handle the case accordingly
      return false;
    }

  });

  it.skip('should Save CTML File',  () => {
    trialEditorSave().click()
    cy.get('div[class="p-toast p-component p-toast-top-center"] div').should('contain','Trial saved')
    cy.get('.p-toast-icon-close').click()
    trialEditorBackButton().should('be.visible').trigger("click")
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()
    trialTableIdColumn().should('contain',ctmlTestData.nct_id)
  });
})


