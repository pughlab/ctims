import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import EndToEndConfigOptions = Cypress.EndToEndConfigOptions;
const { removeDirectory } = require('cypress-delete-downloads-folder');
const {verifyDownloadTasks} = require('cy-verify-downloads')
const {fs} = require('fs')
const path = require('path')
const mysql = require('mysql') //https://gist.github.com/fityanos/0a345e9e9de498b6c629f78e6b2835f5
//const mssql = require("mssql")

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
 // specPattern: 'src/e2e/E2ETest/E2E-Test.cy.ts',
  //specPattern: 'src/e2e/CtmTest/CTM-204/CTM-204-NCT03114319_TNO155.cy.ts',
 // specPattern: 'src/e2e/CtmTest/User-Roles/**.cy.ts',
  //specPattern: 'src/e2e/CtmTest/User-Roles/member-NCT02503722_Osimertinib.cy.ts',
  //specPattern: 'src/e2e/CtmTest/User-Roles/admin-NCT03114319_TNO155.cy.ts',
  specPattern: 'src/e2e/CtmTest/User-Roles/admin-NCT03297606_CAPTUR.cy.ts',



  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  setupNodeEvents(on,config) {
    on('task', verifyDownloadTasks)
    on('task', { removeDirectory })
   //test db

    function queryTestDb(query, config) {
      // Create a new mysql connection using the provided configuration
      const connection = mysql.createConnection(config);

      return new Promise((resolve, reject) => {
        // Connect to the database
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            // Execute the query
            connection.query(query, (error, results) => {
              // Close the connection
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

    on('task', {
      queryDb: (query: string) => {
        const config = {
          host: 'localhost',
          port: '3306',
          user: 'ctims',
          password: 'ctims',
          database: 'ctims',
          insecureAuth: true
        };
        return queryTestDb(query, config);
      }
    });
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
 // baseUrl: 'https://ctims-web.qa02.technainstitute.net',
    defaultCommandTimeout: 30000,
    allureReuseAfterSpec: true,
    allureResultsPath: "allure-results",
    allure:true,
    snapshotOnly: true,
    testIsolation: false,
    experimentalSessionSupport: true,
    experimentalMemoryManagement: true

    /*db: {
      host: 'localhost',
      port: '3306',
      user: 'ctims',
      password: 'ctims',
      insecureAuth : true
    }*/
  },
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
});
