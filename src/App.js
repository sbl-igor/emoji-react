import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import s from './components/Modules/App.module.css';
import cross from './components/Modules/grey cross.png'

function App() {

  const [value, setValue] = useState('');
  const [emoji, setEmoji] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = Math.ceil(emoji.length / cardsPerPage);



  const url = 'https://6423241f001cb9fc20393732.mockapi.io/emoji';

  useEffect(() => {
    const abortController = new AbortController()

    fetch(url)
    .then(data => data.json())
    .then(data => setEmoji(data))

    return () => {
      abortController.abort()
    }

  }, [])

  const filteredEmoji = emoji.filter((elem) => {
    const fullSearch = value.split(" ");
    return fullSearch.every(
      (word) => {
        return elem.title.toLowerCase().includes(word.toLowerCase());
      }
    );
  });

  const emojiList = filteredEmoji.slice(
    firstCardIndex,
    lastCardIndex
  );

  console.log(emojiList)

  let startPage = 0;
  let endPage = 0;

  const pageNumbers = [];

  for (let i = 1; i <= currentCards; i++) {
    pageNumbers.push(i);
  }
  
  // conditions for pagination
  if (currentPage === 1 || currentPage === 2) {
    startPage = 0;
    endPage = 5;
  } else if (currentPage === currentCards || currentPage === currentCards - 1 || currentPage === currentCards - 2) {
    startPage = currentCards - 5;
    endPage = currentCards;
  } else if (currentPage > 2) {
    startPage = currentPage - 3;
    endPage = currentPage + 2;
  }

  function clearInput() {
    setValue('')
  }

  return (
    <div className="App">
      <Header/>
      <div className='form'>
      <input type='text' maxLength='50' onChange={(e) => {
        setValue(e.target.value);
        setCurrentPage(1);
      }} className={s.input} placeholder='Search Emoji...' value={value}/>
        <button id={s.deleteValue}
        onClick={clearInput}
        >
        <img src={cross}></img>
        </button>
      </div>
      {value && <div className={s.valueInput}>
          <p>Результаты поиска по:</p>
          <p>"{value}"</p>
      </div>}
      <div className={s.mainArea}>
        <div className={s.boxForCard}>

          {emojiList
          .map((elem, i) => (

          <div key={i} className={s.card}>
            <li className={s.symbol}>{elem.symbol}</li>
            <li className={s.title}>{elem.title}</li>
            <li className={s.keywords}>{elem.keywords}</li>
          </div>

          ))}


        </div>
        <div className={s.pagination}>
          {currentPage === 1 ? (
          <button
            disabled={true}
            onClick={() => setCurrentPage(pageNumbers[pageNumbers[0] - 1])}
          >
            First
          </button>
        ) : (
          <button
            onClick={() => setCurrentPage(pageNumbers[pageNumbers[0] - 1])}
          >
            First
          </button>
        )}
        {pageNumbers.slice(startPage, endPage).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}

        {currentPage === currentCards ? (
          <button
            disabled={true}
            onClick={() => setCurrentPage(pageNumbers.length)}
          >
            Last
          </button>
        ) : (
          <button
            onClick={() => setCurrentPage(pageNumbers.length)}
          >
            Last
          </button>
        )}
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default App;
