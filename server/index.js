const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// access JSON data sent from client
app.use(bodyParser.json());

const PORT = 5000;

// start server on Port 5000
app.listen(PORT, () => console.log(`Server started on port `, PORT));