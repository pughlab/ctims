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
  trialEditorLeftPanelList,
  getTrialInformationStatus,
  getMenuItemGenomic,
  getPrimaryManagementGroup,
  getDefaultTrialEditorDropDown,
  getCoordinatingCenter,
  getCancerCenterIRB,
  getPrincipalSponsor,
  getArmSuspended,
  getLevelSuspended,
  getPriorTreatmentRequirement,
  getPriorTreatmentRequirementPlusIcon,
  getPriorTreatmentRequirementRegularExpression, getAddCriteriaToSameList
} from './app.po';
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT04293094_testData} from "../e2e/IndividualTest/NCT04293094_testData";
import {NCT03297606_CAPTUR} from "../fixtures/NCT03297606_CAPTUR";
//import { ctmlModel } from '../support/models/ctml-model';

//require('cypress-delete-downloads-folder').addCustomCommand();

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
  getTrialInformationStatus().click()
  getDefaultTrialEditorDropDown().contains(status).click()
});

Cypress.Commands.add('priorTreatmentRequirement',(priorRequirement: string) => {
  trialEditorLeftPanelList().eq(1).should('contain','Prior Treatment Requirements').click()
  getPriorTreatmentRequirementPlusIcon().click()
  getPriorTreatmentRequirement().click().type(priorRequirement)
})


Cypress.Commands.add('priorTreatmentRequirementRepeatingGroup',(priorRequirement) => {
  getPriorTreatmentRequirementPlusIcon().click()
  cy.get('[id^="root_prior_treatment_requirements_"]').each(($el,index) => {
   const val = $el.attr('id')
    cy.log('Attribute value',val)
    cy.log('index', String(index))
    cy.log('we are at ',$el)
    cy.wait(1000)
    if(val.includes('root_prior_treatment_requirements_0') ) {
      cy.wait(1000)
      cy.log('are we at index 0?')
      getPriorTreatmentRequirementRegularExpression().eq(0).click().type(priorRequirement)
      cy.log('text box1 contains',priorRequirement)
    }
     if(val.includes('root_prior_treatment_requirements_1') ) {
      cy.wait(1000)
      getPriorTreatmentRequirementRegularExpression().eq(1).click().type(priorRequirement)
       cy.log('text box2 contains',priorRequirement)
    }
   if(val.includes('root_prior_treatment_requirements_2') ) {
      cy.wait(1000)
      getPriorTreatmentRequirementRegularExpression().eq(2).click().type(priorRequirement)
      cy.log('text box3 contains',priorRequirement)
   }
     })
})

Cypress.Commands.add('age',(ageGroup: string) => {
  trialEditorLeftPanelList().eq(2).should('contain','Age').click()
   getAgeGroup().type(ageGroup);
})

Cypress.Commands.add('drugList',(drugName: string) => {
  trialEditorLeftPanelList().eq(3).should('contain','Drug List').click()
  getDrugName().type(drugName)
})

Cypress.Commands.add('clickMultiple',(selector, times) => {
  for (let i = 0; i < times; i++) {
    cy.get(selector).click();
  }
})
Cypress.Commands.add('clickMultipleFunction',(selector, times) => {
  for (let i = 0; i < times; i++) {
    selector.click({force: true});
  }
})
Cypress.Commands.add('clickMultipleArm',(selector, times) => {
  for (let i = 0; i < times; i++) {
    selector.contains('Add arm').click({force: true});
  }
})

Cypress.Commands.add('clickMultipleDose', (armIndex, doses) => {
  for (let i = 1; i <= doses; i++) {
    cy.get("div[id$='dose_level']>div>i:nth-child(1)").eq(armIndex).click()
  }
});

Cypress.Commands.add('managementGroupList',(managementGroupName: string, isPrimary: string) => {
  trialEditorLeftPanelList().eq(4).should('contain','Management Group List').click()
  getManagementGroupName().click()
  getDefaultTrialEditorDropDown().contains(managementGroupName).click()
    //.type(managementGroupName)
  getPrimaryManagementGroup().contains(isPrimary).click()
  getPrimaryManagementGroup().should('contain',isPrimary)
})

Cypress.Commands.add('siteList',(siteName,
                                 siteStatus,
                                 coordinatingCenter,
                                 cancerCenterIRB) => {
  trialEditorLeftPanelList().eq(5).should('contain', 'Site List').click()
  getSiteName().click()
  getDefaultTrialEditorDropDown().contains(siteName).click()
    //.type(siteName)
  getSiteStatus().click()
  getDefaultTrialEditorDropDown().contains(siteStatus).click()
    //.type(siteStatus)
  getCoordinatingCenter().contains(coordinatingCenter).click()
  getCoordinatingCenter().should('contain',coordinatingCenter)
  getCancerCenterIRB().contains(cancerCenterIRB).click()
  getCancerCenterIRB().should('contain',cancerCenterIRB)
})

Cypress.Commands.add('sponsorList',(sponsorName: string,principalSponsor: string) => {
  trialEditorLeftPanelList().eq(6).should('contain', 'Sponsor List').click()
  getSponsorName().type(sponsorName)
  getPrincipalSponsor().contains(principalSponsor).click()
  getPrincipalSponsor().should('contain',principalSponsor)
})

Cypress.Commands.add('staffList',(firstName,
                                  lastName,
                                  email,
                                  institutionName,
                                  staffRole) => {
  trialEditorLeftPanelList().eq(7).should('contain','Staff List').click()
  getProtocolStaffFirstName().type(firstName)
  getProtocolStaffLastName().type(lastName)
  getProtocolStaffEmail().type(email)
  getProtocolStaffInstitutionalName().click()
  getDefaultTrialEditorDropDown().contains(institutionName).click()
  getProtocolStaffRole().click()
  getDefaultTrialEditorDropDown().contains(staffRole).click()
   })

Cypress.Commands.add('arm',(armCode,armDescription,armInternalID,armSuspended) => {
  trialEditorLeftPanelList().eq(8).should('contain','Treatment List').click()
  getArmCode().type(String(armCode))
  getArmDescription().type(armDescription)
  getArmInternalId().type(String(armInternalID))
  getArmSuspended().contains(armSuspended).click()
  getArmSuspended().should('contain',armSuspended)
})

Cypress.Commands.add('doseLevel',(levelCode,levelDescription,levelInternalId,levelSuspended) => {
  getLevelCode().type(levelCode)
  getLevelDescription().type(levelDescription)
  getLevelInternalId().type(String(levelInternalId))
  getLevelSuspended().contains(levelSuspended).click()
  getLevelSuspended().should('contain',levelSuspended)
})

Cypress.Commands.add('clickClinical',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemClinical().click()
})

Cypress.Commands.add('clickGenomic',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemGenomic().click()
})
Cypress.Commands.add('clickParentAnd',() => {
  getLeftMenuComponent().find('span').should('contain','And')
  getLeftMenuComponent().trigger('mouseover').invoke('addClass', 'p-menuitem-active').click()
  getTruncateButton().should('be.visible').click()
})
//All parents child
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

Cypress.Commands.add('clickChildToggleArrowButton',(indexNumber) => {
  cy.get(`.p-tree-container>li>ul>li:nth-child(${indexNumber})>div>button`).click()
})

Cypress.Commands.add('validateExportJsonAndTestData', (testDataValue) => {
    let rawData: string[] = testDataValue
    cy.log("Original Test Data", JSON.stringify(rawData)) //has all the array value
})
Cypress.Commands.add('compareArrays', (actual, expected) => {
  actual.forEach((value, index) => {
    const expectedValue = expected[index]
    expect(value,"Actual value").to.deep.equal(expectedValue,"Expected Value")
  })
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
