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
const getAllUsers = async (req, res) => {
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
    const customersCollection = db.collection("adminusers");

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
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const { email } = req.params;

  const { image, bio, role, firstName, lastName, isconfirmed } = req.body;

  const db = await client.db("Edme");

  const customersCollection = db.collection("users");

  try {
    const result = await customersCollection.findOneAndUpdate(
      { email: email },
      {
        $set: {
          "profile.image": image,
          "profile.bio": bio,
          "profile.role": role,
          "profile.firstName": firstName,
          "profile.lastName": lastName,
          "profile.isconfirmed": isconfirmed,
        },
      },
      { returnOriginal: false }
    );

    if (result.value) {
      return res.status(200).json({ status: 200, data: result.value });
    } else {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, success: false, message: error });
  } finally {
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

  const result = await db.collection("adminusers").findOne({
    email: email,
    password: password,
  });

  if (!result) {
    return res.status(404).json({
      status: 404,
      message: "Sorry, a user with those credentials does not exist.",
    });
  }

  client.close();

  return res.status(200).json({ status: 200, data: result });
};

const getUserByEmail = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  const { email } = req.params;

  // connect to the database
  const db = await client.db("Edme");

  // access a collection called "customers"
  const customersCollection = db.collection("users");

  try {
    const result = await customersCollection.findOne({ email: email });

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

const getSubjects = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database
  const db = await client.db("Edme");

  // access a collection called "customers"
  const customersCollection = db.collection("subjects");
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

const createModule = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  const db = client.db("Edme");

  const collection = db.collection("modules");

  try {
    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving the module");
  }
};

const getModule = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  const db = client.db("Edme");

  const collection = db.collection("modules");
  try {
    const result = await collection.find({}).toArray();

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

const confirmUserRole = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const { email } = req.params;

  const db = await client.db("Edme");

  const customersCollection = db.collection("users");

  try {
    const result = await customersCollection.updateOne(
      { email: email },
      { $set: { "profile.isconfirmed": true } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: `User with email ${email} has been confirmed.`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        message: `User ${email} not found`,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, success: false, message: error });
  } finally {
    client.close();
  }
};

const addCohort = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("Edme");

    // create/access a new collection called "customers"
    const customersCollection = db.collection("cohorts");

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
        message: "A new cohort was successfully created",
        data: requestBody,
      });
    }

    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not create cohort",
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

module.exports = {
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
};
