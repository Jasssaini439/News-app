import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

const API_KEY = "7074e877dfd44d1c84572a697eaa019d";
const Health_API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;

const Health = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1); // Track the current page number
  const [hasMore, setHasMore] = useState(true); // Flag to check if more articles are available

  // Fetch initial data
  useEffect(() => {
    setProgress(20);
    const fetchHealthNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${Health_API_URL}?page=${page}`);
        setProgress(70);
        const data = await response.json();
        setProgress(100);

        // Check if there are more articles to load
        if (data.articles.length === 0 || data.totalResults <= articles.length) {
          setHasMore(false);
        }

        // Append new articles to the existing list
        setArticles(prevArticles => [...prevArticles, ...data.articles]);
      } catch (error) {
        console.error("Error fetching Health news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthNews();
  }, [page]); // Fetch data when the page number changes

  // Function to handle loading more data when scrolled to the bottom
  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1); // Increment the page number to load more articles
  };

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <h1 className="font-semibold text-center m-20">Health News</h1>
      <InfiniteScroll
        dataLength={articles.length} // Length of the current articles
        next={fetchMoreData} // Function to load more articles
        hasMore={hasMore} // Whether there are more articles to load
        loader={<h4>Loading...</h4>} // Displayed while new articles are being fetched
        endMessage={<p>No more articles to display</p>} // Message shown when all articles are loaded
        scrollThreshold={0.95} // Trigger fetchMoreData when 95% of the page is scrolled
      >
        <div className="card-container relative" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            articles.map((article, index) => (
              <div className="card relative" style={{ width: '18rem' }} key={index}>
                <img src={article.urlToImage || "https://via.placeholder.com/150"} className="card-img-top" alt={article.title} />
                <div className="card-body relative">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description || "No description available."}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="relative bottom-4">
                    Read More
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Health;
