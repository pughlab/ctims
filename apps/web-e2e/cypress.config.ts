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
  //specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
  specPattern: 'src/e2e/copy-test-NCT02503722.cy.ts',
  setupNodeEvents(on,config) {
    on('task', verifyDownloadTasks)
    on('task', { removeDirectory })
    on('task', {
      readDirContentsAndReturnFilenameHash(dirPath) {
        const filesInDir = fs.readdirSync(dirPath);
        const result = {}
        filesInDir.forEach(file => {
          const filePath = path.join(dirPath, file);
          const fileData = fs.readFileSync(filePath,
            {encoding:'utf8'});
          const hash = crypto.createHash('sha256').update(fileData).digest('hex')
          result[file] = hash
        })
        return result
      },
    })
    allureWriter(on, config);
    return config;
    /*on('task', {
      readTwoDirsAndGetFileNamesAndHashes(arg) {
        const {dir1, dir2} = arg
        const getFileAndFileHashForPath = (dirPath) => {
          const filesInDir = fs.readdirSync(dirPath);
          //const trimFiles = filesInDir.trim()
          const result = {}
          filesInDir.forEach(file => {
            // const f1 = file.split(' ')
            const filePath = path.join(dirPath, file);
            const fileData = fs.readFileSync(filePath,
              {encoding: 'utf8'});
            const hash: string = crypto.createHash('sha256').update(fileData).digest('hex')
            result[file] = hash
          })
          return result
        }
        const dir1Map = getFileAndFileHashForPath(dir1);
        const dir2Map = getFileAndFileHashForPath(dir2);
        return {dir1Map, dir2Map}
      },
    })*/
  }

};
export default defineConfig({
  //viewportWidth: 1920,
  //viewportHeight: 1080,
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
