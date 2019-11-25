import React from "react";
import "./Article.css";

const TheVerge = ({ title, url, published, image_url }) => {
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

export default TheVerge;
