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
  baseUrl: 'http://localhost:4200/trials/create',
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
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
  downloadsFolder: 'cypress/downloads',
  //specPattern: 'src/e2e/CTM-105-validTest-NCT02503722.cy.ts',
  setupNodeEvents(on,config) {
    on('task', verifyDownloadTasks)
    on('task', { removeDirectory })
    allureWriter(on, config);
    return config;
  }


};
export default defineConfig({
  //viewportWidth: 1920,
  //viewportHeight: 1080,
  "env": {
     "baseUrl": "http://localhost:4200/",
   },
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
});
