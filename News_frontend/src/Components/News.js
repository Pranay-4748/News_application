import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar"; 
import { Spinner, Button } from "react-bootstrap";
import "./News.css"

const categories = ["business", "entertainment", "health", "science", "sports", "technology"];

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all"); 
  const [searchTerm, setSearchTerm] = useState(""); 


  
  const fetchNews = useCallback(() => {
    let url = "";
    if (category === "all") {
      url = `https://newsapi.org/v2/everything?q=tesla&from=2024-12-06&sortBy=publishedAt&apiKey=77fdf4e646a24b6285a990a4111ce8b1`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=88311fc159104525b028e4e1d8651022`;
    }

    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        const validArticles = res.data.articles.filter(
          (article) => article.title && article.description
        );
        setNews(validArticles); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch news");
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    fetchNews();
  }, [category, fetchNews]);

  
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory); 
  };

  
  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        <p>{error}</p>
        <Button onClick={fetchNews}>Retry</Button>
      </div>
    );
  }

  return (
    <>
      <Navbar
        onCategoryChange={handleCategoryChange} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />
      
      <div className="container my-5">
        <div className="row text-center">
          {filteredNews.length > 0 ? (
            filteredNews.map((article) => {
              if (!article.title || !article.description) return null;

              return (
                <div key={article.url} className="col-md-3 col-sm-6 my-3">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <div className="card h-100 d-flex flex-column custom-card">
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          className="card-img-top"
                          alt={article.title}
                          style={{ objectFit: "cover", height: "200px" }}
                        />
                      )}
                      <div className="card-body d-flex flex-column h-100">
                        <h5 className="card-title">{article.title}</h5>
                        {article.description && (
                          <p className="card-text text-truncate" style={{ maxHeight: '4.5rem' }}>
                            {article.description}
                          </p>
                        )}
                        <p className="card-text mt-auto">
                          <small className="text-muted">
                            {new Date(article.publishedAt).toLocaleString()}
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

              );
            })
          ) : (
            <div className="col-12 text-center">
              <p>No news available in this category</p>
            </div>
          )}
        </div>
      </div >
    </>
  );
};

export default News;
