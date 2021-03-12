const request = require("supertest");
const mongoose = require("mongoose");
const { userInstance } = require("../helpers/user");

// BETS COLLECTION PARAMS
// @@type!: String
// @@match!: reference id => Matches MODEL
// @@odds!: Float => default: 1
// @@bookmaker!: String => default "Winamax"
// @@status!: Enum => ["enCours","Succes","Echec","Report"]

const mockBetData = {
  type: "MOCKED gagne par plus de deux buts d'écart",
  match: "60130ff61e40b7688d2503b0", // PSG - REAL 29 janv 2021
  odds: 1.5,
  bookmaker: "Betclick",
  status: "enCours",
};

let betID = undefined;

describe("Bet CRUD", () => {
  it("CREATE Bet if all required params provided", async (done) => {
    await request(strapi.server)
      .post("/bets")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send(mockBetData)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(mockBetData.type);
        expect(res.body.match.id).toEqual(mockBetData.match); // match reference populated
        expect(res.body.odds).toEqual(mockBetData.odds);
        expect(res.body.bookmaker).toEqual(mockBetData.bookmaker);
        expect(res.body.status).toEqual(mockBetData.status);

        betID = res.body.id;
      });

    expect(betID).toBeDefined();

    done();
  });
  it("GET Bet at id", async (done) => {
    await request(strapi.server)
      .get(`/bets/${betID}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(mockBetData.type);
        expect(mongoose.Types.ObjectId.isValid(res.body.match.id)).toEqual(
          true
        ); // reference is automatically populated by strapi
        expect(res.body.odds).toEqual(mockBetData.odds);
        expect(res.body.bookmaker).toEqual(mockBetData.bookmaker);
        expect(res.body.status).toEqual(mockBetData.status);
      });

    done();
  });

  it("UPDATE Bet at id", async (done) => {
    const updatedType = "MODIFIED MOCKED gagne par plus de deux buts d'écart";

    await request(strapi.server)
      .put(`/bets/${betID}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send({ ...mockBetData, type: updatedType })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(updatedType);
        expect(mongoose.Types.ObjectId.isValid(res.body.match.id)).toEqual(
          true
        );
        expect(res.body.odds).toEqual(mockBetData.odds);
        expect(res.body.bookmaker).toEqual(mockBetData.bookmaker);
        expect(res.body.status).toEqual(mockBetData.status);
      });

    done();
  });

  it("DELETE Bet at id", async (done) => {
    await request(strapi.server)
      .delete(`/bets/${betID}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200);

    done();
  });
});
