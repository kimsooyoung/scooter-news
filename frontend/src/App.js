import React, { useEffect, useState } from "react";
import axios from "axios";
import TheVerge from "./components/TheVerge";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  // const [interval, ToggleInterval] = useState(false);

  const getMovies = async () => {
    const {
      data: { data }
    } = await axios.get(
      "http://ec2-13-124-177-139.ap-northeast-2.compute.amazonaws.com:3001/scooter-news/techcrunch"
    );
    console.log(data);
    setLoading(false);
    setArticles(data);
  };

  useEffect(() => {
    let id = setInterval(getMovies, 1000);
    return () => clearInterval(id);
  }, [loading]);

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <div className="loader__text">Loading now...</div>
        </div>
      ) : (
        <div className="row">
          <header className="header__container">
            <div className="title">
              <span className="title__text">Swimming Scooter News</span>
            </div>
            <nav>
              <ul>
                <li>
                  <img
                    className="bi__logo"
                    src="https://www.hi-interiors.com/wp-content/uploads/2019/08/kisspng-business-insider-logo-news-entrepreneurship-sangeet-5b3731a2d298e8.2945856615303438428626.png"
                  ></img>
                </li>
                <li>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/The_Verge_logo.svg/1280px-The_Verge_logo.svg.png"></img>
                </li>
                <li>
                  <img src="http://v3.danielmall.com/articles/techcrunch-responsive-redesign/tc-logo5.svg"></img>
                </li>
              </ul>
            </nav>
          </header>
          <div className="articles">
            {articles.map(article => (
              <TheVerge
                key={article._id}
                title={article.title}
                published={article.published}
                url={article.url}
                image_url={article.image}
              ></TheVerge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
