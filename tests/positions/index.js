const request = require("supertest");
const { userInstance } = require("../helpers/user");
const mongoose = require("mongoose");
const

// POSITIONS COLLECTION PARAMS
// @@users_permissions_user: Reference id => User model
// @@bankroll: Reference id => Bankroll model
// @@bet!: reference id => Bet MODEL
// @@value!: Decimal
// @@outcome!: Decimal => default: 0
// @@status!: Enum => ["Attente","Gagnant","Perdu"] => default: "Attente"

const mockPositionData = {
  users_permissions_user: userInstance.userOBJ.id,
  bankroll: "",
  bet: "",
  value: 20,
};

let positionID = undefined;

describe("Position CRUD", () => {
  it("CREATE position if all required params provided", async (done) => {
    const response = await request(strapi.server)
      .post("/positions")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userJWT}`)
      .send(mockPositionData)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(mockPositionData.type);
        expect(res.body.match.id).toEqual(mockPositionData.match); // match reference populated
        expect(res.body.odds).toEqual(mockPositionData.odds);
        expect(res.body.bookmaker).toEqual(mockPositionData.bookmaker);
        expect(res.body.status).toEqual(mockPositionData.status);
        positionID = res.body.id;
      });
    expect(positionID).toBeDefined();
    done();
  });
  // it("GET bet at id", async (done) => {
  //   await request(strapi.server)
  //     .get(`/positions/${positionID}`)
  //     .set("Authorization", `Bearer ${userJWT}`)
  //     .send()
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.type).toEqual(mockPositionData.type);
  //       expect(mongoose.Types.ObjectId.isValid(res.body.match.id)).toEqual(
  //         true
  //       ); // reference is automatically populated by strapi
  //       expect(res.body.odds).toEqual(mockPositionData.odds);
  //       expect(res.body.bookmaker).toEqual(mockPositionData.bookmaker);
  //       expect(res.body.status).toEqual(mockPositionData.status);
  //     });
  //   done();
  // });
  // it("UPDATE bet at id", async (done) => {
  //   const updatedType = "MODIFIED MOCKED gagne par plus de deux buts d'écart";
  //   await request(strapi.server)
  //     .put(`/positions/${positionID}`)
  //     .set("accept", "application/json")
  //     .set("Content-Type", "application/json")
  //     .set("Authorization", `Bearer ${userJWT}`)
  //     .send({ ...mockPositionData, type: updatedType })
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.type).toEqual(updatedType);
  //       expect(mongoose.Types.ObjectId.isValid(res.body.match.id)).toEqual(
  //         true
  //       );
  //       expect(res.body.odds).toEqual(mockPositionData.odds);
  //       expect(res.body.bookmaker).toEqual(mockPositionData.bookmaker);
  //       expect(res.body.status).toEqual(mockPositionData.status);
  //     });
  //   done();
  // });
  // it("DELETE bet at id", async (done) => {
  //   await request(strapi.server)
  //     .delete(`/positions/${positionID}`)
  //     .set("Authorization", `Bearer ${userJWT}`)
  //     .send()
  //     .expect("Content-Type", /json/)
  //     .expect(200);
  //   done();
  // });
});
