import {signInButton} from "../../support/app.po";
import * as process from "node:process";

class baseClass {

  beforeClass() {
    before(() => {
      cy.visit(Cypress.env('baseUrl'), {timeout: 10000})
      cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
      // Cypress.config('experimentalSessionSupport', true)
    });
  }
  ctimsTestUser() {
    before(() => {
      cy.visit(Cypress.env('baseUrl'), {timeout: 10000})
      cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    });
  }
  testProd() {
    before(() => {
      cy.visit(Cypress.env('prod'), {timeout: 10000})
      cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    });
  }
  adminTrialGroupx() {
    before(() => {
      cy.visit(Cypress.env('baseUrl'), {timeout: 10000})
      cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    })
    }
    afterClass() {
    after(()=> {
      cy.get('.TopBar_userContainer__Dcaw3>i').click()
      cy.get('.p-menuitem>a').click()
    })
  }
}
export default new baseClass()
