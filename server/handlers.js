"use strict";
const { MongoClient, ObjectId } = require("mongodb");
// package to generate unique ids
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//returns all users
//Returns all registered customers
const getAllCustomers = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database
  const db = await client.db("Edme");

  // access a collection called "customers"
  const customersCollection = db.collection("users");
  try {
    const result = await customersCollection.find({}).toArray();

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};
//Returns customer email and id
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const { _id } = req.params;
  console.log(_id);
  const db = await client.db("Edme");
  const userCollection = db.collection("users");
  try {
    const result = await userCollection.findOne({ _id });
    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: "Found customer", data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};

// Adds a new customer when they register
const addUser = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("Edme");

    // create/access a new collection called "customers"
    const customersCollection = db.collection("users");

    // Add new _id to customer array
    const _id = uuidv4();

    // Destructure req.body
    const { ...FormData } = req.body;

    // Add the generated ID to the request body
    const requestBody = { _id, ...FormData };
    console.log("I am request body  ", requestBody);
    // insert a new document into the "customers" collection
    const result = await customersCollection.insertOne(requestBody);

    if (result.acknowledged) {
      // On success/no error, send
      return res.status(201).json({
        status: 201,
        success: true,
        message: "A new customer was successfully created",
        data: requestBody,
      });
    }

    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not register the customer",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};

const setProfile = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database
  const db = await client.db("Edme");

  // access a collection called "customers"
  const customersCollection = db.collection("users");
  try {
    const result = await customersCollection.find({}).toArray();

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};

const getPasswordVerification = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  const { email, password } = req.body;

  // connect to the client
  await client.connect();

  // connect to the database
  const db = await client.db("Edme");

  const result = await db.collection("users").findOne({
    email: email,
    password: password,
  });
};
module.exports = {
  getAllCustomers,
  getUser,
  addUser,
  setProfile,
  getPasswordVerification,
};
