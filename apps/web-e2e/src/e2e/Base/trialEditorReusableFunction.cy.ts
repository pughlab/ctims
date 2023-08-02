import {
  createCTMLButton,
  getDrugNamePlusIcon,
  getDrugNameTextBoxMultiple,
  getManagementGroupNameTextBoxMultiple,
  getPrimaryManagementGroupPlusIcon,
  getPriorTreatmentRequirementMultiple,
  getPriorTreatmentRequirementPlusIconMultiple, getProtocolStaffMultiple, getProtocolStaffPlusIcon,
  getSiteNameMultiple,
  getSiteNamePlusIcon,
  getSponsorNameMultiple,
  getSponsorNamePlusIcon,
  trialEditorLeftPanelList
} from "../../support/app.po";

export function enterTrialEditorFormData (ctmlTestData: any,nickName: string, principalInvestigator: string, ctmlStatus: string) {
    createCTMLButton().should('not.have.class', 'p-disabled').click()
    cy.title().should('contain', 'CTIMS')
    trialEditorLeftPanelList().should('have.length', '9')
    cy.trialInformation(ctmlTestData.nct_id,
      nickName,
      principalInvestigator,
      ctmlStatus,
      ctmlTestData.long_title,
      ctmlTestData.short_title,
      ctmlTestData.phase,
      ctmlTestData.protocol_no,
      ctmlTestData.nct_purpose,
      ctmlTestData.status)

    // Prior treatment requirements
    cy.clickMultipleFunction(getPriorTreatmentRequirementPlusIconMultiple(),ctmlTestData.prior_treatment_requirements.length)
    getPriorTreatmentRequirementMultiple().each((input, index) => {
      if (ctmlTestData.prior_treatment_requirements[index]) {
        cy.wrap(input).type(ctmlTestData.prior_treatment_requirements[index]);
      }
    })
    //Age
    cy.age(ctmlTestData.age)

    //Drug List
    cy.clickMultipleFunction(getDrugNamePlusIcon(),ctmlTestData.drug_list.drug.length - 1)

    getDrugNameTextBoxMultiple().each((input, index) => {
      if (ctmlTestData.drug_list.drug[index]) {
        cy.wrap(input).type(ctmlTestData.drug_list.drug[index].drug_name);
      }
    })

    //Management Group List
    cy.clickMultipleFunction(getPrimaryManagementGroupPlusIcon(),ctmlTestData.management_group_list.management_group.length - 1)
    getManagementGroupNameTextBoxMultiple().each(($input, index) => {
      const managementGroup = ctmlTestData.management_group_list.management_group[index];

      if (managementGroup.management_group_name) {
        cy.wrap($input).find('.p-dropdown').click().contains(managementGroup.management_group_name).click();
      } else {
        expect(managementGroup.management_group_name, 'Management group name').to.exist;
      }

      if (managementGroup.is_primary) {
        cy.wrap($input).find('.p-selectbutton').contains(managementGroup.is_primary).click();
      }
     /* cy.wrap($input).find('.p-dropdown').click().contains(ctmlTestData.management_group_list.management_group[index].management_group_name).click();
      cy.wrap($input).find('.p-selectbutton').contains(ctmlTestData.management_group_list.management_group[index].is_primary).click();
   */ });

    //Site List
  cy.clickMultipleFunction(getSiteNamePlusIcon(), ctmlTestData.site_list.site.length - 1);

  getSiteNameMultiple().each(($input, index) => {
    const site = ctmlTestData.site_list.site[index];

    if (site.site_name) {
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(site.site_name).click();
    } else {
      expect(site.site_name, 'Site name').to.exist;
    }

    cy.wrap($input).find('.p-dropdown').eq(1).click().contains(site.site_status).click();
    cy.wrap($input).find('.p-selectbutton').eq(0).click().contains(site.coordinating_center).click();
    cy.wrap($input).find('.p-selectbutton').eq(1).click().contains(site.uses_cancer_center_irb).click();
  });

    //Sponsor List
  cy.clickMultipleFunction(getSponsorNamePlusIcon(), ctmlTestData.sponsor_list.sponsor.length - 1);

  getSponsorNameMultiple().each(($input, index) => {
    const sponsor = ctmlTestData.sponsor_list.sponsor[index];

    if (sponsor.sponsor_name) {
      cy.wrap($input).find('.p-inputtext').type(sponsor.sponsor_name);
    } else {
      expect(sponsor.sponsor_name, 'Sponsor name').to.exist;
    }

    if (sponsor.is_principal_sponsor) {
      cy.wrap($input).find('.p-selectbutton').contains(sponsor.is_principal_sponsor).click();
    } else {
      expect(sponsor.is_principal_sponsor, 'Is principal sponsor').to.exist;
    }
  });

    //Staff List
    cy.clickMultipleFunction(getProtocolStaffPlusIcon,
      ctmlTestData.staff_list.protocol_staff.length - 1);
    getProtocolStaffMultiple().each(($input, index) => {
      const protocolStaff = ctmlTestData.staff_list.protocol_staff[index];
      if (protocolStaff.first_name) {
        cy.wrap($input).find('.p-inputtext').eq(0).type(protocolStaff.first_name);
      }

      if (protocolStaff.last_name) {
        cy.wrap($input).find('.p-inputtext').eq(1).type(protocolStaff.last_name);
      }

      if (protocolStaff.email_address) {
        cy.wrap($input).find('.p-inputtext').eq(2).type(protocolStaff.email_address);
      }

      if (protocolStaff.institution_name) {
        cy.wrap($input).find('.p-dropdown').eq(0).click().contains(protocolStaff.institution_name).click();
      }

      if (protocolStaff.staff_role) {
        cy.wrap($input).find('.p-dropdown').eq(1).click().contains(protocolStaff.staff_role).click();
      }

      /*cy.log($input.attr('id'));
      cy.wrap($input).find('.p-inputtext').eq(0).type(ctmlTestData.staff_list.protocol_staff[index].first_name);
      cy.wrap($input).find('.p-inputtext').eq(1).type(ctmlTestData.staff_list.protocol_staff[index].last_name);
      cy.wrap($input).find('.p-inputtext').eq(2).type(ctmlTestData.staff_list.protocol_staff[index].email_address);
      cy.wrap($input).find('.p-dropdown').eq(0).click().contains(ctmlTestData.staff_list.protocol_staff[index].institution_name).click();
      cy.wrap($input).find('.p-dropdown').eq(1).click().contains(ctmlTestData.staff_list.protocol_staff[index].staff_role).click();
   */ });

}
