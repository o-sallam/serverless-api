module.exports = async function handler(req, res) {
  try {
    const data = await scrapeTable("https://www.elmorshdledwagn.com/prices/5", [
      "company",
      "white",
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};
