import {
  createCTMLButton, ctimsUserTapestryMember,
  ctimsUserTrialGroupxMember,
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
  getMatchModalFooterButtons, getMemberValidateModal,
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
  getTruncateButton, getValidateButton,
  getVariantCategory,
  getVariantClassification,
  selectDraftCtmlStatus,
  selectTrialGroupButton, sendCTMLOkButton, sendCtmlToMatcher,
  trialEditorBackButton,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons,
  trialEditorSave,
  trialGroupxAdmin,
  trialTableDelete,
  trialTableDialogueDeleteBtn,
  trialTableDots,
  trialTableEdit,
  trialTableIdColumn,
  trialTableThreeDots,
  validateButton,
  validateCtmlCancelButton,
  validateCtmlOkButton,
  validateOkButton
} from '../../../support/app.po';
import {NCT02503722_Osimertinib} from "../../../fixtures2/NCT02503722_Osimertinib"
import baseClass from "../../Base/baseClass.cy"
import dateClass from "../../Base/dateClass.cy";
import * as yaml from 'js-yaml';
import customCommands from "../../Base/customCommands.cy";
let exportJsonFile = 'NCT02503722_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');
let age;
let priorTreatmentRequirement;
let drugName;
let managementGroupNameAttribute;
let managementGroupNameIsPrimaryAttribute;
let site;
let sponsorName;
let isPrincipalSponsor;
let staff;
const ctmlTestData = NCT02503722_Osimertinib
const ctmlJson = `./cypress/downloads/${jsonFile}`
const ctmlYaml = `./cypress/downloads/${yamlFile}`
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');

describe('Validate as TrialGroupx member on "NCT02503722_Osimertinib" ', { testIsolation: false }, () => {
  baseClass.ctimsTestUser();
  deleteDownloadsFolderBeforeAll()

  it('should "Delete" the existing Ctml file "NCT02503722" as Member', () => {
    cy.deleteTrialMember('NCT02503722_Osimertinib TrialGroupx Member')
  })
  it('should validate "Create CTML" button in Trials table', () => {
    createCTMLButton().should('not.have.class', 'p-disabled').click()
  })

  it('should enter values into the "Trial Editor Form" of "NCT02503722_Osimertinib" as Member', () => {
    customCommands.enterTrialInformation(ctmlTestData.nct_id,
      "NCT02503722_Osimertinib TrialGroupx Member",
      "John Doe",
      "Draft",
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no,
      ctmlTestData.nct_purpose,
      ctmlTestData.status)
  })

  //**************Prior Treatment Requirement
  it('should enter the Prior Treatment Requirement values of NCT02503722_Osimertinib as Member', () => {
    customCommands.enterPriorTreatmentRequirements(ctmlTestData, priorTreatmentRequirement)
  });

  //!************** Age ***************

  it('should enter the Age values of NCT02503722_Osimertinib as Member', () => {
    customCommands.enterAgeValues(ctmlTestData,age)
  });

  //!************** Drug List ***************
  it('should enter the Drug List values of NCT02503722_Osimertinib as Member', () => {
    customCommands.enterDrugListValues(ctmlTestData, drugName)
  });

  //!************** Management Group List ***************
  it('should enter the Management Group List values of NCT02503722_Osimertinib as Member', () => {
    customCommands.enterManagementGroupList(ctmlTestData, managementGroupNameAttribute,managementGroupNameIsPrimaryAttribute)
  })

  //!************** Site List ***************
  it('should enter the Site List values of NCT02503722_Osimertinib as Member', () => {
    customCommands.enterSiteList(ctmlTestData, site )
  });

  //!************** Sponsor List ***************
  it('should enter the Sponsor List values of NCT02503722_Osimertinib as Member', () => {
    customCommands.enterSponsorList(ctmlTestData, sponsorName,isPrincipalSponsor)
  });

  //!************** Staff List ***************
  it('should enter the Staff List values of NCT02503722_Osimertinib as Member', () => {
    customCommands.enterStaffList(ctmlTestData, staff)
  });

//************ Arm 1  *****************
  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1 "NCT02503722_Osimertinib" as Member' , () => {
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    //delete the dose level
    cy.get('#array-item-list-root_treatment_list_step_0_arm_0_dose_level').children().find('.pi-trash').click()

    cy.clickMultipleFunction(getAddArmPlusIcon(), ctmlTestData.treatment_list.step[0].arm.length - 1)
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[0].dose_level;
    getMultipleArm().each(($input, index) => {
      const arm = treatmentList[index];
      if (index === 0) {
        cy.inputArmDoseLevelMultiple(ctmlTestData, $input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** Add clinical at Parent AND ********************
        cy.clickParentNode(0).click()
        cy.clickClinical()
        getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].clinical.age_numerical)
        getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].clinical.oncotree_primary_diagnosis)

        //!******** OR ********************
        cy.clickParentNode(0).click()
        cy.clickOr()
        cy.clickParentNode(2).click()
        let orConditions = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[1].or
        cy.enterGenomicConditions(orConditions)
        getSaveMatchingCriteria().click()
      }
    })
  })

  it('should validate the match between "Json preview window text" and "NCT02503722_Osimertinib" as Member', () => {
    ctmlTestData.treatment_list.step[0].arm.forEach((arm,armIndex) => {
      const matchCriteria = arm.match
      getPreviewWindow().each(($el, index) => {
        if (index === 0) {
          cy.log("click parent")
          cy.wrap($el).parent().contains('JSON').click()
          cy.log("Grab the text from the Json preview window")
          cy.wrap($el).find('.p-tabview-panels').invoke('text').then((text) => {
            const jsonArray = JSON.parse(text);
            cy.log('jsonArray', JSON.stringify(jsonArray))
            cy.log('matchCriteria test data',JSON.stringify(matchCriteria[index]))
            if(JSON.stringify(jsonArray) == JSON.stringify(matchCriteria)) {
              expect(JSON.stringify(jsonArray), 'matchPreview').to.deep.equal(JSON.stringify(matchCriteria))
            }
          })
        }
      })
    })
  });
  it('should validate the match between "JSON preview window text" and "YAML preview window text" of' +
    ' "NCT02503722_Osimertinib" as Member',  () => {
    getMatchingCriteriaTableHeader().contains('YAML').click()
    getPreviewTextWindow().invoke("text").then((yamlText) => {
      const yamlObject = yaml.load(yamlText)
      const yamlMatchCriteria = JSON.stringify(yamlObject)
      getMatchingCriteriaTableHeader().contains('JSON').click()
      getPreviewTextWindow().invoke("text").then((text) => {
        const jsonArray = JSON.parse(text);
        const jsonMatchCriteria = JSON.stringify(jsonArray)
        cy.compareArrays(yamlMatchCriteria.split(','),jsonMatchCriteria.split(','))
      })
    })
  })

  it('should Save the trial ',() => {
    cy.saveOnly()
  })

  it('should "Validate" the CTML as a member ',() => {
    getMemberValidateModal()
  })

})
