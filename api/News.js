// api/news.js
export default async function handler(req, res) {
    const API_KEY = process.env.NEWS_API_KEY;
    const { page = 1 } = req.query;
  
    const url = `https://newsapi.org/v2/top-headlines?country=in&page=${page}&pageSize=20&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Serverless function error:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  }
  