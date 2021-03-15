const request = require("supertest");
const { userInstance } = require("../helpers/user");

// TEAMS COLLECTION PARAMS
// @@name!: string
// @@league!: string => default: "Ligue 1"
// @@country!: string => default: "France"
// @@logo!: images => cloudinary uploader

const mockTeamData = {
  name: "MOCKED Olympique de Marseille mocked",
  league: "MOCKED Ligue 1",
  country: "MOCKED France",
  logo: null,
  status: "published",
};

let teamId = "";

describe("Team CRUD", () => {
  it("CREATE Team if all required params provided", async (done) => {
    const response = await request(strapi.server)
      .post("/teams")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send(mockTeamData)
      .expect("Content-Type", /json/)
      .expect(200);

    teamId = response.body._id;

    done();
  });

  it(`GET Team at id ${teamId}`, async (done) => {
    await request(strapi.server)
      .get(`/teams/${teamId}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual(mockTeamData.name);
      });

    done();
  });

  it(`UPDATE Team at id ${teamId}`, async (done) => {
    const updatedName = "modified mock name";

    await request(strapi.server)
      .put(`/teams/${teamId}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send({ ...mockTeamData, name: updatedName })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual(updatedName);
      });

    done();
  });

  it(`DELETE Team at id ${teamId}`, async (done) => {
    await request(strapi.server)
      .delete(`/teams/${teamId}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200);

    done();
  });
});

describe("Team helper", () => {
  it("Returns the first two teams in DB", async (done) => {
    const teams = await strapi
      .query("teams")
      .find({ _limit: 2 }, [], { autopopulate: false });

    expect(teams).toBeDefined();
    expect(teams.length).toEqual(2);

    done();
  });
});
