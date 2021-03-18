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

module.exports = { buildPositionParams };
