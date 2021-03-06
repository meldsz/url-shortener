const mongoose = require("mongoose");
const UrlShortenerModel = mongoose.model("UrlShortenerModel");
const validUrl = require("valid-url");
const shortid = require("shortid");
const urlExists = require('url-exists');

const errorUrl = 'http://localhost/error';

const getUrlFromDb = async (req, res) => {
  await UrlShortenerModel.updateOne({ shortId: req.params.shortId },
    { $inc: { clicks: 1 } });
  const item = await UrlShortenerModel.findOne({ shortId: req.params.shortId });
  return item ? res.redirect(item.originalUrl) : res.redirect(errorUrl);
}

module.exports = app => {

  app.get("/api/urls/:shortId", async (req, res) => {
    return await getUrlFromDb(req, res);
  });

  app.get("/:shortId", async (req, res) => {
    return await getUrlFromDb(req, res);
  });

  app.get("/api/urls", async (req, res) => {
    const items = await UrlShortenerModel.find().sort({ $natural: -1 }).limit(10);
    return items ? res.send(JSON.stringify(items)) : res.redirect(errorUrl);
  });

  app.post("/api/urls", async (req, res) => {
    const { originalUrl, host } = req.body;

    // validate the base url
    if (!validUrl.isUri(host)) {
      // return invalid host if host is not valid url format
      return res
        .status(401)
        .json(
          "Invalid Host"
        );
    }

    // validate the original Url to check if the url exists
    urlExists(originalUrl, async function (err, exists) {
      if (exists) {
        try {
          // check if the original url is already present in the db
          const item = await UrlShortenerModel.findOne({ originalUrl });
          if (item) {
            // respond with the url object from the db to prevent duplicates
            res.status(200).json(item);
          } else {
            // generate short id for the short url if the url is not existing in the db
            const shortId = shortid.generate();
            // create shorturl from the host url and shortid
            shortUrl = `${host}/${shortId}`;
            // store the generated url object in the db
            const item = new UrlShortenerModel({
              originalUrl,
              shortUrl,
              shortId,
              clicks: 0
            });
            await item.save();
            res.status(200).json(item);
          }
        } catch (err) {
          // catch errors
          res.status(401).json("Invalid Request");
        }
      } else {
        // return invalid url if the url does not exists
        return res
          .status(401)
          .json(
            "Invalid Original Url"
          );
      }
    });
  });
};