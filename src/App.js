import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import hnewslogo from './hnewslogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


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

  const filteredArticles = articles.filter(
    (article) => article.title && article.url
  );

  return (
    <div className="container">

      <header>
          <div className='head-con'>
            <span className='head-logo'>
              <img src={hnewslogo}></img>
              <a className='site-title' href='https://hn.algolia.com/'>Search 
              <br></br>
              Hacker News</a>

            </span>

    <div className='search-con'>
        <form>
        <div className="search-input">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="search-icon" style={{color: "#ff7429",}} />
                <input
                  type="search"
                  placeholder="Search stories by title, url, or author"
                  className="search-in"
                  onChange={updateArticles}
                />
              </div>
        </form>
        </div>

        </div>
      </header>



      <div className='a-body'>

        {filteredArticles.map((article, i) => (

          <div className='art-con'>

            <div className='an-article'>
              <a className='itletay' href={article.url}>
                <span>
                  {article.title}
                </span>
              </a>

              <a className='inklay' href={article.url}>
                ({article.url})
              </a>

            </div>

            <div className='art-met'>
              <span>
                <a className='points' href={article.points}>{article.points} points | </a>
              </span>
              <span>
                <a className='author' href={article.author}>{article.author} | </a>
              </span>
              <span>
                <a className='create' href={article.created_at}>{moment(article.created_at).fromNow()}</a>
              </span>

            </div>
          </div>
        ))}

      </div>






    </div>
  );
}

export default App;
