import {
  createCTMLButton,
  getAddArmPlusIcon,
  getAddCriteriaGroup,
  getAddCriteriaList,
  getAddCriteriaToSameGroup,
  getAddCriteriaToSameList,
  getAddCriteriaToSubGroup,
  getAgeGroup, getApobecStatus,
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
  getClinicalTMB,
  getCNVCall,
  getCtmlStatusDropdown,
  getDefaultTextMatchingCriteria,
  getDefaultTrialEditorDropDown,
  getDrugName,
  getDrugNamePlusIcon,
  getDrugNameTextBoxMultiple,
  getEditMatchingCriteria,
  getEditMatchingCriteriaMultiple,
  getFusionPartnerHugoSymbol,
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
  getMenuItemOr, getMMRStatus,
  getMolecularFunction, getMSStatus,
  getMultipleArm,
  getNCTPurpose,
  getOncotreeExclamation,
  getPhaseDropdownList,
  getPlusIcon, getPoleStatus,
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
  getSwitchGroupOperator, getTemozolomideStatus, getTobaccoStatus,
  getTrialId,
  getTrialNickname, getTrueTranscriptExon,
  getTruncateButton, getUVAStatus,
  getVariantCategory,
  getVariantClassification, getWildType,
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
  trialTableDialogueDeleteBtn, trialTableEdit,
  trialTableIdColumn, trialTableThreeDots, validateCtmlOkButton
} from '../../../support/app.po';
import {NCT03297606_CAPTUR} from "../../../fixtures/NCT03297606_CAPTUR"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import baseClass from "../../Base/baseClass.cy";
import dateClass from "../../Base/dateClass.cy";
let exportJsonFile = 'NCT03297606_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');

describe('CTIMS Trial Editor "NCT03297606_CAPTUR',{ testIsolation: false },() => {
  baseClass.adminTrialGroupx()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT03297606_CAPTUR
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`

  it('should "Delete" the existing Ctml file "NCT03297606_CAPTUR" as Admin', () => {
    createCTMLButton().should('have.class', 'p-disabled')
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()
    let table = cy.get('table tr td')
    table.each(($el) => {
      let ee = $el.text()

      if (ee.includes('NCT03297606_CAPTUR TrialGroupx Admin role')) {
        cy.wrap($el).prev().then(($prevEl) => {
          cy.wrap($prevEl).click();
        });
        trialTableThreeDots().click();
        trialTableDelete().click();
        trialTableDialogueDeleteBtn().click();
        return false;
      }
    })
  })
  it('should enter the Trial Editor form with valid test data', () => {
    createCTMLButton().should('not.have.class', 'p-disabled').click()
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
     cy.trialInformation(ctmlTestData.nct_id,
       "NCT03297606_CAPTUR TrialGroupx Admin role",
       "Srimathi",
       "Draft",
       ctmlTestData.long_title,
       ctmlTestData.short_title,
       ctmlTestData.phase,
       ctmlTestData.protocol_no,
       ctmlTestData.nct_purpose,
       ctmlTestData.status)

     // Prior treatment requirements
     cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
     getPriorTreatmentRequirementMultiple().each((input, index) => {
       if (ctmlTestData.prior_treatment_requirements[index]) {
         cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
       }
     })
     //Age
     cy.age(ctmlTestData.age)

     //Drug List
     cy.clickMultipleFunction(getDrugNamePlusIcon(),ctmlTestData.drug_list.drug.length - 1)

     getDrugNameTextBoxMultiple().each((input, index) => {
       if (ctmlTestData.drug_list.drug[index]) {
         cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
       }
     })

     //Management Group List
     cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(),ctmlTestData.management_group_list.management_group.length - 1)
     getManagementGroupNameTextBoxMultiple().each(($input, index) => {
       cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
       cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
     });

     //Site List - done
     cy.clickMultipleFunction(getSiteNamePlusIcon(),ctmlTestData.site_list.site.length - 1)
     getSiteNameMultiple().each(($input, index) => {
       cy.wrap($input).find('.p-dropdown').eq(0).click().contains(ctmlTestData.site_list.site[index].site_name).click();
       cy.wrap($input).find('.p-dropdown').eq(1).click().contains(ctmlTestData.site_list.site[index].site_status).click();
       cy.wrap($input).find('.p-selectbutton').eq(0).click().contains(ctmlTestData.site_list.site[index].coordinating_center).click();
       cy.wrap($input).find('.p-selectbutton').eq(1).click().contains(ctmlTestData.site_list.site[index].uses_cancer_center_irb).click();
     });

     //Sponsor List array of 5 values - done
     cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
     getSponsorNameMultiple().each(($input, index) => {
       cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
       cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
     });

     //Staff List - Done
     cy.clickMultipleFunction(getProtocolStaffPlusIcon,
       ctmlTestData.staff_list.protocol_staff.length - 1);
     getProtocolStaffMultiple().each(($input, index) => {
       cy.log($input.attr('id'));
       cy.wrap($input).find('.p-inputtext').eq(0).type(ctmlTestData.staff_list.protocol_staff[index].first_name);
       cy.wrap($input).find('.p-inputtext').eq(1).type(ctmlTestData.staff_list.protocol_staff[index].last_name);
       cy.wrap($input).find('.p-inputtext').eq(2).type(ctmlTestData.staff_list.protocol_staff[index].email_address);
       cy.wrap($input).find('.p-dropdown').eq(0).click().contains(ctmlTestData.staff_list.protocol_staff[index].institution_name).click();
       cy.wrap($input).find('.p-dropdown').eq(1).click().contains(ctmlTestData.staff_list.protocol_staff[index].staff_role).click();
     });
  })

//!************ Arm 1  *****************
  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1', () => {
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    cy.clickMultipleFunction(getAddArmPlusIcon(), ctmlTestData.treatment_list.step[0].arm.length - 1)
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[0].dose_level;

    getMultipleArm().each(($input, index) => {
      const arm = treatmentList[index];
      if(index === 0) {
        cy.log("$input",$input)
        cy.wrap($input).find('.p-inputtext').eq(0).type(arm.arm_code);
        cy.wrap($input).find('.p-inputtext').eq(1).type(arm.arm_description);
        cy.wrap($input).find('.p-inputtext').eq(2).type(arm.arm_internal_id.toString());
        cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click();
        cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]`).each(($input, doseIndex) => {
          const dose = doseLevels[doseIndex];
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).type(dose.level_code);
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).type(dose.level_description);
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).type(dose.level_internal_id.toString());
          cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click();
        });
        getEditMatchingCriteriaMultiple().eq(index).click() //click matching criteria link of each arm
       getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code); //Validate the header

        getAddCriteriaGroup().click()

        //******** OR ********************
        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].or
        cy.enterGenomicConditions(orConditions);
        //!******** Add clinical at Parent AND ********************
        cy.clickParentNode(0).click()
        let andConditions = ctmlTestData.treatment_list.step[0].arm[0].match[0].and[1]
        cy.enterSingleClinicalCondition(andConditions);
        getSaveMatchingCriteria().click()
      }
    })
  })

  //********Arm 2************
  it('should enter the values in Arm 2',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 1) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
       // inputArmDoseLevel($input, index);
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************
        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        cy.clickParentNode(0)
        let andConditions = ctmlTestData.treatment_list.step[0].arm[1].match[0].and[1]
       cy.enterSingleClinicalCondition(andConditions);
        getSaveMatchingCriteria().click()
      }
    })
  });

  //********Arm 3************

  it('should enter the values in Arm 3',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 2) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        cy.clickParentNode(0)
        let andConditions = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[1]
        cy.enterSingleClinicalCondition(andConditions);
        getSaveMatchingCriteria().click()
      }
    })
  });

  it('should enter the values in Arm 4',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 3) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);

        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        cy.clickChildToggleArrowButton(1) //collapse the Or subgroup
        //!******** AND ********************
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(2)
        let andConditions = treatmentList[index].match[0].and[1].and
        cy.enterClinicalConditionsMultiple(andConditions)
        getSaveMatchingCriteria().click()
      }
    })
  })

  //!************ Arm 5  *****************
  it('should enter the values in Arm 5',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 4) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        let genomicValue = treatmentList[index].match[0].and[0]
        cy.enterSingleGenomicConditions(genomicValue)
        cy.clickParentNode(0)
        let andConditions = treatmentList[index].match[0].and[1]
        cy.enterSingleClinicalCondition(andConditions)
        getSaveMatchingCriteria().click()
      }
    })
  })

  //!************ Arm 6  *****************

  it('should enter the values in Arm 6(hint check fix for CTM-258 bug ticket-o/p mismatched)',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[5].dose_level;

    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if (index === 5) {
       cy.inputArmDoseLevelMultiple(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        cy.clickChildToggleArrowButton(1) //collapse the Or subgroup
        //!******** AND ********************
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(2)
       let andConditions = treatmentList[index].match[0].and[1].and
        cy.enterClinicalConditionsMultiple(andConditions)
       getSaveMatchingCriteria().click()
      }
    })
  })

  //!************ Arm 7  *****************

  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 7', () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if(index === 6) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
      getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        //!******** AND ********************
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(4)
        let andConditions = treatmentList[index].match[0].and[1].and
     cy.enterClinicalConditionsMultiple(andConditions)
        getSaveMatchingCriteria().click()
      }
    })
  })

  //!************ Arm 8  *****************

  it('should enter the values in Arm 8',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      if (index === 7) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        //   getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************
        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        cy.clickParentNode(0)
        let clinicalVal = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[1]
      cy.enterSingleClinicalCondition(clinicalVal)
        getSaveMatchingCriteria().click()
      }
    })
  });

  //!************ Arm 9  *****************
  it('should enter the values in Arm 9',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 8) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)
        cy.clickChildToggleArrowButton(1) //collapse the Or subgroup
        //!******** AND ********************
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(2)
        let andConditions = treatmentList[index].match[0].and[1].and
      cy.enterClinicalConditionsMultiple(andConditions)
        getSaveMatchingCriteria().click()
      }
    })
  })

  //!************ Arm 10  *****************

  it('should enter the values in Arm 10',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 9) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
         getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************
        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)
        cy.clickChildToggleArrowButton(1) //collapse the Or subgroup
        //!******** AND ********************
        cy.clickParentNode(0)
        let clinicalVal = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[1]
       cy.enterSingleClinicalCondition(clinicalVal)
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(3)
        cy.clickOr()

        cy.clickParentNode(4)
        let genomicVal1 = ctmlTestData.treatment_list.step[0].arm[index].match[1].and[0].or[0]
     cy.enterSingleGenomicConditions(genomicVal1)
        cy.clickParentNode(4)
        let genomicVal2 = ctmlTestData.treatment_list.step[0].arm[index].match[1].and[0].or[1]
     cy.enterSingleGenomicConditions(genomicVal2)
        //Clinical at Arm 10 match[1][and[1]
        cy.clickParentNode(4)
        let clinicalVal2 = ctmlTestData.treatment_list.step[0].arm[index].match[1].and[1]
     cy.enterSingleClinicalCondition(clinicalVal2)
        //Clinical at Arm 10 match[1][and[2]
        cy.clickParentNode(4)
        let clinicalVal3 = ctmlTestData.treatment_list.step[0].arm[index].match[1].and[2]
       cy.enterSingleClinicalCondition(clinicalVal3)
        getSaveMatchingCriteria().click()
      }
    })
  })

//!************ Arm 11  *****************

  it('should enter the values in Arm 11',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[10].dose_level;

    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if (index === 10) {
        cy.inputArmDoseLevelMultiple(ctmlTestData,$input, index)

        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        cy.clickChildToggleArrowButton(1) //collapse the Or subgroup
        //!******** AND ********************
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(2)
         let andConditions = treatmentList[index].match[0].and[1].and
     cy.enterClinicalConditionsMultiple(andConditions)
        getSaveMatchingCriteria().click()
      }
    })
  })

  //!************ Arm 12  *****************

  it('should enter the values in Arm 12',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    const doseLevels = treatmentList[11].dose_level;

    getMultipleArm().each(($input, index) => {
      cy.log($input.attr('id'));
      const arm = treatmentList[index];
      if (index === 11) {
        cy.inputArmDoseLevelMultiple(ctmlTestData,$input, index)

        getEditMatchingCriteriaMultiple().eq(index).click()
         getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************

        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)

        cy.clickChildToggleArrowButton(1) //collapse the Or subgroup
        //!******** AND ********************
        cy.clickParentNode(0)
        cy.clickAnd()
        cy.clickParentNode(2)
     let andConditions = treatmentList[index].match[0].and[1].and
      cy.enterClinicalConditionsMultiple(andConditions)
        getSaveMatchingCriteria().click()
      }
    })
  })

  //!************ Arm 13  *****************

  it('should enter the values in Arm 13',  () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 12) {
        cy.inputArmDoseLevel(ctmlTestData,$input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        //   getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** OR ********************
        cy.clickParentAnd()
        cy.clickOr()
        cy.clickParentNode(1).click()
        let orConditions = treatmentList[index].match[0].and[0].or
        cy.enterGenomicConditions(orConditions)
        cy.clickChildToggleArrowButton(1) //collapse the Or subgroup
        //!******** AND ********************
        cy.clickParentNode(0)
        let clinicalVal = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[1]
    cy.enterSingleClinicalCondition(clinicalVal)
        getSaveMatchingCriteria().click()
      }
    })
  })


   it('should Save, Edit Ctml test data ', () => {
     //save and Edit and Export
     trialEditorSave().click()
     cy.get('.p-toast-message-content').should('contain','Trial saved')
     //cy.get('.p-toast-icon-close').click()
     trialEditorBackButton().should('be.visible').trigger("click")
     selectTrialGroupButton().click()
     trialGroupxAdmin().click()
     trialTableIdColumn()
       .contains(ctmlTestData.nct_id)
       .nextUntil('NCT03297606_CAPTUR TrialGroupx Admin role')
       .then((test) => {
         trialTableIdColumn().contains(ctmlTestData.nct_id).click();
         trialTableThreeDots().click();
         trialTableEdit().click()
       })
   });
   //!************Export Ctml***************
   it('should click on Export button, "Export as JSON" file ', () => {
     trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
     trialEditorRadioButtons().eq(0).should('contain.html', 'json')
     cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
     validateCtmlOkButton().should('not.have.class','p-disabled').click()
   });

   it('should click on Export button, "Export as YAML" file ', () => {
     trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
     trialEditorRadioButtons().eq(1).click({force: true})
     validateCtmlOkButton().click()
   });

   it('should validate the match between "Export JSON" and "Export YAML" file', () => {
     cy.readFile(ctmlJson).then((exportedCtmlModelJson) => {
       const json = JSON.stringify(exportedCtmlModelJson);
       cy.readFile(ctmlYaml).then((exportedCtmlModelYaml) => {
         const yamlObject = yaml.load(exportedCtmlModelYaml);
         const yamlVal = JSON.stringify(yamlObject);
         cy.compareArrays(json.split(','), yamlVal.split(','))
       });
     });
   })
 //!**************** Match Export Json file with Test Data

  /* it('should validate exported "Trial Information" matches "ctmlTestData" ', () => {
     cy.readFile(ctmlJson).then((exportedCtmlModel) => {
       const exportedAttributeNames = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
       const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];

       const exportedTrialInformation = exportedAttributeNames.map((attribute) => exportedCtmlModel[attribute]);
       const testDataTrialInformation = testDataAttributeNames.map((attribute) => ctmlTestData[attribute]);

       cy.compareArrays(exportedTrialInformation, testDataTrialInformation);
     });
   });


   //!******** Matching criteria Preview ********************
  /!* it('should validate Arm 1 & Arm 7 "Json preview window text" matches with "ctmlTestData"', () => {
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
         if (index === 1) {
           cy.log("click parent")
           cy.wrap($el).parent().contains('JSON').click()
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
   it('should validate the match between "JSON preview window text" and "YAML preview window text" ',  () => {
     ctmlTestData.treatment_list.step[0].arm.forEach((arm,armIndex) => {
       getPreviewWindow().each(($el, index) => {
         if (index === 0) {
           cy.wrap($el).parent().contains('YAML').click()
           cy.wrap($el).find('.p-tabview-panels').invoke("text").then((yamlText) => {
             const yamlObject = yaml.load(yamlText)
             const yamlMatchCriteria = JSON.stringify(yamlObject)
             cy.wrap($el).parent().contains('JSON').click()
             cy.wrap($el).find('.p-tabview-panels').invoke("text").then((text) => {
               const jsonArray = JSON.parse(text);
               const jsonMatchCriteria = JSON.stringify(jsonArray)
               cy.compareArrays(yamlMatchCriteria.split(','), jsonMatchCriteria.split(','))
             })
           })
         }
         if (index === 1) {
           cy.wrap($el).parent().contains('YAML').click()
           cy.wrap($el).find('.p-tabview-panels').invoke("text").then((yamlText) => {
             const yamlObject = yaml.load(yamlText)
             const yamlMatchCriteria = JSON.stringify(yamlObject)
             cy.wrap($el).parent().contains('JSON').click()
             cy.wrap($el).find('.p-tabview-panels').invoke("text").then((text) => {
               const jsonArray = JSON.parse(text);
               const jsonMatchCriteria = JSON.stringify(jsonArray)
               cy.compareArrays(yamlMatchCriteria.split(','), jsonMatchCriteria.split(','))
             })
           })
         }
       })
     })
   })
 *!/
 //!**************** Match Export Json file with Test Data

   it('should validate exported "Trial Information" matches "ctmlTestData" ', () => {
     cy.readFile(ctmlJson).then((exportedCtmlModel) => {
       const exportedAttributeNames = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
       const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];

       const exportedTrialInformation = exportedAttributeNames.map((attribute) => exportedCtmlModel[attribute]);
       const testDataTrialInformation = testDataAttributeNames.map((attribute) => ctmlTestData[attribute]);

       cy.compareArrays(exportedTrialInformation, testDataTrialInformation);
     });
   });

   it('should validate exported "Age" matches "ctmlTestData"', () => {
     cy.readFile(ctmlJson).then((exportedCtmlModel) => {
       const exportData = exportedCtmlModel.age
       let testData = ctmlTestData.age
       cy.compareArrays(exportData.split(' '), testData.split(' ')) //Age is a single value, not a array
     })
   });

   it('should validate exported "Prior treatment requirement" match "ctmlTestData"', () => {
     cy.readFile(ctmlJson).then((exportedCtmlModel) => {
       const exportData = exportedCtmlModel.prior_treatment_requirements
       let testData = ctmlTestData.prior_treatment_requirements
       cy.compareArrays(exportData, testData)
     })
   });

   it('should validate exported "Drug list" match "ctmlTestData"', () => {
     let rawData = ctmlTestData.drug_list.drug

     cy.drugListAttributes(rawData).then(testDataMatchingCriteria => {
       cy.readFile(ctmlJson).then((exportedCtmlModel) => {
         const exportData = exportedCtmlModel.drug_list.drug

         cy.drugListAttributes(exportData).then(ctmlMatchingCriteria => {
           cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
         });
       });
     });
   });
   it('should validate exported "Management Group list" matches "ctmlTestData"', () => {
     let rawData = ctmlTestData.management_group_list.management_group;

     cy.managementGroupListAttributes(rawData).then(testDataMatchingCriteria => {
       cy.readFile(ctmlJson).then((exportedCtmlModel) => {
         const exportData = exportedCtmlModel.management_group_list.management_group

         cy.managementGroupListAttributes(exportData).then(ctmlMatchingCriteria => {
           cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
         });
       });
     });
   });

   it('should validate exported "Site Group list" matches "ctmlTestData"', () => {
     let rawData = ctmlTestData.site_list.site

     cy.siteListAttributes(rawData).then(testDataMatchingCriteria => {
       cy.readFile(ctmlJson).then((exportedCtmlModel) => {
         const exportData = exportedCtmlModel.site_list.site

         cy.siteListAttributes(exportData).then(ctmlMatchingCriteria => {
           cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
         });
       });
     });
   });

   it('should validate exported "Sponsor list" matches "ctmlTestData"', () => {
     let rawData = ctmlTestData.sponsor_list.sponsor

     cy.sponsorListAttributes(rawData).then(testDataMatchingCriteria => {
       cy.readFile(ctmlJson).then((exportedCtmlModel) => {
         const exportData = exportedCtmlModel.sponsor_list.sponsor

         cy.sponsorListAttributes(exportData).then(ctmlMatchingCriteria => {
           cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
         });
       });
     });
   });

   it('should validate exported "Staff list" matches "ctmlTestData"', () => {
     let rawData = ctmlTestData.staff_list.protocol_staff

     cy.staffListAttributes(rawData).then(testDataMatchingCriteria => {
       cy.readFile(ctmlJson).then((exportedCtmlModel) => {
         const exportData = exportedCtmlModel.staff_list.protocol_staff;

         cy.staffListAttributes(exportData).then(ctmlMatchingCriteria => {
           cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
         });
       });
     });
   })

   it('should validate "Treatment list" with multiple arm/matching criteria matches with "ctmlTestData"',() =>{
     //Arm and dose level validation
     const matchAndT = ctmlTestData.treatment_list.step[0].arm;
     cy.readFile(ctmlJson).then((exportedCtmlModel) => {
       const matchAndE = exportedCtmlModel.treatment_list.step[0].arm;

       matchAndT.forEach((armT, armIndex) => {
         const clauseE_1 = matchAndE.find((clause) => JSON.stringify(clause.arm_code) === JSON.stringify(armT.arm_code));

         if (clauseE_1) {
           expect(JSON.stringify(clauseE_1.arm_code), 'Arm Code Match').to.deep.equal(JSON.stringify(armT.arm_code));
           expect(JSON.stringify(clauseE_1.arm_description), 'Arm Description Match').to.deep.equal(JSON.stringify(armT.arm_description));
           expect(JSON.stringify(clauseE_1.arm_internal_id), 'Arm Internal Id Match').to.deep.equal(JSON.stringify(armT.arm_internal_id.toString()));
           expect(JSON.stringify(clauseE_1.arm_suspended), 'Arm Suspended Match').to.deep.equal(JSON.stringify(armT.arm_suspended));

           clauseE_1.dose_level.forEach((objE_1, index_2) => {
             const objE_2 = armT.dose_level[index_2];

             expect(JSON.stringify(objE_1.level_code), 'Dose Level : Level Code Match').to.deep.equal(JSON.stringify(objE_2.level_code));
             expect(JSON.stringify(objE_1.level_description), 'Dose Level : Level Description Match').to.deep.equal(JSON.stringify(objE_2.level_description));
             expect(JSON.stringify(objE_1.level_internal_id), 'Dose Level : Level Internal ID Match').to.deep.equal(JSON.stringify(objE_2.level_internal_id.toString()));
             expect(JSON.stringify(objE_1.level_suspended), 'Dose Level : Level Suspended Match').to.deep.equal(JSON.stringify(objE_2.level_suspended));
           });
         }
         //matching criteria validation
         const armE = matchAndE[armIndex].match[0].and;
         armE.forEach((clauseE, index) => {
           const clauseT = armT.match[0].and[index];
           if (clauseE.or) {
             clauseE.or.forEach((objE, index2) => {
               const objT = clauseT.or[index2];
               expect(JSON.stringify(objT)).to.deep.equal(JSON.stringify(objE));
             });
           } else if (clauseE.and) {
             clauseE.and.forEach((objE, index2) => {
               const objT = clauseT.and[index2];
               expect(JSON.stringify(objT)).to.deep.equal(JSON.stringify(objE));
             });
           } else if (clauseE.clinical) {
             expect(JSON.stringify(clauseT)).to.deep.equal(JSON.stringify(clauseE));
           }
         });

       });
     });

   });*/
 /* it('should validate "Send Ctml to matcher', () => {
    sendCtmlToMatcher().click()
    sendCTMLOkButton().click()
  });*/
})
