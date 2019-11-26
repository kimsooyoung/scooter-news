import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Article from "./components/Article";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState("techcrunch");
  const [articles, setArticles] = useState([]);

  const getMovies = useCallback(async () => {
    // setLoading(true);
    const {
      data: { data }
    } = await axios.get(
      `http://ec2-13-124-177-139.ap-northeast-2.compute.amazonaws.com:3001/scooter-news/${media}`
    );
    console.log(data);
    setLoading(false);
    setArticles(data);
  }, [media, loading]);

  useEffect(() => {
    // let id = setInterval(getMovies, 100000);
    // return () => clearInterval(id);
    getMovies();
  }, [loading, media]);

  const onClick = media => {
    setMedia(media);
  };

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
                    onClick={() => onClick("businessinsider")}
                    src="https://www.hi-interiors.com/wp-content/uploads/2019/08/kisspng-business-insider-logo-news-entrepreneurship-sangeet-5b3731a2d298e8.2945856615303438428626.png"
                  ></img>
                </li>
                <li>
                  <img
                    onClick={() => onClick("theverge")}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/The_Verge_logo.svg/1280px-The_Verge_logo.svg.png"
                  ></img>
                </li>
                <li>
                  <img
                    onClick={() => onClick("techcrunch")}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png"
                  ></img>
                </li>
              </ul>
            </nav>
          </header>
          <div className="articles">
            {articles.map(article => (
              <Article
                key={article._id}
                media={media}
                title={article.title}
                published={article.published}
                url={article.url}
                image_url={article.image}
              ></Article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
