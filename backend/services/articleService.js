const Article = require("../models/Article");
const scrapeBeyondChats = require("../scrapers/beyonchatsScraper");

async function scrapeAndSaveArticles() {
  const articles = await scrapeBeyondChats();

  for (const article of articles) {
    const exists = await Article.findOne({
      sourceUrl: article.sourceUrl
    });

    if (!exists) {
      await Article.create(article);
      console.log("Saved:", article.title);
    } else {
      console.log("Skipped duplicate:", article.title);
    }
  }
}

module.exports = scrapeAndSaveArticles;
