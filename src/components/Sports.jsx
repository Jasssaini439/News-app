import React, { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import InfiniteScroll from 'react-infinite-scroll-component';

const API_KEY = "7074e877dfd44d1c84572a697eaa019d";
const SPORTS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=7074e877dfd44d1c84572a697eaa019d
`;

const Sports = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);  

  useEffect(() => {
    const fetchSportsNews = async () => {
      setProgress(20);
      setLoading(true);
      try {
        const response = await fetch(`${SPORTS_API_URL}&page=${page}&pageSize=20`);
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
        console.error("Error fetching sports news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, [page]); // Trigger useEffect when the page number changes

  // Function to handle loading more data when scrolled to the bottom
  const fetchMoreData = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1); // Increment the page number to load more articles
    }
  };

  return (
    <div className="card-container relative" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <h1 className="font-semibold text-center m-20">Sports News</h1>
      <InfiniteScroll
        dataLength={articles.length} // Length of the current articles
        next={fetchMoreData} // Function to load more articles
        hasMore={hasMore} // Whether there are more articles to load
        loader={<h4>Loading...</h4>} // Displayed while new articles are being fetched
        endMessage={<p>No more articles to display</p>} // Message shown when all articles are loaded
        scrollThreshold={0.95} // Trigger fetchMoreData when 95% of the page is scrolled
      >
        <div className="card-container relative" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {articles.length === 0 && !loading ? (
            <div>No sports articles available at the moment.</div>
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

export default Sports;
