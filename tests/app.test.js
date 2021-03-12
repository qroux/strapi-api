const { setupStrapi } = require("./helpers/strapi");
const { TestUser, userInstance } = require("./helpers/user");
const mongoose = require("mongoose");

//////////////////////////////////////////////////////////////////
// GENERAL TEST SETUP | AUTHENTICATION + AUTHENTICATED REQUESTS //
//////////////////////////////////////////////////////////////////
// let testUser;

beforeAll(async (done) => {
  await setupStrapi();
  await userInstance.reset();
  await userInstance.generate();
  done();
});

afterAll(async (done) => {
  await userInstance.reset();
  done();
});

it("GENERATE userIstance using TestUser helper class", async (done) => {
  expect(userInstance).toBeDefined();
  expect(userInstance.userID).toBeDefined();
  expect(mongoose.Types.ObjectId.isValid(userInstance.userID)).toEqual(true);
  expect(userInstance.userOBJ).toBeDefined();
  expect(mongoose.Types.ObjectId.isValid(userInstance.userOBJ.id)).toEqual(
    true
  );

  done();
});

it("GENERATE JWT for userInstance for authenticated request", async (done) => {
  done();
});

// it("strapi is defined", (done) => {
//   expect(strapi).toBeDefined();
//   done();
// });

// it("Test user can be fetched with testUserID variable defined", async (done) => {
//   const user = await strapi.plugins["users-permissions"].services.user.fetch({
//     id: testUserID,
//   });

//   expect(testUserID).toBeDefined();
//   expect(user.email).toEqual("test@test.com");
//   done();
// });

//////////////////////////////
// CONTROLLER TESTS IMPORTS //
//////////////////////////////

// require("./user");
// require("./teams");
// require("./matches");
// require("./bets");
// require("./positions");
