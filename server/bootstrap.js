'use strict';

module.exports = ({ strapi }) => {
  const provider = strapi.service('plugin::eth.provider');
  provider.initialize();
};
