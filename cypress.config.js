const { defineConfig } = require('cypress');
require('dotenv').config(); // Load environment variables

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280, // Set your desired width here
    viewportHeight: 720, // Set your desired height here
    specPattern: 'cypress/e2e/**/*.js',
    setupNodeEvents(on, config) {
      require('./cypress/plugins/index.js')(on, config);
      return config;
    },
  },
});
