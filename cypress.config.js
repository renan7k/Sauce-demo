const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "2n1o8a",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'https://www.saucedemo.com/',
  },
});
