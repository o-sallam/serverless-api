// api/trustpilot.js
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function handler(req, res) {
  const { data } = await axios.get(
    "https://www.trustpilot.com/review/profboost.net",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0 Safari/537.36",
      },
    }
  );

  const $ = cheerio.load(data);

  const trustScore = $("[data-testid$='-trust-score']").first().text().trim();
  const reviewsCount = $("[data-testid$='-total-reviews']")
    .first()
    .text()
    .trim();

  res.status(200).json({ trustScore, reviewsCount });
};
