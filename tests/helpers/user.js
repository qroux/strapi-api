const request = require("supertest");

class TestUser {
  constructor() {
    this.mockUserData = {
      username: "test",
      email: "test@test.com",
      provider: "local",
      password: "1234abc",
      confirmed: true,
      blocked: false,
    };

    this.JWT = "not modified yet";
    this.userOBJ = "not modified yet";
  }

  async generate() {
    const defaultRole = await strapi
      .query("role", "users-permissions")
      .findOne({ type: "authenticated" }, []);

    const role = defaultRole ? defaultRole.id : null;

    const user = await strapi.plugins["users-permissions"].services.user.add({
      ...this.mockUserData,
      role,
    });

    this.userOBJ = user;
  }

  async getJWT() {
    const response = await request(strapi.server)
      .post("/auth/local")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        identifier: this.mockUserData.email,
        password: this.mockUserData.password,
      });

    this.JWT = response.body.jwt;
  }

  static async reset() {
    await strapi.plugins["users-permissions"].services.user.remove({
      email: "test@test.com",
    });

    this.userJWT = "reset";
    this.userOBJ = "reset";
  }
}

const userInstance = new TestUser();

module.exports = { TestUser, userInstance };
