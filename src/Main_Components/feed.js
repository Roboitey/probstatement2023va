import React, { useEffect, useState } from "react";
import { getArticles } from "../services/feedService";
import "../Styles/Feed.css";

function Feed() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3); // Adjust the number of articles per page
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Replace this with your actual fetch function
    // For the sake of example, let's assume getArticles() returns a promise
    getArticles().then((data) => {
      console.log(data.articles);
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.articles.length / articlesPerPage));
    });
  }, [articlesPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const searchPaginationItems = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);


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
          ))
        )}
     </div>
    </div>
      

      <div className="pagination">
        <button className="pagination-button" onClick={goToPreviousPage}>
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "pagination-button active" : "pagination-button"}
          >
            {index + 1}
          </button>
        ))}
        <button className="pagination-button" onClick={goToNextPage}>
          {">"}
        </button>
      </div>

      <div className="create-article-btn">
        <button>Create Article</button>
      </div>
    </>
  );
  
}

export default Feed;