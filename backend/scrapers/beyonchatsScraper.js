const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeBeyondChats() {
  try {
    const { data } = await axios.get("https://beyondchats.com/blogs");
    const $ = cheerio.load(data);

    const articles = [];

  $("article a").each((i, el) => {
  if (articles.length >= 5) return;

  const title = $(el).text().trim();
  const link = $(el).attr("href");

  if (
    title &&
    link &&
    link.startsWith("/blogs/") &&
    !link.includes("/tag/")
  ) {
    articles.push({
      title,
      sourceUrl: link.startsWith("http")
        ? link
        : `https://beyondchats.com${link}`,
      content: "Content will be scraped later"
    });
  }
});

if (articles.length < 5) {
  console.warn("⚠️ Only found", articles.length, "articles");
}

    return articles.slice(0,5);
  } catch (error) {
    console.error("Scraping failed:", error.message);
    return [];
  }
}

module.exports = scrapeBeyondChats;
