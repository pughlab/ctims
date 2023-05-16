class baseClass {

  beforeClass() {
    before(() => {
      cy.visit(Cypress.env('baseUrl'), {timeout: 10000})
      cy.login('ctims_test_user', 'ctims2023')
      // Cypress.config('experimentalSessionSupport', true)
    });
  }
    afterClass() {
    after(()=> {
      cy.get('.TopBar_userContainer__Dcaw3>i').click()
      cy.get('.p-menuitem>a').click()
    })
  }
}
export default new baseClass()
