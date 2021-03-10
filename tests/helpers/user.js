const request = require("supertest");

// user mock data
const mockUserData = {
  username: "test",
  email: "test@test.com",
  provider: "local",
  password: "1234abc",
  confirmed: true,
  blocked: false,
};

async function newTestUser() {
  const defaultRole = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "authenticated" }, []);

  const role = defaultRole ? defaultRole.id : null;

  const user = await strapi.plugins["users-permissions"].services.user.add({
    ...mockUserData,
    role,
  });

  return user.id;
}

async function getTestUser() {
  return await request(strapi.server)
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    });
}

async function resetTestUser() {
  await strapi.plugins["users-permissions"].services.user.remove({
    email: mockUserData.email,
  });
}

async function destroyTestUser() {
  await strapi.plugins["users-permissions"].services.user.remove({
    email: mockUserData.email,
  });
}

module.exports = {
  newTestUser,
  getTestUser,
  resetTestUser,
  destroyTestUser,
  mockUserData,
};
