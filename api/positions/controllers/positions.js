"use strict";

module.exports = {
  async find(ctx) {
    // request from app => /positions?bankroll.id=${id}
    return await strapi.services.positions.populatedFind(ctx);
  },
  async create(ctx) {
    // request from app => POST /positions
    return await strapi.services.positions.createPosition(ctx);
  },
};
