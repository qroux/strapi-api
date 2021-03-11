const request = require("supertest");
const { userJWT } = require("../helpers/user");
const id = require("mongoose").Types.ObjectId();

// MATCHES COLLECTION PARAMS
// @@date!: datetime
// @@type!: String => default: "Ligue 1"
// @@slug!: String => default: "HOME - VISITOR DD/MM/YY"
// @@home!: reference id => Teams MODEL
// @@visitor!: reference id => Teams MODEL

const mockMatchData = {
  date: "2021-01-29T20:00:00.000+00:00",
  type: "Mocked ligue",
  slug: "MOCKED PSG - REAL 29/01/21 20h00",
  home: "6011b267f4464a81b5b91035", // PSG
  visitor: "6011b279f4464a81b5b91036", // REAL
};

let matchID = undefined;

describe("Match CRUD", () => {
  it("CREATE match if all required params provided", async (done) => {
    const response = await request(strapi.server)
      .post("/matches")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userJWT}`)
      .send(mockMatchData)
      .expect("Content-Type", /json/)
      .expect(200);

    matchID = response.body.id;
    expect(matchID).toBeDefined();

    done();
  });
});
