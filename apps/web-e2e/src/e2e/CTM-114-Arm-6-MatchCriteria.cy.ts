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
  getClinicalPRStatus, getClinicalTMB,
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
} from '../support/app.po';
//import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT03297606_CAPTUR} from "../fixtures/NCT03297606_CAPTUR"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import {doc} from "prettier";
import breakParent = doc.builders.breakParent;
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {cli} from "cypress";

describe('CTIMS Match criteria', () => {
  before(() => cy.visit('/'));
  //deleteDownloadsFolderBeforeAll()
  it('should Validate the match criteria for Arm 6', () => {
    cy.get('#array-item-list-root_treatment_list_step_0_arm').contains('Add arm').click()
    //click first matching criteria link of Arm 6
    cy.get('.CtimsMatchingCriteriaWidget_edit-matching-criteria-container__MFwrC').eq(1).click()
    getAddCriteriaGroup().click()
    //******** OR ********************

    cy.clickParentAnd()
    cy.clickOr()
    //Click Or Parent at index 1
    cy.clickParentNode(1).click()
    // cy.clickChildOr()
    let orConditions = NCT03297606_CAPTUR.treatment_list.step[0].arm[1].match[0].and[0].or
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
    //******** AND ********************
    cy.clickParentNode(0)
    cy.clickAnd()
    cy.clickParentNode(4)
    cy.clickClinical()
    cy.clickChildToggleArrowButton(2)
    // cy.wait(1000)
    let clinicalLength = NCT03297606_CAPTUR.treatment_list.step[0].arm[1].match[0].and[1].and.length-1
    cy.clickMultipleFunction(getAddCriteriaToSameList(),clinicalLength)

    let andConditions = NCT03297606_CAPTUR.treatment_list.step[0].arm[1].match[0].and[1].and
    subChildren = cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li')
    subChildren.contains('And').find('.p-treenode-children>li').each((childElement, index) => {
      cy.log(index.toString())

      if (Cypress.$(childElement).length > 0) {
        cy.wrap(childElement).click() // click on each child element
        let condition = andConditions[index % andConditions.length]; // get the corresponding and condition
        //andConditions.forEach(condition => { // get the corresponding and condition
        cy.log(andConditions.length.toString())
        Object.entries(condition.clinical).map(([key, value]) => {
          if (key === 'age_numerical') {
            getClinicalAge().type(value)
          }
          if (key === 'oncotree_primary_diagnosis') {
            getClinicalOncotreePrimaryDiagnosis().type(value)
          }
          if (key === 'tmb') {
            getClinicalTMB().type(value)
          }
        })
      } else {
        return false;
      }
    })
    getSaveMatchingCriteria().click()


    /*cy.clickParentAnd()
    cy.clickOr()
    cy.clickChildOr()
    //Enter first genomic value
    getHugoSymbol().type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[0].or[0].genomic.hugo_symbol)
    getVariantCategory().click().contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[0].or[0].genomic.variant_category).click()
    //Enter Second genomic value
    getLeftMenuComponent().eq(3).click()
    getHugoSymbol().type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[0].or[1].genomic.hugo_symbol)
    getVariantCategory().click().contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[0].or[1].genomic.variant_category).click()
    cy.clickParentNode(0)
    //getLeftMenuComponent().eq(0).click()
    cy.wait(1000)
    cy.clickAnd()

    //Click And at index 4
    cy.clickParentNode(4)
    cy.clickClinical()
    cy.clickChildToggleArrowButton(4)
    getLeftMenuComponent().eq(5).click()
*/
    /*let clinicalLength = NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[1].and.length-1
    cy.clickMultipleFunction(getAddCriteriaToSameList(),clinicalLength)

   // getTreeNodeChildren().each((groupOfChild,index) => {
   //cy.log(groupOfChild.)
     // groupOfChild.eq(2)
    let subChildren = cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li')
    let andConditions = NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[1].and
    andConditions.forEach(condition => {
      subChildren.contains('And').find('.p-treenode-children>li')
        .each((childElement, index) => {
          if (Cypress.$(childElement).length > 0) {
            cy.wrap(childElement).click() // click on each child element
            let condition = andConditions[index % andConditions.length]; // get the corresponding and condition

            Object.entries(condition.clinical).forEach(([key, value]) => {
              if (key === 'age_numerical') {
                getClinicalAge().type(value)
              }
              if (key === 'oncotree_primary_diagnosis') {
                getClinicalOncotreePrimaryDiagnosis().type(value)
              }
              if (key === 'tmb') {
                getClinicalTMB().type(value)
              }
            })
          } else {
            return false;
          }
        })
    })
*/
      })

})
