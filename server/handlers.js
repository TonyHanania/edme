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

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = await client.db("Edme");

  const usersCollection = db.collection("users");
  try {
    const result = await usersCollection.find({}).toArray();

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    client.close();
  }
};
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
    client.close();
  }
};

const setProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const { email } = req.params;

  const {
    image,
    bio,
    role,
    firstName,
    lastName,
    isconfirmed,
    isSelected,
    activeCohort,
  } = req.body;

  const db = await client.db("Edme");

  const users = db.collection("users");

  try {
    const result = await users.findOneAndUpdate(
      { email: email },
      {
        $set: {
          profile: {
            image: image,
            bio: bio,
            role: role,
            firstName: firstName,
            lastName: lastName,
            isconfirmed: isconfirmed,
            isSelected: isSelected,
            activeCohort: activeCohort,
          },
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
  const client = new MongoClient(MONGO_URI, options);
  const { email, password } = req.body;

  await client.connect();

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
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const { email } = req.params;

  const db = await client.db("Edme");

  const usersCollection = db.collection("users");

  try {
    const result = await usersCollection.findOne({ email: email });

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
    client.close();
  }
};

const getSubjects = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = await client.db("Edme");

  const subjectsCollection = db.collection("subjects");
  try {
    const result = await subjectsCollection.find({}).toArray();

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    client.close();
  }
};

const createModule = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

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
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  try {
    const db = await client.db("Edme");

    const customersCollection = db.collection("cohorts");

    const _id = uuidv4();

    const { ...FormData } = req.body;

    const requestBody = { _id, ...FormData };

    const usersCollection = db.collection("users");
    const studentEmails = Object.values(requestBody.cohort.students).map(
      (student) => student.email
    );
    const instructorEmail = requestBody.cohort.instructor.email;
    const matchingDocuments = await usersCollection
      .find({ email: { $in: studentEmails } })
      .toArray();
    console.log(matchingDocuments, "hiiiii  ");
    const result = await usersCollection.updateMany(
      { email: { $in: studentEmails } },
      { $set: { "profile.activeCohort": _id } }
    );

    const result2 = await usersCollection.updateOne(
      { email: instructorEmail },
      { $set: { "profile.activeCohort": _id } }
    );
    const insertionResult = await customersCollection.insertOne(requestBody);

    if (
      insertionResult.acknowledged &&
      result.acknowledged &&
      result2.acknowledged
    ) {
      return res.status(201).json({
        status: 201,
        success: true,
        message:
          "A new cohort was successfully created and users' active cohorts were updated",
        data: requestBody,
        result: matchingDocuments,
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
    client.close();
  }
};

const updateGrades = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Edme");

  const collection = db.collection("grades");

  try {
    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving the module");
  }
};
const updateProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const { email } = req.params;
  const { bio, image } = req.body;

  const db = await client.db("Edme");

  const customersCollection = db.collection("users");

  try {
    const updates = {};
    if (bio) {
      updates["profile.bio"] = bio;
    }
    if (image) {
      updates["profile.image"] = image;
    }
    const result = await customersCollection.updateOne(
      { email: email },
      { $set: updates }
    );
    console.log("updates", updates);
    if (result.modifiedCount === 1) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: `User with email ${email} has been updated.`,
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

const contactUs = async (req, res) => {
  const { ...data } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = await client.db("Edme");
  const contactUsCollection = db.collection("contactUs");
  try {
    const requestBody = {
      date: new Date(),
      ...data,
    };
    const result = await contactUsCollection.insertOne(requestBody);

    if (result) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Thank you for your message. We will get back to you shortly.",
      });
    }
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Message was not submitted",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    client.close();
  }
};

const getCustomerSupport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = await client.db("Edme");

  const contactUsCollection = db.collection("contactUs");
  try {
    const result = await contactUsCollection.find({}).toArray();

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    client.close();
  }
};

const getGrades = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = await client.db("Edme");

  const gradesCollection = db.collection("grades");
  try {
    const result = await gradesCollection.find({}).toArray();

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    client.close();
  }
};

const updateModule = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const { moduleId } = req.params;
  const { lesson, resourcePhoto, resourcePdf } = req.body;

  const db = await client.db("Edme");

  const modulesCollection = db.collection("modules");

  try {
    const updates = {};
    if (lesson) {
      updates["lesson"] = lesson;
    }
    if (resourcePhoto) {
      updates["resourcePhoto"] = resourcePhoto;
    }
    if (resourcePdf) {
      updates["resourcePdf"] = resourcePdf;
    }

    const moduleObjectId = ObjectId.createFromHexString(moduleId);
    const result = await modulesCollection.updateOne(
      { _id: moduleObjectId },
      { $set: updates }
    );

    console.log("updates", updates, moduleId, moduleObjectId);

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: `Module with module Id ${moduleId} has been updated.`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        message: `Module ${moduleId} not found`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  } finally {
    client.close();
  }
};

module.exports = {
  getAllUsers,
  getUser,
  setProfile,
  getPasswordVerification,
  getUserByEmail,
  getSubjects,
  createModule,
  getModule,
  confirmUserRole,
  addCohort,
  updateGrades,
  updateProfile,
  contactUs,
  getCustomerSupport,
  getGrades,
  updateModule,
};
