"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const bankrolls = await strapi.services.bankrolls.sanitized_find(ctx);
    return bankrolls;
  },
};
