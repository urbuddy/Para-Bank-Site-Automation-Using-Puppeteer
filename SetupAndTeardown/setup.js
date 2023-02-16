const {mkdir, writeFile} = require('fs').promises;
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const config = require("./puppeteer.config");
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
  const browser = await puppeteer.launch(config.launch);
  globalThis.__BROWSER_GLOBAL__ = browser;
   
  await mkdir(DIR, {recursive: true});
  await writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
