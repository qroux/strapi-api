"use strict";
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async sanitizedFind(ctx) {
    let bankrolls;
    // DEEP POPULATE SYNTAX
    try {
      bankrolls = await strapi.query("bankrolls").find(ctx.query, {
        path: "positions",
        populate: [{ path: "bet", populate: [{ path: "match" }] }],
      });
    } catch (err) {
      return err;
    }

    return bankrolls.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.bankrolls })
    );
  },
  async setCurrentBalance(ctx) {
    let bankroll;
    let sum = 0;
    let updatedBankroll;

    try {
      bankroll = await strapi.query("bankrolls").findOne(
        { id: ctx.params.id },
        {
          path: "positions",
          populate: [{ path: "bet" }],
        }
      );

      bankroll.positions.map((position) => {
        if (position.bet.status === "Succes") {
          sum += position.value * position.bet.odds;
        }
        if (position.bet.status === "Echec") {
          sum -= position.value;
        }
      });

      bankroll.current_balance = bankroll.starter + sum;
      updatedBankroll = await strapi
        .query("bankrolls")
        .update({ id: ctx.params.id }, bankroll);
    } catch (err) {
      return err;
    }

    return sanitizeEntity(updatedBankroll, { model: strapi.models.bankrolls });
  },
};
