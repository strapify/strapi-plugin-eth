'use strict';

const { validateConfig } = require('../validation');

module.exports = {
  validator: (config) => {
    validateConfig(config);
  },
};
