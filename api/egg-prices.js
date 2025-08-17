const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function handler(req, res) {
  try {
    const { data } = await axios.get(
      "https://www.elmorshdledwagn.com/prices/5"
    );
    const $ = cheerio.load(data);

    const rows = [];
    $("table.table tbody tr").each((i, elem) => {
      const tds = $(elem).find("td");
      rows.push({
        company: $(tds[0]).text().trim(),
        white: $(tds[1]).text().trim(),
        red: $(tds[2]).text().trim(),
        balady: $(tds[3]).text().trim(),
      });
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};
