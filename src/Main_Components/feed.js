import React from "react";
import { useEffect, useState } from "react";
import { getArticles, CreateArticle } from "../services/feedService";
import "../Styles/Feed.css";

function Feed() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [userID, setUserID] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [EditMode, setEditMode] = useState(false);
  const [numSKillInputFields, setNumSkillInputFields] = useState(1);
  const keywordsMaxLimit = 10;

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data.articles);
    });
  }, []);
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user"))["user_id"]);
    setUserID(JSON.parse(localStorage.getItem("user"))["user_id"]);
  }, []);
  const createArticleFunction = () => {
    setEditMode(false);
    CreateArticle(title, contents, userID, keywords);
  };
  function addKeyword() {
    if (numSKillInputFields < keywordsMaxLimit) {
      setNumSkillInputFields((prevNum) => prevNum + 1);
    } else {
      console.log("Limit Reached");
      console.log(numSKillInputFields.length);
    }
  }

  return (
    <>
      <div className="articles">
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
      </div>
      {EditMode ? (
        <div className="create-article-btn">
          <button onClick={createArticleFunction}>Add Article</button>
        </div>
      ) : (
        <div className="create-article-btn">
          <button
            onClick={() => {
              setEditMode(true);
            }}
          >
            Create Article
          </button>
        </div>
      )}
      {EditMode ? (
        <>
          <div className="article-cont alone">
            <div className="article-top">
              <div className="article-title">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="article-center">
              <div className="article-center-content">
                <textarea
                  placeholder="Content"
                  onChange={(e) => {
                    setContents(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="article-bottom">
              <div className="article-b-views-new">
                <div>
                  {Array.from({ length: numSKillInputFields }, (_, index) => (
                    <input
                      type="text"
                      placeholder="Keyword"
                      onChange={(e) => {
                        setKeywords(...keywords, e.target.value);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="add-keyword">
              <button className="add-keyword-btn" onClick={addKeyword}>
                Add new Keyword
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Feed;
