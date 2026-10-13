const Article = require("../models/Article");

async function saveNewArticles(scrapedArticles) {
  let inserted = 0;

  for (const item of scrapedArticles) {
    const exists = await Article.findOne({ sourceurl: item.sourceurl });
    if (exists) continue;

    await Article.create({
      title: item.title,
      sourceurl: item.sourceurl,
      content: item.content || "Content will be scraped later",
      isUpdated: false
    });

    inserted++;
  }

  return inserted;
}

module.exports = { saveNewArticles };
