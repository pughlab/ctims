import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import EndToEndConfigOptions = Cypress.EndToEndConfigOptions;
const { removeDirectory } = require('cypress-delete-downloads-folder');
const {verifyDownloadTasks} = require('cy-verify-downloads')

const cypressJsonConfig: EndToEndConfigOptions = {
  fileServerFolder: '.',
  baseUrl: 'http://localhost:4200/trials/create',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: '../../dist/cypress/apps/web-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/web-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
  setupNodeEvents(on,config) {
    on('task', verifyDownloadTasks)
    on('task', { removeDirectory })
  }
};
export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  "env": {
     "baseUrl": "http://localhost:4200/",
   },
  /*setupNodeEvents(on, config) {
    on('task', verifyDownloadTasks)
    on('task', { removeDirectory })
  },*/
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
});
