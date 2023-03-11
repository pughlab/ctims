export const getTrialId = () => cy.get('#root_trialInformation_trial_id');
export const getTrialNickname = () => cy.get('#root_trialInformation_nickname');
export const getPrincipalInvestigator = () => cy.get('#root_trialInformation_principal_investigator')


//Dropdown button for Ctml Status
const clickCtmlStatusDropdown = () => cy.get('#root_trialInformation_ctml_status > .p-dropdown-trigger').click();
const selectCtmlStatus = () => cy.get('[aria-label="Draft"]').click();

export const selectDraftCtmlStatus = () => {
  clickCtmlStatusDropdown();
  selectCtmlStatus();
}
