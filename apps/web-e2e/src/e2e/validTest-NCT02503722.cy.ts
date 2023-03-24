import {
  getAddCriteriaGroup,
  getAddCriteriaList,
  getAddCriteriaToSameGroup,
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
  getClinicalPRStatus,
  getCtmlStatusDropdown,
  getDefaultTextMatchingCriteria,
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
  getProtocolStaffStatus,
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
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib"
const { deleteDownloadsFolderBeforeAll } = require('cypress-delete-downloads-folder');
import * as yaml from 'js-yaml';

describe('CTIMS Trial Editor', () => {
  before(() => cy.visit('/'));
  deleteDownloadsFolderBeforeAll()
  it('should Validate the Trial Editor Page', () => {
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '8')
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
    cy.priorTreatmentRequirement(NCT02503722_Osimertinib.prior_treatment_requirements[0])
    //Age
    cy.age(NCT02503722_Osimertinib.age)

    //Drug List
    cy.drugList(NCT02503722_Osimertinib.drug_list.drug[0].drug_name)

    //Management Group List has 1-text field and 1-Checkbox
    cy.managementGroupList(NCT02503722_Osimertinib.management_group_list.management_group[0].management_group_name,
      NCT02503722_Osimertinib.management_group_list.management_group[0].is_primary)

    //Site List has 2-Text field and 2-checkbox
    cy.siteList(NCT02503722_Osimertinib.site_list.site[0].site_name,
      NCT02503722_Osimertinib.site_list.site[0].site_status,
      NCT02503722_Osimertinib.site_list.site[0].coordinating_center,
      NCT02503722_Osimertinib.site_list.site[0].uses_cancer_center_irb)

    //Sponsor List
    cy.sponsorList(NCT02503722_Osimertinib.sponsor_list.sponsor[0].sponsor_name,
      NCT02503722_Osimertinib.sponsor_list.sponsor[0].is_principal_sponsor)
    //Staff List
    cy.staffList(NCT02503722_Osimertinib.staff_list.protocol_staff[0].first_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].last_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].email_address,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].institution_name,
      NCT02503722_Osimertinib.staff_list.protocol_staff[0].staff_role)

    //Arm code
    cy.arm(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_code,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_description,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_internal_id,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].arm_suspended)

    //Level code
    cy.doseLevel(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_code,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_description,
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_internal_id.toString(),
      NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0].level_suspended)
    //Click on Plus Icon to add another Dose Level
  })
   it('should validate the Matching criteria modal', () => {
    //click Match criteria
    getEditMatchingCriteria().click()
    getDefaultTextMatchingCriteria().should('contain', 'Matching criteria inputs will be shown here.')
    getAddCriteriaGroup().click()
    //cy.clickParentAnd()
    cy.clickParentNode(0)
    // cy.wait(1000)
    //getTruncateButton().should('be.visible').click()
    getAddCriteriaList().should('contain', 'Add criteria to same group')
      .and('contain', 'Switch group operator')
      .and('contain', 'Delete')
      .and('contain', 'Add criteria subgroup')
    cy.clickClinical()
    //click child component Clinical to update the fields
    getLeftMenuComponent().eq(1).click()
    getClinicalAge().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.age_numerical)
    getClinicalOncotreePrimaryDiagnosis().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[0].clinical.oncotree_primary_diagnosis)
    cy.clickParentNode(0)
    cy.clickOr()
    cy.clickParentNode(2)//click on Parent "Or" to create 1st genomic child
    cy.clickGenomic()
    cy.clickChildToggleArrowButton(2)
    getLeftMenuComponent().eq(3).click()
    getHugoSymbol().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.hugo_symbol)
    getProteinChange().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.protein_change)
    //Dropdown
    getVariantCategory().click()
    const variant_category = getGenomicDropDown().each(element => {
      // @ts-ignore
      cy.log(element.text());
    })
    // @ts-ignore
    //cy.log(variant_category)
    getGenomicDropDown().contains(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.variant_category).click()
    getVariantClassification().click()
    getGenomicDropDown().contains(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[0].genomic.variant_classification.replace(/_/g, " ")).click()
    cy.clickParentNode(2) //click on Parent "Or" to create 2nd genomic child
    cy.clickGenomic() //create a Genomic child in "Or"
    //click on the 2nd child Genomic to enter values
    getLeftMenuComponent().eq(4).click()
    getHugoSymbol().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[1].genomic.hugo_symbol)
    getProteinChange().type(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[1].genomic.protein_change)
    //Dropdown
    getVariantCategory().click()
    getGenomicDropDown().contains(NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match[0].and[1].or[1].genomic.variant_category).click()

    getMatchModalFooterButtons().eq(1).should('be.enabled').contains('Save matching criteria').click()
  })

  it('should validate the "Matching criteria" Json preview matches with "NCT02503722_Osimertinib" ', () => {
    getMatchingCriteriaTableHeader().contains('JSON').click()
    cy.get('.CtimsMatchingCriteriaWidget_pre-tag__gyYSW').invoke("text").then((text) => {
      const jsonArray = JSON.parse(text);
      const jsonMatchCriteria = JSON.stringify(jsonArray)
      cy.log(jsonMatchCriteria);

      //test data Match criteria Values
      let jsonVal = NCT02503722_Osimertinib.treatment_list.step[0].arm[0].match
      const testDataMatchingCriteria = JSON.stringify(jsonVal)
      cy.log(testDataMatchingCriteria)
      expect(testDataMatchingCriteria,'NCT02503722_Osimertinib-Test Data').to.deep.equal(jsonMatchCriteria,'Json' +
        ' Matching criteria')
    })
  })

  it('should compare "Matching criteria" of "JSON" preview matches with "YAML" preview ',  () => {
    getMatchingCriteriaTableHeader().contains('YAML').click()
    // let jsonMatchCriteria =
    cy.get('.CtimsMatchingCriteriaWidget_pre-tag__gyYSW').invoke("text").then((yamlText) => {
      const yamlObject = yaml.load(yamlText)
      // const jsonArray = JSON.parse(text);
      const yamlMatchCriteria = JSON.stringify(yamlObject)
      cy.log(yamlMatchCriteria);
      getMatchingCriteriaTableHeader().contains('JSON').click()
      cy.get('.CtimsMatchingCriteriaWidget_pre-tag__gyYSW').invoke("text").then((text) => {
        const jsonArray = JSON.parse(text);
        const jsonMatchCriteria = JSON.stringify(jsonArray)
        cy.log(jsonMatchCriteria);
        expect(yamlMatchCriteria, 'Yaml preview').to.deep.equal(jsonMatchCriteria, 'Json preview matches the Yaml' +
          ' preview')
      })
    })
  })

  it('should click on the Export button and then Export as "JSON" file ',  () => {
    trialEditorHeaderButtons().eq(1).should('contain','Export').click()
    trialEditorRadioButtons().eq(0).should('contain.html','json')
    cy.get('[type="radio"]').first().check({force: true}).should('be.checked')
    trialEditorExportCtml().eq(1).should('contain','Export CTML').click()
  });

  it('should click on the Export button and then Export as "YAML" file ',  () => {
    trialEditorRadioButtons().eq(1).click({force: true})
    trialEditorExportCtml().eq(1).should('contain','Export CTML').click()
  });

  it('should compare json and Yaml ',  () => {
    // Load the JSON file
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((jsonData) => {
        const json = jsonData
        cy.log("Exported ctml-model.json",JSON.stringify(json))
        // })
        // Load the YAML file and parse it to a JavaScript object
        cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.yaml', 'utf-8').then((yamlData) => {
          const yamlObject = yaml.load(yamlData)
          cy.log("Exported ctml-model.yaml file converted to Json file for validation",JSON.stringify(yamlObject))
          // })

          // Compare the JSON files as strings
          expect(JSON.stringify(json),"Exported ctml-model.json")
            .to.equal(JSON.stringify(yamlObject),'Exported ctml-model.yaml file converted to Json file for validation');
        })
      })
  });
  it('should validate the match of the "Trial Information" values',  () => {
    cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
      let exportedTrialInformation: string[] = [exportedCtmlModel.trial_id,
        exportedCtmlModel.long_title,
        exportedCtmlModel.short_title,
        exportedCtmlModel.phase,
        exportedCtmlModel.protocol_no,
        exportedCtmlModel.nct_purpose,
        exportedCtmlModel.status]
      let testDataTrialInformation: String[] = [NCT02503722_Osimertinib.nct_id,
        NCT02503722_Osimertinib.long_title,
        NCT02503722_Osimertinib.short_title,
        NCT02503722_Osimertinib.phase,
        NCT02503722_Osimertinib.protocol_no,
        NCT02503722_Osimertinib.nct_purpose,
        NCT02503722_Osimertinib.status]
      exportedTrialInformation.forEach((exportedValue, index) => {
        const testDataValue = testDataTrialInformation[index]
        expect(exportedValue).to.deep.equal(testDataValue)
      })
    })
  });

  /*it('test',  () => {
    cy.readCtmlModelFile().then((exportedTrialInformation) => {
      let testDataTrialInformation: string[] = [
        NCT02503722_Osimertinib.nct_id,
        NCT02503722_Osimertinib.long_title,
        NCT02503722_Osimertinib.short_title,
        NCT02503722_Osimertinib.phase,
        NCT02503722_Osimertinib.protocol_no,
        NCT02503722_Osimertinib.nct_purpose,
        NCT02503722_Osimertinib.status
      ]
      cy.compareArrays(exportedTrialInformation, testDataTrialInformation.toString()) //to convert into single array
    })
  });*/

  it('should validate the match of the "Age" values',  () => {
    let rawData = NCT02503722_Osimertinib.age
    cy.log("Original Test Data", JSON.stringify(rawData))//has multiple values
    cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf8').then((downloadData) => {
      const exportData= downloadData.age
      cy.log("Exported data single Drug value", JSON.stringify(exportData))// has a single value
      expect(exportData).to.deep.equal(rawData)
    })
  });

  it('should validate the match of the "Prior treatment requirement" values',  () => {
    let rawData = NCT02503722_Osimertinib.prior_treatment_requirements
    cy.log("Original Test Data", JSON.stringify(rawData))//has multiple values
    cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf8').then((downloadData) => {
      const exportData= downloadData.prior_treatment_requirements
      cy.log("Exported data single Drug value", JSON.stringify(exportData))// has a single value
      expect(exportData[0]).to.deep.equal(rawData[0])
    })
  });

    it('should validate the match of the "Drug list" values',  () => {
      let rawData = NCT02503722_Osimertinib.drug_list.drug
      cy.log("Original Test Data", JSON.stringify(rawData))//has two values
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf8').then((downloadData) => {
        const exportData= downloadData.drug_list.drug
        cy.log("Exported data single Drug value", JSON.stringify(exportData))// has a single value
        expect(exportData[0]).to.deep.equal(rawData[0])
      })
    });
    it('should validate the match of the "Managament Group list" values',() => {
      let jsonVal = NCT02503722_Osimertinib.management_group_list
       cy.log(JSON.stringify(jsonVal))
       cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json','utf-8').then((exportedCtmlModel) => {
         let exportData = exportedCtmlModel.management_group_list
         cy.log(JSON.stringify(exportData))
         expect(JSON.stringify(jsonVal[0])).to.deep.equal(JSON.stringify(exportData[0]))
       })
    });
    it('should validate the match of the "Site Group list" values',() => {
      let jsonVal = NCT02503722_Osimertinib.site_list.site[0]
      //let testDataMatchingCriteria
      let testDataMatchingCriteria: string[] = [jsonVal.site_name,
        jsonVal.site_status,
        jsonVal.coordinating_center,
        jsonVal.uses_cancer_center_irb]
      cy.log(JSON.stringify(testDataMatchingCriteria))
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json','utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.site_list.site[0]
        let ctmlMatchingCriteria: string[] = [exportData.site_name,exportData.site_status,exportData.coordinating_center,exportData.uses_cancer_center_irb]
        //ctmlMatchingCriteria
        cy.log(JSON.stringify(ctmlMatchingCriteria))
        expect(JSON.stringify(testDataMatchingCriteria)).to.deep.equal(JSON.stringify(ctmlMatchingCriteria))
      })
    });
    it('should validate the match of the "Sponsor list" values',() => {
      let jsonVal = NCT02503722_Osimertinib.sponsor_list.sponsor[0]
      //let testDataMatchingCriteria
      let testDataMatchingCriteria: string[] = [jsonVal.sponsor_name,
        jsonVal.is_principal_sponsor,
       ]
      cy.log(JSON.stringify(testDataMatchingCriteria))
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json','utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.sponsor_list.sponsor[0]
        let ctmlMatchingCriteria: string[] = [exportData.sponsor_name,exportData.is_principal_sponsor]
        //ctmlMatchingCriteria
        cy.log(JSON.stringify(ctmlMatchingCriteria))
        expect(JSON.stringify(testDataMatchingCriteria)).to.deep.equal(JSON.stringify(ctmlMatchingCriteria))
      })
    });

    it('should validate the match of the "Staff list" values',() => {
      let jsonVal = NCT02503722_Osimertinib.staff_list.protocol_staff[0]
      //let testDataMatchingCriteria
      let testDataMatchingCriteria: string[] = [jsonVal.first_name,
        jsonVal.last_name,
        jsonVal.email_address,
        jsonVal.institution_name,
        jsonVal.staff_role
      ]
      cy.log(JSON.stringify(testDataMatchingCriteria))
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.staff_list.protocol_staff[0]
        let ctmlMatchingCriteria: string[] = [exportData.first_name, exportData.last_name,
          exportData.email_address,
          exportData.institution_name,
          exportData.staff_role]
        //ctmlMatchingCriteria
        cy.log(JSON.stringify(ctmlMatchingCriteria))
        expect(JSON.stringify(testDataMatchingCriteria)).to.deep.equal(JSON.stringify(ctmlMatchingCriteria))
      })
    })

      it('should validate the match of the "Treatment list Arm Level" values',() => {
        let jsonVal = NCT02503722_Osimertinib.treatment_list.step[0].arm[0]
        //let testDataMatchingCriteria
        let testDataMatchingCriteria = [jsonVal.arm_code,
          jsonVal.arm_description,
          jsonVal.arm_internal_id,
          jsonVal.arm_suspended,
        ]
        cy.log(JSON.stringify(testDataMatchingCriteria))
        cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
          let exportData = exportedCtmlModel.treatment_list.step[0].arm[0]
          let ctmlMatchingCriteria = [exportData.arm_code,
            exportData.arm_description,
            exportData.arm_internal_id,
            exportData.arm_suspended,
          ]
          //ctmlMatchingCriteria
          cy.log(JSON.stringify(ctmlMatchingCriteria))
          expect(JSON.stringify(testDataMatchingCriteria)).to.deep.equal(JSON.stringify(ctmlMatchingCriteria))
        })
    });

    it('should validate the match of the "Treatment list Dose Level" values',() => {
      let jsonVal = NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0]
      //let testDataMatchingCriteria
      let testDataMatchingCriteria = [
        jsonVal.level_code,
        jsonVal.level_description,
        jsonVal.level_internal_id,
        jsonVal.level_suspended
      ]
      cy.log(JSON.stringify(testDataMatchingCriteria))
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.treatment_list.step[0].arm[0].dose_level[0]
        let ctmlMatchingCriteria = [
          exportData.level_code,
          exportData.level_description,
          exportData.level_internal_id,
          exportData.level_suspended
        ]
        //ctmlMatchingCriteria
        cy.log(JSON.stringify(ctmlMatchingCriteria))
        expect(JSON.stringify(testDataMatchingCriteria)).to.deep.equal(JSON.stringify(ctmlMatchingCriteria))
      })
  })
})


