const fs = require("fs");
const { setupStrapi } = require("./helpers/strapi");

/** this code is called once before any test is called */
beforeAll(async (done) => {
  await setupStrapi(); // singleton so it can be called many times
  done();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});

require("./user");
