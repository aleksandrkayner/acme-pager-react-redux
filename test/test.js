const request = require("supertest");
const { app } = require("../server/app.js");
const { expect } = require("chai");
// const { seed } = require("../server/db/seed");
// const { db, Employee } = require("../server/db/index.js");
describe("get routes", function() {
  describe("GET /api/employees/:page?", function() {
    it("responds ", function(done) {
      request(app)
        .get("/api/employees/1")
        .expect(200)
        .expect(res => {
          expect(res.body).to.have.property("count");
          expect(res.body).to.have.property("rows");
        })
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
    it("sends 400 on a bad request", function(done) {
      request(app)
        .get("/api/employees/a")
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
  });
});

describe("test post route", () => {
  describe(" POST to /api/employees", () => {
    it("req.body", done => {
      request(app)
        .post("/api/employees")
        .send({
          firstName: " Alex ",
          lastName: " Hylio ",
          email: "sashok@aol.com",
          title: "The Man"
        })
        .expect(200)
        .expect(res => {
          //console.log(res);
          expect(res.body).to.have.property("firstName");
          expect(res.body.firstName).to.equal(" Alex ");
          expect(res.body).to.have.property("lastName");
          expect(res.body.lastName).to.equal(" Hylio ");
        })
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
    it("sends 500 on a bad request", function(done) {
      request(app)
        .post("/api/employees")
        .send({})
        .expect(500)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
  });
});

describe("delete routes", function() {
  describe("DELETE /api/employees/:id", function() {
    it("responds ", function(done) {
      request(app)
        .del(`/api/employees/${Math.ceil(Math.random() * 200)}`)
        .expect(204)

        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
    it("sends 400 on a bad request", function(done) {
      request(app)
        .get("/api/employees/a")
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
  });
});
