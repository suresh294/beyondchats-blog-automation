const mongoose = require("mongoose");
require("dotenv").config();

const scrapeBeyondChats = require("../scrapers/beyondchatsScraper");
const { saveNewArticles } = require("../services/articleService");

async function runScrapeJob() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected (Cron)");

    const scrapedArticles = await scrapeBeyondChats();
    console.log(`🔍 Scraped ${scrapedArticles.length} articles`);

    const inserted = await saveNewArticles(scrapedArticles);
    console.log(`➕ Inserted ${inserted} new articles`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Cron job failed:", err.message);
    process.exit(1);
  }
}

runScrapeJob();
