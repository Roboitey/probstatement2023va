import React from 'react'
import "../Styles/NotFound.css" 
function NotFound() {
  return (
    <div className="container">
    <h1>404</h1>
    <p>Page not found</p>
    <p>Oops! The page you are looking for doesn't exist.</p>
    <p>Go back to <a href="/">home page</a>.</p>
  </div>
  )
}

export default NotFound