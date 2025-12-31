const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeArticleContent(url) {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(data);

    // Try common blog content containers
    let content = "";

    $("article p").each((i, el) => {
      content += $(el).text().trim() + "\n\n";
    });

    // Fallback if article tag doesn't exist
    if (!content) {
      $(".blog-content p, .entry-content p").each((i, el) => {
        content += $(el).text().trim() + "\n\n";
      });
    }

    return content.trim();
  } catch (error) {
    console.error("❌ Failed to scrape:", url);
    return null;
  }
}

module.exports = scrapeArticleContent;
