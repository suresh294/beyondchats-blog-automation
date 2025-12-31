const express = require("express");
const scrapeAndSaveArticles = require("../services/articleService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await scrapeAndSaveArticles();
    res.json({ message: "Scraping completed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
