import {
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
  getPlusIcon, getPreviewWindow, getPrimaryManagementGroupPlusIcon,
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
  selectDraftCtmlStatus,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons
} from '../../support/app.po';
//import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT02503722_Osimertinib} from "../../fixtures/NCT02503722_Osimertinib"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';
import {NCT03297606_CAPTUR} from "../../fixtures/NCT03297606_CAPTUR";

describe('CTIMS Trial Editor', () => {
  before(() => {
    cy.visit('/')
  });
 // deleteDownloadsFolderBeforeAll()
  it('should Validate the Trial Editor Page with valid test data', () => {
     cy.title().should('contain', 'CTIMS')
     trialEditorLeftPanelList().should('have.length', '9')
     cy.trialInformation(NCT02503722_Osimertinib.nct_id,
       "My Trial",
       "John Doe",
       "Draft",
       NCT02503722_Osimertinib.long_title,
       NCT02503722_Osimertinib.short_title,
       NCT02503722_Osimertinib.phase,
       NCT02503722_Osimertinib.protocol_no,
       NCT02503722_Osimertinib.nct_purpose,
       NCT02503722_Osimertinib.status)

     // Prior treatment requirements
     cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),NCT02503722_Osimertinib.prior_treatment_requirements.length)
     getPriorTreatmentRequirementMultiple().each((input, index) => {
       // check if there is a corresponding value in the array
       if (NCT02503722_Osimertinib.prior_treatment_requirements[index]) {
         // enter the value into the text box
         cy.wrap(input).type(NCT02503722_Osimertinib.prior_treatment_requirements[index]);
       }
     })
    //cy.priorTreatmentRequirement(NCT02503722_Osimertinib.prior_treatment_requirements[0])
    //Age
    cy.age(NCT02503722_Osimertinib.age)

    //Drug List
    cy.clickMultipleFunction(getDrugNamePlusIcon(), NCT02503722_Osimertinib.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      // check if there is a corresponding value in the array
      if (NCT02503722_Osimertinib.drug_list.drug[index]) {
        // enter the value into the text box
        cy.wrap(input).type(NCT02503722_Osimertinib.drug_list.drug[index].drug_name);
      }
    })
    //Management Group List has 1-text field and 1-Checkbox
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), NCT02503722_Osimertinib.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(NCT02503722_Osimertinib.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(NCT02503722_Osimertinib.management_group_list.management_group[index].is_primary).click();
    });

    //Site List
    cy.clickMultipleFunction(getSiteNamePlusIcon(), NCT02503722_Osimertinib.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(NCT02503722_Osimertinib.site_list.site[index].site_name).click();
      cy.wrap($input).find('.p-dropdown').eq(1).click().contains(NCT02503722_Osimertinib.site_list.site[index].site_status).click();
      cy.wrap($input).find('.p-selectbutton').eq(0).click().contains(NCT02503722_Osimertinib.site_list.site[index].coordinating_center).click();
      cy.wrap($input).find('.p-selectbutton').eq(1).click().contains(NCT02503722_Osimertinib.site_list.site[index].uses_cancer_center_irb).click();
    });

    //Sponsor List array of 5 values - done
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), NCT02503722_Osimertinib.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(NCT02503722_Osimertinib.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(NCT02503722_Osimertinib.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });

    //Staff List - Done
    cy.clickMultipleFunction(getProtocolStaffPlusIcon,
      NCT02503722_Osimertinib.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      cy.log($input.attr('id'));
      cy.wrap($input).find('.p-inputtext').eq(0).type(NCT02503722_Osimertinib.staff_list.protocol_staff[index].first_name);
      cy.wrap($input).find('.p-inputtext').eq(1).type(NCT02503722_Osimertinib.staff_list.protocol_staff[index].last_name);
      cy.wrap($input).find('.p-inputtext').eq(2).type(NCT02503722_Osimertinib.staff_list.protocol_staff[index].email_address);
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(NCT02503722_Osimertinib.staff_list.protocol_staff[index].institution_name).click();
      cy.wrap($input).find('.p-dropdown').eq(1).click().contains(NCT02503722_Osimertinib.staff_list.protocol_staff[index].staff_role).click();
    });
  })
//!************ Arm 1  *****************
    it('should validate the match criteria for Arm 1', () => {
      trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
     //delete the dose level
      cy.get('#array-item-list-root_treatment_list_step_0_arm_0_dose_level').children().find('.pi-trash').click()
      cy.clickMultipleFunction(getAddArmPlusIcon(), NCT02503722_Osimertinib.treatment_list.step[0].arm.length - 1)
      const treatmentList = NCT02503722_Osimertinib.treatment_list.step[0].arm;
      const doseLevels = treatmentList[0].dose_level;

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
           getClinicalAge().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.age_numerical)
           getClinicalOncotreePrimaryDiagnosis().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.oncotree_primary_diagnosis)

           //!******** OR ********************
           cy.clickParentNode(0).click()
           cy.clickOr()
           let orConditions = NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or
           cy.log(JSON.stringify(orConditions))
           cy.log(orConditions.length.toString())
           cy.clickParentNode(2).click()
           cy.clickGenomic()
         //  cy.clickChildToggleArrowButton(0)
           cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
           cy.clickChildToggleArrowButton(2)
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


  it('should validate multiple "Json preview" match with "NCT03297606_CAPTUR"', () => {
    NCT02503722_Osimertinib.treatment_list.step[0].arm.forEach((arm,armIndex) => {
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
  //!************Export Ctml***************
  it('should click on Export button, "Export as JSON" file ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html', 'json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    trialEditorExportCtml().eq(1).should('contain', 'Export CTML').click()
  });

  it('should click on Export button, "Export as YAML" file ', () => {
    trialEditorRadioButtons().eq(1).click({force: true})
    trialEditorExportCtml().eq(1).should('contain', 'Export CTML').click()
  });

  it('should validate the match between "Export JSON" and "Export YAML" file', () => {
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModelJson) => {
      const json = JSON.stringify(exportedCtmlModelJson);
      cy.readJsonFile('ctml-model.yaml').then((exportedCtmlModelYaml) => {
        const yamlObject = yaml.load(exportedCtmlModelYaml);
        const yamlVal = JSON.stringify(yamlObject);
        cy.compareArrays(json.split(','), yamlVal.split(','))
      });
    });
  })
//!**************** Match Export Json file with Test Data

  it('should validate exported "Trial Information" matches "NCT03297606_CAPTUR" ', () => {
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
      const exportedAttributeNames = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
      const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];

      const exportedTrialInformation = exportedAttributeNames.map((attribute) => exportedCtmlModel[attribute]);
      const testDataTrialInformation = testDataAttributeNames.map((attribute) => NCT02503722_Osimertinib[attribute]);

      cy.compareArrays(exportedTrialInformation, testDataTrialInformation);
    });
  });

  it('should validate exported "Age" matches "NCT03297606_CAPTUR"', () => {
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.age
      let testData = NCT02503722_Osimertinib.age
      cy.compareArrays(exportData.split(' '), testData.split(' ')) //Age is a single value, not a array
    })
  });

  it('should validate exported "Prior treatment requirement" match "NCT03297606_CAPTUR"', () => {
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.prior_treatment_requirements
      let testData = NCT02503722_Osimertinib.prior_treatment_requirements
      cy.compareArrays(exportData, testData)
    })
  });

  it('should validate exported "Drug list" match "NCT03297606_CAPTUR"', () => {
    let rawData = NCT02503722_Osimertinib.drug_list.drug

    cy.drugListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.drug_list.drug

        cy.drugListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });
  it('should validate expotred "Management Group list" matches "NCT03297606_CAPTUR"', () => {
    let rawData = NCT02503722_Osimertinib.management_group_list.management_group;

    cy.managementGroupListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.management_group_list.management_group

        cy.managementGroupListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });

  it('should validate exported "Site Group list" matches "NCT03297606_CAPTUR"', () => {
    let rawData = NCT02503722_Osimertinib.site_list.site

    cy.siteListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.site_list.site

        cy.siteListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });

  it('should validate exported "Sponsor list" matches "NCT03297606_CAPTUR"', () => {
    let rawData = NCT02503722_Osimertinib.sponsor_list.sponsor

    cy.sponsorListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.sponsor_list.sponsor

        cy.sponsorListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  });

  it('should validate exported "Staff list" matches "NCT03297606_CAPTUR"', () => {
    let rawData = NCT02503722_Osimertinib.staff_list.protocol_staff

    cy.staffListAttributes(rawData).then(testDataMatchingCriteria => {
      cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
        const exportData = exportedCtmlModel.staff_list.protocol_staff;

        cy.staffListAttributes(exportData).then(ctmlMatchingCriteria => {
          cy.compareMultiple(ctmlMatchingCriteria,testDataMatchingCriteria)
        });
      });
    });
  })

  it('should validate "Treatment list" with multiple arm/matching criteria matches with "NCT03297606_CAPTUR"',() =>{
    //Arm and dose level validation
    const matchAndT = NCT02503722_Osimertinib.treatment_list.step[0].arm;
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
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
    });

  });
})


