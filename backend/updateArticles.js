const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("./models/Article");
const scrapeArticleContent = require("./scrapers/contentScraper");

async function updateArticles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");

    const articles = await Article.find({
  isUpdated: false,
  sourceUrl: { $exists: true }
});

    console.log(`🔍 Found ${articles.length} articles to update`);

    for (const article of articles) {
      const url = article.sourceUrl || article.sourceurl;

      console.log(`➡️ Scraping: ${url}`);

      if (!url) {
        console.log("⚠️ Skipped (no sourceUrl)");
        continue;
      }

      const content = await scrapeArticleContent(url);

      if (!content) {
        console.log("⚠️ Skipped (no content)");
        continue;
      }

      article.content = content;
      article.isUpdated = true;

      await article.save();
      console.log("✅ Updated:", article.title);
    }

    console.log("🎉 Phase 2 completed");
    process.exit(0);

  } catch (err) {
    console.error("❌ Update failed:", err.message);
    process.exit(1);
  }
}

updateArticles();
