const Article = require("../models/Article");

async function saveNewArticles(scrapedArticles) {
  let inserted = 0;

  for (const item of scrapedArticles) {
    const exists = await Article.findOne({ sourceUrl: item.sourceUrl });

    if (exists) continue;

    await Article.create({
      title: item.title,
      sourceUrl: item.sourceUrl,
      content: item.content || "Content will be scraped later",
      isUpdated: false
    });

    inserted++;
  }

  return inserted;
}

module.exports = { saveNewArticles };
