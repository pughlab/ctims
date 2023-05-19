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
  getNCTPurpose, getPassword,
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
  getTruncateButton, getUserName,
  getVariantCategory,
  getVariantClassification,
  selectDraftCtmlStatus, signInButton,
  trialEditorBackButton,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons,
  trialEditorSave,
  trialTableDelete,
  trialTableDialogueDeleteBtn,
  trialTableDots,
  trialTableEdit, trialTableUsername
} from '../../../support/app.po';
import '../../Base/baseClass.cy'
import {loginCredential} from "../../../fixtures/loginCredential";
import baseClass from "../../Base/baseClass.cy";
describe('Validate the Sign In page', { testIsolation: false }, () => {

  it('should validate valid and invalid login credential', () => {
    cy.visit(Cypress.env('baseUrl'), { timeout: 10000 });
    const loginGroup = loginCredential.login_group;
    loginGroup.forEach((loginData) => {
      const {username, password} = loginData;
      getUserName().clear().type(username);
      getPassword().clear().type(password);
      signInButton().click();

      if (username.trim() === ' ' || password.trim() === ' ') {
        cy.get('.p-toast-message-enter > .p-toast-message-content').should('contain', 'Unauthorized');
      }
    else {
        return true
      }
    })
    trialTableUsername().should('contain','CTIMS Test')
    });
  baseClass.afterClass()
})


