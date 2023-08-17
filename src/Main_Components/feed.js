import React from "react";
import { useEffect, useState } from "react";
import { getArticles } from "../services/feedService";
import "../Styles/Feed.css";

function Feed() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    // Replace this with your actual fetch function
    // For the sake of example, let's assume getArticles() returns a promise
    getArticles().then((data) => {
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.articles.length / articlesPerPage));
    });
  }, []);

  return (
    <>
    <div className="opportunity-container">
      <div className="opportunity-header">
        <h2 classname="opportunity-title">
          Articles:
         
        </h2>
        <input
          type="text"
          placeholder="Search..."
          className="opportunity-search"
          value={searchTerm}
          onChange={searchPaginationItems}
        />
      </div>
     <div classname="opportunity-content">
     {currentArticles.length === 0 ? (
          <div className="no-results">No results found...</div>
        ) : (
          currentArticles.map((item, key) => (
            <div className="article-cont" key={key}>
              <div className="article-top">
                <div className="article-title">
                  <h1>{item.title}</h1>
                  <h5>Keyword: {item.keywords}</h5>
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