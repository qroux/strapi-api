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
    this.userID = "not modified yet";
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
    this.userID = user.id;
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
    this.userID = "reset";
    this.userOBJ = "reset";
  }
}

const userInstance = new TestUser();

module.exports = { TestUser, userInstance };
// user mock data
//   const mockUserData = {
//     username: "test",
//     email: "test@test.com",
//     provider: "local",
//     password: "1234abc",
//     confirmed: true,
//     blocked: false,
//   };

//   // VARIABLES
//   let userJWT;
//   let userID;
//   let userOBJ;

//   // METHODS
//   async function newTestUser() {
//     const defaultRole = await strapi
//       .query("role", "users-permissions")
//       .findOne({ type: "authenticated" }, []);

//     const role = defaultRole ? defaultRole.id : null;

//     await strapi.plugins["users-permissions"].services.user.add({
//       ...mockUserData,
//       role,
//     });
//   }

//   async function getTestUser() {
//     userOBJ = await request(strapi.server)
//       .post("/auth/local")
//       .set("accept", "application/json")
//       .set("Content-Type", "application/json")
//       .send({
//         identifier: mockUserData.email,
//         password: mockUserData.password,
//       });
//   }

//   async function getUserInfo() {
//     return userOBJ;
//   }

//   async function resetTestUser() {
//     await strapi.plugins["users-permissions"].services.user.remove({
//       email: mockUserData.email,
//     });
//   }

//   async function destroyTestUser() {
//     await strapi.plugins["users-permissions"].services.user.remove({
//       email: mockUserData.email,
//     });
//   }

//   // EXPORTS
//   return {
//     newTestUser,
//     getUserInfo,
//     getTestUser,
//     resetTestUser,
//     destroyTestUser,
//   };
// };

// module.exports = { userModule };

// // user mock data
// const mockUserData = {
//   username: "test",
//   email: "test@test.com",
//   provider: "local",
//   password: "1234abc",
//   confirmed: true,
//   blocked: false,
// };

// const userJWT =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGFkOWZlMjYyMzIxMDAxNTQxZGYxZSIsImlhdCI6MTYxMzA3NTI3OCwiZXhwIjoxNjE1NjY3Mjc4fQ.6tFxwnUv_5-CjQWYrcrBhfjZKccudHO-aGiXGi_9-Ok";

// async function newTestUser() {
//   const defaultRole = await strapi
//     .query("role", "users-permissions")
//     .findOne({ type: "authenticated" }, []);

//   const role = defaultRole ? defaultRole.id : null;

//   const user = await strapi.plugins["users-permissions"].services.user.add({
//     ...mockUserData,
//     role,
//   });

//   return user.id;
// }

// async function getTestUser() {
//   return await request(strapi.server)
//     .post("/auth/local")
//     .set("accept", "application/json")
//     .set("Content-Type", "application/json")
//     .send({
//       identifier: mockUserData.email,
//       password: mockUserData.password,
//     });
// }

// async function resetTestUser() {
//   await strapi.plugins["users-permissions"].services.user.remove({
//     email: mockUserData.email,
//   });
// }

// async function destroyTestUser() {
//   await strapi.plugins["users-permissions"].services.user.remove({
//     email: mockUserData.email,
//   });
// }

// module.exports = {
//   newTestUser,
//   getTestUser,
//   resetTestUser,
//   destroyTestUser,
//   mockUserData,
//   userJWT,
// };
