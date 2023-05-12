class baseClass {

  beforeClass() {
    before(() => {
      cy.visit(Cypress.env('baseUrl'),{timeout: 10000})
      cy.login('ctims_test_user','ctims2023')
      // Cypress.config('experimentalSessionSupport', true)
    });
  }
}
export default new baseClass()
