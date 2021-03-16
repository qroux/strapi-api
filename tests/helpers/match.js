const { sanitizeEntity } = require("strapi-utils");

const buildMatch = async (teamsId) => {
  if (!teamsId || teamsId.length < 2)
    return new Error("Error: Provided teamsId not correct");

  const mockMatchData = {
    date: "2021-01-29T20:00:00.000",
    type: "Helper Mocked ligue",
    slug: "MOCKED PSG - REAL 29/01/21 20h00",
    home: teamsId[0],
    visitor: teamsId[1],
  };

  const mockedMatch = await strapi.services.matches.findOne(
    {
      type: mockMatchData.type,
    },
    [],
    { autopopulate: false }
  );

  if (mockedMatch) {
    return sanitizeEntity(mockMatchData, { model: strapi.models.matches });
  } else {
    const match = await strapi.services.matches.create(mockMatchData);
    return sanitizeEntity(match, { model: strapi.models.matches });
  }
};

module.exports = { buildMatch };
