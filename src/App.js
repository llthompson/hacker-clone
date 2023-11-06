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
                <a className='create' href={article.created_at}>{article.created_at}</a>
              </span>

            </div>
          </div>
        ))}

      </div>






    </div>
  );
}

export default App;
