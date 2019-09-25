const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

require("./models/urlShortenerModel");

const mongoURI = "mongodb://localhost/url-shortner";
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
});

const app = express();
// access JSON data sent from client
app.use(bodyParser.json());

const PORT = 5000;

// start server on Port 5000
app.listen(PORT, () => console.log(`Server started on port `, PORT));