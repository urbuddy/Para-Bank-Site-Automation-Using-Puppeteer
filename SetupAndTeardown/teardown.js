const fs = require('fs').promises;
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
module.exports = async function () {

  await globalThis.__BROWSER_GLOBAL__.close();
  
  await fs.rm(DIR, {recursive: true, force: true});
};