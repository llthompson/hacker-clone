import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {

  const [articles, setArticles] = useState([]);
  const updateArticles = async (e) => {
    const { data } = await axios.get(`http://hn.algolia.com/api/v1/search?query=${e.target.value}`
    );
    setArticles(data.hits)
  }
  useEffect(() => {
    async function fetchArticles() {
      console.log('fetching')
      const { data } = await axios.get(`http://hn.algolia.com/api/v1/search`
      );
      console.log('setting')
      setArticles(data.hits)
    }
    fetchArticles()

  }, [])

  return (
    <div className="App">

      <header>
        <form>
          <input onChange={updateArticles} />
        </form>
      </header>


      <div>
        {articles.map((article, i) => <p key={i}>{article.title}</p>)}
      </div>
    </div>
  );
}

export default App;
