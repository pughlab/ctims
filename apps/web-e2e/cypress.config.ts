import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import EndToEndConfigOptions = Cypress.EndToEndConfigOptions;
const { removeDirectory } = require('cypress-delete-downloads-folder');
const {verifyDownloadTasks} = require('cy-verify-downloads')
const {fs} = require('fs')
const path = require('path')

const crypto = require('crypto')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

const cypressJsonConfig: EndToEndConfigOptions = {
  fileServerFolder: '.',
  //baseUrl: 'http://localhost:4200/trials/create',
  fixturesFolder: './src/fixtures',
  includeShadowDom: true,
  experimentalStudio: true,
  video: true,
  videoUploadOnPasses: true,
  videosFolder: '../../dist/cypress/apps/web-e2e/videos',
  screenshotOnRunFailure: true,
  screenshotsFolder: '../../dist/cypress/apps/web-e2e/screenshots',
  trashAssetsBeforeRuns: true,  //trash screenshot and video before every run
  chromeWebSecurity: false,
  supportFile: 'src/support/e2e.ts',
  downloadsFolder: 'cypress/downloads',
 // specPattern: 'src/e2e/CtmTest/**/*.cy.{js,jsx,ts,tsx}',
  //specPattern: 'src/e2e/CtmTest/CTM-105-NCT02503722_Osimertinib.cy.ts',
 // specPattern: 'src/e2e/CtmTest/CTM-114-NCT03297606_CAPTUR.cy.ts',
  //specPattern: 'src/e2e/CtmTest/CTM-194-Save-Edit-Delete/CTM-194-NCT03297606_CAPTUR-Edit.cy.ts',
  specPattern: 'src/e2e/Regression/E2E-RegressionTest.cy.ts',

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  setupNodeEvents(on,config) {
    on('task', verifyDownloadTasks)
    on('task', { removeDirectory })
    allureWriter(on, config);
    return config;
  }

};
module.exports = defineConfig({
  //viewportWidth: 1920,
  //viewportHeight: 1080,
  "env": {
    //"baseUrl": "http://localhost:4200/",
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 30000,
    allureReuseAfterSpec: true,
    allureResultsPath: "allure-results",
    allure:true,
    snapshotOnly: true,
    testIsolation: false,
    experimentalSessionSupport: true,
  },
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
});
