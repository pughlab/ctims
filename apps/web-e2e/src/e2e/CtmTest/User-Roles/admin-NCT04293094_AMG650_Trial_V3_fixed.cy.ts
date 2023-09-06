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
import {AMG650} from "../../../fixtures/AMG650";
let exportJsonFile = 'NCT04293094-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');

describe('Validate as TrialGroupx Admin on "AMG 650 trial" ', { testIsolation: false }, () => {
  baseClass.adminTrialGroupx()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = AMG650
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`

  it('should "Delete" the existing Ctml file "NCT02503722" as Admin', () => {
    cy.deleteExistingTrial('NCT04293094 TrialGroupx Admin role')
  })

  it('should enter values into the "Trial Editor Form" of "NCT04293094" as Admin', () => {
    createCTMLButton().should('not.have.class', 'p-disabled').click()
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
    cy.trialInformation(ctmlTestData.nct_id,
      "NCT04293094 TrialGroupx Admin role",
      "John Doe",
      "Draft",
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no.toString(),
      ctmlTestData.nct_purpose,
      ctmlTestData.status)
  })

  //!**************Prior Treatment Requirement
  it('should enter the Prior Treatment Requirement values of NCT02503722_Osimertinib as Admin', () => {
    trialEditorLeftPanelList().eq(1).should('contain','Prior Treatment Requirements').click()
    cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
    getPriorTreatmentRequirementMultiple().each((input, index) => {
      if (ctmlTestData.prior_treatment_requirements[index]) {
        cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
      }
    })
  });

  //!************** Age ***************

  it('should enter the Age values of NCT02503722_Osimertinib as Admin', () => {
    trialEditorLeftPanelList().eq(2).should('contain','Age').click()
    cy.age(ctmlTestData.age)
  });

  //!************** Drug List ***************

  it('should enter the Drug List values of NCT02503722_Osimertinib as Admin', () => {
    trialEditorLeftPanelList().eq(3).should('contain','Drug List').click()
    cy.clickMultipleFunction(getDrugNamePlusIcon(), ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
      }
    })
  });

  //!************** Management Group List ***************

  it('should enter the Management Group List values of NCT02503722_Osimertinib as Admin', () => {
    trialEditorLeftPanelList().eq(4).should('contain', 'Management Group List').click()
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
    });
  })

  //!************** Site List ***************

  it('should enter the Site List values of NCT02503722_Osimertinib as Admin', () => {
    trialEditorLeftPanelList().eq(5).should('contain','Site List').click()
    cy.clickMultipleFunction(getSiteNamePlusIcon(), ctmlTestData.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      const site = ctmlTestData.site_list.site[index]
      cy.fillSiteDetails($input, site)
    })
  });

  //!************** Sponsor List ***************

  it('should enter the Sponsor List values of NCT02503722_Osimertinib as Admin', () => {
    trialEditorLeftPanelList().eq(6).should('contain','Sponsor List').click()
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });
  });

  //!************** Staff List ***************

  it('should enter the Staff List values of NCT02503722_Osimertinib as Admin', () => {
    trialEditorLeftPanelList().eq(7).should('contain','Staff List').click()
    cy.clickMultipleFunction(getProtocolStaffPlusIcon(), ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      const staff = ctmlTestData.staff_list.protocol_staff[index]
      cy.fillProtocolStaffDetails($input, staff)
    });
  });

//************ Arm 1  *****************
  it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1 ' , () => {
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
        cy.switchGroupOperator()
        cy.clickParentNode(0).click()
        cy.clickAnd()
        cy.clickParentNode(1)
        const andGenomic1 = ctmlTestData.treatment_list.step[0].arm[index].match[0].or[0].and[0]
        cy.enterSingleGenomicConditions(andGenomic1)
        cy.clickParentNode(1)
        const andClinical1 = ctmlTestData.treatment_list.step[0].arm[index].match[0].or[0].and[1]
        cy.enterAndClinical(andClinical1)
        cy.clickChildToggleArrowButton(1)
        //second OR
        cy.clickParentNode(0).click()
        cy.clickAnd()
        cy.clickParentNode(2).click()
        const clinicCondition2 = ctmlTestData.treatment_list.step[0].arm[index].match[0].or[1].and[0].or
        cy.enterClinicalConditionsMultiple(clinicCondition2)
        cy.clickChildToggleArrowButton(2)
        cy.clickParentNode(2)
        cy.clickMatchAllGenomic()
        getSaveMatchingCriteria().click()
      }
    })
  })
  //************ Arm 2  *****************

  it('should enter the values in Arm 2', () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 1) {
        cy.inputArmDoseLevel(ctmlTestData, $input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** AND ********************
        cy.clickParentAnd()
        let clinicalCondition = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[0]
        cy.enterAndClinical(clinicalCondition)
        cy.clickParentNode(0)
        cy.clickMatchAllGenomic()
        getSaveMatchingCriteria().click()
      }
    })
  })
  //************ Arm 3  *****************

  it('should enter the values in Arm 3', () => {
    const treatmentList = ctmlTestData.treatment_list.step[0].arm;
    getMultipleArm().each(($input, index) => {
      if (index === 2) {
        cy.inputArmDoseLevel(ctmlTestData, $input, index)
        getEditMatchingCriteriaMultiple().eq(index).click()
        getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
        getAddCriteriaGroup().click()
        //!******** AND ********************
        cy.clickParentAnd()
        let clinicalCondition = ctmlTestData.treatment_list.step[0].arm[index].match[0].and[0]
        cy.enterAndClinical(clinicalCondition)
        cy.clickParentNode(0)
        cy.clickMatchAllGenomic()
        getSaveMatchingCriteria().click()
      }
    })
  });

  //******** Matching criteria Preview ********************
  it('should validate Arm 1,2,3 "Json preview window text" matches with "ctmlTestData"', () => {
    ctmlTestData.treatment_list.step[0].arm.forEach((arm, armIndex) => {
      const matchCriteria = arm.match;

      getPreviewWindow().each(($el, index) => {
        if (index >= 0 && index <= 2) {
          cy.log("click parent");
          cy.wrap($el).parent().contains('JSON').click();
          cy.wrap($el).find('.p-tabview-panels').invoke('text').then((text) => {
            const jsonArray = JSON.parse(text);
            if (JSON.stringify(jsonArray) === JSON.stringify(matchCriteria)) {
              expect(JSON.stringify(jsonArray), 'matchPreview').to.deep.equal(JSON.stringify(matchCriteria));
            } else {
              expect(JSON.stringify(jsonArray), 'matchPreview').to.not.deep.equal(JSON.stringify(matchCriteria));
            }
          });
        }
      });
    });
  });

  it('should validate the match between "JSON preview window text" and "YAML preview window text" ',  () => {
    getPreviewWindow().each(($el, index) => {
      if (index >= 0 && index <= 2) {
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

  it('should Save the Trial Editor', () => {
    trialEditorSave().click()
  });

  //!************Export Ctml***************
  it('should click on Export button, "Export as JSON" file ', () => {
    trialEditorHeaderButtons().eq(0).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html', 'json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    validateCtmlOkButton().should('not.have.class','p-disabled').click()
  });

  it('should click on Export button, "Export as YAML" file ', () => {
    trialEditorHeaderButtons().eq(0).should('contain', 'Export').click()
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
  it('should validate "Treatment list" with multiple arm/matching criteria matches with "ctmlTestData"', () => {
    // Arm and dose level validation
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

        // Matching criteria validation
        const armE = matchAndE[armIndex].match[0].and;
        const armEOr = matchAndE[armIndex].match[0].or; // New arm with 'or' condition

        if (armE) {
          armE.forEach((clauseE, index) => {
            const clauseT = armT.match[0].and[index];
            if (clauseE.or) {
              clauseE.or.forEach((objE, index2) => {
                const objT = clauseT.genomic[index2];
                expect(JSON.stringify(objT)).to.deep.equal(JSON.stringify(objE));
              });
            } else if (clauseE.clinical) {
              expect(JSON.stringify(clauseT)).to.deep.equal(JSON.stringify(clauseE));
            }
          });
          return false
        }
        // Additional validation for the new arm with 'or' condition
        if (armEOr) {
          armEOr.forEach((clauseEOr, index) => {
            const clauseTOr = armT.match[0].or[index];
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
  /*it('should validate "Treatment list" with multiple arm/matching criteria matches with "ctmlTestData"', () => {
    // Arm and dose level validation
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
            }
          });
          return false
        }
        // Additional validation for the new arm with 'or' condition
        if (armEOr) {
          armEOr.forEach((clauseEOr, index) => {
            const clauseTOr = armT.match[0].or[index];
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

  it.skip('should validate "Send Ctml to matcher', () => {
    sendCtmlToMatcher().click()
    sendCTMLOkButton().click()
  });*/

})

