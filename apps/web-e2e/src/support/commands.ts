// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

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
  getCtmlStatusDropdownList,
  getClinicalAge, getClinicalDropdown,
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
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon,
  getPrincipalInvestigator,
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
  selectDraftCtmlStatus,
  trialEditorLeftPanelList, getTrialInformationStatus, getMenuItemGenomic
} from './app.po';
import {NCT04293094_testData} from "../fixtures/NCT04293094_testData";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    trialInformation(nctId: string, nickName: string, principalInvestigator: string,ctmlStatus: string,longTitle: string, shortTitle: string, phase: string, ProtocolNumber: string, protocolPurpose: string, status: string): Chainable<Subject>;
    age(ageGroup: string): Chainable<Subject>
    drugList(drugName: string): Chainable<Subject>
    managementGroupList(managementGroupName: string, isPrimary: string): Chainable<Subject>
    siteList(siteName: string, siteStatus: string, coordinatingCenter: string, cancerCenterIRB: string): Chainable<Subject>
    sponsorList(sponsorName: string, principalSponsor: string): Chainable<Subject>
    staffList(firstName: string, lastName: string, email: string, institutionName: string, staffRole: string): Chainable<Subject>
    arm(armCode: any,armDescription: string, armInternalID: any, armSuspended: string): Chainable<Subject>
    doseLevel(levelCode: string, levelDescription: string,levelInternalId: string, levelSuspended: string): Chainable<Subject>
    clickClinical(): Chainable<Subject>
    clickGenomic(): Chainable<Subject>
    clickAnd(): Chainable<Subject>
    clickOr(): Chainable<Subject>
    clickParentNode(indexNum: Number): Chainable<Subject>
    clickChildToggleArrowButton(indexNumber: Number): Chainable<Subject>
  }
}
//
// -- This is a parent command --
// @ts-ignore
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});
// @ts-ignore
Cypress.Commands.add('trialInformation', (nctId,nickName,principalInvestigator,ctmlStatus,longTitle,shortTitle,phase,ProtocolNumber,protocolPurpose,status) => {
  trialEditorLeftPanelList().eq(0).should('contain','Trial Information').click()
  // @ts-ignore
  getTrialId().clear().type(nctId);
  getTrialNickname().clear().type(nickName);
  getPrincipalInvestigator().clear().type(principalInvestigator);
  //ctml status
  getCtmlStatusDropdown().click()
  // cy.wait(1000)
  getCtmlStatusDropdownList().contains(ctmlStatus).click()
  getLongTitle().clear().type(longTitle)
  getShortTitle().clear().type(shortTitle)
  //Phase
  getClickPhase().click()
  getPhaseDropdownList().contains(phase).click()
  getProtocolNumber().clear().type(ProtocolNumber)
  getNCTPurpose().clear().type(protocolPurpose)
  getTrialInformationStatus().type(status)
});
// @ts-ignore
Cypress.Commands.add('age',(ageGroup) => {
  trialEditorLeftPanelList().eq(1).should('contain','Age').click()
  // @ts-ignore
   getAgeGroup().type(ageGroup);
})
// @ts-ignore
Cypress.Commands.add('drugList',(drugName) => {
  trialEditorLeftPanelList().eq(2).should('contain','Drug List').click()
  // @ts-ignore
  getDrugName().type(drugName)
})
// @ts-ignore
Cypress.Commands.add('managementGroupList',(managementGroupName,isPrimary) => {
  trialEditorLeftPanelList().eq(3).should('contain','Management Group List').click()
  // @ts-ignore
  getManagementGroupName().type(managementGroupName)
  if(isPrimary === 'Y') {
    getCheckBoxPrimaryManagementGroup().click().should('have.class','p-checkbox-checked') //This is a primary
  } else {
    getCheckBoxPrimaryManagementGroup().should('have.class','p-checkbox') //This is a primary management group
  }})
// @ts-ignore
Cypress.Commands.add('siteList',(siteName,siteStatus,coordinatingCenter,cancerCenterIRB) => {
  trialEditorLeftPanelList().eq(4).should('contain', 'Site List').click()
  // @ts-ignore
  getSiteName().type(siteName)
  getSiteStatus().type(siteStatus)
  if (coordinatingCenter === 'Y') {
    getCheckBoxCoordinateCenter().click().should('have.class', 'p-checkbox-checked') //This site is a coordinating center.
  } else {
    getCheckBoxCoordinateCenter().eq(1).should('have.class', 'p-checkbox')
  }
  if (cancerCenterIRB === 'Y') {
    getCheckBoxCancerCenterIRB().click().should('have.class', 'p-checkbox-checked') //This site uses cancer center IRB.
  } else {
    getCheckBoxCancerCenterIRB().should('have.class', 'p-checkbox')
  }
})
// @ts-ignore
Cypress.Commands.add('sponsorList',(sponsorName,principalSponsor) => {
  trialEditorLeftPanelList().eq(5).should('contain', 'Sponsor List').click()
  // @ts-ignore
  getSponsorName().type(sponsorName)
  if (principalSponsor === 'Y') {
    getCheckBoxPrincipalSponsor().click().should('have.class', 'p-checkbox-checked') //This sponsor is a principal sponsor.
  } else {
    getCheckBoxPrincipalSponsor().should('have.class', 'p-checkbox')
  }
})

// @ts-ignore
Cypress.Commands.add('staffList',(firstName,lastName,email,institutionName,staffRole) => {
  trialEditorLeftPanelList().eq(6).should('contain','Staff List').click()
  // @ts-ignore
  getProtocolStaffFirstName().type(firstName)
  getProtocolStaffLastName().type(lastName)
  getProtocolStaffEmail().type(email)
  getProtocolStaffInstitutionalName().type(institutionName)
  getProtocolStaffRole().type(staffRole)
  //status not given in json data
  //getProtocolStaffStatus().type(NCT04293094_testData.staff_list.protocol_staff[0].status)
})
// @ts-ignore
Cypress.Commands.add('arm',(armCode,armDescription,armInternalID,armSuspended) => {
  getArmCode().type(String(armCode))
  getArmDescription().type(armDescription)
  getArmInternalId().type(String(armInternalID))
  const arm_suspended = armSuspended
  if(arm_suspended === 'Y') {
    getCheckBoxArmIsSuspended().click().should('have.class','p-checkbox-checked')
  } else if (arm_suspended === 'N'){
    getCheckBoxArmIsSuspended().should('have.class','p-checkbox')
  }
})
// @ts-ignore
Cypress.Commands.add('doseLevel',(levelCode,levelDescription,levelInternalId,levelSuspended) => {
  // @ts-ignore
  getLevelCode().type(levelCode)
  getLevelDescription().type(levelDescription)
  getLevelInternalId().type(String(levelInternalId))
  const level_suspended = levelSuspended
  if( level_suspended === 'Y') {
    getCheckBoxLevelIsSuspended().click().should('have.class','p-checkbox-checked')
  }
  else if(level_suspended === 'N') {
    getCheckBoxLevelIsSuspended().should('have.class','p-checkbox')
  }
})
// @ts-ignore
Cypress.Commands.add('clickClinical',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemClinical().click()
})
// @ts-ignore
Cypress.Commands.add('clickGenomic',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemGenomic().click()
})
// @ts-ignore
Cypress.Commands.add('clickParentNode',(indexNum) => {
  // @ts-ignore
  getLeftMenuComponent().find('span').should('contain','And').eq(indexNum)
  // @ts-ignore
  getLeftMenuComponent().eq(indexNum).trigger('mouseover').invoke('addClass', 'p-menuitem-active').click()
  getTruncateButton().should('be.visible').click()
})
// @ts-ignore
Cypress.Commands.add('clickAnd',() => {
  getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
  getMenuItemAnd().click()
})
// @ts-ignore
Cypress.Commands.add('clickOr',() => {
  getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
  getMenuItemOr().click()
})
// @ts-ignore
Cypress.Commands.add('clickChildToggleArrowButton',(indexNumer) => {
  cy.get(`.p-tree-container>li>ul>li:nth-child(${indexNumer})>div>button`).click()
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
