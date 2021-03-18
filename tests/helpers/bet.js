const { sanitizeEntity } = require("strapi-utils");

const buildBet = async () => {
  const mockBetData = {
    type: "HELP MOCKED BET TYPE",
    match: "60130ff61e40b7688d2503b0", // PSG - REAL 29 janv 2021
    odds: 1.5,
    bookmaker: "Betclick",
    status: "enCours",
  };

  const bet = await strapi.services.bets.findOne({
    type: mockBetData.type,
  });

  // Redundant findOne() to get correct data formating from query
  if (!bet) await strapi.services.bets.create(mockBetData);

  const getBet = await strapi.services.bets.findOne({
    type: mockBetData.type,
  });

  return sanitizeEntity(getBet, { model: strapi.models.bets });
};

module.exports = { buildBet };
