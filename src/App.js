import './App.css';
import { useState } from 'react';
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const updateArticles = async (e) => {
    const { data } = await axios.get(`http://hn.algolia.com/api/v1/search?query=${e.target.value}`
    );
    setArticles(data.hits)
  }
  return (
    <div className="App">
      <form>
        <input onChange={updateArticles} />
      </form>

      <div>
        {articles.map((article, i) => <p key={i}>{article.title}</p>)}
      </div>
    </div>
  );
}

export default App;
