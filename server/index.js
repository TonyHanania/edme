"use strict";

const express = require("express");
const morgan = require("morgan");
const port = 8000;

const {
  getAllUsers,
  getUser,
  addUser,
  setProfile,
  getPasswordVerification,
  getUserByEmail,
  getSubjects,
  createModule,
  getModule,
  confirmUserRole,
  addCohort,
  updateProfile,
  contactUs,
  getCustomerSupport,
  updateGrades,
  getGrades,
  updateModule,
} = require("./handlers.js");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/", (req, res) => {
    res.status(200).json("Hello ME! bacon");
  })

  .get("/getusers", getAllUsers)

  .patch("/setprofile/:email", setProfile)

  .post("/admin/createcohort", addCohort)
  // Returns the customer who is trying to login (Used in Signin.js)
  .post("/getpasswordverification", getPasswordVerification)

  .get("/getuser/:email", getUserByEmail)
  .get("/subjects", getSubjects)
  .post("/createmodule", createModule)
  .get("/displaymodule", getModule)
  .patch("/user/:email/confirm", confirmUserRole)
  .patch("/updategrade/:subject/:cohortId/:email", confirmUserRole)
  .patch("/user/:email/updateprofile", updateProfile)
  .post("/contactus", contactUs)
  .get("/admin/customersupport", getCustomerSupport)
  .post("/postgrades", updateGrades)
  .get(`/getgrades`, getGrades)
  .patch("/subject/:moduleId/updatemodule", updateModule)
  .listen(port, () => {
    console.log(console.log(`example app on  ${port}`));
  });
