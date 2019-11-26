import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Article.css";

const Article = ({ title, url, published, image_url, media }) => {
  return (
    <div className="article">
      <a href={url}>
        <img src={image_url} alt={title} title={title}></img>
      </a>
      <div className="article__data">
        <a className="article__title" href={url}>
          {title}
        </a>
        <h5 className="article__published">{published}</h5>
      </div>
    </div>
  );
};

export default Article;
