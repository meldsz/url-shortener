const mongoose = require("mongoose");

const { Schema } = mongoose;

// define the schema to store url-shortener data
const urlShortenerSchema = new Schema({
  originalUrl: String,
  shortId: String,
  shortUrl: String,
  ctime: { type: Date, default: Date.now }
});

mongoose.model("UrlShortenerModel", urlShortenerSchema);