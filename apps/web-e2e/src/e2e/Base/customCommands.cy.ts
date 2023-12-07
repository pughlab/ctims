import {
  createCTMLButton, getPriorTreatmentRequirementMultiple,
  getPriorTreatmentRequirementPlusIconMultiple, getProtocolStaffMultiple, getProtocolStaffPlusIcon,
  trialEditorLeftPanelList
} from "../../support/app.po";
import {
  getDrugNamePlusIcon,
  getDrugNameTextBoxMultiple,
  getManagementGroupNameTextBoxMultiple,
  getPrimaryManagementGroupPlusIcon,
  getSiteNameMultiple,
  getSiteNamePlusIcon,
  getSponsorNameMultiple,
  getSponsorNamePlusIcon
} from "../../support/app.po";

class customCommands {
  priorTreatmentRequirement: any;
  drugName: any;
  managementGroupNameAttribute: any;
  managementGroupNameIsPrimaryAttribute: any;
  site: any;
  sponsorName: any;
  isPrincipalSponsor: any;
  staff: any;

  customCommands() {
    // You can initialize the properties here if needed
    this.priorTreatmentRequirement = null;
    this.drugName = null;
    this.managementGroupNameAttribute = null;
    this.managementGroupNameIsPrimaryAttribute = null;
    this.site = null;
    this.sponsorName = null;
    this.isPrincipalSponsor = null;
    this.staff = null;
  }
  enterTrialInformation(nctId, memberName, nickName, ctmlStatus, longTitle, shortTitle, phase, protocolNo, nctPurpose, status) {
    trialEditorLeftPanelList().should('have.length', '9')
    cy.trialInformation(nctId, memberName, nickName, ctmlStatus, longTitle, shortTitle, phase, protocolNo, nctPurpose, status)
  }

  enterPriorTreatmentRequirements(ctmlTestData, priorTreatmentRequirements) {
    trialEditorLeftPanelList().eq(1).should('contain','Prior Treatment Requirements').click()
    cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
    getPriorTreatmentRequirementMultiple().each((input, index) => {
      let priorTreatmentRequirement;
      if (ctmlTestData.prior_treatment_requirements[index]) {
        priorTreatmentRequirement = ctmlTestData.prior_treatment_requirements[index]

        cy.fillPriorTreatmentRequirement(input, priorTreatmentRequirement)
      }
    })
  }

  enterAgeValues(ctmlTestData, age) {
    trialEditorLeftPanelList().eq(2).should('contain','Age').click()
    cy.age(ctmlTestData.age)
  }

  enterDrugListValues(ctmlTestData, drugName) {
    // trialEditorLeftPanelList().eq(3).should('contain','Drug List').click()
    cy.clickMultipleFunction(getDrugNamePlusIcon(), ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        drugName = ctmlTestData.drug_list.drug[index].drug_name

        cy.fillDrugList(input,drugName)
      }
    })
  }

  enterManagementGroupList(ctmlTestData, managementGroupNameAttribute,managementGroupNameIsPrimaryAttribute ) {
    trialEditorLeftPanelList().eq(4).should('contain', 'Management Group List').click()
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(), ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      managementGroupNameAttribute = ctmlTestData.management_group_list.management_group[index].management_group_name
      managementGroupNameIsPrimaryAttribute = ctmlTestData.management_group_list.management_group[index].is_primary

      cy.fillManagementGroup($input, managementGroupNameAttribute, managementGroupNameIsPrimaryAttribute)
    })
  }

  enterSiteList(ctmlTestData, site ) {
    trialEditorLeftPanelList().eq(5).should('contain', 'Site List').click()
    cy.clickMultipleFunction(getSiteNamePlusIcon(), ctmlTestData.site_list.site.length - 1)
    getSiteNameMultiple().each(($input, index) => {
      site = ctmlTestData.site_list.site[index]

      cy.fillSiteDetails($input, site)
    })
  }
  enterSponsorList(ctmlTestData, sponsorName,isPrincipalSponsor ) {
    trialEditorLeftPanelList().eq(6).should('contain','Sponsor List').click()
    cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1)
    getSponsorNameMultiple().each(($input, index) => {
      sponsorName = ctmlTestData.sponsor_list.sponsor[index].sponsor_name
      isPrincipalSponsor = ctmlTestData.sponsor_list.sponsor[index].is_principal_sponsor

      cy.fillSponsorDetails($input, sponsorName,isPrincipalSponsor)
    });
  }
  enterStaffList(ctmlTestData, staff ) {
    trialEditorLeftPanelList().eq(7).should('contain','Staff List').click()
    cy.clickMultipleFunction(getProtocolStaffPlusIcon(), ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
   staff = ctmlTestData.staff_list.protocol_staff[index]
   cy.fillProtocolStaffDetails($input, staff)
 });
}

}

export default new customCommands();
