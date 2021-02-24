"use strict";

module.exports = {
  async find(ctx) {
    return await strapi.services.positions.populatedFind(ctx);
  },
};
