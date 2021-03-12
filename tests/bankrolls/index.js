const request = require("supertest");
const mongoose = require("mongoose");
const { userInstance } = require("../helpers/user");

// BANKROLLS COLLECTION PARAMS
// @@users_permissions_user!: reference id => User MODEL
// @@name!: String => default "ma bankroll", min lenght = 3
// @@starter!: Decimal
// @@current_balance: Decimal: current_balance = starter at Bankroll.create
// @@positions: Array of position.id => Position MODEL

const mockBankrollData = {
  users_permissions_user: "600ad9fe262321001541df1e",
  name: "MOCKED BANKROLL",
  starter: 500,
  current_balance: 5000, // Deliberate mistake to test UPDATE Bankroll current_balance from positions sum
};

let bankrollID = undefined;

describe("Bankroll CRUD", () => {
  it("CREATE Bankroll if all required params provided", async (done) => {
    await request(strapi.server)
      .post("/bankrolls")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send(mockBankrollData)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.users_permissions_user).toBeDefined();
        expect(
          mongoose.Types.ObjectId.isValid(res.body.users_permissions_user.id)
        ).toEqual(true);
        expect(res.body.name).toEqual(mockBankrollData.name);
        expect(res.body.starter).toEqual(mockBankrollData.starter);
        // NORMAL => current_balance === starter when no position taken
        // BUT deliberate error to test UPDATE later
        // EXPECTED => When user asks current_balance, current_balance must be reset to starter since no positions taken
        expect(res.body.current_balance).toEqual(
          mockBankrollData.current_balance
        );
        expect(res.body.positions).toBeDefined();
        expect(res.body.positions.length).toEqual(0);

        bankrollID = res.body.id;
      });

    expect(bankrollID).toBeDefined();

    done();
  });

  it("GET Bankroll at id", async (done) => {
    await request(strapi.server)
      .get(`/bankrolls/${bankrollID}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual(mockBankrollData.name);
        expect(mongoose.Types.ObjectId.isValid(res.body.id)).toEqual(true);
        expect(res.body.id).toEqual(bankrollID);
      });

    done();
  });

  it("UPDATE Bankroll current_balance mapping over bankroll's positions", async (done) => {
    // UPDATE filtered with {"type": "current_balance"}
    const type = "current_balance";

    await request(strapi.server)
      .put(`/bankrolls/${bankrollID}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send({ type })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual(mockBankrollData.name);
        expect(mongoose.Types.ObjectId.isValid(res.body.id)).toEqual(true);
        expect(res.body.id).toEqual(bankrollID);
        // EXPECTED => When user asks current_balance, current_balance must be reset to starter since no positions taken
        expect(res.body.current_balance).toEqual(mockBankrollData.starter);
      });

    done();
  });

  it("DELETE Bankroll at id", async (done) => {
    await request(strapi.server)
      .delete(`/bankrolls/${bankrollID}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200);

    done();
  });
});
