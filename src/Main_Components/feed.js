import React from "react";
import { useEffect, useState } from "react";
import { getArticles } from "../services/feedService";
import "../Styles/Feed.css";

function Feed() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles().then((data) => {
      console.log(data.articles);
      setArticles(data.articles);
    });
  }, []);

  return (
    <>
      {articles.map((item, key) => {
        return (
          <>
            <div className="article-cont" key={key}>
              <div className="article-top">
                <div className="article-title">
                  <h1>{item.title}</h1>
                </div>
              </div>
              <div className="article-center">
                <div className="article-center-content">{item.contents}</div>
              </div>
              <div className="article-bottom">
                <div className="article-b-views">
                  <p>
                    views: <strong>{item.views}</strong>
                  </p>
                </div>
                <div className="article-b-sessions">
                  <p>
                    sessions: <strong>{item.sessions}</strong>
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <div className="create-article-btn">
        <button>Create Article</button>
      </div>
    </>
  );
}

export default Feed;
