"use strict";
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async populatedFind(ctx) {
    let positions;

    try {
      // USE [Array] syntax to populate, and {path: "field", populate: "field to populate"} to deep populate
      positions = await strapi
        .query("positions")
        .find(ctx.query, ["bet", { path: "bet", populate: "match" }]);

      console.log("positions =", typeof positions, positions);
    } catch (err) {
      return `populatedFind Error => ${err}`;
    }

    return positions.map((position) =>
      sanitizeEntity(position, { model: strapi.models.positions })
    );
  },
};
