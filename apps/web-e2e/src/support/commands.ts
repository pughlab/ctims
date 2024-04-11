// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

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
  getCtmlStatusDropdownList,
  getClinicalAge,
  getClinicalDropdown,
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
  getManagementGroupName,
  getMenuItemAnd,
  getMenuItemClinical,
  getMenuItemClinicalGenomic,
  getMenuItemOr,
  getNCTPurpose,
  getPhaseDropdownList,
  getPlusIcon,
  getPrincipalInvestigator,
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
  getVariantCategory,
  selectDraftCtmlStatus,
  trialEditorLeftPanelList,
  getTrialInformationStatus,
  getMenuItemGenomic,
  getPrimaryManagementGroup,
  getDefaultTrialEditorDropDown,
  getCoordinatingCenter,
  getCancerCenterIRB,
  getPrincipalSponsor,
  getArmSuspended,
  getLevelSuspended,
  getPriorTreatmentRequirement,
  getPriorTreatmentRequirementPlusIcon,
  getPriorTreatmentRequirementRegularExpression,
  getAddCriteriaToSameList,
  getUserName,
  getPassword,
  signInButton,
  trialTableDots,
  trialTableDelete,
  trialTableDialogueDeleteBtn,
  trialTableEdit,
  trialEditorSave,
  trialEditorBackButton,
  getCNVCall,
  getProteinChange,
  getVariantClassification,
  selectTrialGroupButton,
  trialGroupxAdmin,
  ctimsUserTrialGroupxMember,
  trialTableThreeDots,
  getSubGroup,
  getMolecularFunction,
  getFusionPartnerHugoSymbol,
  getTrueTranscriptExon,
  getWildType,
  getPoleStatus,
  getUVAStatus,
  getTobaccoStatus,
  getApobecStatus,
  getTemozolomideStatus,
  getMMRStatus,
  getMSStatus,
  getOncotreeExclamation,
  getClinicalTMB,
  createCTMLButton,
  ctimsUserTapestryMember, nctIdTextBox, OkButton
} from './app.po';
import {NCT02503722_Osimertinib} from "../fixtures/NCT02503722_Osimertinib";
import {NCT03297606_CAPTUR} from "../fixtures/NCT03297606_CAPTUR";
const path = require('path')
import 'cypress-fill-command'


//import { ctmlModel } from '../support/models/ctml-model';

//require('cypress-delete-downloads-folder').addCustomCommand();

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  getUserName().fill(email)
  getPassword().fill(password)
  signInButton().click()
  console.log('Custom command example: Login', email, password);
});

Cypress.Commands.add('trialInformation', (nctId: string,
                                          nickName: string,
                                          principalInvestigator: string,
                                          ctmlStatus: string,
                                          longTitle: string,
                                          shortTitle: string,
                                          phase: string,
                                          ProtocolNumber: string,
                                          protocolPurpose: string,
                                          status: string) => {
  nctIdTextBox().fill(nctId)
  OkButton().click()
 // trialEditorLeftPanelList().eq(0).should('contain','Trial Information').click()
 // getTrialId().clear().fill(nctId);
  getTrialNickname().fill(nickName);
  getPrincipalInvestigator().fill(principalInvestigator);
  //ctml status
  getCtmlStatusDropdown().click({force: true} )
  // cy.wait(1000)
  getCtmlStatusDropdownList().contains(ctmlStatus).click({force: true} )
  getLongTitle().fill(longTitle)
  getShortTitle().fill(shortTitle)
  //Phase
  getClickPhase().click({force: true} )
  getPhaseDropdownList().contains(phase).click({force: true} )
  getClickPhase().click({force: true} )
  //cy.wait(1000)
  getProtocolNumber().fill(ProtocolNumber)
  getNCTPurpose().fill(protocolPurpose)
  getTrialInformationStatus().click({force: true} )
  getDefaultTrialEditorDropDown().contains(status).click({force: true} )
});

Cypress.Commands.add('priorTreatmentRequirement',(priorRequirement: string) => {
  trialEditorLeftPanelList().eq(1).should('contain','Prior Treatment Requirements').click()
  getPriorTreatmentRequirementPlusIcon().click()
  getPriorTreatmentRequirement().click().fill(priorRequirement)
})


Cypress.Commands.add('priorTreatmentRequirementRepeatingGroup',(priorRequirement) => {
  getPriorTreatmentRequirementPlusIcon().click()
  cy.get('[id^="root_prior_treatment_requirements_"]').each(($el,index) => {
   const val = $el.attr('id')
    cy.log('Attribute value',val)
    cy.log('index', String(index))
    cy.log('we are at ',$el)
    cy.wait(1000)
    if(val.includes('root_prior_treatment_requirements_0') ) {
      cy.wait(1000)
      cy.log('are we at index 0?')
      getPriorTreatmentRequirementRegularExpression().eq(0).click().fill(priorRequirement)
      cy.log('text box1 contains',priorRequirement)
    }
     if(val.includes('root_prior_treatment_requirements_1') ) {
      cy.wait(1000)
      getPriorTreatmentRequirementRegularExpression().eq(1).click().fill(priorRequirement)
       cy.log('text box2 contains',priorRequirement)
    }
   if(val.includes('root_prior_treatment_requirements_2') ) {
      cy.wait(1000)
      getPriorTreatmentRequirementRegularExpression().eq(2).click().fill(priorRequirement)
      cy.log('text box3 contains',priorRequirement)
   }
     })
})

Cypress.Commands.add('age',(ageGroup: string) => {
  trialEditorLeftPanelList().eq(2).should('contain','Age').click()
   //getAgeGroup().fill(ageGroup);
  getAgeGroup().click({force: true} )
  getDefaultTrialEditorDropDown().contains(ageGroup).click({force: true} )
})

Cypress.Commands.add('drugList',(drugName: string) => {
  trialEditorLeftPanelList().eq(3).should('contain','Drug List').click({force: true} )
  getDrugName().fill(drugName)
})

Cypress.Commands.add('clickMultiple',(selector, times) => {
  for (let i = 0; i < times; i++) {
    cy.get(selector).click({force: true});
  }
})
Cypress.Commands.add('clickMultipleFunction',(selector, times) => {
  for (let i = 0; i < times; i++) {
    selector.click({force: true});
  }
})
Cypress.Commands.add('clickMultipleArm',(selector, times) => {
  for (let i = 0; i < times; i++) {
    selector.contains('Add arm').click({force: true});
  }
})

Cypress.Commands.add('clickMultipleDose', (armIndex, doses) => {
  for (let i = 1; i <= doses; i++) {
    cy.get("div[id$='dose_level']>div>i:nth-child(1)").eq(armIndex).click({force: true})
  }
});

Cypress.Commands.add('managementGroupList',(managementGroupName: string, isPrimary: string) => {
  trialEditorLeftPanelList().eq(4).should('contain','Management Group List').click()
  getManagementGroupName().click()
  getDefaultTrialEditorDropDown().contains(managementGroupName).click({force: true})
    //.fill(managementGroupName)
  getPrimaryManagementGroup().contains(isPrimary).click({force: true})
  getPrimaryManagementGroup().should('contain',isPrimary)
})

Cypress.Commands.add('siteList',(siteName,
                                 siteStatus,
                                 coordinatingCenter,
                                 cancerCenterIRB) => {
  trialEditorLeftPanelList().eq(5).should('contain', 'Site List').click({force: true})
  getSiteName().click({force: true})
  getDefaultTrialEditorDropDown().contains(siteName).click({force: true})
    //.fill(siteName)
  getSiteStatus().click({force: true})
  getDefaultTrialEditorDropDown().contains(siteStatus).click({force: true})
    //.fill(siteStatus)
  getCoordinatingCenter().contains(coordinatingCenter).click({force: true})
  getCoordinatingCenter().should('contain',coordinatingCenter)
  getCancerCenterIRB().contains(cancerCenterIRB).click({force: true})
  getCancerCenterIRB().should('contain',cancerCenterIRB)
})
Cypress.Commands.add('fillPriorTreatmentRequirement',(input,priorTreatmentRequirement) => {
   cy.wrap(input).fill(priorTreatmentRequirement);
})
Cypress.Commands.add('fillDrugList',(input,drugName) => {
  cy.wrap(input).fill(drugName);
})
Cypress.Commands.add('fillSiteDetails',(input,site) => {
  cy.wrap(input).find('.p-dropdown').eq(0).click({force: true}).contains(site.site_name).click({force: true} );
  cy.wrap(input).find('.p-dropdown').eq(1).click({force: true}).contains(site.site_status).click({force: true} );
  cy.wrap(input).find('.p-selectbutton').eq(0).click({force: true}).contains(site.coordinating_center).click({force: true} );
  cy.wrap(input).find('.p-selectbutton').eq(1).click({force: true}).contains(site.uses_cancer_center_irb).click({force: true} );
})
Cypress.Commands.add('fillSponsorDetails',(input,sponsorName,isPrincipalSponsor) => {
  cy.wrap(input).find('.p-inputtext').fill(sponsorName)
  cy.wrap(input).find('.p-selectbutton').contains(isPrincipalSponsor).click({force: true} );
})
Cypress.Commands.add('fillManagementGroup',(input,managementGroupNameAttribute,managementGroupNameIsPrimaryAttribute) => {
  cy.wrap(input).find('.p-dropdown').click({force: true}).contains(managementGroupNameAttribute).click({force: true} );
  cy.wrap(input).find('.p-selectbutton').contains(managementGroupNameIsPrimaryAttribute).click({force: true} );
})

Cypress.Commands.add('sponsorList',(sponsorName: string,principalSponsor: string) => {
  trialEditorLeftPanelList().eq(6).should('contain', 'Sponsor List').click()
  getSponsorName().fill(sponsorName)
  getPrincipalSponsor().contains(principalSponsor).click({force: true})
  getPrincipalSponsor().should('contain',principalSponsor)
})
Cypress.Commands.add('fillProtocolStaffDetails',(input, staff) => {
  trialEditorLeftPanelList().eq(7).should('contain','Staff List').click({force: true} )
  cy.wrap(input).find('.p-inputtext').eq(0).fill(staff.first_name);
  cy.wrap(input).find('.p-inputtext').eq(1).fill(staff.last_name);
  cy.wrap(input).find('.p-inputtext').eq(2).fill(staff.email_address);
  cy.wrap(input).find('.p-dropdown').eq(0).click({force: true}).contains(staff.institution_name).click({force: true} );
  cy.wrap(input).find('.p-dropdown').eq(1).click({force: true}).contains(staff.staff_role).click({force: true} );

})

Cypress.Commands.add('staffList',(firstName,
                                  lastName,
                                  email,
                                  institutionName,
                                  staffRole) => {
  trialEditorLeftPanelList().eq(7).should('contain','Staff List').click({force: true} )
  getProtocolStaffFirstName().fill(firstName)
  getProtocolStaffLastName().fill(lastName)
  getProtocolStaffEmail().fill(email)
  getProtocolStaffInstitutionalName().click({force: true} )
  getDefaultTrialEditorDropDown().contains(institutionName).click({force: true} )
  getProtocolStaffRole().click({force: true} )
  getDefaultTrialEditorDropDown().contains(staffRole).click({force: true} )
   })

Cypress.Commands.add('arm',(armCode,armDescription,armInternalID,armSuspended) => {
  trialEditorLeftPanelList().eq(8).should('contain','Treatment List').click({force: true} )
  getArmCode().fill(String(armCode))
  getArmDescription().fill(armDescription)
  getArmInternalId().fill(String(armInternalID))
  getArmSuspended().contains(armSuspended).click({force: true} )
  getArmSuspended().should('contain',armSuspended)
})

Cypress.Commands.add('doseLevel',(levelCode,levelDescription,levelInternalId,levelSuspended) => {
  getLevelCode().fill(levelCode)
  getLevelDescription().fill(levelDescription)
  getLevelInternalId().fill(String(levelInternalId))
  getLevelSuspended().contains(levelSuspended).click({force: true} )
  getLevelSuspended().should('contain',levelSuspended)
})

Cypress.Commands.add('clickClinical',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemClinical().click()
})

Cypress.Commands.add('clickGenomic',() => {
  getAddCriteriaToSameGroup().trigger('mouseover').invoke('addClass', 'p-menuitem-active')
  getMenuItemGenomic().click()
})
Cypress.Commands.add('clickParentAnd',() => {
  getLeftMenuComponent().find('span').should('contain','And')
  getLeftMenuComponent().trigger('mouseover').invoke('addClass', 'p-menuitem-active').click()
  getTruncateButton().should('be.visible').click()
})
//All parents child
Cypress.Commands.add('clickParentNode',(indexNum: number) => {
  getLeftMenuComponent().find('span').eq(indexNum)
    //.should('contain','And').eq(indexNum)
  getLeftMenuComponent().eq(indexNum).trigger('mouseover').invoke('addClass', 'p-menuitem-active').click()
  getTruncateButton().should('be.visible').click()
})

Cypress.Commands.add('clickAnd',() => {
  getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
  getMenuItemAnd().click()
})

Cypress.Commands.add('clickOr',() => {
  getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
  getMenuItemOr().click()
})

Cypress.Commands.add('switchGroupOperator',() => {
  getTruncateButton().click()
  getSwitchGroupOperator().click()
  //getAddCriteriaToSubGroup().invoke('addClass', 'p-menuitem-active')
  //getMenuItemOr().click()
})
Cypress.Commands.add('clickChildToggleArrowButton',(indexNumber) => {
  cy.get(`.p-tree-container>li>ul>li:nth-child(${indexNumber})>div>button`).click()
})

Cypress.Commands.add('validateExportJsonAndTestData', (testDataValue) => {
    let rawData: string[] = testDataValue
    cy.log("Original Test Data", JSON.stringify(rawData)) //has all the array value
})
Cypress.Commands.add('compareArrays', (actual, expected) => {
  actual.forEach((value, index) => {
    const expectedValue = expected[index]
    expect(value,"Actual value").to.deep.equal(expectedValue,"Expected Value")
  })
})
Cypress.Commands.add('readJsonFile', (fileName) => {
  cy.log(__dirname)
  const filePath = path.join(__dirname, '../../','cypress', 'downloads',fileName);
  cy.log(filePath)
  cy.log(fileName)
  return cy.readFile(filePath, 'utf-8').then((fileData) => {
    return fileData;
  });
});
Cypress.Commands.add('staffListAttributes', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.first_name,
    group.last_name,
    group.email_address,
    group.institution_name,
    group.staff_role,
  ]));
});
Cypress.Commands.add('sponsorListAttributes', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.sponsor_name,
    group.is_principal_sponsor,
  ]));
});
Cypress.Commands.add('siteListAttributes', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.site_name,
    group.site_status,
    group.coordinating_center,
    group.uses_cancer_center_irb
  ]));
});
Cypress.Commands.add('managementGroupListAttributes', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.management_group_name,
    group.is_primary
  ]));
});
Cypress.Commands.add('drugListAttributes', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.drug_name
  ]));
});
Cypress.Commands.add('ageAttribute', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.age,
  ]));
});

Cypress.Commands.add('priorTreatmentListAttributes', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.sponsor_name,
    group.is_principal_sponsor,
  ]));
});
Cypress.Commands.add('trialInformationAttributes', (data) => {
  return Cypress.Promise.resolve(data.map(group => [
    group.nct_id,
   // group.principal_investigator,
    group.long_title,
    group.short_title,
    group.phase,
    group.protocol_no,
    group.nct_purpose,
    group.status
  ]));
});
Cypress.Commands.add('compareTrialInformation', (exportedTrial, testDataTrial) => {
  const attributes = ['trial_id', 'long_title', 'short_title', 'phase', 'protocol_no', 'nct_purpose', 'status'];
  attributes.forEach((attr) => {
    expect(exportedTrial[attr]).to.deep.equal(testDataTrial[attr]);
  });
});
Cypress.Commands.add('compareMultiple', (data,testData) => {
   data.forEach((criteria, i) => {
            criteria.forEach((element, j) => {
              expect(element).to.deep.equal(testData[i][j]);
            });
          });
});
Cypress.Commands.add('saveOnly', () => {
  trialEditorSave().click()
  cy.get('.p-toast-message-content').should('contain', 'Trial saved')
  cy.get('.p-toast-icon-close').click()
})
Cypress.Commands.add('saveAndBackBtn', () => {
  trialEditorSave().click()
  cy.get('.p-toast-message-content').should('contain', 'Trial saved')
  cy.get('.p-toast-icon-close').click()
  trialEditorBackButton().should('be.visible').trigger("click")
  //cy.get('.trials_trialsText__0DJhD').should('contain', 'Trials')
})
Cypress.Commands.add('saveAndEdit', () => {
  trialEditorSave().click()
  cy.get('.p-toast-message-content').should('contain','Trial saved')
  cy.get('.p-toast-icon-close').click()
  trialEditorBackButton().should('be.visible').trigger("click")
  cy.get('.trials_trialsText__0DJhD').should('contain','Trials')
  trialTableDots().trigger('mouseover').invoke('addClass', 'p-button').click()
  trialTableEdit().click()
});
Cypress.Commands.add('saveAndDelete', () => {
  trialEditorSave().click()
  cy.get('.p-toast-message-content').should('contain','Trial saved')
  cy.get('.p-toast-icon-close').click()
//  cy.go(-1)
  trialEditorBackButton().should('be.visible').trigger("click")
  cy.get('.trials_trialsText__0DJhD').should('contain','Trials')
  trialTableDots().trigger('mouseover').invoke('addClass', 'p-button').click()
  trialTableDelete().click()
  trialTableDialogueDeleteBtn().click()
});
Cypress.Commands.add('processGenomicCondition', (condition) => {
  Object.entries(condition.genomic).map(([key, value]) => {
    if (key === 'cnv_call') {
      getCNVCall().fill(value as string);
    }
    if (key === 'hugo_symbol') {
      getHugoSymbol().fill(value as string);
    }
    if (key === 'variant_category') {
      getVariantCategory().click();
      getGenomicDropDown().contains(value as string).click();
    }
    if (key === 'protein_change') {
      getProteinChange().fill(value as string);
    }
    if (key === 'variant_classification') {
      getVariantClassification().click();
      getGenomicDropDown().contains((value as string).replace(/_/g, ' ')).click();
    }
  });
});
/*
Cypress.Commands.add('clickSaveEditButtonForTrialGroupAdmin', (nickNameVal) => {
  cy.saveAndBackBtn();
  selectTrialGroupButton().click();
  trialGroupxAdmin().click();

  const findElement = () => {
    cy.get('table tr td').should('have.length.gt', 0).then(($td) => {
      let found = false;
      $td.each((index, el) => {
        const ee = Cypress.$(el).text();
        cy.window().scrollTo('bottom');
        if (ee.includes(nickNameVal)) {
          found = true;
          cy.wrap(el).prev().then(($prevEl) => {
            cy.wrap($prevEl).click();
          });
          cy.get('.trials_trailsEllipseBtn__OHV_W > .p-button').click();
          trialTableEdit().click();
          return false;
        }
      });
      // If nickNameVal is not found, retry after a delay
      if (!found) {
        cy.wait(1000); // Adjust the delay time as needed
        findElement();
      }
    });
  };

  findElement();
});
*/
Cypress.Commands.add('saveEditButtonForAll', (trialGroupName, nickNameVal) => {
  cy.saveAndBackBtn();
  selectTrialGroupButton().click();
  trialGroupName.click();
  //cy.window().scrollTo('bottom');
  cy.wait(1000)
  cy.get('table tr td').each(($el) => {
    let ee = $el.text();
    if (ee.includes(nickNameVal)) {
      cy.wrap($el).prev().then(($prevEl) => {
        cy.wrap($prevEl).should('be.visible').click();
      });
      trialTableThreeDots().click();
      trialTableEdit().click();
      return false;
    }
  });
});
Cypress.Commands.add('clickSaveEditButtonForTrialGroupAdmin', (nickNameVal) => {
  cy.saveAndBackBtn();
  selectTrialGroupButton().click();
  trialGroupxAdmin().click();
  //cy.window().scrollTo('bottom');
  cy.wait(1000)
  cy.get('table tr td').each(($el) => {
    let ee = $el.text();
    if (ee.includes(nickNameVal)) {
      cy.wrap($el).prev().then(($prevEl) => {
        cy.wrap($prevEl).should('be.visible').click();
      });
      trialTableThreeDots().click();
      trialTableEdit().click();
      return false;
    }
  });
});
//cy.wrap('.trials_trailsEllipseBtn__OHV_W').should('be.visible')

Cypress.Commands.add('clickSaveEditButtonForTrialGroupMember', (nickNameVal) => {
  cy.saveAndBackBtn();
  selectTrialGroupButton().click();
  ctimsUserTrialGroupxMember().click();
  cy.get('table tr td').each(($el) => {
    let ee = $el.text();

    if (ee.includes(nickNameVal)) {
      cy.wrap($el).prev().then(($prevEl) => {
        cy.wrap($prevEl).click();
      });
      trialTableThreeDots().click();
      trialTableEdit().click();
      return false;
    }
  });
});

Cypress.Commands.add('deleteExistingTrial', (trialName) => {
 // createCTMLButton().should('have.class','p-disabled')
  selectTrialGroupButton().click()
  trialGroupxAdmin().click()
  let table = cy.get('table tr td')
  table.each(($el) => {
    let ee = $el.text()

    if (ee.includes(trialName)) {
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
Cypress.Commands.add('deleteTrialAdmin', (trialName) => {
  createCTMLButton().should('have.class','p-disabled')
  selectTrialGroupButton().click()
  trialGroupxAdmin().click()
  let table = cy.get('table tr td')
  table.each(($el) => {
    let ee = $el.text()

    if (ee.includes(trialName)) {
      cy.wrap($el).click()
        //.then(($prevEl) => {
       // cy.wrap($prevEl).click();
     // });
      trialTableThreeDots().click();
      trialTableDelete().click();
      trialTableDialogueDeleteBtn().click();
      return false;
    }
  })

})
Cypress.Commands.add('deleteTrialMemberTapestry', (trialName) => {
  createCTMLButton().should('have.class','p-disabled')
  selectTrialGroupButton().click()
  ctimsUserTapestryMember().click()
  let table = cy.get('table tr td')
  table.each(($el) => {
    let ee = $el.text()

    if (ee.includes(trialName)) {
      cy.wrap($el).click()
      //.then(($prevEl) => {
      // cy.wrap($prevEl).click();
      // });
      trialTableThreeDots().click();
      trialTableDelete().click();
      trialTableDialogueDeleteBtn().click();
      return false;
    }
  })

})


Cypress.Commands.add('deleteTrialMember', (trialName) => {
  createCTMLButton().should('have.class','p-disabled')
  selectTrialGroupButton().click()
  ctimsUserTrialGroupxMember().click()
  let table = cy.get('table tr td')
  table.each(($el) => {
    let ee = $el.text()

    if (ee.includes(trialName)) {
      cy.wrap($el).click()
      //.then(($prevEl) => {
      // cy.wrap($prevEl).click();
      // });
      trialTableThreeDots().click();
      trialTableDelete().click();
      trialTableDialogueDeleteBtn().click();
      return false;
    }
  })

})

Cypress.Commands.add('inputArmDoseLevel', (ctmlTestData,$input, index) => {
  const treatmentList = ctmlTestData.treatment_list.step[0].arm;
  const doseLevels = treatmentList[index].dose_level;
  const arm = treatmentList[index];

  cy.log("Function input", $input);
  cy.log(index);
  cy.wrap($input).find('.p-inputtext').eq(0).fill(arm.arm_code);
  cy.wrap($input).find('.p-inputtext').eq(1).fill(arm.arm_description);
  cy.wrap($input).find('.p-inputtext').eq(2).fill(arm.arm_internal_id.toString());
  cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click({force: true});
  //Expand Dose level
  cy.get(`#array-item-list-root_treatment_list_step_0_arm_${index}_dose_level`).contains('Add Dose Level').click({force: true})
  cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]`).each(($input, doseIndex) => {
    const dose = doseLevels[doseIndex];
    cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).fill(dose.level_code);
    cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).fill(dose.level_description);
    cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).fill(dose.level_internal_id.toString());
    cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click({force: true});
  });
});
Cypress.Commands.add('inputArmDoseLevelMultiple', (ctmlTestData,$input, index) => {
  const treatmentList = ctmlTestData.treatment_list.step[0].arm;
  const doseLevels = treatmentList[index].dose_level;
  const arm = treatmentList[index];

  cy.log("Function input", $input);
  cy.log(index);
  cy.wrap($input).find('.p-inputtext').eq(0).fill(arm.arm_code);
  cy.wrap($input).find('.p-inputtext').eq(1).fill(arm.arm_description);
  cy.wrap($input).find('.p-inputtext').eq(2).fill(arm.arm_internal_id.toString());
  cy.wrap($input).find('.p-selectbutton').contains(arm.arm_suspended).click({force: true});
  cy.clickMultiple(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]>div>.pi-plus-circle`, doseLevels.length)
  cy.get(`[id^=array-item-list-root_treatment_list_step_0_arm_${index}_dose_level]>div>div>div>div>#panel-children`).each(($input, doseIndex) => {
    const dose = doseLevels[doseIndex];
    cy.wait(1000)
    if (doseIndex === 0) {
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).fill(dose.level_code);
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).fill(dose.level_description);
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).fill(dose.level_internal_id.toString());
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click({force: true});
    }
    if (doseIndex === 1) {
      cy.log(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`);
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_code`).fill(dose.level_code);
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_description`).fill(dose.level_description);
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_internal_id`).fill(dose.level_internal_id.toString());
      cy.get(`#root_treatment_list_step_0_arm_${index}_dose_level_${doseIndex}_level_suspended`).contains(dose.level_suspended).click({force: true});
    }
  })
});

Cypress.Commands.add( 'enterGenomicConditions', (orConditions) => {
  cy.clickGenomic();
  cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1);

  getSubGroup()
    .find('.p-treenode-children>li').each((childElement, index) => {
      if (Cypress.$(childElement).length > 0) {
        cy.wrap(childElement).click(); // click on each child element
        const condition = orConditions[index % orConditions.length]; // get the corresponding and condition
        cy.log(orConditions.length.toString());
        Object.entries(condition.genomic).map(([key, value]) => {
          switch (key) {
            case 'hugo_symbol':
              if (typeof value === "string") {
                getHugoSymbol().fill(value);
              }
              break;

            case 'variant_category':
              if (typeof value === "string") {
                getVariantCategory().click({force: true});
                getGenomicDropDown().contains(value).click({force: true});
              }
              break;

            case 'protein_change':
              if (typeof value === "string") {
                getProteinChange().fill(value);
              }
              break;

            case 'molecular_function':
              if (typeof value === "string") {
                getMolecularFunction().click();
                getGenomicDropDown().contains(value).click()

              }
              break;

            case 'variant_classification':
              if (typeof value === "string") {
                getVariantClassification().click();
                getGenomicDropDown().contains(value.replace(/_/g, ' ')).click();
              }
              break;

            case 'cnv_call':
              if (typeof value === "string") {
                getCNVCall().fill(value)
              }
              break;

            case 'fusion_partner_hugo_symbol':
              if (typeof value === "string") {
                getFusionPartnerHugoSymbol().fill(value);
              }
              break;

            case 'true_transcript_exon':
              if (typeof value === "string") {
                getTrueTranscriptExon().fill(value);
              }
              break;

            case 'wildtype':
              if (typeof value === "string") {
                getWildType().click();
                getGenomicDropDown().contains(value).click();
              }
              break;

            case 'pole_status':
              if (typeof value === "string") {
                getPoleStatus().click();
                getGenomicDropDown().contains(value).click();
              }
              break;

            case 'uva_status':
              if (typeof value === "string") {
                getUVAStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'tobacco_status':
              if (typeof value === "string") {
                getTobaccoStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'apobec_status':
              if (typeof value === "string") {
                getApobecStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'temozolomide_status':
              if (typeof value === "string") {
                getTemozolomideStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'mmr_status':
              if (typeof value === "string") {
                getMMRStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'ms_status':
              if (typeof value === "string") {
                getMSStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

          }
        });
      } else {
        return false;
      }
    });
})

Cypress.Commands.add( 'enterSingleGenomicConditions', (genomicConditions) => {
  cy.clickGenomic();
 // cy.clickMultipleFunction(getAddCriteriaToSameList(), orConditions.length - 1);

  getSubGroup()
  //  .each((childElement, index) => {
  //    if (Cypress.$(childElement).length > 0) {
   //     cy.wrap(childElement).click(); // click on each child element
  //      let condition = orConditions[index % orConditions.length]; // get the corresponding and condition
 //       cy.log(orConditions.length.toString());
        Object.entries(genomicConditions.genomic).map(([key, value]) => {
          switch (key) {
            case 'hugo_symbol':
              if (typeof value === "string") {
                getHugoSymbol().fill(value);
              }
              break;

            case 'variant_category':
              if (typeof value === "string") {
                getVariantCategory().click();
                getGenomicDropDown().contains(value).click();
              }
              break;

            case 'protein_change':
              if (typeof value === "string") {
                getProteinChange().fill(value);
              }
              break;

            case 'molecular_function':
              if (typeof value === "string") {
                getMolecularFunction().click();
                getGenomicDropDown().contains(value).click()

              }
              break;

            case 'variant_classification':
              if (typeof value === "string") {
                getVariantClassification().click();
                getGenomicDropDown().contains(value.replace(/_/g, ' ')).click();
              }
              break;

            case 'cnv_call':
              if (typeof value === "string") {
                getCNVCall().fill(value)
              }
              break;

            case 'fusion_partner_hugo_symbol':
              if (typeof value === "string") {
                getFusionPartnerHugoSymbol().fill(value);
              }
              break;

            case 'true_transcript_exon':
              if (typeof value === "string") {
                getTrueTranscriptExon().fill(value);
              }
              break;

            case 'wildtype':
              if (typeof value === "string") {
                getWildType().click();
                getGenomicDropDown().contains(value).click();
              }
              break;

            case 'pole_status':
              if (typeof value === "string") {
                getPoleStatus().click();
                getGenomicDropDown().contains(value).click();
              }
              break;

            case 'uva_status':
              if (typeof value === "string") {
                getUVAStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'tobacco_status':
              if (typeof value === "string") {
                getTobaccoStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'apobec_status':
              if (typeof value === "string") {
                getApobecStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'temozolomide_status':
              if (typeof value === "string") {
                getTemozolomideStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'mmr_status':
              if (typeof value === "string") {
                getMMRStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

            case 'ms_status':
              if (typeof value === "string") {
                getMSStatus().click()
                getGenomicDropDown().contains(value).click()
              }
              break;

          }
        });
})
Cypress.Commands.add('enterClinicalConditionsMultiple', (andConditions) => {
  cy.clickClinical()
  const clinicalLength = andConditions.length - 1;
    cy.clickMultipleFunction(getAddCriteriaToSameList(), clinicalLength);

    cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li:nth-child(2)').find('.p-treenode-children>li')
      .each((childElement, index) => {
        if (Cypress.$(childElement).length > 0) {
          cy.wrap(childElement).click(); // click on each child element
          let condition = andConditions[index % andConditions.length]; // get the corresponding and condition
          Object.entries(condition.clinical).map(([key, value]) => {
            switch (key) {
              case 'age_numerical':
                if (typeof value === "string") {
                  getClinicalAge().fill(value);
                }
                break;
              case 'oncotree_primary_diagnosis':
                if (typeof value === "string") {
                  getClinicalOncotreePrimaryDiagnosis().fill(value);
                  if (value.includes('!')) {
                    getOncotreeExclamation().click();
                  }
                }
                break;
              case 'tmb':
                if (typeof value === "string") {
                  getClinicalTMB().fill(value.toString());
                }
                break;
              case 'her2_status':
                if (typeof value === "string") {
                  let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
                  cy.log(newValue);
                  getClinicalHER2Status().click({force:true}).fill(newValue);
                }
                break;

              case 'er_status':
                if (typeof value === "string") {
                  let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
                  cy.log(newValue);
                  /*   let newValue = value.replace(/True/i, "Positive")
                     cy.log(newValue)*/
                  getClinicalERStatus().click({force: true}).fill(newValue)

                  //  getClinicalERStatus().fill(value);
                }
                break;

              case 'pr_status':
                if (typeof value === "string") {
                  let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
                  cy.log(newValue);
                  getClinicalPRStatus().click({force: true}).fill(newValue);
                }
                break;
            }
          });
        } /*else {
          return false;
        }*/
      });
  });

Cypress.Commands.add('enterSingleClinicalCondition', (testAndConditions) => {
    cy.clickClinical()
    cy.get('.LeftMenuComponent_matchingCriteriaMenuContainer__fe8dz>div:nth-child(2)>ul>li>ul>li:nth-child(2)').then(() => {

      Object.entries(testAndConditions.clinical).map(([key, value]) => {
        switch (key) {
          case 'age_numerical':
            if (typeof value === "string") {
              getClinicalAge().fill(value);
            }
            break;
          case 'oncotree_primary_diagnosis':
            if (typeof value === "string") {
              getClinicalOncotreePrimaryDiagnosis().fill(value);
              if (value.includes('!')) {
                getOncotreeExclamation().click();
              }
            }
            break;
          case 'tmb':
            if (typeof value === "string") {
              getClinicalTMB().fill(value);
            }
            break;

          case 'her2_status':
            if (typeof value === "string") {
              let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
              cy.log(newValue);
              getClinicalHER2Status().click({force:true}).fill(newValue);
            }
            break;

          case 'er_status':
            if (typeof value === "string") {
              let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
              cy.log(newValue);
           /*   let newValue = value.replace(/True/i, "Positive")
              cy.log(newValue)*/
              getClinicalERStatus().click({force: true}).fill(newValue)

              //  getClinicalERStatus().fill(value);
            }
            break;

          case 'pr_status':
            if (typeof value === "string") {
              let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
              cy.log(newValue);
              getClinicalPRStatus().click({force: true}).fill(newValue);
            }
            break;
        }
      });
    });
  });
Cypress.Commands.add('enterAndClinical', (testAndConditions) => {
  cy.clickClinical()
  cy.get('.p-treenode-children > .p-treenode > .p-treenode-content')

    Object.entries(testAndConditions.clinical).map(([key, value]) => {
      switch (key) {
        case 'age_numerical':
          if (typeof value === "string") {
            getClinicalAge().fill(value);
          }
          break;
        case 'oncotree_primary_diagnosis':
          if (typeof value === "string") {
            getClinicalOncotreePrimaryDiagnosis().fill(value);
            if (value.includes('!')) {
              getOncotreeExclamation().click();
            }
          }
          break;
        case 'tmb':
          if (typeof value === "string") {
            getClinicalTMB().fill(value);
          }
          break;

        case 'her2_status':
          if (typeof value === "string") {
            let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
            cy.log(newValue);
            getClinicalHER2Status().click({force:true}).fill(newValue);
          }
          break;

        case 'er_status':
          if (typeof value === "string") {
            let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
            cy.log(newValue);
            /*   let newValue = value.replace(/True/i, "Positive")
               cy.log(newValue)*/
            getClinicalERStatus().click({force: true}).fill(newValue)

            //  getClinicalERStatus().fill(value);
          }
          break;

        case 'pr_status':
          if (typeof value === "string") {
            let newValue = value.toLowerCase() === "true" ? "Positive" : "Negative";
            cy.log(newValue);
            getClinicalPRStatus().click({force: true}).fill(newValue);
          }
          break;
      }
    });
});
Cypress.Commands.add('clickMatchAllGenomic', () => {
  cy.clickParentNode(0)
  cy.clickGenomic();
  cy.get('.p-checkbox-box').click()
})
Cypress.Commands.add('logout', () => {
  cy.get('.TopBar_userContainer__Dcaw3>i').click()
  cy.get('.p-menuitem>a').click()
  cy.url().should('include', 'https://ctims-web.qa02.technainstitute.net/');
})
//});


//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
