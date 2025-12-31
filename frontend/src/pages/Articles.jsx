import React, { useEffect, useState } from "react";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Scraped Articles</h2>

      {articles.length === 0 && <p>No articles found</p>}

      {articles.map((article) => (
        <div
          key={article._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "12px",
            padding: "12px",
            borderRadius: "6px"
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.content}</p>

          {article.sourceUrl && (
            <a href={article.sourceUrl} target="_blank" rel="noreferrer">
              Read original
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Articles;
