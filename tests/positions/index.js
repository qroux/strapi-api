const request = require("supertest");
const { userInstance } = require("../helpers/user");
const mongoose = require("mongoose");
const { buildPositionParams, createPosition } = require("../helpers/position");
const { getBankroll, resetBankrollPositions } = require("../helpers/bankroll");

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
  it("GET position at id", async (done) => {
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
  it("UPDATE position at id", async (done) => {
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
  it("DELETE position at id", async (done) => {
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

describe("Related document | Bankroll update on Position CRUD", () => {
  it("ON Position.create() => add position to Bankroll.positions (Array of position.id)", async (done) => {
    await resetBankrollPositions("60537fee925f723888e585cf");

    const position = await createPosition();
    // position fully populated => position.bankroll.id instead of position.bankroll
    expect(position.bankroll).toBeDefined();
    expect(position.bankroll.positions.length).toEqual(0);

    const bankroll = await getBankroll(position.bankroll.id);
    expect(bankroll.positions.length).toEqual(1);

    await strapi.services.positions.delete({ id: position.id });

    done();
  });
});
