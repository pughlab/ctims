// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    trialInformation(nctId: string, nickName: string, principalInvestigator: string,ctmlStatus: string,longTitle: string, shortTitle: string, phase: string, ProtocolNumber: string, protocolPurpose: string, status: string):  Chainable<Subject>;
    age(ageGroup: string): Chainable<Subject>
    drugList(drugName: string): Chainable<Subject>
    managementGroupList(managementGroupName: string, isPrimary: string): Chainable<Subject>
    siteList(siteName: string, siteStatus: string, coordinatingCenter: string, cancerCenterIRB: string): Chainable<Subject>
    sponsorList(sponsorName: string, principalSponsor: string): Chainable<Subject>
    staffList(firstName: string, lastName: string, email: string, institutionName: string, staffRole: string): Chainable<Subject>
    arm(armCode: any,armDescription: string, armInternalID: any, armSuspended: string): Chainable<Subject>
    doseLevel(levelCode: string, levelDescription: string,levelInternalId: string, levelSuspended: string): Chainable<Subject>
    clickClinical(): Chainable<Subject>
    clickGenomic(): Chainable<Subject>
    clickAnd(): Chainable<Subject>
    clickOr(): Chainable<Subject>
    clickParentAnd(): Chainable<Subject>
    clickParentNode(indexNum: Number): Chainable<Subject>
    clickChildToggleArrowButton(indexNumber: Number): Chainable<Subject>
    deleteDownloadsFolderBeforeAll(): void
    //validateExportJsonAndTestData(testDataValue: string[],exportedJsonValue: string[])
    validateExportJsonAndTestData(testDataValue: string[])
    priorTreatmentRequirement(priorRequirement: string)
  }
}
