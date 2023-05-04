class baseClass {

  beforeClass() {
    before(() => {
      cy.visit(Cypress.env('baseUrl'),{timeout: 10000})
      // Cypress.config('experimentalSessionSupport', true)
    });
  }
}
export default new baseClass()
