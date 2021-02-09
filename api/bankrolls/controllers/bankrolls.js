"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;

    try {
      entities = await strapi.query("bankrolls").find(ctx.query, {
        path: "positions",
        populate: [{ path: "bet" }],
      });
    } catch (err) {
      return err;
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.bankrolls })
    );
  },
};
