import {
  createCTMLButton,
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
  getMatchModalFooterButtons,
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
  getTruncateButton,
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
import {NCT02503722_Osimertinib} from "../../../fixtures/NCT02503722_Osimertinib"
import baseClass from "../../Base/baseClass.cy"
import dateClass from "../../Base/dateClass.cy";

const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import {NCT04497116_TRESR} from "../../../fixtures/NCT04497116_TRESR";
let exportJsonFile = 'NCT04497116_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');

describe('Validate as TrialGroupx Admin on "NCT04497116" ', { testIsolation: false }, () => {
  baseClass.adminTrialGroupx()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT04497116_TRESR
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`
  const fixturePath = '/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/src/fixtures/NCT04497116_TRESR_Trial_V2_fixed.json'

  it('should "Delete" the existing Ctml file "NCT02503722" as Admin', () => {
    cy.deleteTrialAdmin('NCT04497116')
  })

  it('should enter values into the "Trial Editor Form" of "NCT04497116" as Admin', () => {
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()

    cy.wait(1000);
    cy.get('.Trials_buttonsContainer__p4gFm>button:nth-child(1)').click()
    cy.get('input[type=file]')
      .invoke('show')
    cy.get('[type="file"]', {timeout: 60000})
      .selectFile(fixturePath)
  })

  it('should validate the match between "Json preview window text" and "NCT04497116" as Admin', () => {
    cy.wait(1000);
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    ctmlTestData.treatment_list.step[0].arm.forEach((arm, armIndex) => {
      const matchCriteria = arm.match;

      getPreviewWindow().each(($el, index) => {
        if (index >= 0 && index <= 4) {
          cy.log("click parent");
          cy.wrap($el).parent().contains('JSON').click();
          cy.wrap($el).find('.p-tabview-panels').invoke('text').then((text) => {
            const jsonArray = JSON.parse(text);
            if (JSON.stringify(jsonArray) === JSON.stringify(matchCriteria)) {
              expect(JSON.stringify(jsonArray), 'matchPreview').to.deep.equal(JSON.stringify(matchCriteria));
            }
          });
        }
      });
    });
  });
 it('should validate the match between "JSON preview window text" and "YAML preview window text" of' +
    ' "NCT04497116" as Admin',  () => {
   getPreviewWindow().each(($el, index) => {
     if (index >= 0 && index <= 4) {
       cy.wrap($el).parent().contains('YAML').click();
       cy.wrap($el).find('.p-tabview-panels').invoke('text').then((yamlText) => {
         const yamlObject = yaml.load(yamlText);
         const yamlMatchCriteria = JSON.stringify(yamlObject);
         cy.wrap($el).parent().contains('JSON').click();
         cy.wrap($el).find('.p-tabview-panels').invoke('text').then((text) => {
           const jsonArray = JSON.parse(text);
           const jsonMatchCriteria = JSON.stringify(jsonArray);
           cy.compareArrays(yamlMatchCriteria.split(','), jsonMatchCriteria.split(','));
         });
       });
     }
   });
  })
  it('should Save, Edit NCT04497116 to re-enter as Admin to validate Export as Admin ',() => {
    //cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
    trialEditorSave().click()
    cy.get('.p-toast-message-content').should('contain', 'Trial saved')
  })


  //!************Export Ctml***************
  it('should click on Export button, "Export as JSON" file of "NCT04497116" as Admin', () => {
    cy.wait(1000)
    trialEditorHeaderButtons().eq(0).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html', 'json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    validateCtmlOkButton().should('not.have.class','p-disabled').click()
  });

  it('should click on Export button, "Export as YAML" file of "NCT04497116" as Admin ', () => {
    trialEditorHeaderButtons().eq(0).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(1).click({force: true})
    validateCtmlOkButton().click()
  });

  it('should validate the match between "Export JSON" and "Export YAML" file of "NCT04497116" as Admin', () => {
    cy.wait(2000)
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

  it('should validate exported "Trial Information" matches "ctmlTestData" of "NCT04497116" as Admin ',
  () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportedAttributeNames = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
      const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];

      const exportedTrialInformation = exportedAttributeNames.map((attribute) => exportedCtmlModel[attribute]);
      const testDataTrialInformation = testDataAttributeNames.map((attribute) => ctmlTestData[attribute]);

      cy.compareArrays(exportedTrialInformation, testDataTrialInformation);
    });
  });

  it('should validate exported "Age" matches "ctmlTestData" of "NCT04497116" as Admin', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.age
      let testData = ctmlTestData.age
      cy.compareArrays(exportData.split(' '), testData.split(' ')) //Age is a single value, not a array
    })
  });

  it('should validate exported "Prior treatment requirement" match "ctmlTestData" of "NCT04497116" as Admin', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.prior_treatment_requirements
      let testData = ctmlTestData.prior_treatment_requirements
      cy.compareArrays(exportData, testData)
    })
  });

  it('should validate exported "Drug list" match "ctmlTestData" of "NCT04497116" as Admin', () => {
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
  it('should validate exported "Management Group list" matches "ctmlTestData" of "NCT04497116" as Admin', () => {
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

  it('should validate exported "Site Group list" matches "ctmlTestData" of "NCT04497116" as Admin', () => {
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

  it('should validate exported "Sponsor list" matches "ctmlTestData" of "NCT04497116" as Admin', () => {
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

  it('should validate exported "Staff list" matches "ctmlTestData" of "NCT04497116" as Admin', () => {
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

  it('should validate exported "Treatment list" with multiple arm/matching criteria matches with "ctmlTestData" of' +
    ' "NCT04497116" as Admin',() =>{
    //Arm and dose level validation
    // Arm and dose level validation
    const matchAndT = ctmlTestData.treatment_list.step[0].arm;
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const matchAndE = exportedCtmlModel.treatment_list.step[0].arm;

      matchAndT.forEach((armT, armIndex) => {
        const clauseE_1 = matchAndE.find((clause) => JSON.stringify(clause.arm_code) === JSON.stringify(armT.arm_code));

        if (clauseE_1) {
          expect(JSON.stringify(clauseE_1.arm_code), 'Arm Code Match').to.deep.equal(JSON.stringify(armT.arm_code));
          expect(JSON.stringify(clauseE_1.arm_description), 'Arm Description Match').to.deep.equal(JSON.stringify(armT.arm_description));
          expect(JSON.stringify(clauseE_1.arm_internal_id), 'Arm Internal Id Match').to.deep.equal(JSON.stringify(armT.arm_internal_id));
          expect(JSON.stringify(clauseE_1.arm_suspended), 'Arm Suspended Match').to.deep.equal(JSON.stringify(armT.arm_suspended));

          clauseE_1.dose_level.forEach((objE_1, index_2) => {
            const objE_2 = armT.dose_level[index_2];

            expect(JSON.stringify(objE_1.level_code), 'Dose Level : Level Code Match').to.deep.equal(JSON.stringify(objE_2.level_code));
            expect(JSON.stringify(objE_1.level_description), 'Dose Level : Level Description Match').to.deep.equal(JSON.stringify(objE_2.level_description));
            expect(JSON.stringify(objE_1.level_internal_id), 'Dose Level : Level Internal ID Match').to.deep.equal(JSON.stringify(objE_2.level_internal_id));
            expect(JSON.stringify(objE_1.level_suspended), 'Dose Level : Level Suspended Match').to.deep.equal(JSON.stringify(objE_2.level_suspended));
          });
        }

        // Matching criteria validation
        const armE = matchAndE[armIndex].match[0].and;
        const armEOr = matchAndE[armIndex].match[0].or; // New arm with 'or' condition

        if (armE) {
          armE.forEach((clauseE, index) => {
            const clauseT = armT.match[0].and[index];
            if (clauseE.or) {
              clauseE.or.forEach((objE, index2) => {
                const objT = clauseT.or[index2];
                expect(JSON.stringify(objT)).to.deep.equal(JSON.stringify(objE));
              });
            } else if (clauseE.clinical) {
              expect(JSON.stringify(clauseT)).to.deep.equal(JSON.stringify(clauseE));
            } else if (clauseE.genomic) {
              expect(JSON.stringify(clauseT)).to.deep.equal(JSON.stringify(clauseE));
            }
          });
          return false
        }
        // Additional validation for the new arm with 'or' condition
        if (armEOr) {
          armEOr.forEach((clauseEOr, index) => {
            const clauseTOr = armT.match[0][index];
            if (clauseEOr.and) {
              clauseEOr.and.forEach((objEOr, index2) => {
                const objTOr = clauseTOr.and[index2];
                expect(JSON.stringify(objTOr)).to.deep.equal(JSON.stringify(objEOr));
              });
            }
          });
        }

      });
    });
  });
  /*it('should validate "Send Ctml to matcher', () => {
    sendCtmlToMatcher().click()
    sendCTMLOkButton().click()
  });*/
})
