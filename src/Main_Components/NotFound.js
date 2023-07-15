import React from "react";
import "../Styles/NotFound.css";
function NotFound() {
  return (
    <div className="nf-cont">
      <h1 className="nf-cont-title">404</h1>
      <p className="nf-cont-description">Page not found <br/> Oops! The page you are looking for doesn't exist. <br/>
      Go back to <a href="/">home page</a></p>
    </div>
  );
}

export default NotFound;
