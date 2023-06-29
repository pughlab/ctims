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
  selectTrialGroupButton,
  trialEditorBackButton,
  trialEditorExportCtml,
  trialEditorHeaderButtons,
  trialEditorLeftPanelList,
  trialEditorRadioButtons,
  trialEditorSave,
  trialGroupxAdmin, trialTableDelete, trialTableDialogueDeleteBtn,
  trialTableEdit,
  trialTableIdColumn,
  validateButton, validateCtmlOkButton,
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


describe('Validate as Trialgroupx member role on "NCT02503722_Osimertinib" and validate "Export" as Admin role', { testIsolation: false }, () => {
  baseClass.adminTrialGroupx()
  deleteDownloadsFolderBeforeAll()
  const ctmlTestData = NCT02503722_Osimertinib
  const ctmlJson = `./cypress/downloads/${jsonFile}`
  const ctmlYaml = `./cypress/downloads/${yamlFile}`

  it('should Login as Trialgroupx Admin and "Delete" the existing Ctml member file of "NCT02503722_Osimertinib"', () => {
    createCTMLButton().should('have.class','p-disabled')
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()
    let table = cy.get('table tr td')
    table.each(($el) => {
      let ee = $el.text()

      if (ee.includes('NCT02503722_Osimertinib Trialgroupx member role')) {
        cy.wrap($el).prev().then(($prevEl) => {
          cy.wrap($prevEl).click();
        });
        cy.get('.trials_trailsEllipseBtn__OHV_W > .p-button').click();
        trialTableDelete().click();
        trialTableDialogueDeleteBtn().click();
        return false;
      }
    })
  })
  it('should logout as Admin of "Trialgroupx"',  () => {
    cy.get('.TopBar_userContainer__Dcaw3>i').click()
    cy.get('.p-menuitem>a').click()
  });

  it('should login as Trialgroupx member',  () => {
    cy.visit(Cypress.env('baseUrl'), {timeout: 10000})
    cy.login('ctims_test_user', 'ctims2023')
  });

  it('should enter values into the "Trial Editor Form" of "NCT02503722_Osimertinib" as Member', () => {
    selectTrialGroupButton().click()
    ctimsUserTrialGroupxMember().click()
    createCTMLButton().should('not.have.class', 'p-disabled').click()
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
    cy.trialInformation(ctmlTestData.nct_id,
      "NCT02503722_Osimertinib Trialgroupx member role",
      "John Doe",
      "Draft",
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no,
      ctmlTestData.nct_purpose,
      ctmlTestData.status)
  })
  it('should Save Trial information values, click edit NCT02503722_Osimertinib to re-enter, as Member',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

  //**************Prior Treatment Requirement
  it('should enter the Prior Treatment Requirement values of NCT02503722_Osimertinib as Member', () => {
    trialEditorLeftPanelList().eq(1).should('contain','Prior Treatment Requirements').click()
    cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
    getPriorTreatmentRequirementMultiple().each((input, index) => {
      if (ctmlTestData.prior_treatment_requirements[index]) {
        cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
      }
    })
  });
  it('should Save Prior Treatment Requirement values, click edit NCT02503722_Osimertinib to re-enter as Member ',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

  //************** Age ***************

  it('should enter the Age values of NCT02503722_Osimertinib as Member', () => {
    trialEditorLeftPanelList().eq(2).should('contain','Age').click()
    cy.age(ctmlTestData.age)
  });
  it('should Save Age values, click edit NCT02503722_Osimertinib to re-enter as Member ',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

  //************** Drug List ***************

  it('should enter the Drug List values of NCT02503722_Osimertinib as Member', () => {
    trialEditorLeftPanelList().eq(3).should('contain','Drug List').click()
    cy.clickMultipleFunction(getDrugNamePlusIcon(), ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
      }
    })
  });

  it('should Save Drug List values, click edit NCT02503722_Osimertinib to re-enter as Member ',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

  //************** Management Group List ***************

  it('should enter the Management Group List values of NCT02503722_Osimertinib as Member', () => {
    trialEditorLeftPanelList().eq(4).should('contain', 'Management Group List').click()
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
    });
  })

  it('should Save Management Group List values, click edit NCT02503722_Osimertinib to re-enter as Member ',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

  //************** Site List ***************

  it('should enter the Site List values of NCT02503722_Osimertinib as Member', () => {
    trialEditorLeftPanelList().eq(5).should('contain','Site List').click()
    cy.clickMultipleFunction(getSiteNamePlusIcon(), ctmlTestData.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      const site = ctmlTestData.site_list.site[index]
      cy.fillSiteDetails($input, site)
    })
  });

  it('should Save Site List values, click edit NCT02503722_Osimertinib to re-enter as Member ',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

  //************** Sponsor List ***************

  it('should enter the Sponsor List values of NCT02503722_Osimertinib as Member', () => {
    trialEditorLeftPanelList().eq(6).should('contain','Sponsor List').click()
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      cy.wrap($input).find('.p-inputtext').type(ctmlTestData.sponsor_list.sponsor[index].sponsor_name)
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor).click();
    });
  });

  it('should Save Sponsor List values, click edit NCT02503722_Osimertinib to re-enter as Member ',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

  //************** Staff List ***************

  it('should enter the Staff List values of NCT02503722_Osimertinib as Member', () => {
    trialEditorLeftPanelList().eq(7).should('contain','Staff List').click()
    cy.clickMultipleFunction(getProtocolStaffPlusIcon(), ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      const staff = ctmlTestData.staff_list.protocol_staff[index]
      cy.fillProtocolStaffDetails($input, staff)
    });
  });
  it('should Save Staff List values, click edit NCT02503722_Osimertinib to re-enter as Member ',() => {
    cy.clickSaveEditButtonForTrialGroupMember("NCT02503722_Osimertinib Trialgroupx member role")
  })

//************ Arm 1  *****************
  it('should enter the values "Treatment List and Matching criteria modal" for Arm 1 on NCT02503722_Osimertinib as Member ', () => {
    trialEditorLeftPanelList().eq(8).should('contain', 'Treatment List').click()
    //delete the dose level
    cy.wait(1000)
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
        //cy.clickChildToggleArrowButton(2)
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

  it('should validate the match between "Json preview window text" and "ctmlTestData" on NCT02503722_Osimertinib as Member', () => {
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

  it('should validate the match between "JSON preview window text" and "YAML preview window text" on NCT02503722_Osimertinib as Member',  () => {
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

  it('should "Validate" and "Save" as Trialgroupx member role on NCT02503722_Osimertinib as Member', () => {
    validateButton().click()
    validateOkButton().should('not.have.class','p-disabled').click()
    trialEditorSave().click()
    trialEditorBackButton().click()
  });

  it('should logout as a Trialgroupx member role on NCT02503722_Osimertinib as Member',  () => {
    cy.get('.TopBar_userContainer__Dcaw3>i').click()
    cy.get('.p-menuitem>a').click()
  });

  it('should login as a Trialgroupx admin role',  () => {
    cy.visit(Cypress.env('baseUrl'), {timeout: 10000})
    cy.login('ctims-john-doe', 'ctims2023')
  });

  it('should select Trialgroupx admin from dropdown, when trial table Nickname has "NCT02503722_Osimertinib' +
    ' Trialgroupx member role" click Edit button to re-enter ', () => {
    selectTrialGroupButton().click()
    trialGroupxAdmin().click()
    cy.get('table tr td').each(($el) => {
      let ee = $el.text();

      if (ee.includes("NCT02503722_Osimertinib Trialgroupx member role")) {
        cy.wrap($el).prev().then(($prevEl) => {
          cy.wrap($prevEl).click();
        });
        cy.get('.trials_trailsEllipseBtn__OHV_W > .p-button').click();
        trialTableEdit().click();
        return false;
      }
    });
   /* trialTableIdColumn()
      .contains(ctmlTestData.nct_id)
      .nextUntil('NCT02503722_Osimertinib Trialgroupx member role')
      .then((test) => {
        trialTableIdColumn().contains(ctmlTestData.nct_id).click();
        cy.get('.trials_trailsEllipseBtn__OHV_W > .p-button').click();
        trialTableEdit().click()
      })*/
  });

  //!************Export Ctml***************
  it('should click on Export button, "Export as JSON" file on NCT02503722_Osimertinib as Admin ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html', 'json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    validateCtmlOkButton().should('not.have.class','p-disabled').click()
  });

  it('should click on Export button, "Export as YAML" file on NCT02503722_Osimertinib as Admin ', () => {
    trialEditorHeaderButtons().eq(1).should('contain', 'Export').click()
    trialEditorRadioButtons().eq(1).click({force: true})
    validateCtmlOkButton().click()
  });

  it('should validate the match between "Export JSON" and "Export YAML" file on NCT02503722_Osimertinib as Admin ', () => {
    cy.readFile(ctmlJson).then((exportedCtmlModelJson) => {
      const json = JSON.stringify(exportedCtmlModelJson);
      cy.readFile(ctmlYaml).then((exportedCtmlModelYaml) => {
        const yamlObject = yaml.load(exportedCtmlModelYaml);
        const yamlVal = JSON.stringify(yamlObject);
        cy.compareArrays(json.split(','), yamlVal.split(','))
      });
    });
  })

})
