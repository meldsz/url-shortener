const mongoose = require("mongoose");
const UrlShortenerModel = mongoose.model("UrlShortenerModel");
const validUrl = require("valid-url");
const shortid = require("shortid");

const errorUrl = 'http://localhost/error';

const getDataFromDb = async (req, res) => {
  const item = await UrlShortenerModel.findOne({ shortId: req.params.shortId });
  return item ? res.redirect(item.originalUrl) : res.redirect(errorUrl);
}

module.exports = app => {

  app.get("/api/urls/:shortId", async (req, res) => {
    return await getDataFromDb(req, res);
  });

  app.get("/:shortId", async (req, res) => {
    return await getDataFromDb(req, res);
  });

  app.post("/api/urls", async (req, res) => {
    const { originalUrl, host } = req.body;
    // validate the base url
    if (!validUrl.isUri(host)) {
      return res
        .status(401)
        .json(
          "Invalid Host"
        );
    }
    // generate short id for the short url
    const shortId = shortid.generate();
    // validate the original Url
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShortenerModel.findOne({ originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = `${host}/${shortId}`;
          const item = new UrlShortenerModel({
            originalUrl,
            shortUrl,
            shortId
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid Request");
      }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
  });
};