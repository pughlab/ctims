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
  getMenuItemOr, getMSStatus,
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
  getSwitchGroupOperator, getTreeNodeChildren,
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
import {cli} from "cypress";
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";

describe('CTIMS Export CTML', () => {
  before(() => cy.visit('/'));
  //deleteDownloadsFolderBeforeAll()
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

    it('should validate the match between "Export JSON" and "Export YAML" file',  ()=> {
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((jsonData) => {
        const json = JSON.stringify(jsonData);
        cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.yaml', 'utf-8').then((yamlData) => {
          const yamlObject = yaml.load(yamlData);
          const yamlVal = JSON.stringify(yamlObject);
          cy.compareArrays(json.split(','),yamlVal.split(','))
          /* jsonData.forEach(([key, value]) => {
             const yamlData = yamlObject[key];
             expect(value).to.deep.equal(yamlData);
           });*/
      });
    });
/*
    it('should validate the match of the "Trial Information" values',  () => {
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
        let exportedTrialInformation = [exportedCtmlModel.trial_id,
          exportedCtmlModel.long_title,
          exportedCtmlModel.short_title,
          exportedCtmlModel.phase,
          exportedCtmlModel.protocol_no,
          exportedCtmlModel.nct_purpose,
          exportedCtmlModel.status]
        let testDataTrialInformation = [NCT02503722_Osimertinib.nct_id,
          NCT02503722_Osimertinib.long_title,
          NCT02503722_Osimertinib.short_title,
          NCT02503722_Osimertinib.phase,
          NCT02503722_Osimertinib.protocol_no,
          NCT02503722_Osimertinib.nct_purpose,
          NCT02503722_Osimertinib.status]
        cy.compareArrays(exportedTrialInformation,testDataTrialInformation)
      })
    });

    it('should validate the match of the "Age" values',  () => {
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf8').then((downloadData) => {
        const exportData = downloadData.age
        let testData = NCT02503722_Osimertinib.age
        cy.compareArrays(exportData.split(' '), testData.split(' ')) //Age is a single value, not a array
      })
    });

    it('should validate the match of the "Prior treatment requirement" values',  () => {
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf8').then((downloadData) => {
        const exportData= downloadData.prior_treatment_requirements
        let testData = NCT02503722_Osimertinib.prior_treatment_requirements
        cy.compareArrays(exportData,testData)
      })
    });

    it('should validate the match of the "Drug list" values',  () => {
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf8').then((downloadData) => {
        const exportData= downloadData.drug_list.drug[0].drug_name
        let testData = NCT02503722_Osimertinib.drug_list.drug[0].drug_name
        cy.compareArrays(exportData.split(' '),testData.split(' '))
      })
    });
    it('should validate the match of the "Management Group list" values',() => {
      let rawData = NCT02503722_Osimertinib.management_group_list.management_group[0]
      let testDataMatchingCriteria: string[] = [
        rawData.management_group_name,
        rawData.is_primary
      ]
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json','utf-8').then((downloadData) => {
        const exportData = downloadData.management_group_list.management_group[0]
        let ctmlMatchingCriteria: string[] = [
          exportData.management_group_name,
          exportData.is_primary]
        cy.compareArrays(ctmlMatchingCriteria,testDataMatchingCriteria)
      })
    });

    it('should validate the match of the "Site Group list" values',() => {
      let jsonVal = NCT02503722_Osimertinib.site_list.site[0]
      let testDataMatchingCriteria: string[] = [jsonVal.site_name,
        jsonVal.site_status,
        jsonVal.coordinating_center,
        jsonVal.uses_cancer_center_irb]
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json','utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.site_list.site[0]
        let ctmlMatchingCriteria: string[] = [exportData.site_name,exportData.site_status,exportData.coordinating_center,exportData.uses_cancer_center_irb]
        cy.compareArrays(ctmlMatchingCriteria,testDataMatchingCriteria)
      })
    });

    it('should validate the match of the "Sponsor list" values',() => {
      let jsonVal = NCT02503722_Osimertinib.sponsor_list.sponsor[0]
      let testDataMatchingCriteria: string[] = [
        jsonVal.sponsor_name,
        jsonVal.is_principal_sponsor,
      ]
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json','utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.sponsor_list.sponsor[0]
        let ctmlMatchingCriteria: string[] = [exportData.sponsor_name,exportData.is_principal_sponsor]
        cy.compareArrays(ctmlMatchingCriteria,testDataMatchingCriteria)
      })
    });

    it('should validate the match of the "Staff list" values',() => {
      let jsonVal = NCT02503722_Osimertinib.staff_list.protocol_staff[0]
      let testDataMatchingCriteria: string[] = [
        jsonVal.first_name,
        jsonVal.last_name,
        jsonVal.email_address,
        jsonVal.institution_name,
        jsonVal.staff_role
      ]
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.staff_list.protocol_staff[0]
        let ctmlMatchingCriteria: string[] = [
          exportData.first_name,
          exportData.last_name,
          exportData.email_address,
          exportData.institution_name,
          exportData.staff_role]
        cy.compareArrays(ctmlMatchingCriteria,testDataMatchingCriteria)
      })
    })

    it('should validate the match of the "Treatment list Arm Level" values',() => {
      let jsonVal = NCT02503722_Osimertinib.treatment_list.step[0].arm[0]
      let testDataMatchingCriteria = [
        jsonVal.arm_code,
        jsonVal.arm_description,
        jsonVal.arm_internal_id.toString(),
        jsonVal.arm_suspended,
      ]
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.treatment_list.step[0].arm[0]
        let ctmlMatchingCriteria = [
          exportData.arm_code,
          exportData.arm_description,
          exportData.arm_internal_id.toString(),
          exportData.arm_suspended,
        ]
        // @ts-ignore
        cy.compareArrays(ctmlMatchingCriteria,testDataMatchingCriteria)

      })
    });

    it('should validate the match of the "Treatment list Dose Level" values',() => {
      let jsonVal = NCT02503722_Osimertinib.treatment_list.step[0].arm[0].dose_level[0]
      //let testDataMatchingCriteria
      let testDataMatchingCriteria = [
        jsonVal.level_code,
        jsonVal.level_description,
        jsonVal.level_internal_id.toString(),
        jsonVal.level_suspended
      ]
      cy.log(JSON.stringify(testDataMatchingCriteria))
      cy.readFile('/Users/srimathijayasimman/WebstormProjects/CTIMS/ctims/apps/web-e2e/cypress/downloads/ctml-model.json', 'utf-8').then((exportedCtmlModel) => {
        let exportData = exportedCtmlModel.treatment_list.step[0].arm[0].dose_level[0]
        let ctmlMatchingCriteria = [
          exportData.level_code,
          exportData.level_description,
          exportData.level_internal_id.toString(),
          exportData.level_suspended
        ]
        // @ts-ignore
        cy.compareArrays(ctmlMatchingCriteria, testDataMatchingCriteria)
      })
    })*/
  })
})
