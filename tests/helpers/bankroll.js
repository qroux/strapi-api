const { sanitizeEntity } = require("strapi-utils");

// Optionnal parameter to build bankroll for specific userId
const buildBankroll = async () => {
  const mockBankrollData = {
    users_permissions_user: "600ad9fe262321001541df1e", //qrgmail
    name: "HELPER MOCKED BANKROLL",
    starter: 500,
    current_balance: 500,
  };

  const bankroll = await strapi.services.bankrolls.findOne(
    {
      name: mockBankrollData.name,
    },
    [],
    { autopopulate: false }
  );

  if (!bankroll) {
    const newBankroll = await strapi.services.bankrolls.create(
      mockBankrollData
    );
    return newBankroll;
  } else {
    return bankroll;
  }
};

module.exports = { buildBankroll };
