import {
  getClickPhase,
  getLongTitle, getNCTPurpose, getPhaseDropdownList,
  getPrincipalInvestigator, getProtocolNumber, getShortTitle,
  getTrialId,
  getTrialNickname,
  selectDraftCtmlStatus
} from '../../support/app.po';

describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // Function helper example, see `../support/app.po.ts` file
    //cy.pause();
    getTrialId().type('ABC-123');
    getTrialNickname().type('My Trial');
    getPrincipalInvestigator().type('Dr. John Doe');
    selectDraftCtmlStatus();
    getLongTitle().type('hello')
    getShortTitle().type('welcome')
    getClickPhase().click()
    getPhaseDropdownList().eq(0).click()
    getProtocolNumber().type('1234')
    getNCTPurpose().type('sdsdsds')
  });
});
