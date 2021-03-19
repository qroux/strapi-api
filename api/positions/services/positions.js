"use strict";
const { sanitizeEntity } = require("strapi-utils");
const { createPosition } = require("../../../tests/helpers/position");

module.exports = {
  // FIND
  async populatedFind(ctx) {
    let positions;

    try {
      // USE [Array] syntax to populate, and {path: "field", populate: "field to populate"} to deep populate
      positions = await strapi
        .query("positions")
        .find(ctx.query, ["bet", { path: "bet", populate: "match" }]);
    } catch (err) {
      return `populatedFind Error => ${err}`;
    }

    return positions.map((position) =>
      sanitizeEntity(position, { model: strapi.models.positions })
    );
  },
  // POST CREATE
  async createPosition(ctx) {
    let position;

    try {
      position = await strapi.query("positions").create(ctx.request.body);
      // update banroll.positions directly from controller instead of two separate request from user
      await strapi
        .query("bankrolls")
        .update(
          { id: position.bankroll.id },
          { $push: { positions: `${position.id}` } }
        );
    } catch (err) {
      return `createPosition Error => ${err}`;
    }

    return position;
  },
};
