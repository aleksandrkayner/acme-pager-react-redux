const request = require("supertest");
const app = require("../server/index");
//const { expect } = require("chai");
//const { app } = require("supertest")(require("../server/app"));
const express = require("express");

// const app = express();
// describe("true equal true", () => {
//   it("test true", () => {
//     expect(true).to.equal(true);
//   });
// });
// describe("GET /api/employees", () => {
// describe("with correct status", async () => {
//   it("test get route", async () => {
//     const response = await app.get("/api/employees/:page?");
//     console.log(response);
//     expect(response.status).to.equal(200);
//   });
// });
// });
describe("GET /api/employees/:page?", function() {
  it("responds ", function(done) {
    request(app)
      .get("/api/employees/:page?")
      .expect(200)
      .expect(/hello/, done)
      .end(function(err, res) {
        if (err) throw err;
        res.should.have.status(200);
        done();
      });
  });
});

describe("POST /employees", function() {
  //const app = express();
  it('user.name should be an case-insensitive match for "john"', function() {
    request(app)
      .post("/api/employees")
      .send({ firstName: "john" }) // x-www-form-urlencoded upload
      .set("Accept", "application/json")
      .expect(function(res) {
        res.body.id = "some fixed id";
        res.body.name = res.body.name.toLowerCase();
      })
      .expect(200, {
        id: "some fixed id",
        name: "john"
      });
  });
});
describe("Should return a response with status: 204 ", async () => {
  it("test delete", async done => {
    // const app = express();
    app.use(express.json());
    const response = await app.get("/api/employees/:page", (req, res) => {
      response.status(204);
    });
    console.log(response, "<><><><><><><><><><><><><><><><><><><><><><><><");
    request(app)
      .delete("/api/employees/:id")
      .expect("Content-type", /json/)
      .expect(response.status)
      .to.equal(204)
      .end(function(err, res) {
        if (err) throw err;
      });

    // .end((err, res) => {
    //   if (err) throw err;
    // });
  });
});
