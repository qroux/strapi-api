const request = require("supertest");

class TestTeam {
  constructor() {
    this.teamOBJ = "not modified yet";
  }

  async generate() {
    const teams = await strapi.query("teams").find().sort({ _id: 1 }).limit(2);
    console.log("TEAMS =", teams);
    // const response = await request(strapi.server)
    // .post("/auth/local")
    // .set("accept", "application/json")
    // .set("Content-Type", "application/json")
    // .send({
    //   identifier: this.mockUserData.email,
    //   password: this.mockUserData.password,
    // });

    // this.teamOBJ = response.body;
  }

  static async reset() {
    const response = await request(strapi.server)
      .post("/auth/local")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        identifier: this.mockUserData.email,
        password: this.mockUserData.password,
      });

    this.teamOBJ = "reset";
  }
}

const teamInstance = new TestTeam();

module.exports = { TestTeam, teamInstance };
