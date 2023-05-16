import {
  createCTMLButton,
  getAddArmPlusIcon,
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
  getClinicalAge,
  getClinicalDropdown,
  getClinicalERStatus,
  getClinicalHER2Status,
  getClinicalOncotreePrimaryDiagnosis,
  getClinicalPRStatus, getCNVCall,
  getCtmlStatusDropdown,
  getDefaultTextMatchingCriteria,
  getDrugName, getDrugNamePlusIcon, getDrugNameTextBoxMultiple,
  getEditMatchingCriteria, getEditMatchingCriteriaMultiple,
  getGenomicDropDown,
  getHugoSymbol,
  getLeftMenuComponent,
  getLevelCode,
  getLevelDescription,
  getLevelInternalId,
  getLongTitle,
  getManagementGroupName, getManagementGroupNameTextBoxMultiple, getMatchCriteriaHeader,
  getMatchingCriteriaTableHeader,
  getMatchModalFooterButtons,
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr, getMultipleArm,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon, getPreviewTextWindow, getPreviewWindow, getPrimaryManagementGroupPlusIcon,
  getPrincipalInvestigator,
  getPriorTreatmentRequirementMultiple,
  getPriorTreatmentRequirementPlusIconMultiple,
  getProteinChange,
  getProtocolNumber,
  getProtocolStaffEmail,
  getProtocolStaffFirstName,
  getProtocolStaffInstitutionalName,
  getProtocolStaffLastName, getProtocolStaffMultiple, getProtocolStaffPlusIcon,
  getProtocolStaffRole,
  getProtocolStaffStatus, getSaveMatchingCriteria,
  getShortTitle,
  getSiteName, getSiteNameMultiple, getSiteNamePlusIcon,
  getSiteStatus,
  getSponsorName, getSponsorNameMultiple, getSponsorNamePlusIcon, getSubGroup,
  getSwitchGroupOperator,
  getTrialId,
  getTrialNickname,
  getTruncateButton,
  getVariantCategory,
  getVariantClassification,
  selectDraftCtmlStatus, trialEditorBackButton,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons, trialEditorSave, trialTableDelete, trialTableDialogueDeleteBtn, trialTableDots
} from '../../support/app.po';
import {NCT02503722_Osimertinib} from "../../fixtures/NCT02503722_Osimertinib"
import baseClass from "../Base/baseClass.cy"
import dateClass from "../Base/dateClass.cy";

const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
let exportJsonFile = 'NCT02503722_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');


describe('CTIMS Trial Editor NCT02503722_Osimertinib', { testIsolation: false }, () => {
  baseClass.beforeClass()
 // deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT02503722_Osimertinib
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`
  it('should enter values into the "Trial Editor Form"', () => {
    cy.get('tbody>tr>td').should('contain','No CTML files. Select the \'Create\' button to start.')
    createCTMLButton().click()
     cy.title().should('contain', 'CTIMS')
     trialEditorLeftPanelList().should('have.length', '9')
    getTrialId().type(ctmlTestData.nct_id)
    trialEditorSave().click()
    trialEditorBackButton().click({force:true})
    //first row, second column three dots
   // tbody>tr:nth-child(1)>td:nth-child(2)
    cy.get('.trials_trialsText__0DJhD').should('contain','Trials')
    trialTableDots().trigger('mouseover').invoke('addClass', 'p-button').click()
    //  getLeftMenuComponent().eq(indexNum).trigger('mouseover').invoke('addClass', 'p-menuitem-active').click()
   trialTableDelete().click()
    trialTableDialogueDeleteBtn().click()
    //default message

    /* cy.trialInformation(ctmlTestData.nct_id,
       "My Trial",
       "John Doe",
       "Draft",
       ctmlTestData.long_title,
       ctmlTestData.short_title,
       ctmlTestData.phase,
       ctmlTestData.protocol_no,
       ctmlTestData.nct_purpose,
       ctmlTestData.status
     )

     // Prior treatment requirements
     cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
     getPriorTreatmentRequirementMultiple().each((input, index) => {
       // check if there is a corresponding value in the array
       if (ctmlTestData.prior_treatment_requirements[index]) {
         cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
       }
     })

    //Age
    cy.age(ctmlTestData.age)

    //Drug List
    cy.clickMultipleFunction(getDrugNamePlusIcon(), ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
      }
    })
    //Management Group List
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
    });

    //Site List
    cy.clickMultipleFunction(getSiteNamePlusIcon(), ctmlTestData.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      const site = ctmlTestData.site_list.site[index]
      cy.fillSiteDetails($input, site)
    })

    //Sponsor List
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });

    //Staff List
    cy.clickMultipleFunction(getProtocolStaffPlusIcon(), ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      const staff = ctmlTestData.staff_list.protocol_staff[index]
      cy.fillProtocolStaffDetails($input, staff)
    });
  })
//!************ Arm 1  *****************
    it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1', () => {
      trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
     //delete the dose level
      cy.wait(2000)
      cy.get('#array-item-list-root_treatment_list_step_0_arm_0_dose_level').children().find('.pi-trash').click()
      cy.wait(1000)

      cy.clickMultipleFunction(getAddArmPlusIcon(), ctmlTestData.treatment_list.step[0].arm.length - 1)
      const treatmentList = ctmlTestData.treatment_list.step[0].arm;
      const doseLevels = treatmentList[0].dose_level;
      cy.wait(1000)
      getMultipleArm().each(($input, index) => {
        cy.log($input.attr('id'));
        const arm = treatmentList[index];
        //At Arm 1
         if(index === 0) {
           cy.wrap($input).find('.p-inputtext').eq(0).type(arm.arm_code);
           cy.wrap($input).find('.p-inputtext').eq(1).type(arm.arm_description);
           cy.wrap($input).find('.p-inputtext').eq(2).type(arm.arm_internal_id.toString());
           cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click();
           //click multiple dose
           cy.clickMultiple(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]>div>.pi-plus-circle`, doseLevels.length)

           cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]>div>div>div>div>#panel-children`).each(($input, doseIndex) => {
             const dose = doseLevels[doseIndex];
             cy.log(doseIndex.toString())
             cy.log(JSON.stringify(doseLevels))
             cy.log(JSON.stringify(doseLevels[doseIndex]));
             cy.wait(1000)
                if(doseIndex === 0) {
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).type(dose.level_code);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).type(dose.level_description);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).type(dose.level_internal_id.toString());
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click();
                }
                if(doseIndex === 1) {
                  cy.log(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).type(dose.level_code);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).type(dose.level_description);
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).type(dose.level_internal_id.toString());
                  cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click();
                }
           });

           //click first matching criteria link of each arm
           getEditMatchingCriteriaMultiple().eq(index).click()
           //Validate the header
           getMatchCriteriaHeader().should('contain', treatmentList[index].arm_code);
           // }
           getAddCriteriaGroup().click()
           //!******** Add clinical at Parent AND ********************
           cy.clickParentNode(0).click()
           cy.clickClinical()
           getClinicalAge().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].clinical.age_numerical)
           getClinicalOncotreePrimaryDiagnosis().type(ctmlTestData.treatment_list.step[0].arm[0].match[0].and[0].clinical.oncotree_primary_diagnosis)

           //!******** OR ********************
           cy.clickParentNode(0).click()
           cy.clickOr()
           let orConditions = ctmlTestData.treatment_list.step[0].arm[0].match[0].and[1].or
           cy.log(JSON.stringify(orConditions))
           cy.log(orConditions.length.toString())
           cy.clickParentNode(2).click()
           cy.clickGenomic()
          // Click Add criteria to same list to add two genomic criteria
           cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
           cy.clickChildToggleArrowButton(2)
           //Iterate through the 'Or' child elements to add the individual values
           getSubGroup().find('.p-treenode-children>li')
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
                   if (key === 'protein_change') {
                     getProteinChange().type(value)
                   }
                   if (key === 'variant_classification') {
                     getVariantClassification().click()
                     getGenomicDropDown().contains(value.replace(/_/g, " ")).click()
                   }
                   if (key === 'cnv_call') {
                     getCNVCall().click()
                     getGenomicDropDown().contains(value).click()
                   }
                 })
               } else {
                 return false;
               }
             })
         }
           });
      getSaveMatchingCriteria().click()
    })


  it('should validate the match between "Json preview window text" and "ctmlTestData"', () => {
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
  it('should validate the match between "JSON preview window text" and "YAML preview window text" ',  () => {
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
  //!************Export Ctml***************
  it('should click on Export button, "Export as JSON" file ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html', 'json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    trialEditorExportCtml().eq(1).should('contain', 'Export CTML').click()
  });

  it('should click on Export button, "Export as YAML" file ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(1).click({force: true})
    trialEditorExportCtml().eq(1).should('contain', 'Export CTML').click()
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

  it('should validate exported "Treatment list" with multiple arm/matching criteria matches with "ctmlTestData"',() =>{
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
          } if (clauseE.clinical) {
            expect(JSON.stringify(clauseT)).to.deep.equal(JSON.stringify(clauseE));
          }
        });
      });
    });*/
  });
})


