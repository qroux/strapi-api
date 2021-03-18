const request = require("supertest");
const { userInstance } = require("../helpers/user");
const mongoose = require("mongoose");
const { buildPositionParams } = require("../helpers/position");

// POSITIONS COLLECTION PARAMS
// @@users_permissions_user: Reference id => User model
// @@bankroll: Reference id => Bankroll model
// @@bet!: reference id => Bet MODEL
// @@value!: Decimal
// @@outcome!: Decimal => default: 0
// @@status!: Enum => ["Attente","Gagnant","Perdu"] => default: "Attente"

// const { id } = await buildBankroll();

// const positionParams = {
//   users_permissions_user: userInstance.userOBJ.id,
//   bankroll: buildBankroll().id,
//   bet: "",
//   value: 20,
// };

let positionID = undefined;

describe("Position CRUD", () => {
  it("CREATE position if all required params provided", async (done) => {
    const positionParams = await buildPositionParams();

    const response = await request(strapi.server)
      .post("/positions")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send(positionParams)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(positionParams.type);
        expect(res.body.bet.id).toEqual(positionParams.bet); // match reference populated
        expect(res.body.odds).toEqual(positionParams.odds);
        expect(res.body.bookmaker).toEqual(positionParams.bookmaker);
        expect(res.body.status).toEqual(positionParams.status);
        positionID = res.body.id;
      });
    expect(positionID).toBeDefined();
    done();
  });
  it("GET bet at id", async (done) => {
    const positionParams = await buildPositionParams();

    await request(strapi.server)
      .get(`/positions/${positionID}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(positionParams.type);
        expect(res.body.odds).toEqual(positionParams.odds);
        expect(res.body.bookmaker).toEqual(positionParams.bookmaker);
        expect(res.body.status).toEqual(positionParams.status);
      });
    done();
  });
  it("UPDATE bet at id", async (done) => {
    const positionParams = await buildPositionParams();
    const updatedValue = 666;

    await request(strapi.server)
      .put(`/positions/${positionID}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send({ ...positionParams, value: updatedValue })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.value).toEqual(updatedValue);
        expect(res.body.odds).toEqual(positionParams.odds);
        expect(res.body.bookmaker).toEqual(positionParams.bookmaker);
        expect(res.body.status).toEqual(positionParams.status);
      });
    done();
  });
  it("DELETE bet at id", async (done) => {
    await request(strapi.server)
      .delete(`/positions/${positionID}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});

describe("Position help", () => {
  it("Position helper", async (done) => {
    const positionParams = await buildPositionParams();

    expect(positionParams).toBeDefined();

    done();
  });
});
