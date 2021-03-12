const request = require("supertest");
const { userInstance } = require("../helpers/user");

describe("User CRUD", () => {
  it("should login user and return JWT token", async (done) => {
    await request(strapi.server)
      .post("/auth/local")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        identifier: userInstance.mockUserData.email,
        password: userInstance.mockUserData.password,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
      });

    done();
  });

  it("should return users data from JWT token", async (done) => {
    await request(strapi.server)
      .get("/users/me")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + userInstance.JWT)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body).toBeDefined();
        expect(data.body.id).toBeDefined();
        expect(data.body.username).toBe(userInstance.mockUserData.username);
        expect(data.body.email).toBe(userInstance.mockUserData.email);
      });

    done();
  });
});
