const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");
const { MongoClient, Collection } = require("mongodb");
dotenv.config();

//* Making connection
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//* Db name
const dbName = "PassMate";
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(cors());
client.connect();

//* Get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//* Save all the passwords
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

//* Delete a password by id
app.delete("/", async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const findResult = await collection.deleteOne({ id });
  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
