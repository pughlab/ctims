// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@shelex/cypress-allure-plugin';
/// <reference types=”@shelex/cypress-allure-plugin” />
Cypress.config("pageLoadTimeout", 5000);
Cypress.config('defaultCommandTimeout', 6000);
Cypress.config('requestTimeout', 6000);


Cypress.on("uncaught:exception", (error) => {
  if (
    error.message.includes(
      "Timed out after waiting `5000ms` for your remote page to load",
    )
  ) {
    return false;
  }
});

Cypress.on("fail", (error) => {
  if (
    error.message.includes(
      "Timed out after waiting `5000ms` for your remote page to load",
    )
  ) {
    return false;
  }

  throw error;
});



