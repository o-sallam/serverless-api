// api/trustpilot.js
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function handler(req, res) {
  try {
    const url = "https://www.trustpilot.com/review/profboost.net";
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    // --- TrustScore ---
    const trustScore =
      $("[data-service-review-rating] meta[itemprop='ratingValue']").attr(
        "content"
      ) || $(".styles_summary__5kwFV").text().trim();

    // --- عدد الريفيوز ---
    const reviewsCount =
      $("[data-service-review-count]").text().trim() ||
      $(".headline_headline__3iLsc").text().trim();

    // --- الريفيوز نفسهم ---
    const reviews = [];
    $("[data-service-review-card]").each((i, el) => {
      if (i >= 5) return false; // ناخد 5 بس
      const title = $(el).find("h2").text().trim();
      const body = $(el).find("p").text().trim();
      const rating = $(el).find("[data-service-review-rating] img").attr("alt"); // مثلاً: "5 stars"
      reviews.push({ title, body, rating });
    });

    res.status(200).json({
      trustScore,
      reviewsCount,
      reviews,
    });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ message: "Error fetching Trustpilot data" });
  }
};
