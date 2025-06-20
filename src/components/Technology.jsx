import React, { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import InfiniteScroll from 'react-infinite-scroll-component';

const API_KEY = "7074e877dfd44d1c84572a697eaa019d";
const Technology_API_URL = `https://newsapi.org/v2/everything?q=technology&apiKey=${API_KEY}`;

const Technology = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    const fetchTechnologyNews = async () => {
      setProgress(20);
      setLoading(true);
      try {
        const response = await fetch(`${Technology_API_URL}&page=${page}&pageSize=20`);
        setProgress(70);
        const data = await response.json();
        setProgress(100);

        if (data.articles.length === 0 || data.totalResults <= articles.length) {
          setHasMore(false);
        } 

        setArticles(prevArticles => [...prevArticles, ...data.articles]);
      } catch (error) {
        console.error("Error fetching Technology news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologyNews();
  }, [page]); 
  
  const fetchMoreData = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1); 
    }
  };

  return (
    <div className="card-container relative" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <h1 className="font-semibold text-center m-20">Technology News</h1>
      <InfiniteScroll
        dataLength={articles.length} 
        next={fetchMoreData} 
        hasMore={hasMore} 
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more articles to display</p>} 
        scrollThreshold={0.95} 
      >
        <div className="card-container relative" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {articles.length === 0 && !loading ? (
            <div>No Technology articles available at the moment.</div>
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

export default Technology;
