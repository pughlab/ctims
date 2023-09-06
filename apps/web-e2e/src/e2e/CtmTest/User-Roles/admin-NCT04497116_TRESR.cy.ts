import {
  createCTMLButton,
  getAddArmPlusIcon,
  getAddCriteriaGroup,
  getAddCriteriaToSameList,
  getClinicalAge,
  getClinicalOncotreePrimaryDiagnosis,
  getCNVCall,
  getDrugNamePlusIcon,
  getDrugNameTextBoxMultiple,
  getEditMatchingCriteriaMultiple,
  getGenomicDropDown,
  getHugoSymbol,
  getLeftMenuComponent,
  getManagementGroupNameTextBoxMultiple,
  getMatchCriteriaHeader,
  getMultipleArm,
  getPreviewWindow,
  getPrimaryManagementGroupPlusIcon,
  getPriorTreatmentRequirementMultiple,
  getPriorTreatmentRequirementPlusIconMultiple,
  getProteinChange,
  getProtocolStaffMultiple,
  getProtocolStaffPlusIcon,
  getSaveMatchingCriteria,
  getSiteNameMultiple,
  getSiteNamePlusIcon,
  getSponsorNameMultiple,
  getSponsorNamePlusIcon,
  getSubGroup,
  getTruncateButton,
  getVariantCategory,
  getVariantClassification,
  getWildType,
  selectTrialGroupButton, sendCTMLOkButton, sendCtmlToMatcher,
  trialEditorBackButton,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons,
  trialEditorSave,
  trialGroupxAdmin,
  trialTableDelete,
  trialTableDialogueDeleteBtn, trialTableEdit,
  trialTableIdColumn, trialTableThreeDots, validateCtmlOkButton
} from '../../../support/app.po';
import {NCT03114319_TNO155} from "../../../fixtures/NCT03114319_TNO155"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import baseClass from "../../Base/baseClass.cy";
import dateClass from "../../Base/dateClass.cy";
import {NCT04497116_TRESR} from "../../../fixtures/NCT04497116_TRESR";
let exportJsonFile = 'NCT04497116-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');

describe('As a admin, validate CTIMS Trial Editor "NCT04497116_TRESR"',{ testIsolation: false },() => {
  baseClass.adminTrialGroupx()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT04497116_TRESR
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`

  it('should "Delete" the existing NCT04497116_TRESR as trialgroupx Admin', () => {
    cy.deleteExistingTrial('NCT04497116_TRESR TrialGroupx Admin role')
  })

  it('should enter values into the "Trial Editor Form" of "NCT04497116_TRESR" as Admin', () => {
    createCTMLButton().should('not.have.class', 'p-disabled').click()
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
   /* cy.trialInformation(ctmlTestData.nct_id,
      "NCT04497116_TRESR TrialGroupx Admin role",
      "Srimathi",
      "Draft",
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no,
      ctmlTestData.nct_purpose,
      ctmlTestData.status)*/
  })

  //**************Prior Treatment Requirement
 /* it('should enter the Prior Treatment Requirement values of NCT04497116_TRESR as Admin', () => {
    trialEditorLeftPanelList().eq(1).should('contain', 'Prior Treatment Requirements').click()
    cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(), ctmlTestData.prior_treatment_requirements.length)
    getPriorTreatmentRequirementMultiple().each((input, index) => {
      if (ctmlTestData.prior_treatment_requirements[index]) {
        cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
      }
    })
  });

  //!************** Age ***************

  it('should enter the Age values of NCT04497116_TRESR as Admin', () => {
    trialEditorLeftPanelList().eq(2).should('contain', 'Age').click()
    cy.age(ctmlTestData.age)
  });

  //!************** Drug List ***************

  it('should enter the Drug List values of NCT04497116_TRESR as Admin', () => {
    trialEditorLeftPanelList().eq(3).should('contain', 'Drug List').click()
    cy.clickMultipleFunction(getDrugNamePlusIcon(), ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
      }
    })
  });

  //!************** Management Group List ***************

  it('should enter the Management Group List values of NCT04497116_TRESR as Admin', () => {
    trialEditorLeftPanelList().eq(4).should('contain', 'Management Group List').click()
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
    });
  })


  //!************** Site List ***************

  it('should enter the Site List values of NCT04497116_TRESR as Admin', () => {
    trialEditorLeftPanelList().eq(5).should('contain', 'Site List').click()
    cy.clickMultipleFunction(getSiteNamePlusIcon(), ctmlTestData.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      const site = ctmlTestData.site_list.site[index]
      cy.fillSiteDetails($input, site)
    })
  });

  //!************** Sponsor List ***************

  it('should enter the Sponsor List values of NCT04497116_TRESR as Admin', () => {
    trialEditorLeftPanelList().eq(6).should('contain', 'Sponsor List').click()
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });
  });

  //!************** Staff List ***************

  it('should enter the Staff List values of NCT04497116_TRESR as Admin', () => {
    trialEditorLeftPanelList().eq(7).should('contain', 'Staff List').click()
    cy.clickMultipleFunction(getProtocolStaffPlusIcon(), ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      const staff = ctmlTestData.staff_list.protocol_staff[index]
      cy.fillProtocolStaffDetails($input, staff)
    });
  });*/

  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1', () => {
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    //delete the dose level
    cy.get('#array-item-list-root_treatment_list_step_0_arm_0_dose_level').children().find('.pi-trash').click()

    cy.clickMultipleFunction(getAddArmPlusIcon(), ctmlTestData.treatment_list.step[0].arm.length - 1)
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if(index === 0) {
       // cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
     //   getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************
        cy.clickParentAnd()
        let andConditions = ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0]
        cy.enterAndClinical(andConditions);

        cy.clickMatchAllGenomic()
        getSaveMatchingCriteria().click()
      }
    })
  })
  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1', () => {
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    //delete the dose level

    cy.clickMultipleFunction(getAddArmPlusIcon(), ctmlTestData.treatment_list.step[0].arm.length - 1)
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if(index === 1) {
         cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        //   getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************
        cy.clickParentAnd()
        cy.clickOr()
        let orCondition = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[0].or
        cy.clickParentNode(1)
        cy.enterGenomicConditions(orCondition)

      }
    })
  })


})
