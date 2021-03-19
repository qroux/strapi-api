const request = require("supertest");
const { sanitizeEntity } = require("strapi-utils");
const { userInstance } = require("./user");
const { buildBankroll } = require("./bankroll");
const { buildBet } = require("./bet");

const getBankrollId = async () => {
  return await buildBankroll();
};

const getBetId = async () => {
  return await buildBet();
};

const buildPositionParams = async () => {
  const userId = userInstance.userOBJ.id;
  const bankroll = await getBankrollId();
  const bet = await getBetId();

  const mockPositionData = {
    users_permissions_user: userId,
    bankroll: bankroll.id,
    bet: bet.id,
    value: 20,
    status: "Attente",
  };

  return mockPositionData;
};

const createPosition = async () => {
  const positionParams = await buildPositionParams();

  const response = await request(strapi.server)
    .post("/positions")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${userInstance.JWT}`)
    .send(positionParams)
    .expect("Content-Type", /json/)
    .expect(200);

  return sanitizeEntity(response.body, { model: strapi.models.positions });
};

module.exports = { buildPositionParams, createPosition };
