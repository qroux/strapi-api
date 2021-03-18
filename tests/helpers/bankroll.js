const { sanitizeEntity } = require("strapi-utils");

// Optionnal parameter to build bankroll for specific userId
const buildBankroll = async (userId = "600ad9fe262321001541df1e") => {
  const mockBankrollData = {
    users_permissions_user: userId, // default => qrgmail
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
    await strapi.services.bankrolls.create(mockBankrollData);
    return await strapi.services.bankrolls.findOne(
      {
        name: mockBankrollData.name,
      },
      [],
      { autopopulate: false }
    );
  } else {
    return bankroll;
  }
};

module.exports = { buildBankroll };
