import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import hnewslogo from './hnewslogo.png';

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
          <div className='head-con'>
            <span className='head-logo'>
              <img src={hnewslogo}></img>
              <a className='site-title' href='https://hn.algolia.com/'>Search 
              <br></br>
              Hacker News</a>

            </span>

    <div className='search-con'>
        <form>
          <input type='search' placeholder='Search stories by title, url, or author' className='search-in' onChange={updateArticles} />
        </form>
        </div>

        </div>
      </header>


      {/* <section class="Story">
        <div class="post" >
          <div className="title">
            {articles.map((article, i) => (
              <a className="link-for-title" href={article.url} key={i}>
                <p className="title-for-title">{article.title}</p>
                <p className="link-for-link">{article.url}</p>
              </a>
            ))}
          </div>
        </div>
      </section> */}



      <div className='a-body'>

        {articles.map((article, i) => (

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
