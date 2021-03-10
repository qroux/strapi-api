const request = require("supertest");
const { mockUserData, getTestUser } = require("../helpers/user");

describe("User CRUD", () => {
  it("should login user and return jwt token", async (done) => {
    await request(strapi.server)
      .post("/auth/local")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        identifier: mockUserData.email,
        password: mockUserData.password,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
      });

    done();
  });

  it("should return users data from JWT token", async (done) => {
    const user = await getTestUser();

    await request(strapi.server)
      .get("/users/me")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + user.body.jwt)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body).toBeDefined();
        expect(data.body.id).toBeDefined();
        expect(data.body.username).toBe(mockUserData.username);
        expect(data.body.email).toBe(mockUserData.email);
      });

    done();
  });
});
