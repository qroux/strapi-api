"use strict";
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  // FIND
  async sanitizedFind(ctx) {
    let bankrolls;

    try {
      bankrolls = await strapi
        .query("bankrolls")
        .find(ctx.query, [
          "positions",
          { path: "bet", populate: [{ path: "match" }] },
        ]);
    } catch (err) {
      return err;
    }

    return bankrolls.map((bankroll) =>
      sanitizeEntity(bankroll, { model: strapi.models.bankrolls })
    );
  },
  // UPDATE
  // type === "current_balance"
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
  // type === "add_position"
  async setPositions(ctx) {
    // @params: bankroll_id
    // @request.body: position_id
    let bankroll;
    let updatedBankroll;

    try {
      bankroll = await strapi.query("bankrolls").findOne({ id: ctx.params.id });
      bankroll.positions = [
        ...bankroll.positions,
        ctx.request.body.position_id,
      ];

      updatedBankroll = await strapi
        .query("bankrolls")
        .update({ id: ctx.params.id }, bankroll);
    } catch (err) {
      return err;
    }

    return sanitizeEntity(updatedBankroll, { model: strapi.models.bankrolls });
  },
  async deletePosition(ctx) {
    // @params: bankroll_id
    // @request.body: position_id
    let bankroll;
    let updatedBankroll;

    try {
      bankroll = await strapi.query("bankrolls").findOne({ id: ctx.params.id });
      bankroll.positions = [
        ...bankroll.positions.filter(
          (position) => position.id !== ctx.request.body.position_id
        ),
      ];

      updatedBankroll = await strapi
        .query("bankrolls")
        .update({ id: ctx.params.id }, bankroll);
    } catch (err) {
      return err;
    }

    return sanitizeEntity(updatedBankroll, { model: strapi.models.bankrolls });
  },
};
