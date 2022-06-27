# Strapi Plugin Eth

Integrate Ethereum in your Strapi application.

## Table Of Content

- [Requirements](#requirements)
- [Installation](#installation)
- [Plugin Configuration](#plugin-configuration)
- [Usage](#usage)

## Requirements

Strapi v4 is required.

## Installation

```bash
npm install --save strapi-plugin-eth
```

## Plugin Configuration

Add the plugin configuration to `./config/plugins.js`:

```js
module.exports = ({ env }) => ({
  eth: {
    enabled: true,
    config: {
      chains: [
        // this enables ethereum network
        {
          network: {
            name: 'ethereum',
            chainId: 1,
            ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
          },
          providers: [
            {
              url: `https://mainnet.infura.io/v3/${env('INFURA_PROJECT_ID')}`,
            },
          ],
        },
        // this enables matic network
        {
          network: {
            name: 'matic',
            chainId: 137,
          },
          providers: [
            {
              url: `https://polygon-mainnet.infura.io/v3/${env('INFURA_PROJECT_ID')}`,
            },
            {
              url: 'https://polygon-rpc.com',
            },
          ],
        },
      ],
    },
  },
})
```

## Usage

This plugin exposes a service with the various blockchain providers:

```js
const ethProviderService = strapi.service('plugin::eth.provider');
const ethereumProvider = ethProviderService.getProvider(1 /* or 'ethereum' */);
const maticProvider = ethProviderService.getProvider(137 /* or 'matic' */);
```
