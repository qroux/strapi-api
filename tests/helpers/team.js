const getTeamsId = async () => {
  const teamsId = [];

  const teams = await strapi
    .query("teams")
    .find({ _limit: 2 }, [], { autopopulate: false });

  teams.forEach((team) => teamsId.push(team.id));

  return teamsId;
};

module.exports = { getTeamsId };
