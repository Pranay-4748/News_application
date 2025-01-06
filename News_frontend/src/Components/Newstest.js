import React, { useEffect, useState } from "react";

const Newstest = () => {
  const [news, setnews] = useState([]);

  useEffect(() => {
    fetch("https://newsapi.org/v2/everything?q=Apple&from=2025-01-01&sortBy=popularity&apiKey=77fdf4e646a24b6285a990a4111ce8b1")
      .then(res => res.json())
      .then(data => {
        
        const filteredNews = data.articles.filter(article => 
          !article.title.includes("[Removed]") && 
          !article.description.includes("[Removed]")
        );
        setnews(filteredNews); 
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row text-center">
          {news.length === 0 ? (
            <div>Loading...</div>
          ) : (
            news.map((val) => (
              <div className="col my-3" key={val.url}>
                <div className="card" style={{ width: "18rem" }}>
                  <img src={val.urlToImage} className="card-img-top" alt={val.title} />
                  <div className="card-body">
                    <h5 className="card-title">{val.title}</h5>
                    <p className="card-text">{val.description}</p>
                    <a href={val.url} target="_blank" className="btn btn-primary" rel="noopener noreferrer">
                      Know More
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Newstest;
