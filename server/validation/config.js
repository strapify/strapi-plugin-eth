'use strict';

const { yup, validateYupSchemaSync } = require('@strapi/utils');

const configSchema = yup.object().shape({
  chains: yup
    .array()
    .of(
      yup.object({
        network: yup
          .object({
            chainId: yup.number().positive().integer().required(),
            name: yup.string().required(),
          })
          .required(),
        providers: yup
          .array()
          .of(
            yup.object({
              url: yup.string().url().required(),
              user: yup.string(),
              password: yup.string(),
              headers: yup.object(),
            })
          )
          .required()
          .min(1),
        quorum: yup.number().integer().default(1),
      })
    )
    .required()
    .min(1),
});

module.exports = {
  validateConfig: validateYupSchemaSync(configSchema),
};
