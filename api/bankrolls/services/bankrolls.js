"use strict";
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;

    // DEEP POPULATE SYNTAX
    try {
      entities = await strapi.query("bankrolls").find(ctx.query, {
        path: "positions",
        populate: [{ path: "bet", populate: [{ path: "match" }] }],
      });
    } catch (err) {
      return err;
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.bankrolls })
    );
  },
};
