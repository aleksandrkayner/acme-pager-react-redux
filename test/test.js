const express = require("express");

const { expect } = require("chai");
const { app } = require("supertest")(require("../server/app"));

describe("tru equal true", () => {
  it("test true", () => {
    expect(true).to.equal(true);
  });
});
describe("GET /api/employees", () => {
  describe("with correct status", async () => {
    it("test get route", async () => {
      const response = await app.get("/api/employees/:page?");
      console.log(response);
      expect(response.status).to.equal(200);
    });
  });
});
