import './App.css';
import React, { useEffect, useState } from "react";
import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sports from './components/Sports';
import Technology from './components/Technology';
import Business from './components/Business';
import Health from './components/Health';
import LoadingBar from 'react-top-loading-bar';
import InfiniteScroll from 'react-infinite-scroll-component';

const API_KEY = "7074e877dfd44d1c84572a697eaa019d";
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;


const App = () => {
  const [progress, setProgress] = useState(0); 
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    setProgress(20); 
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}&page=${page}&pageSize=20`); 
        setProgress(70);
        const data = await response.json();
        setProgress(100);
        
        if (data.articles.length === 0 || data.totalResults <= articles.length) {
          setHasMore(false);
        }

        setArticles(prevArticles => [...prevArticles, ...data.articles]);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [page]); 
  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1); 
  };

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress} 
        />
        <Routes>
          <Route path="/" element={<Home articles={articles} fetchMoreData={fetchMoreData} hasMore={hasMore} />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/Technology" element={<Technology />} />
          <Route path="/Business" element={<Business />} />
          <Route path="/Health" element={<Health />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ articles, fetchMoreData, hasMore }) => {
  return (
    <div className="card-container relative" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      <InfiniteScroll
        dataLength={articles.length} 
        next={fetchMoreData} 
        hasMore={hasMore} 
        loader={<h4>Loading...</h4>} 
        endMessage={<p>No more articles to display</p>} 
         scrollThreshold={0.95} 
      >
        <div>
        <h1 className="font-semibold text-center ">Trending News</h1>
        <div className="card-container relative" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {articles.map((article, index) => (
            <div className="card relative" style={{ width: '18rem' }} key={index}>
              <img src={article.urlToImage || "https://via.placeholder.com/150"} className="card-img-top" alt={article.title} />
              <div className="card-body relative">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description || "No description available."}</p>
                
                  <p className="card-text text-muted">{new Date(article.publishedAt).toLocaleDateString()}</p>
                  <a 
  href={article.url} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="block bg-white shadow-md rounded-lg px-6 py-3 text-center text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-200 w-fit mx-auto"
>
  Read More
</a>

              </div>
            </div>
          ))
           }
      </div>
      </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;