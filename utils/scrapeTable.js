const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrapes table rows from a given URL and returns only the needed fields
 * @param {string} url - The target page URL
 * @param {string[]} fields - List of needed fields (e.g., ["company", "white"])
 * @returns {Promise<object[]>}
 */
async function scrapeTable(url, fields = []) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const rows = [];
  $("table.table tbodgsmy tr").each((i, elem) => {
    const tds = $(elem).find("td");

    // خريطة الأعمدة المتاحة
    const row = {
      company: $(tds[0]).text().trim(),
      white: $(tds[1]).text().trim(),
      red: $(tds[2]).text().trim(),
    };

    // لو محدد fields نرجع بس الأعمدة دي
    const filtered = {};
    fields.forEach((f) => {
      if (row[f] !== undefined) {
        filtered[f] = row[f];
      }
    });

    rows.push(filtered);
  });

  return rows;
}

module.exports = scrapeTable;
