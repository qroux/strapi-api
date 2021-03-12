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
  it("CREATE team if all required params provided", async (done) => {
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

  it(`GET team at id ${teamId}`, async (done) => {
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

  it(`UPDATE team at id ${teamId}`, async (done) => {
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

  it(`DELETE team at id ${teamId}`, async (done) => {
    await request(strapi.server)
      .delete(`/teams/${teamId}`)
      .set("Authorization", `Bearer ${userInstance.JWT}`)
      .send()
      .expect("Content-Type", /json/)
      .expect(200);

    done();
  });
});
