const { setupStrapi } = require("./helpers/strapi");
const {
  newTestUser,
  resetTestUser,
  destroyTestUser,
} = require("./helpers/user");

//////////////////////////////////////////////////////////////////
// GENERAL TEST SETUP | AUTHENTICATION + AUTHENTICATED REQUESTS //
//////////////////////////////////////////////////////////////////
let testUserID = undefined;

beforeAll(async (done) => {
  await setupStrapi();
  await resetTestUser();
  testUserID = await newTestUser(); // newTestUser() => returns user id

  done();
});

afterAll(async (done) => {
  await destroyTestUser();
  done();
});

it("strapi is defined", (done) => {
  expect(strapi).toBeDefined();
  done();
});

it("Test user can be fetched with testUserID variable defined", async (done) => {
  const user = await strapi.plugins["users-permissions"].services.user.fetch({
    id: testUserID,
  });

  expect(testUserID).toBeDefined();
  expect(user.email).toEqual("test@test.com");
  done();
});

//////////////////////////////
// CONTROLLER TESTS IMPORTS //
//////////////////////////////

// require("./user");
// require("./teams");
require("./matches");
