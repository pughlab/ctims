import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import EndToEndConfigOptions = Cypress.EndToEndConfigOptions;
const { removeDirectory } = require('cypress-delete-downloads-folder');
const {verifyDownloadTasks} = require('cy-verify-downloads')
const {fs} = require('fs')
const path = require('path')
const mysql = require('mysql') //https://gist.github.com/fityanos/0a345e9e9de498b6c629f78e6b2835f5
import * as dotenv from "dotenv";
dotenv.config();

const allureWriter = require('@shelex/cypress-allure-plugin/writer');

const cypressJsonConfig: EndToEndConfigOptions = {
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  includeShadowDom: true,
  experimentalStudio: true,
  video: true,
  videoUploadOnPasses: true,
  videosFolder: '../../dist/cypress/apps/web-e2e/videos',
  screenshotOnRunFailure: true,
  screenshotsFolder: '../../dist/cypress/apps/web-e2e/screenshots',
  trashAssetsBeforeRuns: false,  //trash screenshot and video before every run
  chromeWebSecurity: false,
  supportFile: 'src/support/e2e.ts',
  downloadsFolder: 'cypress/downloads',
  //specPattern: 'src/e2e/CtmTest/**/*.cy.{js,jsx,ts,tsx}',
  specPattern: 'src/e2e/Ctims-PMatch/**/*.cy.{js,jsx,ts,tsx}',

  //specPattern: 'src/e2e/CtmTest/CTM-105-NCT02503722_Osimertinib.cy.ts',

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  setupNodeEvents(on,config) {
    on('task', verifyDownloadTasks)
    on('task', { removeDirectory })
   //test db

    function queryTestDb(query, config) {
      const connection = mysql.createConnection(config);

      return new Promise((resolve, reject) => {
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            connection.query(query, (error, results) => {
              connection.end();

              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
          }
        });
      });
    }

    allureWriter(on, config);
    return config;
  }

};
module.exports = defineConfig({
  viewportWidth: 1200,
  viewportHeight: 800,
  "env": {
   baseUrl: process.env.LOCALHOST_BASE_URL, //localhost
  // baseUrl: process.env.BASE_URL, //QA
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    defaultCommandTimeout: 30000,
    allureReuseAfterSpec: true,
    allureResultsPath: "allure-results",
    allure:true,
    snapshotOnly: true,
    testIsolation: false,
    experimentalSessionSupport: true,
    experimentalMemoryManagement: true,
    "numTestsKeptInMemory": 0
  },
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
});
