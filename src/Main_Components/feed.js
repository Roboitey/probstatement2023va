import React from "react";
import { useEffect, useState } from "react";
import { getArticles } from "../services/feedService";

function Feed() {
  useEffect(() => {
    getArticles().then((data) => {
      console.log(data.articles); 
    });
  }, []);

  return <></>;
}

export default Feed;
