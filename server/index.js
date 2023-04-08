"use strict";

const express = require("express");
const morgan = require("morgan");
const port = 8000;

const {
  getAllCustomers,
  getUser,
  addUser,
  setProfile,
  getPasswordVerification,
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

  .get("/getusers", getAllCustomers)

  .get("/getuser/:_id", getUser)
  .post("/registration", addUser)

  .patch("/setprofile", setProfile)
  // Returns the customer who is trying to login (Used in Signin.js)
  .post("/getpasswordverification", getPasswordVerification)
  .listen(port, () => {
    console.log(console.log(`example app on  ${port}`));
  });
