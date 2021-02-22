"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const sanitezed = await strapi.services.bankrolls.find(ctx);
    return sanitezed;
  },
};
