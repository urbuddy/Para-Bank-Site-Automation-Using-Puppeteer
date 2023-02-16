module.exports = {
    globalSetup: './SetupAndTeardown/setup.js',
    globalTeardown: './SetupAndTeardown/teardown.js',
    testEnvironment: './SetupAndTeardown/puppeteer_environment.js',
    testTimeout: 60000,
    setupFilesAfterEnv: ['./SetupAndTeardown/setup-jest.js'],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Para Bank Test Report",
            'outputPath': 'report.html'
        }]
    ]
};