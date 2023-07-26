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
    priorTreatmentRequirementRepeatingGroup(priorRequirement: string)
    readCtmlModelFile(readValue: string[])
    compareArrays(actual:string[], expected:string[])
    clickMultiple(selector:any, times:number)
    clickMultipleFunction(selector:any, times:number)
    clickMultipleArm(selector:any, times:number)
    clickMultipleDose( armIndex:number, times:number)
    clickChildOr()
    readJsonFile(fileName: any)
    staffListAttributes(data: any)
    fillProtocolStaffDetails(input:any, staff:any)
    sponsorListAttributes(data: any)
    siteListAttributes(data: any)
    fillSiteDetails(input:any,site:any)
    managementGroupListAttributes(data: any)
    drugListAttributes(data: any)
    ageAttribute(data: any)
    priorTreatmentListAttributes(data: any)
    trialInformationAttributes(data: any)
    compareTrialInformation(exportedTrial: any, testDataTrial: any)
    compareMultiple(data: any,testData: any[][])
    saveAndEdit()
    saveAndDelete()
    switchGroupOperator()
    processGenomicCondition(condition: any)
    saveAndBackBtn()
    clickSaveEditButtonForTrialGroupAdmin(nickNameVal: string)
    clickSaveEditButtonForTrialGroupMember(nickNameVal: string)
    inputArmDoseLevel(ctmlTestData: any,$input: any, index: any)
    inputArmDoseLevelMultiple(ctmlTestData: any,$input: any, index: any)
    enterGenomicConditions(orConditions: any)
    enterSingleGenomicConditions(genomicConditions: any)
    enterClinicalConditionsMultiple(andConditions: any)
    enterSingleClinicalCondition(testAndConditions: any)
    deleteExistingTrial(trialName: string)
  }
}
