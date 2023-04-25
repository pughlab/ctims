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
  getClinicalPRStatus, getClinicalTMB, getCNVCall,
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
  getProtocolStaffStatus, getSaveMatchingCriteria,
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
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {Arm} from "../support/interfaces/CtmlInterfaces3";

describe('CTIMS Trial Editor "NCT03297606_CAPTUR', () => {
  before(() => cy.visit('/'));
  deleteDownloadsFolderBeforeAll()
  it('should Validate the Trial Editor Page with valid test data', () => {
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
    cy.trialInformation(NCT03297606_CAPTUR.nct_id,
      "My Trial",
      "John Doe",
      "Draft",
      NCT03297606_CAPTUR.long_title,
      NCT03297606_CAPTUR.short_title,
      NCT03297606_CAPTUR.phase,
      NCT03297606_CAPTUR.protocol_no,
      NCT03297606_CAPTUR.nct_purpose,
      NCT03297606_CAPTUR.status)

    // Prior treatment requirements
    cy.clickMultiple('#array-item-list-root_prior_treatment_requirements>div>.pi-plus-circle',
      NCT03297606_CAPTUR.prior_treatment_requirements.length);
    cy.get('[id^=root_prior_treatment_requirements]').each((input, index) => {
      // check if there is a corresponding value in the array
      if (NCT03297606_CAPTUR.prior_treatment_requirements[index]) {
        // enter the value into the text box
        cy.wrap(input).type(NCT03297606_CAPTUR.prior_treatment_requirements[index]);
      }
    })
    //Age
    cy.age(NCT03297606_CAPTUR.age)

    //Drug List
    cy.clickMultiple('#array-item-list-root_drug_list_drug>div>.pi-plus-circle',
      NCT03297606_CAPTUR.drug_list.drug.length - 1);

    cy.get('[id^=root_drug_list_drug]').each((input, index) => {
      // check if there is a corresponding value in the array
      if (NCT03297606_CAPTUR.drug_list.drug[index]) {
        // enter the value into the text box
        cy.wrap(input).type(NCT03297606_CAPTUR.drug_list.drug[index].drug_name);
      }
    })

    //Management Group List
    cy.clickMultiple('#array-item-list-root_management_group_list_management_group>div>.pi-plus-circle',
      NCT03297606_CAPTUR.management_group_list.management_group.length - 1);
    cy.get('[id^=object-field-template-root_management_group_list_management_group').each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(NCT03297606_CAPTUR.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.management_group_list.management_group[index].is_primary).click();
    });

    //Site List - done
    cy.clickMultiple('#array-item-list-root_site_list_site>div>.pi-plus-circle',
      NCT03297606_CAPTUR.site_list.site.length - 1);
    cy.get('[id^=object-field-template-root_site_list_site]').each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(NCT03297606_CAPTUR.site_list.site[index].site_name).click();
      cy.wrap($input).find('.p-dropdown').eq(1).click().contains(NCT03297606_CAPTUR.site_list.site[index].site_status).click();
      cy.wrap($input).find('.p-selectbutton').eq(0).click().contains(NCT03297606_CAPTUR.site_list.site[index].coordinating_center).click();
      cy.wrap($input).find('.p-selectbutton').eq(1).click().contains(NCT03297606_CAPTUR.site_list.site[index].uses_cancer_center_irb).click();
    });

    //Sponsor List array of 5 values - done
    cy.clickMultiple('#array-item-list-root_sponsor_list_sponsor>div>.pi-plus-circle', NCT03297606_CAPTUR.sponsor_list.sponsor.length - 1)
    cy.get('[id^=object-field-template-root_sponsor_list_sponsor_]').each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(NCT03297606_CAPTUR.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });

    //Staff List - Done
    cy.clickMultiple('#array-item-list-root_staff_list_protocol_staff>div>.pi-plus-circle',
      NCT03297606_CAPTUR.staff_list.protocol_staff.length - 1);
    cy.get('[id^=object-field-template-root_staff_list_protocol_staff]').each(($input, index) => {
      cy.log($input.attr('id'));
      cy.wrap($input).find('.p-inputtext').eq(0).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].first_name);
      cy.wrap($input).find('.p-inputtext').eq(1).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].last_name);
      cy.wrap($input).find('.p-inputtext').eq(2).type(NCT03297606_CAPTUR.staff_list.protocol_staff[index].email_address);
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].institution_name).click();
      cy.wrap($input).find('.p-dropdown').eq(1).click().contains(NCT03297606_CAPTUR.staff_list.protocol_staff[index].staff_role).click();
    });
  })
//!************ Arm 1  *****************
  it('should validate the match criteria for Arm 1', () => {
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    cy.get('#array-item-list-root_treatment_list_step_0_arm>div>div>div>div>div').each(($input, index) => {
      cy.log($input.attr('id'));

      cy.wrap($input).find('.p-inputtext').eq(0).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_code);
      cy.wrap($input).find('.p-inputtext').eq(1).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_description);
      cy.wrap($input).find('.p-inputtext').eq(2).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_internal_id.toString());
      cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[index].arm_suspended).click();
    })
    cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_0_dose_level]`).each(($input, index) => {
      cy.log($input.attr('id'));
      cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_code').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_code);
      cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_description').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_description);
      cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_internal_id').type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_internal_id.toString());
      cy.get('#root_treatment_list_step_0_arm_0_dose_level_' + index + '_level_suspended').contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].dose_level[index].level_suspended).click();
    });
    //click first matching criteria link of Arm 1
    cy.get('.CtimsMatchingCriteriaWidget_edit-matching-criteria-container__MFwrC').eq(0).click()

    getAddCriteriaGroup().click()

    //!******** OR ********************
    cy.clickParentAnd()
    cy.clickOr()
    //Click Or Parent at index 1
    cy.clickParentNode(1).click()
    let orConditions = NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[0].or
    cy.log(JSON.stringify(orConditions))
    cy.log(orConditions.length.toString())
    cy.clickGenomic()
    cy.clickChildToggleArrowButton(1)
    // cy.clickParentNode(2).click()
    // getLeftMenuComponent().eq(2).click()
    cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
    let subChildren = cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li')
    subChildren.find('.p-treenode-children>li')
      .each((childElement, index) => {
        cy.log(index.toString())
        if (Cypress.$(childElement).length > 0) {
          cy.wrap(childElement).click() // click on each child element
          let condition = orConditions[index % orConditions.length]; // get the corresponding and condition
          cy.log(orConditions.length.toString())
          Object.entries(condition.genomic).map(([key, value]) => {
            if (key === 'cnv_call') {
              getCNVCall().type(value)
            }
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

    //!******** Add clinical at Parent AND ********************
    cy.clickParentNode(0).click()
    //cy.clickAnd()
    cy.clickClinical()
    getClinicalAge().type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[1].clinical.age_numerical)
    getClinicalOncotreePrimaryDiagnosis().type(NCT03297606_CAPTUR.treatment_list.step[0].arm[0].match[0].and[1].clinical.oncotree_primary_diagnosis)
    getSaveMatchingCriteria().click()
  })
  //!************ Arm 7  *****************

  it('should validate the match criteria for Arm 7', () => {
    cy.get('#array-item-list-root_treatment_list_step_0_arm').contains('Add arm').click()

    cy.get('#object-field-template-root_treatment_list_step_0_arm_1').each(($input, index) => {
      cy.log($input.attr('id'));

      cy.wrap($input).find('.p-inputtext').eq(0).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].arm_code);
      cy.wrap($input).find('.p-inputtext').eq(1).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].arm_description);
      cy.wrap($input).find('.p-inputtext').eq(2).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].arm_internal_id.toString());
      cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].arm_suspended).click();
    })

    cy.get('#array-item-list-root_treatment_list_step_0_arm_1_dose_level').contains('Add Dose Level').click()
    cy.wait(1000)
    cy.get('#object-field-template-root_treatment_list_step_0_arm_1_dose_level_0').each(($input, index) => {
      cy.log($input.attr('id'));
      cy.wrap($input).find('.p-inputtext').eq(0).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].dose_level[0].level_code);
      cy.wrap($input).find('.p-inputtext').eq(1).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].dose_level[0].level_description);
      cy.wrap($input).find('.p-inputtext').eq(2).type(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].dose_level[0].level_internal_id.toString());
      cy.wrap($input).find('.p-selectbutton').contains(NCT03297606_CAPTUR.treatment_list.step[0].arm[1].dose_level[0].level_suspended).click();
    });
    //cy.pause()
    cy.get('.CtimsMatchingCriteriaWidget_edit-matching-criteria-container__MFwrC').eq(1).click()

    getAddCriteriaGroup().click()

    //!******** OR ********************

    cy.clickParentAnd()
    cy.clickOr()
    //Click Or Parent at index 1
    cy.clickParentNode(1).click()
    let orConditions = NCT03297606_CAPTUR.treatment_list.step[0].arm[1].match[0].and[0].or
    cy.log(JSON.stringify(orConditions))
    cy.log(orConditions.length.toString())
    cy.clickGenomic()
    cy.clickChildToggleArrowButton(1)
    // cy.clickParentNode(2).click()
    // getLeftMenuComponent().eq(2).click()
    cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1)
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
    //!******** AND ********************
    cy.clickParentNode(0)
    cy.clickAnd()
    cy.clickParentNode(4)
    cy.clickClinical()
    cy.clickChildToggleArrowButton(2)
    // cy.wait(1000)
    let clinicalLength = NCT03297606_CAPTUR.treatment_list.step[0].arm[1].match[0].and[1].and.length - 1
    cy.clickMultipleFunction(getAddCriteriaToSameList(), clinicalLength)

    let andConditions = NCT03297606_CAPTUR.treatment_list.step[0].arm[1].match[0].and[1].and
    subChildren = cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li')
    subChildren.contains('And').find('.p-treenode-children>li')
      .each((childElement, index) => {
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
})
  //!******** Match Preview ********************
  it('should validate multiple "Json preview" match with "NCT03297606_CAPTUR"', () => {
    NCT03297606_CAPTUR.treatment_list.step[0].arm.forEach((arm,armIndex) => {
      const matchCriteria = arm.match
      cy.get('.p-tabview.p-component').each(($el, index) => {
        if (index === 0) {
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
//**************** Match Export Json file with Test Data

  it('should validate exported "Trial Information" matches "NCT03297606_CAPTUR" ', () => {
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
      const exportedAttributeNames = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
      const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];

      const exportedTrialInformation = exportedAttributeNames.map((attribute) => exportedCtmlModel[attribute]);
      const testDataTrialInformation = testDataAttributeNames.map((attribute) => NCT03297606_CAPTUR[attribute]);

      cy.compareArrays(exportedTrialInformation, testDataTrialInformation);
    });
  });

  it('should validate exported "Age" matches "NCT03297606_CAPTUR"', () => {
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.age
      let testData = NCT03297606_CAPTUR.age
      cy.compareArrays(exportData.split(' '), testData.split(' ')) //Age is a single value, not a array
    })
  });

  it('should validate exported "Prior treatment requirement" match "NCT03297606_CAPTUR"', () => {
    cy.readJsonFile('ctml-model.json').then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.prior_treatment_requirements
      let testData = NCT03297606_CAPTUR.prior_treatment_requirements
      cy.compareArrays(exportData, testData)
    })
  });

  it('should validate exported "Drug list" match "NCT03297606_CAPTUR"', () => {
    let rawData = NCT03297606_CAPTUR.drug_list.drug

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
    let rawData = NCT03297606_CAPTUR.management_group_list.management_group;

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
    let rawData = NCT03297606_CAPTUR.site_list.site

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
    let rawData = NCT03297606_CAPTUR.sponsor_list.sponsor

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
    let rawData = NCT03297606_CAPTUR.staff_list.protocol_staff

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
    const matchAndT = NCT03297606_CAPTUR.treatment_list.step[0].arm;
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

  });
  })