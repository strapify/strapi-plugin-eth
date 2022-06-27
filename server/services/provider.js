'use strict';

const ethers = require('ethers');

module.exports = ({ strapi }) => ({
  _chains: undefined,

  initialize() {
    const chainConfigs = strapi.config.get('plugin.eth.chains');

    this._chains = chainConfigs.map((chainConfig) => {
      const providers = chainConfig.providers.map((providerConfig) => {
        const provider = new ethers.providers.StaticJsonRpcProvider(providerConfig, chainConfig.network);
        provider.on('error', (error) => {
          strapi.log.error(error);
        });
        return provider;
      });
      const fbProvider = new ethers.providers.FallbackProvider(providers, chainConfig.quorum);
      fbProvider.on('error', (error) => {
        strapi.log.error(error);
      });
      fbProvider.ready.then((network) => {
        strapi.log.info(`Network initialized: ${network.name} ${network.chainId}`);
      });
      return {
        network: chainConfig.network,
        provider: fbProvider,
      };
    });
  },

  getNetworks() {
    return this._chains.map((chain) => chain.network);
  },

  getProvider(network) {
    if (!network) {
      network = 1;
    }
    const chain = this._chains.find((x) => {
      switch (typeof network) {
        case 'number':
          return x.network.chainId === network;
        case 'string':
          return x.network.name === network;
        default:
          return false;
      }
    });
    if (chain) return chain.provider;
  },
});
