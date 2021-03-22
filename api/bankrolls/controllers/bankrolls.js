"use strict";

module.exports = {
  async find(ctx) {
    return await strapi.services.bankrolls.sanitizedFind(ctx);
  },
  async update(ctx) {
    // UPDATE action for Bankroll.current_balance only
    if (ctx.request.body.type === "current_balance")
      return await strapi.services.bankrolls.setCurrentBalance(ctx);
    // if (ctx.request.body.type === "add_position")
    //   return await strapi.services.bankrolls.setPositions(ctx);
    // if (ctx.request.body.type === "delete_position")
    //   return await strapi.services.bankrolls.deletePosition(ctx);

    return "UPDATE TYPE: missing at request.body.type";
  },
};
