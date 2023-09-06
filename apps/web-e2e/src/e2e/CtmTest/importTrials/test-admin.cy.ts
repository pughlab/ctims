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
let exportJsonFile = 'NCT02503722_2023-05-12.json';
let split = exportJsonFile.substring(0,11); //grab only NCT id
let jsonFile = split.concat('_', dateClass.currentDate()).concat('.json');
let yamlFile = split.concat('_', dateClass.currentDate()).concat('.yaml');

describe('Validate as TrialGroupx Admin on "NCT02503722_Osimertinib" ', { testIsolation: false }, () => {
  baseClass.adminTrialGroupx()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT02503722_Osimertinib
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`
  const fixturePath = '/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/src/fixtures/NCT02503722_Osimertinib_fixed.json'

  it('should "Delete" the existing Ctml file "NCT02503722" as Admin', () => {
    //cy.deleteExistingTrial('NCT02503722_Osimertinib TrialGroupx Admin role')
  })

  it('should enter values into the "Trial Editor Form" of "NCT02503722_Osimertinib" as Admin', () => {
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()

    cy.wait(1000);
    cy.get('.Trials_buttonsContainer__p4gFm>button:nth-child(1)').click()
    cy.get('input[type=file]')
      .invoke('show')
    cy.get('[type="file"]', {timeout: 60000})
      .selectFile(fixturePath)
  })
  it.skip('should validate Trial Information', () => {
    const trialInformationTextField = cy.get('#trial-information>div:nth-child(2)>div>div>div>div>div>input');
    const trialInformationDropdown = cy.get('#trial-information>div:nth-child(2)>div>div>div>div>div>div:nth-child(2)')
    trialInformationTextField.invoke('val').each((textVal) => {

      const value = textVal
    })

    /*editorValue.then(values => {
      const valuesArray = Array.isArray(values) ? values : [values]; // Ensure values is an array
      valuesArray.forEach((value, index) => {
        cy.log(valuesArray.toString())
      })*/


  })
  it.skip('should validate Trial Information', () => {
    // cy.wait(3000)
    const trialInformation = cy.get('#trial-information>div:nth-child(2)>div>div>div>div>div>input');
    const commonIdentifier = 'nct_id';

    cy.fixture('NCT02503722_Osimertinib_fixed.json').then((fixtureData) => {
      // Extract attributes from fixture data
      const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
      const testDataTrialInformation = testDataAttributeNames.map((attribute) => {
        return fixtureData[attribute] || null; // Return null if attribute is not present
      });

      const fieldValues = [];
      trialInformation.invoke('val')
        .each(($el, index) => {
          let fieldValue;
          fieldValue = $el
          cy.log("val",fieldValue)
          /*  if ($el.is('input')) {
              // For text fields
              fieldValue = $el.val();
            } else if ($el.find('select').length > 0) {
              fieldValue = $el.find('option:selected').val();
              cy.log(`Dropdown value: ${fieldValue}`);
            }*/
          //const fieldValue = $el.find('select').val();
          fieldValues.push(fieldValue);
        }).then(() => {
        cy.log("field value not filtered", fieldValues.toString())
        // Filter out blank or empty values from fieldValues
        const fieldValueFiltered = fieldValues.map(value => value.trim()).filter(value => value !== '');

        // Log the testDataTrialInformation and fieldValueFiltered arrays
        cy.log('testDataTrialInformation:', testDataTrialInformation);
        cy.log('fieldValueFiltered:', fieldValueFiltered);

        // Compare the filtered field values with the corresponding fixture values
        fieldValueFiltered.forEach((filterValue, index) => {
          cy.log("all",filterValue)
          const expectedValue = testDataTrialInformation[index];
          const attributeName = testDataAttributeNames[index];

          cy.log(`Comparing attribute: ${attributeName}`);
          cy.log(`Expected value: ${expectedValue}`);
          cy.log(`Actual value: ${filterValue}`);

          // Compare the values using assertion
          // expect(filterValue).to.equal(expectedValue);
        });
      });
    });
  });
  it.skip('should test', () => {
    const fieldValues = [];
    const trialInformation = cy.get('#trial-information>div:nth-child(2)>div>div>div>div>div>input');

    trialInformation.each(($el, index) => {
      const editorTextFieldValue = $el.val();
      fieldValues.push(editorTextFieldValue);

      const fieldValueFiltered = fieldValues.map(value => value.trim()).filter(value => value !== '');

      cy.fixture('NCT02503722_Osimertinib_fixed.json').then((fixtureData) => {
        const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'protocol_no', 'nct_purpose'];
        const expectedValue = fixtureData[testDataAttributeNames[index]];

        cy.log(`Comparing ${testDataAttributeNames[index]}:`);
        cy.log(`Editor Text Field Value: ${fieldValueFiltered}`);
        cy.log(`Expected Value: ${expectedValue}`);

        expect(editorTextFieldValue).to.deep.equal(expectedValue);
      });
    });
  });


  it.skip('should validate Trial Information', () => {
    const trialInformation = cy.get('#trial-information>div:nth-child(2)>div>div>div>div>div>input');
    const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'protocol_no', 'nct_purpose'];


    const commonIdentifier = 'nct_id';
    cy.fixture('NCT02503722_Osimertinib_fixed.json').then((fixtureData) => {
      const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no']; // Include all relevant attributes
      const testDataTrialInformation = testDataAttributeNames.map((attribute) => {
        // Access the attribute directly using its key
        return fixtureData[commonIdentifier] === attribute ? fixtureData[attribute] : null;
        //  });
        //const testDataTrialInformation = testDataAttributeNames.map((attribute) => fixtureData[attribute]);
        // const testDataTrialInformation = testDataAttributeNames.map((attribute) => {
        // Find the data in the JSON using the common identifier
        //    return fixtureData.find(item => item[commonIdentifier] === attribute)[attribute];
      });
      cy.log(testDataTrialInformation.toString())
      // const testDataTrialInformation = testDataAttributeNames.map((attribute) => fixturePath[attribute]);
      cy.log('fixturePath:', fixturePath);

      const fieldValues = [];

      trialInformation.each(($el) => {
        const fieldValue = $el.val();
        fieldValues.push(fieldValue);
      }).then(() => {
        cy.log('fieldValues:', fieldValues);

        // Filter out blank or empty values from fieldValueFiltered
        const fieldValueFiltered = fieldValues.map(value => value.trim()).filter(value => value !== '');
        //  cy.log('fieldValueFiltered:', fieldValueFiltered.toString());

        // Log the testDataTrialInformation and fieldValueFiltered arrays
        cy.log('testDataTrialInformation:', testDataTrialInformation);
        cy.log('fieldValueFiltered:', fieldValueFiltered);

        // Compare the filtered field values with the corresponding fixture values
        fieldValueFiltered.forEach((filterValue, index) => {
          const expectedValue = testDataTrialInformation[index];
          const attributeName = testDataAttributeNames[index];

          cy.log(`Comparing attribute: ${attributeName}`);
          cy.log(`Expected value: ${expectedValue}`);
          cy.log(`Actual value: ${filterValue}`);
          /*fieldValueFiltered.forEach((filterValue, index) => {
            const expectedValue = testDataTrialInformation[index];
            cy.log(`Comparing attribute: ${testDataAttributeNames[index]}`);
            cy.log(`Expected value: ${expectedValue}`);
            cy.log(`Actual value: ${filterValue}`);*/
          //  expect(filterValue).to.deep.equal(expectedValue);
        });
      });
    });
  })


  it.skip('should validate Trial Information',  () => {
    const trialInformation = cy.get('#trial-information>div:nth-child(2)>div>div>div>div>div>input')
    const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
    const testDataTrialInformation = testDataAttributeNames.map((attribute) => fixturePath[attribute]);

    const fieldValues = [];

    trialInformation.each(($el, index, $list) => {
      const fieldValue = $el.val();
      fieldValues.push(fieldValue);
      // const fieldValue = $el.val()
      //cy.log("To String value",fieldValue.toString())
    }).then(() => {
      cy.log('fieldValues:', fieldValues);

      // Filter out blank or empty values from testDataTrialInformation
      const fieldValueFiltered = fieldValues.filter(value => value.trim() !== '');
      cy.log('testDataTrialInformationFiltered:', fieldValueFiltered.toString());
      /*  testDataTrialInformationFiltered.forEach(val => {
          cy.log(val.toString())
        })*/
      /*fieldValues.forEach((fieldValue, index) => {
        const testDataValue = testDataTrialInformationFiltered[index]; // Get corresponding value from testDataAttributeNames
        cy.log("Field Value:", fieldValue);

        expect(fieldValue).to.deep.equal(testDataValue);
      });*/
      // Compare JSON fixture data with text field values
      /*for (let i = 0; i < fixturePath.length; i++) {
        const fieldValue = fieldValues[i];
        const jsonValue = fixturePath[i];

        // Compare the values
        expect(fieldValue).to.deep.equal(jsonValue);
      }*/
    });


    //cy.log(trialInformation.invoke('text'))
    /*cy.trialInformation(ctmlTestData.nct_id,
      "NCT02503722_Osimertinib TrialGroupx Admin role",
      "John Doe",
      "Draft",
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no,
      ctmlTestData.nct_purpose,
      ctmlTestData.status)*/
  })
  /* it('should Save Trial information values, click edit NCT02503722_Osimertinib to re-enter, as Admin',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
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
   it('should Save Prior Treatment Requirement values, click edit NCT02503722_Osimertinib to re-enter as Admin ',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
   })

   //!************** Age ***************

   it('should enter the Age values of NCT02503722_Osimertinib as Admin', () => {
     trialEditorLeftPanelList().eq(2).should('contain','Age').click()
     cy.age(ctmlTestData.age)
   });
   it('should Save Age values, click edit NCT02503722_Osimertinib to re-enter as Admin ',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
   })

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

   it('should Save Drug List values, click edit NCT02503722_Osimertinib to re-enter as Admin ',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
   })

   //!************** Management Group List ***************

   it('should enter the Management Group List values of NCT02503722_Osimertinib as Admin', () => {
     trialEditorLeftPanelList().eq(4).should('contain', 'Management Group List').click()
     cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), ctmlTestData.management_group_list.management_group.length - 1)
     getManagementGroupNameTextBoxMultiple().each(($input, index) => {
       cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
       cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
     });
   })

     it('should Save Management Group List values, click edit NCT02503722_Osimertinib to re-enter as Admin ',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
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

   it('should Save Site List values, click edit NCT02503722_Osimertinib to re-enter as Admin ',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
   })

   //!************** Sponsor List ***************

   it('should enter the Sponsor List values of NCT02503722_Osimertinib as Admin', () => {
     trialEditorLeftPanelList().eq(6).should('contain','Sponsor List').click()
     cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
     getSponsorNameMultiple().each(($input, index) => {
       cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
       cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
     });
   });

   it('should Save Sponsor List values, click edit NCT02503722_Osimertinib to re-enter as Admin ',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
   })

   //!************** Staff List ***************

   it('should enter the Staff List values of NCT02503722_Osimertinib as Admin', () => {
     trialEditorLeftPanelList().eq(7).should('contain','Staff List').click()
     cy.clickMultipleFunction(getProtocolStaffPlusIcon(), ctmlTestData.staff_list.protocol_staff.length - 1);
     getProtocolStaffMultiple().each(($input, index) => {
       const staff = ctmlTestData.staff_list.protocol_staff[index]
       cy.fillProtocolStaffDetails($input, staff)
     });
   });
   it('should Save Staff List values, click edit NCT02503722_Osimertinib to re-enter as Admin ',() => {
     cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
   })
 */
//************ Arm 1  *****************
  /* it('should enter the values in "Treatment List and Matching criteria modal" for Arm 1 "NCT02503722_Osimertinib" as Admin' , () => {
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
   })*/

  /*it('should validate the match between "Json preview window text" and "NCT02503722_Osimertinib" as Admin', () => {
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
    ' "NCT02503722_Osimertinib" as Admin',  () => {
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
  it('should Save, Edit NCT02503722_Osimertinib to re-enter as Admin to validate Export as Admin ',() => {
    cy.clickSaveEditButtonForTrialGroupAdmin("NCT02503722_Osimertinib TrialGroupx Admin role")
  })


  //!************Export Ctml***************
  it('should click on Export button, "Export as JSON" file of "NCT02503722_Osimertinib" as Admin', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html', 'json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    validateCtmlOkButton().should('not.have.class','p-disabled').click()
  });

  it('should click on Export button, "Export as YAML" file of "NCT02503722_Osimertinib" as Admin ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(1).click({force: true})
    validateCtmlOkButton().click()
  });

  it('should validate the match between "Export JSON" and "Export YAML" file of "NCT02503722_Osimertinib" as Admin', () => {
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

  it('should validate exported "Trial Information" matches "ctmlTestData" of "NCT02503722_Osimertinib" as Admin ', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportedAttributeNames = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
      const testDataAttributeNames = ['nct_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];

      const exportedTrialInformation = exportedAttributeNames.map((attribute) => exportedCtmlModel[attribute]);
      const testDataTrialInformation = testDataAttributeNames.map((attribute) => ctmlTestData[attribute]);

      cy.compareArrays(exportedTrialInformation, testDataTrialInformation);
    });
  });

  it('should validate exported "Age" matches "ctmlTestData" of "NCT02503722_Osimertinib" as Admin', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.age
      let testData = ctmlTestData.age
      cy.compareArrays(exportData.split(' '), testData.split(' ')) //Age is a single value, not a array
    })
  });

  it('should validate exported "Prior treatment requirement" match "ctmlTestData" of "NCT02503722_Osimertinib" as Admin', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModel) => {
      const exportData = exportedCtmlModel.prior_treatment_requirements
      let testData = ctmlTestData.prior_treatment_requirements
      cy.compareArrays(exportData, testData)
    })
  });

  it('should validate exported "Drug list" match "ctmlTestData" of "NCT02503722_Osimertinib" as Admin', () => {
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
  it('should validate exported "Management Group list" matches "ctmlTestData" of "NCT02503722_Osimertinib" as Admin', () => {
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

  it('should validate exported "Site Group list" matches "ctmlTestData" of "NCT02503722_Osimertinib" as Admin', () => {
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

  it('should validate exported "Sponsor list" matches "ctmlTestData" of "NCT02503722_Osimertinib" as Admin', () => {
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

  it('should validate exported "Staff list" matches "ctmlTestData" of "NCT02503722_Osimertinib" as Admin', () => {
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
    ' "NCT02503722_Osimertinib" as Admin',() =>{
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
    });
  });
  it('should validate "Send Ctml to matcher', () => {
    sendCtmlToMatcher().click()
    sendCTMLOkButton().click()
  });*/
})
