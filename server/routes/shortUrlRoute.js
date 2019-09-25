const mongoose = require("mongoose");
const UrlShortenerModel = mongoose.model("UrlShortenerModel");
const shortid = require("shortid");

module.exports = app => {

  app.post("/api/urls", async (req, res) => {
    const { originalUrl, host } = req.body;

    // validate the original Url

    try {
      // look for the original url in the db
      const item = await UrlShortenerModel.findOne({ originalUrl });
      // return the data if the original url already exists in the db
      if (item) {
        res.status(200).json(item);
      } else {
        // create a new short url if the url does not exist in the db

        // generate short id for the short url
        const shortId = shortid.generate();
        shortUrl = `${host}/${shortId}`;
        const item = new UrlShortenerModel({
          originalUrl,
          shortUrl,
          shortId
        });
        // save the created data to the db and return the data as a response 
        await item.save();
        res.status(200).json(item);
      }
    } catch (err) {
      res.status(401).json("Invalid Request");
    }

  });
};