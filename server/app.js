const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
// Do not touch this file
const { Employee } = require("./db/index.js");
const volleyball = require("volleyball");
app.use(volleyball);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const paginate = (pageNum, pageSize) => {
  return { limit: pageSize, offset: pageNum * pageSize };
};
app.put("/api/employees/:id", (req, res, next) => {
  //console.log(".,.,.,.,.,.,.,.,.,.,.", req.params.id);
  Employee.findByPk(req.params.id)
    .then(employee => {
      //console.log("<><><><><><><><><><><<<>>", req.body);
      employee
        .update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          title: req.body.title,
          id: req.params.id
        })
        .then(employee => res.send(employee));
    })

    .catch(next);
});

app.post("/api/employees", (req, res, next) => {
  //console.log("????????????????", req.body);
  Employee.create(req.body)
    .then(employee => {
      //console.log("employeeeeeeeee", employee);
      return res.send(employee);
    })
    .catch(next);
});

app.delete("/api/employees/:id", (req, res, next) => {
  Employee.findByPk(req.params.id)
    .then(employee => {
      res.sendStatus(204);
      employee.destroy();
    })
    .catch(next);
});

// app.get("/api/employees", (req, res, next) => {
//   Employee.findAll()
//     .then(employees => {
//       res.status(200).send(employees);
//     })
//     .catch(next);
// });
app.get("/api/employees/:page?", (req, res, next) => {
  const resultsPerPage = 50;
  // pageNum is zero indexed
  let pageNum = req.params.page;
  console.log("12121212121212121212121", pageNum);
  if (pageNum === undefined) {
    pageNum = 0;
  } else if (isNaN(pageNum)) {
    return res.status(400).send({ error: "Invalid page number" });
  }

  const { limit, offset } = paginate(pageNum, resultsPerPage);
  Employee.findAndCountAll({
    limit,
    offset,
    order: [
      ["firstName", "asc"],
      ["lastName", "asc"]
    ]
  }).then(results => {
    res.status(200).send(results);
  });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: err.message });
});
module.exports = { app };
