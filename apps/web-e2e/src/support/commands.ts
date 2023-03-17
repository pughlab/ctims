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

//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});

Cypress.Commands.add('trialInformation', (nctId: string,
                                          nickName: string,
                                          principalInvestigator: string,
                                          ctmlStatus: string,
                                          longTitle: string,
                                          shortTitle: string,
                                          phase: string,
                                          ProtocolNumber: string,
                                          protocolPurpose: string,
                                          status: string) => {
  trialEditorLeftPanelList().eq(0).should('contain','Trial Information').click()
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

Cypress.Commands.add('age',(ageGroup: string) => {
  trialEditorLeftPanelList().eq(1).should('contain','Age').click()
   getAgeGroup().type(ageGroup);
})

Cypress.Commands.add('drugList',(drugName: string) => {
  trialEditorLeftPanelList().eq(2).should('contain','Drug List').click()
  getDrugName().type(drugName)
})

Cypress.Commands.add('managementGroupList',(managementGroupName: string, isPrimary: string) => {
  trialEditorLeftPanelList().eq(3).should('contain','Management Group List').click()
  getManagementGroupName().type(managementGroupName)
  if(isPrimary === 'Y') {
    getCheckBoxPrimaryManagementGroup().click().should('have.class','p-checkbox-checked') //This is a primary
  } else {
    getCheckBoxPrimaryManagementGroup().should('have.class','p-checkbox') //This is a primary management group
  }})

Cypress.Commands.add('siteList',(siteName,
                                 siteStatus,
                                 coordinatingCenter,
                                 cancerCenterIRB) => {
  trialEditorLeftPanelList().eq(4).should('contain', 'Site List').click()
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

Cypress.Commands.add('sponsorList',(sponsorName: string,principalSponsor: string) => {
  trialEditorLeftPanelList().eq(5).should('contain', 'Sponsor List').click()
  getSponsorName().type(sponsorName)
  if (principalSponsor === 'Y') {
    getCheckBoxPrincipalSponsor().click().should('have.class', 'p-checkbox-checked') //This sponsor is a principal sponsor.
  } else {
    getCheckBoxPrincipalSponsor().should('have.class', 'p-checkbox')
  }
})

Cypress.Commands.add('staffList',(firstName,
                                  lastName,
                                  email,
                                  institutionName,
                                  staffRole) => {
  trialEditorLeftPanelList().eq(6).should('contain','Staff List').click()
  getProtocolStaffFirstName().type(firstName)
  getProtocolStaffLastName().type(lastName)
  getProtocolStaffEmail().type(email)
  getProtocolStaffInstitutionalName().type(institutionName)
  getProtocolStaffRole().type(staffRole)
  //status not given in json data
  //getProtocolStaffStatus().type(NCT04293094_testData.staff_list.protocol_staff[0].status)
})

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

Cypress.Commands.add('doseLevel',(levelCode,levelDescription,levelInternalId,levelSuspended) => {
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

Cypress.Commands.add('clickClinical',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemClinical().click()
})

Cypress.Commands.add('clickGenomic',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemGenomic().click()
})

Cypress.Commands.add('clickParentNode',(indexNum: number) => {
  getLeftMenuComponent().find('span').should('contain','And').eq(indexNum)
  getLeftMenuComponent().eq(indexNum).trigger('mouseover').invoke('addClass', 'p-menuitem-active').click()
  getTruncateButton().should('be.visible').click()
})

Cypress.Commands.add('clickAnd',() => {
  getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
  getMenuItemAnd().click()
})

Cypress.Commands.add('clickOr',() => {
  getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
  getMenuItemOr().click()
})

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
