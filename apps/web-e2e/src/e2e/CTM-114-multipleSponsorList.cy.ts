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
  getClinicalAge, getClinicalDropdown,
  getClinicalERStatus,
  getClinicalHER2Status,
  getClinicalOncotreePrimaryDiagnosis,
  getClinicalPRStatus,
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
  getMenuItemOr,
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
  getProtocolStaffStatus,
  getShortTitle,
  getSiteName,
  getSiteStatus,
  getSponsorName,
  getSwitchGroupOperator,
  getTrialId,
  getTrialNickname,
  getTruncateButton,
  getVariantCategory, getVariantClassification,
  selectDraftCtmlStatus, trialEditorExportCtml, trialEditorHeaderButtons,
  trialEditorLeftPanelList, trialEditorRadioButtons
} from '../support/app.po';
//import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT03297606_CAPTUR} from "../fixtures/NCT03297606_CAPTUR"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import {doc} from "prettier";
import breakParent = doc.builders.breakParent;

describe('CTIMS Trial Editor', () => {
  before(() => cy.visit('/'));
  //deleteDownloadsFolderBeforeAll()
  it('should Validate the Trial Editor Page with valid test data', () => {


     //Sponsor List
    cy.clickMultiple('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle',
      NCT03297606_CAPTUR.sponsor_list.sponsor.length-1)

   /* cy.get('[id^=root_sponsor_list_sponsor]').each((inputGroup, index) => {
      const sponsor = NCT03297606_CAPTUR.sponsor_list.sponsor[index];

      if (sponsor) {
        const sponsorName = sponsor.sponsor_name;
        const isPrincipalSponsor = sponsor.is_principal_sponsor;
    // Enter the sponsor name into the corresponding text box
        const textBox = cy.wrap(inputGroup).find('#root_sponsor_list_sponsor_' + index + '_sponsor_name');
        textBox.type(sponsorName);
        cy.wait(1000);

       /!* // Enter the sponsor name into the corresponding text box
        const textBox = cy.wrap(inputGroup).find('.p-inputtext').eq(index);
        textBox.type(sponsorName);
        cy.wait(1000);*!/

        // Click on the corresponding button
      /!*  const button = cy.wrap(inputGroup).find('root_sponsor_list_sponsor_' + index + '_is_principal_sponsor');
        button.contains(isPrincipalSponsor).click();
        cy.wait(1000);*!/
      }
    });*/
   // cy.clickMultiple('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle',
    // NCT03297606_CAPTUR.sponsor_list.sponsor.join('').split(',').length-1)
//text box and button
    /*cy.get('[id^=root_sponsor_list_sponsor]').each((allVal,index) => {
      cy.log(`Value ${index}: ${allVal.attr('id')}`)
      cy.log('outside loop')
    })*/
     /* // @ts-ignore
     // if(allVal.find('.p-inputtext') === true) {
      if (NCT03297606_CAPTUR.sponsor_list.sponsor[index]) {

        cy.log('inside loop')
        const tt = allVal.attr('id').includes('.p-inputtext')
        cy.wrap(allVal).contains('.p-inputtext').type(NCT03297606_CAPTUR.sponsor_list.sponsor[index].sponsor_name);

       // return false
      }
     // else if (allVal.find('.p-selectbutton')) {
       if(NCT03297606_CAPTUR.sponsor_list.sponsor[index]) {
          cy.wrap(allVal).find('.p-selectbutton').contains(NCT03297606_CAPTUR.sponsor_list.sponsor[index].is_principal_sponsor).click()
//return false
      }
    })*/
  /*  //contain all the sponsor list buttons
    cy.get('[id^=root_sponsor_list_sponsor].p-selectbutton').each((input, index) => {
      // check if there is a corresponding value in the array
      if (NCT03297606_CAPTUR.sponsor_list.sponsor[index]) {
        // enter the value into the text box
        cy.wrap(input).contains(NCT03297606_CAPTUR.sponsor_list.sponsor[index].is_principal_sponsor).click();
        // cy.wait(1000)
      }
    })*/

    /*cy.get('[id^=root_sponsor_list_sponsor]').each((allVal,index) => {
          cy.log(`Value ${index}: ${allVal.attr('id')}`)
          cy.log('outside loop')
        })*/

    //working code independently

  // cy.clickMultiple('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle',
    //NCT03297606_CAPTUR.sponsor_list.sponsor.join('').split(',').length-1)
    //contains all the sponsor list text box
    cy.get('[id^=root_sponsor_list_sponsor].p-inputtext').each((input, index) => {
    // check if there is a corresponding value in the array
    if (NCT03297606_CAPTUR.sponsor_list.sponsor[index]) {
      // enter the value into the text box
      cy.wrap(input).type(NCT03297606_CAPTUR.sponsor_list.sponsor[index].sponsor_name);
     // cy.wait(1000)
    }
    })
    //contain all the sponsor list buttons
    cy.get('[id^=root_sponsor_list_sponsor].p-selectbutton').each((input, index) => {
     // check if there is a corresponding value in the array
     if (NCT03297606_CAPTUR.sponsor_list.sponsor[index]) {
       // enter the value into the text box
       cy.wrap(input).contains(NCT03297606_CAPTUR.sponsor_list.sponsor[index].is_principal_sponsor).click();
       //cy.wait(1000)
     }
    })


  })

})
