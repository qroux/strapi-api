const { setupStrapi } = require("./helpers/strapi");
const { TestUser, userInstance } = require("./helpers/user");
const mongoose = require("mongoose");

//////////////////////////////////////////////////////////////////
// GENERAL TEST SETUP | AUTHENTICATION + AUTHENTICATED REQUESTS //
//////////////////////////////////////////////////////////////////

beforeAll(async (done) => {
  await setupStrapi();
  await TestUser.reset();
  await userInstance.generate();
  done();
});

afterAll(async (done) => {
  await TestUser.reset();
  done();
});

it("GENERATE global strapi instance", (done) => {
  expect(strapi).toBeDefined();
  done();
});

it("GENERATE userIstance using TestUser helper class", async (done) => {
  expect(userInstance).toBeDefined();
  expect(userInstance.userOBJ).toBeDefined();
  expect(mongoose.Types.ObjectId.isValid(userInstance.userOBJ.id)).toEqual(
    true
  );
  done();
});

it("GENERATE valid JWT for userInstance for authenticated request", async (done) => {
  await userInstance.getJWT();
  expect(userInstance.JWT).toBeDefined();
  expect(userInstance.JWT.length).toEqual(171);
  done();
});

//////////////////////////////
// CONTROLLER TESTS IMPORTS //
//////////////////////////////

require("./user");
require("./teams");
require("./matches");
// require("./bets");
// require("./bankrolls");
// require("./positions");
