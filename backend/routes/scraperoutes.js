const express = require("express");
const scrapeBeyondChats = require("../scrapers/beyondchatsScraper");
const { saveNewArticles } = require("../services/articleService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const articles = await scrapeBeyondChats();
    const inserted = await saveNewArticles(articles);

    return res.json({
      message: "Scraping completed",
      scraped: articles.length,
      inserted
    });
  } catch (error) {
    console.error("Manual scrape failed:", error.message);
    return res.status(500).json({ error: "Scraping failed" });
  }
});

module.exports = router;
