const test = require("node:test");
const assert = require("node:assert/strict");
const Article = require("../models/Article");
const { saveNewArticles } = require("../services/articleService");

test("saves only articles whose source URLs are not already stored", async () => {
  const originalFindOne = Article.findOne;
  const originalCreate = Article.create;
  const existingUrls = new Set(["https://beyondchats.com/blogs/existing"]);
  const created = [];

  Article.findOne = async ({ sourceurl }) => (
    existingUrls.has(sourceurl) ? { sourceurl } : null
  );
  Article.create = async (article) => {
    created.push(article);
    existingUrls.add(article.sourceurl);
    return article;
  };

  try {
    const inserted = await saveNewArticles([
      {
        title: "Existing",
        sourceurl: "https://beyondchats.com/blogs/existing",
        content: "Existing content",
      },
      {
        title: "New article",
        sourceurl: "https://beyondchats.com/blogs/new",
        content: "New content",
      },
    ]);

    assert.equal(inserted, 1);
    assert.equal(created.length, 1);
    assert.equal(created[0].sourceurl, "https://beyondchats.com/blogs/new");
    assert.equal(created[0].isUpdated, false);
  } finally {
    Article.findOne = originalFindOne;
    Article.create = originalCreate;
  }
});
