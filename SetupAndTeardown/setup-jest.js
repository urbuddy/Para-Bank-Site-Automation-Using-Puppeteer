const config = require("./puppeteer.config");
jest.retryTimes(config.retryCount);